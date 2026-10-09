
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

import { combos, servicos } from './catalogo-comercial';

export const SERVICES = [
  ...servicos.filter((servico) => servico.ativo).map((servico) => servico.nome),
  ...combos.filter((combo) => combo.ativo).map((combo) => combo.nome),
  'Outro serviço',
] as const;

export const EQUIPMENT = [
  'Computador desktop',
  'Notebook',
  'Impressora',
  'Console',
  'Outro',
] as const;

const ALLOWED_FILES: Record<string, string[]> = {
  'image/jpeg': ['jpg', 'jpeg'],
  'image/png': ['png'],
  'application/pdf': ['pdf'],
};

export function validateAttachment(file: File): string | null {
  if (file.size === 0) {
    return 'O arquivo está vazio.';
  }

  if (file.size > MAX_FILE_SIZE) {
    return 'O arquivo deve ter no máximo 5 MB.';
  }

  const extension = file.name.split('.').pop()?.toLowerCase();
  const allowedExtensions = ALLOWED_FILES[file.type];

  if (!extension || !allowedExtensions?.includes(extension)) {
    return 'Envie um arquivo JPG, PNG ou PDF válido.';
  }

  return null;
}
