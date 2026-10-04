import type { Metadata } from "next";
import { BsArrowRight, BsChatDots, BsGeoAlt } from "@/app/components/icons";
import Button from "@/app/components/Button";
import ComboCard from "@/app/components/Catalogo/ComboCard";
import ServiceCard from "@/app/components/Catalogo/ServiceCard";
import {
  categoriasServicos,
  combos,
  dadosComerciais,
  diferenciais,
  gerarLinkWhatsApp,
  servicos,
} from "@/app/lib/catalogo-comercial";

export const metadata: Metadata = {
  title: "Formatação e manutenção de computadores",
  alternates: { canonical: "/servicos" },
  description:
    "Conheça os serviços de formatação, manutenção, limpeza, otimização e suporte técnico para computadores em Dourados-MS. Consulte valores e solicite orçamento.",
};

export default function Servicos() {
  const servicosAtivos = servicos.filter((servico) => servico.ativo);
  const combosAtivos = combos.filter((combo) => combo.ativo);

  return (
    <main className="min-h-screen bg-help-pc-light text-slate-900">
      <section className="bg-help-pc-dark px-6 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-help-pc-primary-400/30 bg-help-pc-primary-400/10 px-4 py-2 text-sm font-semibold text-help-pc-primary-200">
            <BsGeoAlt aria-hidden="true" />
            {dadosComerciais.local.regiaoExibicao}
          </span>

          <h1 className="mt-7 max-w-3xl text-4xl font-black leading-tight sm:text-6xl">
            Formatação e manutenção de computadores
            <span className="mt-2 block text-help-pc-primary-400">
              em {dadosComerciais.local.cidade}-{dadosComerciais.local.estado}.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Veja os planos, o que cada serviço inclui e os valores. Se precisar,
            converse com a Help PC para escolher uma opção para seu equipamento.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              href={gerarLinkWhatsApp(
                "Olá! Quero conhecer os serviços e solicitar um orçamento.",
                "página de serviços | chamada do topo",
              )}
              className="gap-2"
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

      <section
        aria-labelledby="diferenciais-titulo"
        className="border-b border-slate-200 bg-white px-6 py-8"
      >
        <div className="mx-auto max-w-6xl">
          <h2 id="diferenciais-titulo" className="sr-only">
            Como funciona o atendimento
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {diferenciais
              .slice()
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

      <section id="precos" className="scroll-mt-8 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-bold uppercase tracking-widest text-help-pc-primary">
            Catálogo de serviços
          </p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            Escolha o serviço para seu equipamento
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Os valores e itens abaixo seguem a tabela comercial informada.
            Confirme o escopo e as condições antes de contratar.
          </p>

          <div className="mt-10 space-y-14">
            {categoriasServicos.map((categoria) => {
              const servicosDaCategoria = servicosAtivos.filter(
                (servico) => servico.categoria === categoria.id,
              );

              if (servicosDaCategoria.length === 0) return null;

              return (
                <section
                  key={categoria.id}
                  aria-labelledby={`categoria-${categoria.id}`}
                >
                  <div className="mb-6 max-w-2xl">
                    <h3
                      id={`categoria-${categoria.id}`}
                      className="text-2xl font-black sm:text-3xl"
                    >
                      {categoria.titulo}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {categoria.descricao}
                    </p>
                  </div>
                  <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {servicosDaCategoria.map((servico) => (
                      <ServiceCard key={servico.id} servico={servico} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <p className="mt-10 rounded-xl bg-slate-100 p-4 text-sm leading-6 text-slate-600">
            Os preços devem ser confirmados com a Help PC conforme o escopo do
            serviço, as condições do equipamento e a disponibilidade.
          </p>
        </div>
      </section>

      <section
        id="combos"
        aria-labelledby="combos-titulo"
        className="bg-help-pc-dark px-6 py-16 text-white sm:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <p className="font-bold uppercase tracking-widest text-help-pc-primary-300">
            Combos Help PC
          </p>
          <h2 id="combos-titulo" className="mt-3 text-3xl font-black sm:text-4xl">
            Serviços reunidos em um só pacote
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            Confira a composição e escolha o pacote que deseja consultar.
          </p>

          <div className="mt-9 grid items-stretch gap-5 md:grid-cols-3">
            {combosAtivos.map((combo) => (
              <ComboCard key={combo.id} combo={combo} />
            ))}
          </div>

          <p className="mt-6 text-sm leading-6 text-slate-400">
            A modalidade e a validade da licença associada ao Office precisam
            ser confirmadas antes da contratação dos combos.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-help-pc-primary px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-3xl font-black sm:text-4xl">
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
                "página de serviços | chamada final",
              )}
              className="gap-2"
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
