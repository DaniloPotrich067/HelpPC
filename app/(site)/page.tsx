
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import {
  BsArrowRight,
  BsChatDots,
  BsGeoAlt,
} from "@/app/components/icons";
import Button from "@/app/components/Button";
import ComboCard from "@/app/components/Catalogo/ComboCard";
import FaqLocal from "@/app/components/FaqLocal";
import NavBar from "@/app/components/NavBar";
import logo from "@/public/HelpIcon.svg";
import {
  combosDestaqueHome,
  dadosComerciais,
  diferenciais,
  formatarPreco,
  gerarLinkWhatsApp,
  servicosDestaqueHome,
} from "@/app/lib/catalogo-comercial";

export const metadata: Metadata = {
  title: { absolute: "Assistência técnica de computadores em Dourados-MS | Help PC" },
  alternates: { canonical: "/" },
  description:
    "Assistência técnica em Dourados-MS para computadores e notebooks: formatação, manutenção, otimização e diagnóstico. Fale com a Help PC e peça um orçamento.",
  openGraph: {
    url: "/",
    title: "Assistência técnica de computadores em Dourados-MS | Help PC",
    description:
      "Formatação, manutenção e suporte para computadores e notebooks em Dourados-MS. Solicite seu orçamento.",
    type: "website",
    locale: "pt_BR",
    siteName: "Help PC",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-help-pc-dark dark:text-slate-100">
      <NavBar />

      <section className="relative isolate overflow-hidden bg-help-pc-dark px-4 py-14 text-white sm:px-6 sm:py-28 lg:py-32">
        <div className="pointer-events-none absolute -right-24 top-0 -z-10 h-96 w-96 rounded-full bg-help-pc-primary-600/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 -z-10 h-80 w-80 rounded-full bg-help-pc-accent/20 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-help-pc-primary-400/30 bg-help-pc-primary-400/10 px-4 py-2 text-sm font-semibold text-help-pc-primary-200">
              <BsGeoAlt aria-hidden="true" />
              Assistência técnica em {`${dadosComerciais.local.cidade}-${dadosComerciais.local.estado}`}
            </span>

            <h1 className="mt-7 text-3xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Assistência técnica
              <span className="block text-help-pc-primary-400">
                de computadores em {dadosComerciais.local.cidade}.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Computador lento, problemas no sistema ou precisando de manutenção?
              A Help PC oferece soluções práticas para você voltar a usar seu
              equipamento com mais tranquilidade.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href={gerarLinkWhatsApp(
                  "Olá! Vim pelo site da Help PC e gostaria de solicitar um orçamento.",
                  "página inicial | chamada principal",
                )}
                className="gap-2 bg-help-pc-accent hover:bg-help-pc-accent-hover"
              >
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
                {dadosComerciais.local.regiaoExibicao}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-20">
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

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {servicosDestaqueHome.map((servico) => {
              const Icon = servico.icone;
              return (
              <article
                key={servico.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-help-pc-primary-300 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-help-pc-primary-50 text-2xl text-help-pc-primary">
                  <Icon aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-extrabold">{servico.nome}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{servico.descricao}</p>
                {servico.preco !== null && (
                  <p className="mt-4 font-black text-help-pc-primary-hover">
                    {formatarPreco(servico.preco)}
                  </p>
                )}
                <Link
                  href={`/servicos#${servico.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-help-pc-primary hover:underline"
                >
                  Saiba mais <BsArrowRight aria-hidden="true" />
                </Link>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-help-pc-light px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-bold uppercase tracking-widest text-help-pc-primary">
            Pacotes Help PC
          </p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            Combos para cuidar do seu computador
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Veja alguns pacotes e consulte a composição completa na página de serviços.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {combosDestaqueHome.map((combo) => (
              <ComboCard key={combo.id} combo={combo} compacto />
            ))}
          </div>
          <p className="mt-5 text-center text-sm leading-6 text-slate-600">
            Nos combos que incluem Office, a modalidade e a validade da licença
            precisam ser confirmadas antes da contratação.
          </p>
          <div className="mt-7 flex justify-center">
            <Button href="/servicos#combos" className="gap-2">
              Ver todos os serviços e combos <BsArrowRight aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-help-pc-light px-4 py-12 sm:px-6 sm:py-20">
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
            {diferenciais.map(({ id, icone: Icon, titulo, descricao }) => (
              <article key={id} className="rounded-2xl bg-white p-7 shadow-sm">
                <Icon className="text-3xl text-help-pc-primary" aria-hidden="true" />
                <h3 className="mt-4 font-extrabold">{titulo}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{descricao}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="local-titulo"
        className="px-4 py-12 sm:px-6 sm:py-20"
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <p className="font-bold uppercase tracking-widest text-help-pc-primary">
              Assistência técnica em Dourados
            </p>
            <h2 id="local-titulo" className="mt-3 text-3xl font-black sm:text-4xl">
              Informática para quem mora e trabalha em Dourados-MS
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              A Help PC é uma assistência técnica de informática de Dourados,
              em Mato Grosso do Sul. Cuidamos de computadores e notebooks de
              moradores, estudantes e pequenos negócios da cidade e região, com
              orçamento combinado antes de qualquer serviço.
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              Se você procura formatação de computador em Dourados, manutenção
              de notebook, limpeza interna, instalação de programas ou suporte
              para impressoras, fale direto com a gente pelo WhatsApp{" "}
              {dadosComerciais.contato.telefoneExibicao}.
            </p>
          </div>

          <div className="rounded-3xl bg-help-pc-light p-7 sm:p-9">
            <h3 className="text-xl font-black">Como funciona o atendimento</h3>
            <ol className="mt-6 space-y-5">
              {[
                ["Você descreve o problema", "Pelo WhatsApp ou pelo formulário do site."],
                ["Alinhamos serviço e valor", "Explicamos as opções e combinamos o orçamento antes de executar."],
                ["Serviço executado", "Seu equipamento volta a funcionar com o escopo combinado."],
              ].map(([titulo, descricao], indice) => (
                <li key={titulo} className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-help-pc-primary font-black text-white">
                    {indice + 1}
                  </span>
                  <div>
                    <h4 className="font-extrabold">{titulo}</h4>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{descricao}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <FaqLocal />

      <section className="px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-black sm:text-5xl">
            Vamos resolver o problema do seu equipamento?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
            Conte o que está acontecendo e solicite seu orçamento.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              href={gerarLinkWhatsApp(
                "Olá! Vim pelo site da Help PC e gostaria de solicitar um orçamento.",
                "página inicial | chamada final",
              )}
              className="gap-2 bg-help-pc-accent hover:bg-help-pc-accent-hover"
            >
              <BsChatDots aria-hidden="true" />
              Chamar no WhatsApp <BsArrowRight aria-hidden="true" />
            </Button>
            <Button href="/contato" className="bg-help-pc-primary hover:bg-help-pc-primary-hover">
              Preencher formulário
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
