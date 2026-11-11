import { NextResponse } from "next/server";
import { isAuthenticated } from "@/app/lib/admin-auth";
import { getAnexo } from "@/app/lib/orcamentos";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthenticated())) {
    return new NextResponse(null, { status: 401 });
  }

  const { id } = await params;
  const anexo = await getAnexo(id);

  if (!anexo) {
    return new NextResponse(null, { status: 404 });
  }

  // Nome já sanitizado na gravação; o encode RFC 5987 evita quebra de header.
  const filename = encodeURIComponent(anexo.filename);

  return new NextResponse(new Uint8Array(anexo.content), {
    headers: {
      "Content-Type": anexo.mimeType,
      "Content-Length": String(anexo.content.length),
      "Content-Disposition": `attachment; filename*=UTF-8''${filename}`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
