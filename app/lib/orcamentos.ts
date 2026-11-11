import { getPool } from "@/app/lib/db";

export const STATUS_OPTIONS = [
  { value: "a_enviar_mensagem", label: "A enviar mensagem" },
  { value: "contato_feito", label: "Contato feito" },
  { value: "em_andamento", label: "Em andamento" },
  { value: "concluido", label: "Concluído" },
  { value: "cancelado", label: "Cancelado" },
] as const;

export type OrcamentoStatus = (typeof STATUS_OPTIONS)[number]["value"];

export function isOrcamentoStatus(value: unknown): value is OrcamentoStatus {
  return STATUS_OPTIONS.some((option) => option.value === value);
}

export function statusLabel(status: OrcamentoStatus): string {
  return STATUS_OPTIONS.find((option) => option.value === status)?.label ?? status;
}

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: string): boolean {
  return UUID_PATTERN.test(value);
}

export interface NovoOrcamento {
  name: string;
  phone: string;
  services: string[];
  equipment: string;
  description: string;
  clientIpHash: string;
  attachment?: {
    filename: string;
    mimeType: string;
    content: Buffer;
  };
}

export interface OrcamentoResumo {
  id: string;
  createdAt: Date;
  name: string;
  phone: string;
  services: string[];
  status: OrcamentoStatus;
  hasAttachment: boolean;
}

export interface OrcamentoDetalhe extends OrcamentoResumo {
  updatedAt: Date;
  equipment: string | null;
  description: string;
  attachment: { id: string; filename: string; mimeType: string; sizeBytes: number } | null;
}

export interface AnexoArquivo {
  filename: string;
  mimeType: string;
  content: Buffer;
}

interface ResumoRow {
  id: string;
  created_at: Date;
  name: string;
  phone: string;
  services: string[];
  status: OrcamentoStatus;
  has_attachment: boolean;
}

interface DetalheRow extends ResumoRow {
  updated_at: Date;
  equipment: string | null;
  description: string;
  attachment_id: string | null;
  attachment_filename: string | null;
  attachment_mime_type: string | null;
  attachment_size: number | null;
}

function mapResumo(row: ResumoRow): OrcamentoResumo {
  return {
    id: row.id,
    createdAt: row.created_at,
    name: row.name,
    phone: row.phone,
    services: row.services,
    status: row.status,
    hasAttachment: row.has_attachment,
  };
}

/** Orçamento + anexo na mesma transação: nunca grava um sem o outro. */
export async function createOrcamento(input: NovoOrcamento): Promise<string> {
  const client = await getPool().connect();

  try {
    await client.query("BEGIN");

    const inserted = await client.query<{ id: string }>(
      `INSERT INTO orcamentos (name, phone, services, equipment, description, client_ip_hash)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [
        input.name,
        input.phone,
        input.services,
        input.equipment || null,
        input.description,
        input.clientIpHash,
      ],
    );
    const id = inserted.rows[0].id;

    if (input.attachment) {
      await client.query(
        `INSERT INTO anexos (orcamento_id, filename, mime_type, size_bytes, content)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          id,
          input.attachment.filename,
          input.attachment.mimeType,
          input.attachment.content.length,
          input.attachment.content,
        ],
      );
    }

    await client.query("COMMIT");
    return id;
  } catch (error) {
    await client.query("ROLLBACK").catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}

export async function countRecentByIp(
  clientIpHash: string,
  minutes: number,
): Promise<number> {
  const { rows } = await getPool().query<{ total: string }>(
    `SELECT count(*) AS total FROM orcamentos
     WHERE client_ip_hash = $1 AND created_at > now() - make_interval(mins => $2)`,
    [clientIpHash, minutes],
  );
  return Number(rows[0].total);
}

export async function listOrcamentos(
  status?: OrcamentoStatus,
): Promise<OrcamentoResumo[]> {
  const { rows } = await getPool().query<ResumoRow>(
    `SELECT o.id, o.created_at, o.name, o.phone, o.services, o.status,
            EXISTS (SELECT 1 FROM anexos a WHERE a.orcamento_id = o.id) AS has_attachment
     FROM orcamentos o
     WHERE ($1::text IS NULL OR o.status = $1)
     ORDER BY o.created_at DESC
     LIMIT 500`,
    [status ?? null],
  );
  return rows.map(mapResumo);
}

export async function countByStatus(): Promise<Record<OrcamentoStatus, number>> {
  const { rows } = await getPool().query<{ status: OrcamentoStatus; total: string }>(
    `SELECT status, count(*) AS total FROM orcamentos GROUP BY status`,
  );
  const counts = Object.fromEntries(
    STATUS_OPTIONS.map((option) => [option.value, 0]),
  ) as Record<OrcamentoStatus, number>;
  for (const row of rows) counts[row.status] = Number(row.total);
  return counts;
}

export async function getOrcamento(id: string): Promise<OrcamentoDetalhe | null> {
  if (!isUuid(id)) return null;

  const { rows } = await getPool().query<DetalheRow>(
    `SELECT o.id, o.created_at, o.updated_at, o.name, o.phone, o.services,
            o.equipment, o.description, o.status,
            a.id AS attachment_id, a.filename AS attachment_filename,
            a.mime_type AS attachment_mime_type, a.size_bytes AS attachment_size,
            (a.id IS NOT NULL) AS has_attachment
     FROM orcamentos o
     LEFT JOIN anexos a ON a.orcamento_id = o.id
     WHERE o.id = $1`,
    [id],
  );

  const row = rows[0];
  if (!row) return null;

  return {
    ...mapResumo(row),
    updatedAt: row.updated_at,
    equipment: row.equipment,
    description: row.description,
    attachment:
      row.attachment_id && row.attachment_filename && row.attachment_mime_type
        ? {
            id: row.attachment_id,
            filename: row.attachment_filename,
            mimeType: row.attachment_mime_type,
            sizeBytes: row.attachment_size ?? 0,
          }
        : null,
  };
}

export async function updateStatus(
  id: string,
  status: OrcamentoStatus,
): Promise<boolean> {
  if (!isUuid(id)) return false;

  const result = await getPool().query(
    `UPDATE orcamentos SET status = $2 WHERE id = $1`,
    [id, status],
  );
  return result.rowCount === 1;
}

export async function getAnexo(id: string): Promise<AnexoArquivo | null> {
  if (!isUuid(id)) return null;

  const { rows } = await getPool().query<{
    filename: string;
    mime_type: string;
    content: Buffer;
  }>(`SELECT filename, mime_type, content FROM anexos WHERE id = $1`, [id]);

  const row = rows[0];
  return row
    ? { filename: row.filename, mimeType: row.mime_type, content: row.content }
    : null;
}
