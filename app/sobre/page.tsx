
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import {
  BsArrowRight,
  BsChatDots,
  BsCheckCircle,
  BsClipboardCheck,
  BsController,
  BsCpu,
  BsGeoAlt,
  BsLaptop,
  BsPrinter,
  BsSearch,
  BsShieldCheck,
  BsTools,
  BsWindows,
} from "@/app/components/icons";
import logo from "@/public/HelpIcon.svg";
import Button from "@/app/components/Button";

export const metadata: Metadata = {
  title: "Sobre a assistência técnica Help PC",
  alternates: { canonical: "/sobre" },
  description:
    "Conheça a Help PC, assistência técnica de informática em Dourados-MS, e veja como funciona nosso atendimento para computadores e notebooks.",
};

const whatsapp =
  "https://wa.me/5567999001081?text=" +
  encodeURIComponent(
    "Olá! Conheci a Help PC pelo site e gostaria de solicitar um orçamento.\n\nOrigem: página Sobre"
  );

const principios = [
  {
    Icon: BsShieldCheck,
    titulo: "Transparência",
    descricao: "Explicar o serviço e alinhar o orçamento antes da execução.",
  },
  {
    Icon: BsTools,
    titulo: "Soluções adequadas",
    descricao: "Considerar o problema e as necessidades de cada equipamento.",
  },
  {
    Icon: BsChatDots,
    titulo: "Comunicação clara",
    descricao: "Facilitar o contato e explicar as opções sem complicação.",
  },
  {
    Icon: BsGeoAlt,
    titulo: "Presença local",
    descricao: "Atendimento em Dourados-MS e região, conforme disponibilidade.",
  },
];

const servicos = [
  {
    Icon: BsLaptop,
    titulo: "Computadores e notebooks",
    descricao: "Formatação, manutenção e otimização de desempenho.",
  },
  {
    Icon: BsWindows,
    titulo: "Programas e configurações",
    descricao: "Instalação de softwares e configuração do Office.",
  },
  {
    Icon: BsCpu,
    titulo: "Upgrades",
    descricao: "Orientação para melhorias de hardware compatíveis.",
  },
  {
    Icon: BsPrinter,
    titulo: "Impressoras",
    descricao: "Instalação, configuração e suporte.",
  },
  {
    Icon: BsController,
    titulo: "Consoles",
    descricao: "Serviços de limpeza e manutenção compatíveis.",
  },
  {
    Icon: BsSearch,
    titulo: "Diagnóstico",
    descricao: "Identificação de problemas e orientação técnica.",
  },
];

export default function Sobre() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="bg-help-pc-dark px-6 py-20 text-white sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-help-pc-primary-400/30 bg-help-pc-primary-400/10 px-4 py-2 text-sm font-semibold text-help-pc-primary-200">
              <BsShieldCheck aria-hidden="true" />
              Conheça a Help PC
            </span>

            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight sm:text-6xl">
              Tecnologia sem complicação.
              <span className="mt-3 block text-help-pc-primary-400">
                Esse é o nosso propósito.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Uma proposta simples: tornar a assistência técnica mais acessível,
              com comunicação clara, soluções práticas e atenção às necessidades
              de cada equipamento.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={whatsapp} className="gap-2 bg-help-pc-accent hover:bg-help-pc-accent-hover">
                <BsChatDots aria-hidden="true" />
                Falar com a Help PC
                <BsArrowRight aria-hidden="true" />
              </Button>
              <Button href="/contato" className="bg-white text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700">
                Solicitar pelo site
              </Button>
            </div>
          </div>

          <div className="mx-auto rounded-3xl border border-white/10 bg-white/[0.06] p-8">
            <Image
              src={logo}
              alt="Logotipo da Help PC"
              width={180}
              height={180}
              priority
              className="h-40 w-40 object-contain sm:h-48 sm:w-48"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-start">
          <div>
            <p className="font-bold uppercase tracking-widest text-help-pc-primary">
              Nossa proposta
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Soluções de informática para o dia a dia.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              A Help PC atua em Dourados-MS e região, oferecendo serviços voltados
              à manutenção e configuração de computadores, notebooks e outros
              equipamentos.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Problemas tecnológicos podem atrapalhar o trabalho, os estudos e
              a rotina. Por isso, buscamos entender cada situação, explicar as
              alternativas disponíveis e orientar o cliente antes da contratação.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Nosso objetivo é oferecer atendimento direto, com informações
              claras sobre os serviços, os valores e as condições de execução.
            </p>

            <Link
              href="/servicos"
              className="mt-6 inline-flex items-center gap-2 font-bold text-help-pc-primary hover:underline"
            >
              Conhecer serviços e preços <BsArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="rounded-3xl bg-help-pc-light p-7 sm:p-9">
            <h2 className="text-2xl font-black">
              O que orienta nosso trabalho
            </h2>

            <div className="mt-7 space-y-6">
              {principios.map(({ Icon, titulo, descricao }) => (
                <div key={titulo} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-help-pc-primary-100 text-xl text-help-pc-primary">
                    <Icon aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-extrabold">{titulo}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {descricao}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-help-pc-light px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-bold uppercase tracking-widest text-help-pc-primary">
            O que fazemos
          </p>

          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            Seu equipamento precisa de atenção?
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Conheça nossas categorias de serviços e encontre a opção adequada
            para sua necessidade.
          </p>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {servicos.map(({ Icon, titulo, descricao }) => (
              <article
                key={titulo}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-help-pc-primary-300 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-help-pc-primary-50 text-2xl text-help-pc-primary">
                  <Icon aria-hidden="true" />
                </div>

                <h3 className="mt-4 font-extrabold">{titulo}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {descricao}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-help-pc-primary px-6 py-12 text-center text-white sm:px-12">
          <BsCheckCircle className="mx-auto text-4xl text-help-pc-primary-200" aria-hidden="true" />

          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            Vamos encontrar uma solução para seu equipamento?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-help-pc-primary-100">
            Entre em contato, explique o que está acontecendo e consulte as
            opções de atendimento.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={whatsapp} className="gap-2 bg-help-pc-accent hover:bg-help-pc-accent-hover">
              <BsChatDots aria-hidden="true" />
              Solicitar pelo WhatsApp
              <BsArrowRight aria-hidden="true" />
            </Button>
            <Button href="/contato" className="bg-white text-help-pc-primary-900 hover:bg-help-pc-primary-50 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700">
              <BsClipboardCheck className="mr-2" aria-hidden="true" />
              Fazer orçamento pelo site
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
