
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import {
  BsArrowRight,
  BsChatDots,
  BsClipboardCheck,
  BsController,
  BsGeoAlt,
  BsLaptop,
  BsShieldCheck,
  BsSpeedometer2,
  BsTools,
} from "@/app/components/icons";
import Button from "@/app/components/Button";
import NavBar from "@/app/components/NavBar";
import logo from "@/public/HelpIcon.svg";

export const metadata: Metadata = {
  title: "Assistência técnica e formatação de computadores",
  alternates: { canonical: "/" },
  description:
    "Assistência técnica em Dourados-MS para computadores e notebooks: formatação, manutenção, otimização e diagnóstico. Fale com a Help PC e peça um orçamento.",
};

const whatsapp =
  "https://wa.me/5567999001081?text=" +
  encodeURIComponent(
    "Olá! Vim pelo site da Help PC e gostaria de solicitar um orçamento.\n\nOrigem: página inicial"
  );

const destaques = [
  {
    Icon: BsLaptop,
    titulo: "Formatação",
    descricao: "Configuração do sistema operacional para preparar seu computador para uso.",
  },
  {
    Icon: BsSpeedometer2,
    titulo: "PC lento?",
    descricao: "Análise e ajustes para melhorar o desempenho do equipamento.",
  },
  {
    Icon: BsTools,
    titulo: "Limpeza e manutenção",
    descricao: "Cuidados preventivos para computadores e notebooks.",
  },
  {
    Icon: BsController,
    titulo: "Limpeza de consoles",
    descricao: "Serviços de limpeza e manutenção para consoles compatíveis.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-help-pc-dark dark:text-slate-100">
      <NavBar />

      <section className="relative isolate overflow-hidden bg-help-pc-dark px-6 py-20 text-white sm:py-28 lg:py-32">
        <div className="pointer-events-none absolute -right-24 top-0 -z-10 h-96 w-96 rounded-full bg-help-pc-primary-600/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 -z-10 h-80 w-80 rounded-full bg-help-pc-accent/20 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-help-pc-primary-400/30 bg-help-pc-primary-400/10 px-4 py-2 text-sm font-semibold text-help-pc-primary-200">
              <BsGeoAlt aria-hidden="true" />
              Assistência técnica em Dourados-MS
            </span>

            <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Assistência técnica
              <span className="block text-help-pc-primary-400">
                de computadores em Dourados.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Computador lento, problemas no sistema ou precisando de manutenção?
              A Help PC oferece soluções práticas para você voltar a usar seu
              equipamento com mais tranquilidade.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={whatsapp} className="gap-2 bg-help-pc-accent hover:bg-help-pc-accent-hover">
                <BsChatDots aria-hidden="true" />
                Solicitar orçamento
                <BsArrowRight aria-hidden="true" />
              </Button>
              <Button
                href="/contato"
                className="bg-white text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                Orçar pelo site
              </Button>
            </div>

            <p className="mt-5 text-sm text-slate-400">
              Atendimento direto pelo WhatsApp ou formulário do site.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rounded-[2rem] bg-help-pc-primary-600/20 blur-2xl" />
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl sm:p-10">
              <Image
                src={logo}
                alt="Help PC — tecnologia sem complicação"
                width={180}
                height={180}
                className="mx-auto h-36 w-36 object-contain sm:h-44 sm:w-44"
              />

              <div className="mt-6 text-center">
                <h2 className="text-2xl font-black">
                  Tecnologia sem complicação.
                </h2>
                <p className="mt-3 leading-7 text-slate-300">
                  Soluções para computadores, notebooks, impressoras e consoles.
                </p>
              </div>

              <div className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-help-pc-primary-500/10 px-4 py-3 text-sm font-semibold text-help-pc-primary-200">
                <BsGeoAlt aria-hidden="true" />
                Dourados-MS e região
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="font-bold uppercase tracking-widest text-help-pc-primary">
                Nossos serviços
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                O que seu equipamento precisa?
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Encontre o serviço adequado e consulte os preços antes de contratar.
              </p>
            </div>
            <Link
              href="/servicos"
              className="inline-flex items-center gap-2 font-bold text-help-pc-primary hover:text-help-pc-primary-900"
            >
              Ver todos os serviços <BsArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destaques.map(({ Icon, titulo, descricao }) => (
              <article
                key={titulo}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-help-pc-primary-300 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-help-pc-primary-50 text-2xl text-help-pc-primary">
                  <Icon aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-extrabold">{titulo}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{descricao}</p>
                <Link
                  href="/servicos"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-help-pc-primary hover:underline"
                >
                  Saiba mais <BsArrowRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 sm:pb-20">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 rounded-3xl bg-help-pc-accent p-7 text-white sm:p-10 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wider">
              Preço de entrada
            </span>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Serviços a partir de R$ 99,90.
            </h2>
            <p className="mt-3 leading-7 text-help-pc-accent-50">
              Consulte os serviços contemplados, os valores e as condições
              antes de contratar.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3">
            <Button
              href="/servicos#precos"
              className="gap-2 bg-white text-help-pc-accent hover:bg-help-pc-accent-50 dark:bg-slate-800 dark:text-help-pc-accent-300 dark:hover:bg-slate-700"
            >
              Conferir preços <BsArrowRight aria-hidden="true" />
            </Button>
            <Button
              href={whatsapp}
              className="gap-2 border border-white/40 bg-transparent hover:bg-white/10"
            >
              <BsChatDots aria-hidden="true" />
              Consultar pelo WhatsApp
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-help-pc-light px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-bold uppercase tracking-widest text-help-pc-primary">
              Por que Help PC?
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Atendimento claro, do começo ao fim.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                Icon: BsChatDots,
                titulo: "Conversa sem complicação",
                descricao: "Explique o problema diretamente pelo WhatsApp ou site.",
              },
              {
                Icon: BsClipboardCheck,
                titulo: "Orientação adequada",
                descricao: "Entenda as opções de atendimento antes de decidir.",
              },
              {
                Icon: BsShieldCheck,
                titulo: "Preços transparentes",
                descricao: "Consulte os valores e confirme o escopo antes da contratação.",
              },
            ].map(({ Icon, titulo, descricao }) => (
              <article key={titulo} className="rounded-2xl bg-white p-7 shadow-sm">
                <Icon className="text-3xl text-help-pc-primary" aria-hidden="true" />
                <h3 className="mt-4 font-extrabold">{titulo}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{descricao}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-black sm:text-5xl">
            Vamos resolver o problema do seu equipamento?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
            Conte o que está acontecendo e solicite seu orçamento.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={whatsapp} className="gap-2 bg-help-pc-accent hover:bg-help-pc-accent-hover">
              <BsChatDots aria-hidden="true" />
              Chamar no WhatsApp <BsArrowRight aria-hidden="true" />
            </Button>
            <Button href="/contato" className="bg-help-pc-primary hover:bg-help-pc-primary-hover">
              Preencher formulário
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
