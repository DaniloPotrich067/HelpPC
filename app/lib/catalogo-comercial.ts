import type { IconType } from "react-icons";
import {
  BsChatDots,
  BsController,
  BsCpu,
  BsLaptop,
  BsPrinter,
  BsSearch,
  BsShieldCheck,
  BsSpeedometer2,
  BsTools,
  BsWindows,
} from "@/app/components/icons";

export type CategoriaServico =
  | "manutencao"
  | "formatacao"
  | "software"
  | "hardware"
  | "perifericos"
  | "consoles"
  | "diagnostico";

export type TipoPreco = "fixo" | "a partir de" | "sob consulta";

export interface ServicoComercial {
  id: string;
  slug: string;
  categoria: CategoriaServico;
  nome: string;
  descricao: string;
  preco: number | null;
  tipoPreco: TipoPreco;
  itensInclusos: readonly string[];
  incluiServicos?: readonly string[];
  mensagemWhatsApp: string;
  ativo: boolean;
  destaque?: boolean;
  icone: IconType;
  aviso?: string;
}

export interface ComboComercial {
  id: string;
  slug: string;
  nome: string;
  descricao: string;
  preco: number;
  servicosIncluidos: readonly string[];
  itensAdicionais: readonly string[];
  etiqueta?: string;
  destaque: boolean;
  mensagemWhatsApp: string;
  ativo: boolean;
}

export interface DiferencialComercial {
  id: string;
  titulo: string;
  descricao: string;
  icone: IconType;
  prioridade: number;
}

export const dadosComerciais = {
  contato: {
    telefoneE164: "+5567999001081",
    telefoneWhatsApp: "5567999001081",
    telefoneExibicao: "(67) 99900-1081",
    instagram: "https://www.instagram.com/helppc_067/",
    facebook: "https://www.facebook.com/profile.php?id=61593173941226",
  },
  local: {
    cidade: "Dourados",
    estado: "MS",
    regiaoExibicao: "Dourados-MS e região",
  },
  nome: "Help PC",
  servicosDestaqueHome: [
    "manutencao-completa",
    "formatacao-basica",
    "formatacao-com-backup",
  ],
  combosDestaqueHome: ["pc-renovado", "pc-completo", "pc-turbinado"],
} as const;

