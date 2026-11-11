import { NextResponse } from "next/server";
import { getClientIpHash } from "@/app/lib/admin-auth";
import { countRecentByIp, createOrcamento } from "@/app/lib/orcamentos";
import {
  EQUIPMENT,
  MAX_FILE_SIZE,
  MAX_LENGTHS,
  MAX_SERVICES,
  SERVICES,
  hasValidSignature,
  sanitizeFileName,
  validateAttachment,
} from "@/app/lib/validacao-orcamento";

export const runtime = "nodejs";

const MAX_BODY_SIZE = MAX_FILE_SIZE + 64 * 1024;
const MAX_SUBMISSIONS_PER_HOUR = 5;

function fail(message: string, status: number) {
  return NextResponse.json({ success: false, message }, { status });
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

function getText(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    if (!isSameOrigin(request)) {
      return fail("Requisição não permitida.", 403);
    }

    const contentLength = Number(request.headers.get("content-length"));
    if (!Number.isFinite(contentLength) || contentLength > MAX_BODY_SIZE) {
      return fail("Requisição muito grande.", 413);
    }

    const formData = await request.formData();

    const name = getText(formData, "name");
    const phone = getText(formData, "phone");
    const equipment = getText(formData, "equipment");
    const description = getText(formData, "description");
    const services = [
      ...new Set(
        formData
          .getAll("service")
          .filter((value): value is string => typeof value === "string")
          .map((value) => value.trim())
          .filter(Boolean),
      ),
    ];

    if (!name || !phone || services.length === 0 || !description) {
      return fail("Preencha os campos obrigatórios.", 400);
    }

    if (
      name.length < 2 ||
      phone.length < 8 ||
      description.length < 10 ||
      name.length > MAX_LENGTHS.name ||
      phone.length > MAX_LENGTHS.phone ||
      equipment.length > MAX_LENGTHS.equipment ||
      description.length > MAX_LENGTHS.description
    ) {
      return fail("Revise os campos: tamanho fora do permitido.", 400);
    }

    if (
      services.length > MAX_SERVICES ||
      !services.every((item) => SERVICES.includes(item)) ||
      (equipment && !EQUIPMENT.includes(equipment))
    ) {
      return fail("Opção inválida.", 400);
    }

    const fileValue = formData.get("file");
    let attachment:
      | { filename: string; mimeType: string; content: Buffer }
      | undefined;

    if (fileValue instanceof File && fileValue.size > 0) {
      const attachmentError = validateAttachment(fileValue);
      if (attachmentError) {
        return fail(attachmentError, 400);
      }

      const content = Buffer.from(await fileValue.arrayBuffer());

      if (!hasValidSignature(fileValue.type, content)) {
        return fail("Envie um JPG, PNG ou PDF válido.", 400);
      }

      attachment = {
        filename: sanitizeFileName(fileValue.name),
        mimeType: fileValue.type,
        content,
      };
    }

    const clientIpHash = await getClientIpHash();

    if ((await countRecentByIp(clientIpHash, 60)) >= MAX_SUBMISSIONS_PER_HOUR) {
      return fail("Muitas solicitações. Tente novamente mais tarde.", 429);
    }

    const id = await createOrcamento({
      name,
      phone,
      services,
      equipment,
      description,
      clientIpHash,
      attachment,
    });

    return NextResponse.json({ success: true, message: "Orçamento registrado.", id });
  } catch (error) {
    console.error(
      "Erro na rota de orçamentos:",
      error instanceof Error ? error.message : "Erro desconhecido",
    );

    return fail("Erro ao enviar o orçamento.", 500);
  }
}
