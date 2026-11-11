import { gerarOpcoesOrcamento } from "./catalogo-comercial";

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const MAX_LENGTHS = {
  name: 100,
  phone: 25,
  service: 500,
  equipment: 100,
  description: 2000,
} as const;

export const MAX_SERVICES = 5;
export const SERVICE_SEPARATOR = "; ";

/** Valores aceitos = mesmos valores renderizados no formulário. */
export const SERVICES: readonly string[] = gerarOpcoesOrcamento().map(
  (opcao) => opcao.valor,
);

export const EQUIPMENT: readonly string[] = [
  "Computador desktop",
  "Notebook",
  "Impressora",
  "Console",
  "Outro",
];

const ALLOWED_FILES: Record<string, string[]> = {
  "image/jpeg": ["jpg", "jpeg"],
  "image/png": ["png"],
  "application/pdf": ["pdf"],
};

const SIGNATURES: Record<string, number[]> = {
  "image/jpeg": [0xff, 0xd8, 0xff],
  "image/png": [0x89, 0x50, 0x4e, 0x47],
  "application/pdf": [0x25, 0x50, 0x44, 0x46],
};

export function validateAttachment(file: File): string | null {
  if (file.size === 0) {
    return "O arquivo está vazio.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "O arquivo deve ter no máximo 5 MB.";
  }

  const extension = file.name.split(".").pop()?.toLowerCase();
  const allowedExtensions = ALLOWED_FILES[file.type];

  if (!extension || !allowedExtensions?.includes(extension)) {
    return "Envie um arquivo JPG, PNG ou PDF válido.";
  }

  return null;
}

/** Confere os magic bytes: o MIME enviado pelo cliente não é confiável. */
export function hasValidSignature(mimeType: string, bytes: Uint8Array): boolean {
  const signature = SIGNATURES[mimeType];
  return !!signature && signature.every((byte, i) => bytes[i] === byte);
}

/** Remove caracteres de controle/separadores de caminho do nome do arquivo. */
export function sanitizeFileName(name: string): string {
  const clean = name
    .replace(/[\u0000-\u001f\u007f/\\]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100);
  return clean || "anexo";
}