export const servicos: readonly ServicoComercial[] = [
  {
    id: "manutencao-basica",
    slug: "manutencao-basica",
    categoria: "manutencao",
    nome: "Manutenção Básica",
    descricao: "Limpeza e teste geral do equipamento.",
    preco: 99,
    tipoPreco: "fixo",
    itensInclusos: [
      "Limpeza interna do gabinete",
      "Limpeza das ventoinhas",
      "Organização básica dos cabos",
      "Teste geral do equipamento",
    ],
    mensagemWhatsApp: "Olá! Quero um orçamento para a Manutenção Básica.",
    ativo: true,
    icone: BsTools,
  },
  {
    id: "manutencao-completa",
    slug: "manutencao-completa",
    categoria: "manutencao",
    nome: "Manutenção Completa",
    descricao: "Manutenção básica com limpeza detalhada e troca da pasta térmica do processador.",
    preco: 149,
    tipoPreco: "fixo",
    incluiServicos: ["manutencao-basica"],
    itensInclusos: [
      "Limpeza detalhada",
      "Organização dos cabos",
      "Troca da pasta térmica do processador",
      "Teste de temperaturas",
    ],
    mensagemWhatsApp: "Olá! Quero um orçamento para a Manutenção Completa.",
    ativo: true,
    icone: BsTools,
    destaque: true,
  },
  {
    id: "manutencao-premium",
    slug: "manutencao-premium",
    categoria: "manutencao",
    nome: "Manutenção Premium",
    descricao: "Manutenção completa com cuidados adicionais para a placa-mãe e a placa de vídeo.",
    preco: 179,
    tipoPreco: "fixo",
    incluiServicos: ["manutencao-completa"],
    itensInclusos: [
      "Limpeza detalhada da placa-mãe",
      "Limpeza da placa de vídeo",
      "Troca da pasta térmica da GPU",
      "Teste completo de temperaturas e desempenho",
    ],
    mensagemWhatsApp: "Olá! Quero um orçamento para a Manutenção Premium.",
    ativo: true,
    icone: BsCpu,
  },
  {
    id: "formatacao-basica",
    slug: "formatacao-basica",
    categoria: "formatacao",
    nome: "Formatação Básica",
    descricao: "Instalação e configuração inicial do sistema.",
    preco: 99,
    tipoPreco: "fixo",
    itensInclusos: [
      "Formatação do sistema",
      "Instalação de drivers essenciais",
      "Atualizações do Windows",
      "Configuração inicial",
    ],
    mensagemWhatsApp: "Olá! Quero um orçamento para a Formatação Básica.",
    ativo: true,
    icone: BsLaptop,
  },
  {
    id: "formatacao-com-backup",
    slug: "formatacao-com-backup",
    categoria: "formatacao",
    nome: "Formatação com Backup",
    descricao: "Formatação básica com backup e restauração dos arquivos pessoais.",
    preco: 119,
    tipoPreco: "fixo",
    incluiServicos: ["formatacao-basica"],
    itensInclusos: [
      "Backup dos arquivos pessoais",
      "Restauração dos arquivos após a formatação",
    ],
    mensagemWhatsApp: "Olá! Quero um orçamento para a Formatação com Backup.",
    ativo: true,
    icone: BsLaptop,
    destaque: true,
  },
  {
    id: "formatacao-premium",
    slug: "formatacao-premium",
    categoria: "formatacao",
    nome: "Formatação Premium",
    descricao: "Formatação com backup, programas essenciais e ajustes do Windows.",
    preco: 149,
    tipoPreco: "fixo",
    incluiServicos: ["formatacao-com-backup"],
    itensInclusos: [
      "Instalação de programas essenciais",
      "Otimização do Windows",
      "Configurações de desempenho",
      "Organização básica do sistema",
    ],
    mensagemWhatsApp: "Olá! Quero um orçamento para a Formatação Premium.",
    ativo: true,
    icone: BsSpeedometer2,
  },
  {
    id: "instalacao-programas",
    slug: "instalacao-programas",
    categoria: "software",
    nome: "Programas e softwares",
    descricao: "Instalação e configuração de programas conforme a necessidade do equipamento.",
    preco: null,
    tipoPreco: "sob consulta",
    itensInclusos: [],
    mensagemWhatsApp: "Olá! Quero um orçamento para instalação de programas.",
    ativo: true,
    icone: BsWindows,
  },
  {
    id: "office-vitalicio",
    slug: "office-vitalicio",
    categoria: "software",
    nome: "Office vitalício",
    descricao: "Instalação e configuração do Office original.",
    preco: 100,
    tipoPreco: "fixo",
    itensInclusos: [
      "Instalação e configuração",
      "Word, Excel, PowerPoint e demais aplicativos",
      "Atualizações de segurança",
    ],
    mensagemWhatsApp: "Olá! Quero informações e orçamento para o Office vitalício.",
    ativo: true,
    icone: BsWindows,
    aviso: "Office original. Confirme a modalidade e as condições da licença antes da contratação.",
  },
  {
    id: "otimizacao-desempenho",
    slug: "otimizacao-desempenho",
    categoria: "manutencao",
    nome: "Otimização de desempenho",
    descricao: "Análise e ajustes para melhorar o desempenho do computador.",
    preco: null,
    tipoPreco: "sob consulta",
    itensInclusos: [],
    mensagemWhatsApp: "Olá! Quero um orçamento para otimizar meu computador.",
    ativo: true,
    icone: BsSpeedometer2,
  },
  {
    id: "upgrade-hardware",
    slug: "upgrade-hardware",
    categoria: "hardware",
    nome: "Upgrades de hardware",
    descricao: "Orientação para melhorias como SSD e memória RAM.",
    preco: null,
    tipoPreco: "sob consulta",
    itensInclusos: [],
    mensagemWhatsApp: "Olá! Quero avaliar um upgrade para meu computador.",
    ativo: true,
    icone: BsCpu,
  },
  {
    id: "suporte-impressoras",
    slug: "suporte-impressoras",
    categoria: "perifericos",
    nome: "Impressoras",
    descricao: "Instalação, configuração e auxílio na resolução de problemas.",
    preco: null,
    tipoPreco: "sob consulta",
    itensInclusos: [],
    mensagemWhatsApp: "Olá! Preciso de ajuda com minha impressora.",
    ativo: true,
    icone: BsPrinter,
  },
  {
    id: "limpeza-consoles",
    slug: "limpeza-consoles",
    categoria: "consoles",
    nome: "Limpeza de consoles",
    descricao: "Limpeza e manutenção de consoles compatíveis.",
    preco: null,
    tipoPreco: "sob consulta",
    itensInclusos: [],
    mensagemWhatsApp: "Olá! Quero um orçamento para limpeza do meu console.",
    ativo: true,
    icone: BsController,
  },
  {
    id: "diagnostico-tecnico",
    slug: "diagnostico-tecnico",
    categoria: "diagnostico",
    nome: "Diagnóstico técnico",
    descricao: "Identificação de problemas e orientação sobre soluções.",
    preco: null,
    tipoPreco: "sob consulta",
    itensInclusos: [],
    mensagemWhatsApp: "Olá! Quero um diagnóstico para meu equipamento.",
    ativo: true,
    icone: BsSearch,
  },
];

