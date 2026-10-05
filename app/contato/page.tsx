import type { Metadata } from "next";
import Link from "next/link";
import { BsArrowRight, BsEnvelope, BsGeoAlt } from "@/app/components/icons";
import FormularioContato from "../components/FormularioContato";
import {
  gerarLinkWhatsApp,
  gerarOpcoesOrcamento,
} from "@/app/lib/catalogo-comercial";

export const metadata: Metadata = {
  title: "Contato | HelpPC",
  description:
    "Entre em contato com a HelpPC em Dourados-MS e solicite um orçamento para seu equipamento.",
  openGraph: {
    title: "Contato | HelpPC",
    description:
      "Entre em contato com a HelpPC em Dourados-MS e solicite um orçamento para seu equipamento.",
    type: "website",
  },
};

export default function Contato() {
  return (
    <section className="mx-auto w-full max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-help-pc-dark via-help-pc-dark to-help-pc-primary-900 px-6 py-12 text-white sm:px-10 md:py-16 lg:px-14">
        <div className="pointer-events-none absolute -right-20 -top-28 -z-10 h-72 w-72 rounded-full bg-help-pc-primary-600/20 blur-3xl" />
        <span className="inline-flex items-center gap-2 rounded-full border border-help-pc-primary-400/30 bg-help-pc-primary-400/10 px-4 py-2 text-sm font-semibold text-help-pc-primary-200">
          <BsEnvelope aria-hidden="true" />
          Atendimento em Dourados-MS
        </span>

        <h1 className="mt-6 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">
          Vamos conversar sobre o seu equipamento?
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          Precisa de manutenção, suporte ou deseja solicitar um orçamento? Preencha
          o formulário abaixo e nossa equipe entrará em contato.
        </p>
        <Link
          href="/servicos"
          className="mt-6 inline-flex items-center gap-2 rounded-lg font-semibold text-white transition-colors hover:text-help-pc-primary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary"
        >
          Consulte os serviços <BsArrowRight aria-hidden="true" />
        </Link>
      </div>

      <div className="grid gap-10 px-6 py-10 sm:px-10 md:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)] lg:gap-14 lg:px-14">
        <div>
          <p className="font-bold uppercase tracking-widest text-help-pc-primary">
            Solicite seu orçamento
          </p>
          <h2 className="mt-3 text-2xl font-black text-slate-900 sm:text-3xl">
            Conte o que está acontecendo
          </h2>
          <p className="mt-3 max-w-xl leading-7 text-slate-600">
            Informe os detalhes do problema para que possamos entender como ajudar.
            Os campos marcados com asterisco são obrigatórios.
          </p>
          <div className="mt-7">
            <FormularioContato opcoesServico={gerarOpcoesOrcamento()} />
          </div>
        </div>

        <aside className="h-fit rounded-2xl bg-help-pc-light p-6 sm:p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-help-pc-primary-100 text-2xl text-help-pc-primary">
            <BsGeoAlt aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-xl font-extrabold text-slate-900">
            Atendimento local
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            A Help PC atende Dourados-MS e região, conforme disponibilidade. Após
            receber sua solicitação, vamos conversar sobre o equipamento, o escopo
            do serviço e as opções de atendimento.
          </p>
          <div className="mt-6 border-t border-slate-200 pt-5">
            <p className="text-sm font-bold text-slate-900">Prefere falar direto?</p>
            <a
              href="https://wa.me/5567999001081"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-help-pc-accent px-4 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-help-pc-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary focus-visible:ring-offset-2"
            >
              Chamar no WhatsApp <BsArrowRight aria-hidden="true" />
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
