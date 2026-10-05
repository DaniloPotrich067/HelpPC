import type { Metadata } from "next";
import {
  BsArrowRight,
  BsCheckCircle,
  BsChatDots,
  BsGeoAlt,
  BsTools,
} from "@/app/components/icons";
import Button from "@/app/components/Button";
import CatalogoFiltros from "@/app/components/CatalogoFiltros";
import {
  categoriasServicos,
  combos,
  diferenciais,
  formatarPreco,
  gerarLinkWhatsApp,
  itensInclusosDoCombo,
  itensInclusosDoServico,
  servicos,
} from "@/app/lib/catalogo-comercial";

export const metadata: Metadata = {
  title: "Serviços | HelpPC",
  description:
    "Veja serviços de manutenção, formatação e suporte técnico da HelpPC em Dourados-MS.",
  openGraph: {
    title: "Serviços | HelpPC",
    description:
      "Veja serviços de manutenção, formatação e suporte técnico da HelpPC em Dourados-MS.",
    type: "website",
  },
};

export default function Servicos() {
  const servicosAtivos = servicos.filter((servico) => servico.ativo);
  const combosAtivos = combos.filter((combo) => combo.ativo);
  const categoriasAtivas = categoriasServicos.filter((categoria) =>
    servicosAtivos.some((servico) => servico.categoria === categoria.id),
  );
  const filtros = [
    ...categoriasAtivas.map((categoria) => ({
      id: categoria.id,
      titulo: categoria.titulo,
      href: `#categoria-${categoria.id}`,
    })),
    ...(combosAtivos.length > 0
      ? [{ id: "combos", titulo: "Combos", href: "#combos" }]
      : []),
  ];

  return (
    <main className="min-h-screen bg-help-pc-light text-slate-900">
      <section className="bg-help-pc-dark px-6 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-help-pc-primary-400/30 bg-help-pc-primary-400/10 px-4 py-2 text-sm font-semibold text-help-pc-primary-200">
            <BsGeoAlt aria-hidden="true" />
            Dourados-MS e região
          </span>
          <h1 className="mt-7 max-w-3xl text-4xl font-black leading-tight sm:text-6xl">
            Seu PC está dando dor de cabeça?
            <span className="mt-2 block text-help-pc-primary-400">
              Vamos resolver isso.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Manutenção, formatação, otimização e suporte técnico. Encontre o
            serviço adequado e solicite seu orçamento.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              href={gerarLinkWhatsApp(
                "Olá! Quero conhecer os serviços e solicitar um orçamento.",
                "Topo dos serviços",
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

      {filtros.length > 0 && (
        <CatalogoFiltros filtros={filtros} titulo="Ir para:" />
      )}

      <section
        aria-labelledby="diferenciais-titulo"
        className="border-b border-slate-200 bg-white px-6 py-8"
      >
        <div className="mx-auto max-w-6xl">
          <h2 id="diferenciais-titulo" className="sr-only">
            Como funciona o atendimento
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[...diferenciais]
              .sort((a, b) => a.prioridade - b.prioridade)
              .map(({ id, icone: Icon, titulo, descricao }) => (
                <article key={id} className="flex items-start gap-4">
                  <Icon
                    className="mt-1 shrink-0 text-2xl text-help-pc-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-bold">{titulo}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {descricao}
                    </p>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      <section id="precos" className="scroll-mt-24 px-6 py-16 sm:py-20">
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

          <div className="mt-10 space-y-12">
            {categoriasAtivas.map((categoria) => {
              const servicosDaCategoria = servicosAtivos.filter(
                (servico) => servico.categoria === categoria.id,
              );

              return (
                <section
                  key={categoria.id}
                  id={`categoria-${categoria.id}`}
                  aria-labelledby={`titulo-categoria-${categoria.id}`}
                  className="scroll-mt-24"
                >
                  <div className="mb-6 max-w-2xl">
                    <h3
                      id={`titulo-categoria-${categoria.id}`}
                      className="text-2xl font-black sm:text-3xl"
                    >
                      {categoria.titulo}
                    </h3>
                    <p className="mt-2 leading-7 text-slate-600">
                      {categoria.descricao}
                    </p>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {servicosDaCategoria.map((servico) => {
                      const Icon = servico.icone;
                      const itens = itensInclusosDoServico(servico);
                      const preco =
                        servico.preco === null
                          ? "Consulte o valor"
                          : `${servico.tipoPreco === "a partir de" ? "A partir de " : ""}${formatarPreco(servico.preco)}`;

                      return (
                        <article
                          key={servico.id}
                          className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-help-pc-primary-300 hover:shadow-lg"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-help-pc-primary-50 text-2xl text-help-pc-primary">
                              <Icon aria-hidden="true" />
                            </div>
                            {servico.destaque && (
                              <span className="rounded-full bg-help-pc-accent-100 px-3 py-1 text-xs font-bold text-help-pc-accent-700">
                                Destaque
                              </span>
                            )}
                          </div>
                          <h4 className="mt-5 text-lg font-extrabold">
                            {servico.nome}
                          </h4>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {servico.descricao}
                          </p>
                          {itens.length > 0 && (
                            <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-600">
                              {itens.map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                  <BsCheckCircle
                                    className="mt-0.5 shrink-0 text-help-pc-primary-600"
                                    aria-hidden="true"
                                  />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {itens.length === 0 && <div className="flex-1" />}
                          {servico.aviso && (
                            <p className="mt-4 rounded-lg bg-help-pc-primary-50 p-3 text-xs leading-5 text-help-pc-primary-900 dark:bg-help-pc-primary-900/30 dark:text-help-pc-primary-100">
                              {servico.aviso}
                            </p>
                          )}
                          <div className="mt-6 border-t border-slate-100 pt-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Investimento
                            </p>
                            <p className="mt-1 text-lg font-black text-help-pc-primary-hover">
                              {preco}
                            </p>
                            <div className="mt-4 flex flex-col gap-2">
                              <Button
                                href={gerarLinkWhatsApp(
                                  servico.mensagemWhatsApp,
                                  servico.nome,
                                )}
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
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
          <p className="mt-8 text-sm text-slate-500">
            Valores sujeitos à confirmação do serviço e do escopo do atendimento.
          </p>
        </div>
      </section>

      {combosAtivos.length > 0 && (
        <section
          id="combos"
          className="scroll-mt-24 bg-help-pc-dark px-6 py-16 text-white sm:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <p className="font-bold uppercase tracking-widest text-help-pc-accent-400">
              Combos Help PC
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Mais praticidade em um só atendimento.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              Conheça nossos pacotes. Consulte a composição e as condições para
              o seu equipamento.
            </p>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {combosAtivos.map((combo) => (
                <article
                  key={combo.id}
                  className={`flex flex-col rounded-2xl border p-6 ${
                    combo.destaque
                      ? "border-help-pc-accent-500 bg-white text-slate-900"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  {(combo.etiqueta || combo.destaque) && (
                    <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-help-pc-accent">
                      <BsCheckCircle aria-hidden="true" />
                      {combo.etiqueta ?? "Em destaque"}
                    </span>
                  )}
                  <h3 className="mt-3 text-2xl font-black">{combo.nome}</h3>
                  <p
                    className={`mt-2 text-sm ${
                      combo.destaque ? "text-slate-600" : "text-slate-300"
                    }`}
                  >
                    {combo.descricao}
                  </p>
                  <ul className="my-6 flex-1 space-y-3 text-sm">
                    {itensInclusosDoCombo(combo).map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <BsCheckCircle
                          className="mt-0.5 shrink-0 text-help-pc-primary-600"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p
                    className={`text-lg font-black ${
                      combo.destaque ? "text-help-pc-primary" : "text-white"
                    }`}
                  >
                    {formatarPreco(combo.preco)}
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    <Button
                      href={gerarLinkWhatsApp(
                        combo.mensagemWhatsApp,
                        `Combo ${combo.nome}`,
                      )}
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
      )}

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-help-pc-primary px-6 py-12 text-center text-white sm:px-12">
          <BsTools
            className="mx-auto text-4xl text-help-pc-primary-200"
            aria-hidden="true"
          />
          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            Não sabe qual serviço precisa?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-help-pc-primary-100">
            Conte o que está acontecendo e escolha a forma mais prática de
            solicitar seu orçamento.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              href={gerarLinkWhatsApp(
                "Olá! Não sei exatamente qual serviço preciso. Pode me orientar?",
                "CTA final dos serviços",
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