const servicosPorId = new Map(servicos.map((servico) => [servico.id, servico]));

export const combos: readonly ComboComercial[] = [
  {
    id: "pc-renovado",
    slug: "pc-renovado",
    nome: "PC Renovado",
    descricao: "Manutenção, formatação e configuração para renovar o computador.",
    preco: 219,
    servicosIncluidos: ["manutencao-completa", "formatacao-basica", "office-vitalicio"],
    itensAdicionais: ["Drivers", "Otimização do Windows"],
    destaque: false,
    mensagemWhatsApp: "Olá! Quero um orçamento para o combo PC Renovado.",
    ativo: true,
  },
  {
    id: "pc-completo",
    slug: "pc-completo",
    nome: "PC Completo",
    descricao: "Manutenção premium e formatação com backup em um só pacote.",
    preco: 269,
    servicosIncluidos: ["manutencao-premium", "formatacao-com-backup", "office-vitalicio"],
    itensAdicionais: ["Drivers", "Otimização do Windows"],
    etiqueta: "Mais vendido",
    destaque: true,
    mensagemWhatsApp: "Olá! Quero um orçamento para o combo PC Completo.",
    ativo: true,
  },
  {
    id: "pc-turbinado",
    slug: "pc-turbinado",
    nome: "PC Turbinado",
    descricao: "Manutenção premium e formatação premium com backup dos arquivos.",
    preco: 319,
    servicosIncluidos: ["manutencao-premium", "formatacao-premium", "office-vitalicio"],
    itensAdicionais: ["Backup dos arquivos", "Drivers", "Otimização do Windows"],
    destaque: false,
    mensagemWhatsApp: "Olá! Quero um orçamento para o combo PC Turbinado.",
    ativo: true,
  },
];

export const servicosDestaqueHome = dadosComerciais.servicosDestaqueHome.flatMap(
  (id) => {
    const servico = servicosPorId.get(id);
    return servico?.ativo ? [servico] : [];
  },
);

export const combosDestaqueHome = dadosComerciais.combosDestaqueHome.flatMap(
  (id) => {
    const combo = combos.find((item) => item.id === id);
    return combo?.ativo ? [combo] : [];
  },
);

