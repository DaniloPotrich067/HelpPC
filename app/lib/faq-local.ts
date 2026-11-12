import {
  dadosComerciais,
  formatarPreco,
  servicos,
} from "@/app/lib/catalogo-comercial";

export interface PerguntaFrequente {
  pergunta: string;
  resposta: string;
}

function precoDoServico(slug: string): string {
  const servico = servicos.find((item) => item.slug === slug);
  if (!servico || servico.preco === null) {
    throw new Error(`Serviço sem preço fixo no catálogo: ${slug}`);
  }
  return formatarPreco(servico.preco);
}

const { cidade, estado } = dadosComerciais.local;
const { telefoneExibicao } = dadosComerciais.contato;

export const perguntasFrequentes: readonly PerguntaFrequente[] = [
  {
    pergunta: `A Help PC atende em ${cidade}-${estado}?`,
    resposta: `Sim. A Help PC é uma assistência técnica de informática de ${cidade}-${estado} e atende a cidade e a região, conforme disponibilidade. Para combinar o atendimento, chame no WhatsApp ${telefoneExibicao} ou preencha o formulário de orçamento.`,
  },
  {
    pergunta: `Quanto custa formatar um computador em ${cidade}?`,
    resposta: `Na Help PC, a Formatação Básica custa ${precoDoServico("formatacao-basica")}, a Formatação com Backup custa ${precoDoServico("formatacao-com-backup")} e a Formatação Premium custa ${precoDoServico("formatacao-premium")}. Confirme o escopo antes de contratar.`,
  },
  {
    pergunta: `Quanto custa a manutenção de um computador ou notebook em ${cidade}?`,
    resposta: `A Manutenção Básica custa ${precoDoServico("manutencao-basica")}, a Completa custa ${precoDoServico("manutencao-completa")} e a Premium custa ${precoDoServico("manutencao-premium")}. A página de serviços lista o que cada opção inclui.`,
  },
  {
    pergunta: "Meu computador está lento. O que fazer?",
    resposta: `Lentidão pode vir de sujeira interna, sistema desatualizado, excesso de programas ou falta de memória. Descreva o problema à Help PC e indicamos manutenção, formatação, otimização de desempenho ou upgrade de hardware, conforme o caso.`,
  },
  {
    pergunta: "A Help PC atende notebooks, impressoras e consoles?",
    resposta: `Sim. Além de computadores, a Help PC atende notebooks, instalação e suporte de impressoras e limpeza e manutenção de consoles compatíveis.`,
  },
  {
    pergunta: "Como solicito um orçamento?",
    resposta: `Chame no WhatsApp ${telefoneExibicao} ou use o formulário da página de contato. Você descreve o problema, alinhamos o serviço e o valor, e só então o equipamento é trabalhado.`,
  },
];

export function gerarJsonLdFaq(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: perguntasFrequentes.map(({ pergunta, resposta }) => ({
      "@type": "Question",
      name: pergunta,
      acceptedAnswer: { "@type": "Answer", text: resposta },
    })),
  };
}
