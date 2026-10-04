
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES: Record<string, string[]> = {
  'image/jpeg': ['jpg', 'jpeg'],
  'image/png': ['png'],
  'application/pdf': ['pdf'],
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = getText(formData, 'name');
    const phone = getText(formData, 'phone');
    const service = getText(formData, 'service');
    const equipment = getText(formData, 'equipment');
    const description = getText(formData, 'description');

    if (!name || !phone || !service || !description) {
      return NextResponse.json(
        { success: false, message: 'Preencha os campos obrigatórios.' },
        { status: 400 }
      );
    }

    if (
      name.length > 100 ||
      phone.length > 25 ||
      service.length > 100 ||
      equipment.length > 100 ||
      description.length > 2000
    ) {
      return NextResponse.json(
        { success: false, message: 'Um campo ultrapassou o limite permitido.' },
        { status: 400 }
      );
    }

    const fileValue = formData.get('file');
    let file:
      | { name: string; mimeType: string; base64: string }
      | undefined;

    if (fileValue instanceof File && fileValue.size > 0) {
      if (fileValue.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { success: false, message: 'O arquivo deve ter no máximo 5 MB.' },
          { status: 400 }
        );
      }

      const allowedExtensions = ALLOWED_TYPES[fileValue.type];
      const extension = fileValue.name.split('.').pop()?.toLowerCase();

      if (!allowedExtensions || !extension || !allowedExtensions.includes(extension)) {
        return NextResponse.json(
          { success: false, message: 'Envie um JPG, PNG ou PDF válido.' },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await fileValue.arrayBuffer());

      file = {
        name: fileValue.name,
        mimeType: fileValue.type,
        base64: buffer.toString('base64'),
      };
    }

    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    const secret = process.env.HELPPC_API_SECRET;

    if (!scriptUrl || !secret) {
      console.error('Variáveis do Apps Script ausentes.');

      return NextResponse.json(
        { success: false, message: 'Integração indisponível.' },
        { status: 500 }
      );
    }

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret,
        name,
        phone,
        service,
        equipment,
        description,
        ...(file ? { file } : {}),
      }),
      cache: 'no-store',
      redirect: 'follow',
    });

    const result = await response.json();

    if (!response.ok || result.success !== true) {
      console.error('Falha no Apps Script:', result);

      return NextResponse.json(
        {
          success: false,
          message: 'Não foi possível registrar o orçamento.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Orçamento registrado.',
      id: result.id,
    });

  } catch (error) {
    console.error('Erro na rota de orçamentos:', error);

    return NextResponse.json(
      { success: false, message: 'Erro ao enviar o orçamento.' },
      { status: 500 }
    );
  }
}

function getText(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}