import { dadosComerciais } from "@/app/lib/catalogo-comercial";
import { gerarJsonLdFaq, perguntasFrequentes } from "@/app/lib/faq-local";

export default function FaqLocal() {
  return (
    <section
      aria-labelledby="faq-titulo"
      className="bg-help-pc-light px-4 py-12 sm:px-6 sm:py-20"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(gerarJsonLdFaq()).replace(/</g, "\u003c"),
        }}
      />
      <div className="mx-auto max-w-4xl">
        <p className="font-bold uppercase tracking-widest text-help-pc-primary">
          Dúvidas frequentes
        </p>
        <h2 id="faq-titulo" className="mt-3 text-3xl font-black sm:text-4xl">
          Perguntas sobre assistência técnica em {dadosComerciais.local.cidade}
        </h2>
        <div className="mt-8 space-y-3">
          {perguntasFrequentes.map(({ pergunta, resposta }) => (
            <details
              key={pergunta}
              className="group rounded-2xl border border-slate-200 bg-white p-5 open:shadow-sm"
            >
              <summary className="cursor-pointer list-none font-extrabold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary">
                {pergunta}
              </summary>
              <p className="mt-3 leading-7 text-slate-600">{resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
