export const TIPOS_COTACAO = [
  { value: "peca", label: "Peça" },
  { value: "ferramenta", label: "Ferramenta" },
] as const;

export type TipoCotacao = (typeof TIPOS_COTACAO)[number]["value"];

export function isTipoCotacao(value: unknown): value is TipoCotacao {
  return TIPOS_COTACAO.some((tipo) => tipo.value === value);
}

export const COTACAO_LIMITES = {
  item: 150,
  fornecedor: 100,
  link: 500,
  observacoes: 1000,
} as const;