export const diferenciais: readonly DiferencialComercial[] = [
  {
    id: "atendimento-direto",
    titulo: "Atendimento direto",
    descricao: "Converse com a Help PC pelo WhatsApp ou pelo formulário do site.",
    icone: BsChatDots,
    prioridade: 1,
  },
  {
    id: "escopo-transparente",
    titulo: "Escopo transparente",
    descricao: "Consulte o que está incluído e o valor antes de contratar.",
    icone: BsShieldCheck,
    prioridade: 2,
  },
  {
    id: "orientacao",
    titulo: "Orientação adequada",
    descricao: "Entenda as opções de atendimento conforme a necessidade do equipamento.",
    icone: BsSearch,
    prioridade: 3,
  },
];

export const categoriasServicos: readonly {
  id: CategoriaServico;
  titulo: string;
  descricao: string;
}[] = [
  { id: "manutencao", titulo: "Manutenção", descricao: "Cuidados e ajustes para o computador." },
  { id: "formatacao", titulo: "Formatação", descricao: "Opções de instalação e configuração do sistema." },
  { id: "software", titulo: "Software e Office", descricao: "Instalação e configuração de programas." },
  { id: "hardware", titulo: "Hardware", descricao: "Upgrades e melhorias para o equipamento." },
  { id: "perifericos", titulo: "Impressoras", descricao: "Instalação, configuração e suporte." },
  { id: "consoles", titulo: "Consoles", descricao: "Limpeza e manutenção de consoles compatíveis." },
  { id: "diagnostico", titulo: "Diagnóstico", descricao: "Identificação de problemas e orientação técnica." },
];

export interface OpcaoOrcamento {
  grupo: string;
  valor: string;
  rotulo: string;
}

export function gerarOpcoesOrcamento(): OpcaoOrcamento[] {
  const opcoesServicos = categoriasServicos.flatMap((categoria) =>
    servicos
      .filter((servico) => servico.ativo && servico.categoria === categoria.id)
      .map((servico) => {
        const preco = servico.preco === null
          ? "Sob consulta"
          : `${servico.tipoPreco === "a partir de" ? "A partir de " : ""}${formatarPreco(servico.preco)}`;
        const rotulo = `${servico.nome} — ${preco}`;
        return { grupo: categoria.titulo, valor: rotulo, rotulo };
      }),
  );

  const opcoesCombos = combos
    .filter((combo) => combo.ativo)
    .map((combo) => {
      const rotulo = `${combo.nome} — ${formatarPreco(combo.preco)}`;
      return {
        grupo: "Combos",
        valor: rotulo,
        rotulo: combo.etiqueta ? `${combo.etiqueta}: ${rotulo}` : rotulo,
      };
    });

  return [
    ...opcoesServicos,
    ...opcoesCombos,
    { grupo: "Outros", valor: "Outro serviço — Sob consulta", rotulo: "Outro serviço — Sob consulta" },
  ];
}

export function itensInclusosDoServico(servico: ServicoComercial): string[] {
  const visitar = (item: ServicoComercial, caminho: Set<string>): string[] => {
    if (caminho.has(item.id)) return [];
    const proximoCaminho = new Set(caminho).add(item.id);
    const herdados = (item.incluiServicos ?? []).flatMap((id) => {
      const servicoIncluido = servicosPorId.get(id);
      return servicoIncluido ? visitar(servicoIncluido, proximoCaminho) : [];
    });
    return [...herdados, ...item.itensInclusos];
  };

  return [...new Set(visitar(servico, new Set()))];
}

export function itensInclusosDoCombo(combo: ComboComercial): string[] {
  const nomesServicos = combo.servicosIncluidos.flatMap((id) => {
    const servico = servicosPorId.get(id);
    return servico ? [servico.nome] : [];
  });
  return [...nomesServicos, ...combo.itensAdicionais];
}

export function gerarLinkWhatsApp(mensagem: string, origem: string): string {
  const texto = `${mensagem}\n\nOrigem: site Help PC | ${origem}`;
  return `https://wa.me/${dadosComerciais.contato.telefoneWhatsApp}?text=${encodeURIComponent(texto)}`;
}

export function formatarPreco(valor: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}
