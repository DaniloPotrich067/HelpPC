import Link from "next/link";
import { BsArrowRight, BsCheckCircle, BsChatDots } from "@/app/components/icons";
import Button from "@/app/components/Button";
import {
  formatarPreco,
  gerarLinkWhatsApp,
  itensInclusosDoCombo,
  type ComboComercial,
} from "@/app/lib/catalogo-comercial";

type ComboCardProps = {
  combo: ComboComercial;
  compacto?: boolean;
};

export default function ComboCard({ combo, compacto = false }: ComboCardProps) {
  const itensInclusos = itensInclusosDoCombo(combo);

  return (
    <article
      id={combo.slug}
      className={`flex h-full scroll-mt-8 flex-col rounded-2xl border p-6 ${
        combo.destaque
          ? "border-help-pc-primary-300 bg-white text-slate-900 shadow-lg ring-1 ring-help-pc-primary-100"
          : "border-slate-200 bg-white text-slate-900 shadow-sm"
      }`}
    >
      {combo.etiqueta && (
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-help-pc-accent-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-help-pc-accent-800">
          <BsCheckCircle aria-hidden="true" />
          {combo.etiqueta}
        </span>
      )}

      <h3 className={`${combo.etiqueta ? "mt-4" : "mt-1"} text-2xl font-black`}>
        {combo.nome}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{combo.descricao}</p>
      <p className="mt-5 text-3xl font-black text-help-pc-primary-hover">
        {formatarPreco(combo.preco)}
      </p>

      {!compacto && (
        <ul className="my-5 flex-1 space-y-3 border-t border-slate-100 pt-4 text-sm leading-5 text-slate-700">
          {itensInclusos.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <BsCheckCircle className="mt-0.5 shrink-0 text-help-pc-primary" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex flex-col gap-2">
        {compacto ? (
          <Link
            href={`/servicos#${combo.slug}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-help-pc-primary px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-help-pc-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary focus-visible:ring-offset-2"
          >
            Ver composição <BsArrowRight aria-hidden="true" />
          </Link>
        ) : (
          <>
            <Button
              href={gerarLinkWhatsApp(combo.mensagemWhatsApp, `página de serviços | combo ${combo.nome}`)}
              className="w-full gap-2 px-3 text-sm"
            >
              <BsChatDots aria-hidden="true" />
              Quero esse combo
              <BsArrowRight aria-hidden="true" />
            </Button>
            <Button
              href="/contato"
              className="w-full bg-slate-100 px-3 text-sm text-slate-800 hover:bg-slate-200"
            >
              Orçar pelo site
            </Button>
          </>
        )}
      </div>
    </article>
  );
}
