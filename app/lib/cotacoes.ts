import { getPool } from "@/app/lib/db";
import type { TipoCotacao } from "@/app/lib/cotacoes-tipos";
import { isUuid } from "@/app/lib/orcamentos";

export interface NovaCotacao {
  tipo: TipoCotacao;
  item: string;
  fornecedor: string;
  quantidade: number;
  precoUnitario: number;
  link: string | null;
  observacoes: string | null;
  orcamentoId: string | null;
}

export interface Cotacao extends NovaCotacao {
  id: string;
  createdAt: Date;
  orcamentoNome: string | null;
}

interface CotacaoRow {
  id: string;
  created_at: Date;
  tipo: TipoCotacao;
  item: string;
  fornecedor: string;
  quantidade: number;
  preco_unitario: string;
  link: string | null;
  observacoes: string | null;
  orcamento_id: string | null;
  orcamento_nome: string | null;
}

export async function listCotacoes(): Promise<Cotacao[]> {
  const { rows } = await getPool().query<CotacaoRow>(
    `SELECT c.id, c.created_at, c.tipo, c.item, c.fornecedor, c.quantidade,
            c.preco_unitario, c.link, c.observacoes, c.orcamento_id,
            o.name AS orcamento_nome
     FROM cotacoes c
     LEFT JOIN orcamentos o ON o.id = c.orcamento_id
     ORDER BY c.created_at DESC
     LIMIT 500`,
  );

  return rows.map((row) => ({
    id: row.id,
    createdAt: row.created_at,
    tipo: row.tipo,
    item: row.item,
    fornecedor: row.fornecedor,
    quantidade: row.quantidade,
    precoUnitario: Number(row.preco_unitario),
    link: row.link,
    observacoes: row.observacoes,
    orcamentoId: row.orcamento_id,
    orcamentoNome: row.orcamento_nome,
  }));
}

export async function createCotacao(input: NovaCotacao): Promise<void> {
  await getPool().query(
    `INSERT INTO cotacoes
       (tipo, item, fornecedor, quantidade, preco_unitario, link, observacoes, orcamento_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      input.tipo,
      input.item,
      input.fornecedor,
      input.quantidade,
      input.precoUnitario,
      input.link,
      input.observacoes,
      input.orcamentoId,
    ],
  );
}

export async function deleteCotacao(id: string): Promise<void> {
  if (!isUuid(id)) return;
  await getPool().query(`DELETE FROM cotacoes WHERE id = $1`, [id]);
}

export async function listOrcamentosParaVinculo(): Promise<
  { id: string; name: string }[]
> {
  const { rows } = await getPool().query<{ id: string; name: string }>(
    `SELECT id, name FROM orcamentos
     WHERE status NOT IN ('concluido', 'cancelado')
     ORDER BY created_at DESC LIMIT 100`,
  );
  return rows;
}
