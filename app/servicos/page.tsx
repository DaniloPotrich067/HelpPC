
import {
  BsArrowRight,
  BsCheckCircle,
  BsChatDots,
  BsClipboardCheck,
  BsController,
  BsCpu,
  BsGeoAlt,
  BsLaptop,
  BsPrinter,
  BsSearch,
  BsShieldCheck,
  BsSpeedometer2,
  BsTools,
  BsWindows,
} from "@/app/components/icons";
import type { Metadata } from "next";
import Button from "@/app/components/Button";

export const metadata: Metadata = {
  title: "Formatação e manutenção de computadores",
  alternates: { canonical: "/servicos" },
  description:
    "Conheça os serviços de formatação, manutenção, limpeza, otimização e suporte técnico para computadores em Dourados-MS. Consulte valores e solicite orçamento.",
};

const telefone = "5567999001081";

function whatsapp(mensagem: string, origem: string) {
  const texto = `${mensagem}\n\nOrigem: site Help PC | ${origem}`;
  return `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;
}

const servicos = [
  {
    Icon: BsLaptop,
    nome: "Formatação de computadores",
    descricao: "Reinstalação e configuração do sistema operacional.",
    preco: "A partir de R$ 99,90",
    mensagem: "Olá! Quero um orçamento para formatação de computador.",
  },
  {
    Icon: BsSpeedometer2,
    nome: "Otimização de desempenho",
    descricao: "Análise e ajustes para melhorar o desempenho do computador.",
    preco: "Consulte o valor",
    mensagem: "Olá! Quero um orçamento para otimizar meu computador.",
  },
  {
    Icon: BsTools,
    nome: "Limpeza e manutenção",
    descricao: "Cuidados preventivos para computadores e notebooks.",
    preco: "Consulte o valor",
    mensagem: "Olá! Quero um orçamento para limpeza e manutenção.",
  },
  {
    Icon: BsWindows,
    nome: "Programas e Office",
    descricao: "Instalação e configuração conforme as licenças disponíveis.",
    preco: "Consulte o valor",
    mensagem: "Olá! Quero um orçamento para instalação de programas ou Office.",
  },
  {
    Icon: BsCpu,
    nome: "Upgrades de hardware",
    descricao: "Orientação para melhorias como SSD e memória RAM.",
    preco: "Consulte o valor",
    mensagem: "Olá! Quero avaliar um upgrade para meu computador.",
  },
  {
    Icon: BsPrinter,
    nome: "Impressoras",
    descricao: "Instalação, configuração e auxílio na resolução de problemas.",
    preco: "Consulte o valor",
    mensagem: "Olá! Preciso de ajuda com minha impressora.",
  },
  {
    Icon: BsController,
    nome: "Limpeza de consoles",
    descricao: "Limpeza e manutenção de consoles compatíveis.",
    preco: "Consulte o valor",
    mensagem: "Olá! Quero um orçamento para limpeza do meu console.",
  },
  {
    Icon: BsSearch,
    nome: "Diagnóstico técnico",
    descricao: "Identificação de problemas e orientação sobre soluções.",
    preco: "Consulte o valor",
    mensagem: "Olá! Quero um diagnóstico para meu equipamento.",
  },
];

const combos = [
  {
    nome: "PC em Dia",
    descricao: "Para cuidar do seu equipamento.",
    itens: ["Limpeza e manutenção", "Verificação do funcionamento"],
    mensagem: "Olá! Quero um orçamento para o combo PC em Dia.",
  },
  {
    nome: "PC Renovado",
    descricao: "Para quem enfrenta problemas de desempenho.",
    itens: ["Formatação e configuração", "Orientações para otimização"],
    mensagem: "Olá! Quero um orçamento para o combo PC Renovado.",
    destaque: true,
  },
  {
    nome: "Setup Completo",
    descricao: "Para deixar o computador pronto para usar.",
    itens: ["Configuração do computador", "Instalação de programas compatíveis"],
    mensagem: "Olá! Quero um orçamento para o combo Setup Completo.",
  },
];

export default function Servicos() {
  return (
    <main className="min-h-screen bg-help-pc-light text-slate-900">
      <section className="bg-help-pc-dark px-6 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-help-pc-primary-400/30 bg-help-pc-primary-400/10 px-4 py-2 text-sm font-semibold text-help-pc-primary-200">
            <BsGeoAlt aria-hidden="true" />
            Dourados-MS e região
          </span>

          <h1 className="mt-7 max-w-3xl text-4xl font-black leading-tight sm:text-6xl">
            Formatação e manutenção de computadores
            <span className="mt-2 block text-help-pc-primary-400">
              em Dourados-MS.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Manutenção, formatação, otimização e suporte técnico.
            Encontre o serviço adequado e solicite seu orçamento.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              href={whatsapp(
                "Olá! Quero conhecer os serviços e solicitar um orçamento.",
                "Topo dos serviços"
              )}
              className="gap-2 bg-help-pc-accent hover:bg-help-pc-accent-hover"
            >
              <BsChatDots aria-hidden="true" />
              Solicitar pelo WhatsApp
              <BsArrowRight aria-hidden="true" />
            </Button>

            <Button
              href="/contato"
              className="bg-white text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              Fazer orçamento pelo site
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-6 py-7">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-3">
          {[
            {
              Icon: BsChatDots,
              titulo: "Atendimento direto",
              descricao: "Converse com a Help PC pelo canal de sua preferência.",
            },
            {
              Icon: BsClipboardCheck,
              titulo: "Orçamento claro",
              descricao: "Consulte o escopo e o valor antes de contratar.",
            },
            {
              Icon: BsShieldCheck,
              titulo: "Soluções adequadas",
              descricao: "Serviços conforme a necessidade do equipamento.",
            },
          ].map(({ Icon, titulo, descricao }) => (
            <div key={titulo} className="flex items-start gap-4">
              <Icon className="mt-1 shrink-0 text-2xl text-help-pc-primary" aria-hidden="true" />
              <div>
                <h2 className="font-bold">{titulo}</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">{descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="precos" className="scroll-mt-8 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-bold uppercase tracking-widest text-help-pc-primary">
            Serviços e preços
          </p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            O que seu equipamento precisa?
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Consulte os valores e as condições. O orçamento final depende do
            serviço necessário e das condições do equipamento.
          </p>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {servicos.map(({ Icon, ...servico }) => (
              <article
                key={servico.nome}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-help-pc-primary-300 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-help-pc-primary-50 text-2xl text-help-pc-primary">
                  <Icon aria-hidden="true" />
                </div>

                <h3 className="mt-5 text-lg font-extrabold">{servico.nome}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                  {servico.descricao}
                </p>

                <div className="mt-6 border-t border-slate-100 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Investimento
                  </p>
                  <p className="mt-1 text-lg font-black text-help-pc-primary-hover">
                    {servico.preco}
                  </p>

                  <div className="mt-4 flex flex-col gap-2">
                    <Button
                      href={whatsapp(servico.mensagem, servico.nome)}
                      className="w-full gap-2 bg-help-pc-accent px-3 text-sm hover:bg-help-pc-accent-hover"
                    >
                      <BsChatDots aria-hidden="true" />
                      Pedir orçamento
                    </Button>
                    <Button
                      href="/contato"
                      className="w-full bg-slate-100 px-3 text-sm text-slate-800 hover:bg-slate-200"
                    >
                      Orçar pelo site
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 text-sm text-slate-500">
            Valores sujeitos à confirmação do serviço e do escopo do atendimento.
          </p>
        </div>
      </section>

      <section className="bg-help-pc-dark px-6 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-bold uppercase tracking-widest text-help-pc-accent-400">
            Combos Help PC
          </p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            Mais praticidade em um só atendimento.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            Conheça nossas sugestões de pacotes. Consulte a composição e o preço
            conforme a necessidade do seu equipamento.
          </p>

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {combos.map((combo) => (
              <article
                key={combo.nome}
                className={`flex flex-col rounded-2xl border p-6 ${
                  combo.destaque
                    ? "border-help-pc-accent-500 bg-white text-slate-900"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {combo.destaque && (
                  <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-help-pc-accent">
                    <BsCheckCircle aria-hidden="true" />
                    Em destaque
                  </span>
                )}

                <h3 className="mt-3 text-2xl font-black">{combo.nome}</h3>
                <p className={`mt-2 text-sm ${
                  combo.destaque ? "text-slate-600" : "text-slate-300"
                }`}>
                  {combo.descricao}
                </p>

                <ul className="my-6 flex-1 space-y-3 text-sm">
                  {combo.itens.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <BsCheckCircle className="mt-0.5 shrink-0 text-help-pc-primary-600" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className={`text-sm ${
                  combo.destaque ? "text-slate-500" : "text-slate-400"
                }`}>
                  Consulte o preço do pacote
                </p>

                <div className="mt-4 flex flex-col gap-2">
                  <Button
                    href={whatsapp(combo.mensagem, `Combo ${combo.nome}`)}
                    className="w-full gap-2 bg-help-pc-accent px-3 text-sm hover:bg-help-pc-accent-hover"
                  >
                    <BsChatDots aria-hidden="true" />
                    Quero esse combo
                    <BsArrowRight aria-hidden="true" />
                  </Button>
                  <Button
                    href="/contato"
                    className={`w-full px-3 text-sm ${
                      combo.destaque
                        ? "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
                        : "bg-white text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    Orçar pelo site
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-help-pc-primary px-6 py-12 text-center text-white sm:px-12">
          <BsTools className="mx-auto text-4xl text-help-pc-primary-200" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            Não sabe qual serviço precisa?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-help-pc-primary-100">
            Conte o que está acontecendo e escolha a forma mais prática de
            solicitar seu orçamento.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              href={whatsapp(
                "Olá! Não sei exatamente qual serviço preciso. Pode me orientar?",
                "CTA final dos serviços"
              )}
              className="gap-2 bg-help-pc-accent hover:bg-help-pc-accent-hover"
            >
              <BsChatDots aria-hidden="true" />
              Falar pelo WhatsApp
              <BsArrowRight aria-hidden="true" />
            </Button>
            <Button
              href="/contato"
              className="bg-white text-help-pc-primary-900 hover:bg-help-pc-primary-50 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              Preencher formulário
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
