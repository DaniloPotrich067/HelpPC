import { BsArrowRight, BsChatDots, BsCheckCircle } from "@/app/components/icons";
import Button from "@/app/components/Button";
import {
  formatarPreco,
  gerarLinkWhatsApp,
  itensInclusosDoServico,
  type ServicoComercial,
} from "@/app/lib/catalogo-comercial";

type ServiceCardProps = {
  servico: ServicoComercial;
};

export default function ServiceCard({ servico }: ServiceCardProps) {
  const Icon = servico.icone;
  const valor = servico.preco === null
    ? "Sob consulta"
    : `${servico.tipoPreco === "a partir de" ? "A partir de " : ""}${formatarPreco(servico.preco)}`;
  const itensInclusos = itensInclusosDoServico(servico);

  return (
    <article
      id={servico.slug}
      className={`flex h-full scroll-mt-8 flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
        servico.destaque
          ? "border-help-pc-primary-300 ring-1 ring-help-pc-primary-100"
          : "border-slate-200"
      }`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-help-pc-primary-50 text-2xl text-help-pc-primary">
        <Icon aria-hidden="true" />
      </div>

      <h3 className="mt-5 text-xl font-extrabold">{servico.nome}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{servico.descricao}</p>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {servico.tipoPreco === "sob consulta" ? "Investimento" : "Preço"}
        </p>
        <p className="mt-1 text-2xl font-black text-help-pc-primary-hover">{valor}</p>
      </div>

      {itensInclusos.length > 0 && (
        <div className="mt-5 flex-1 border-t border-slate-100 pt-4">
          <h4 className="text-sm font-bold">O que está incluso</h4>
          <ul className="mt-3 space-y-2 text-sm leading-5 text-slate-600">
            {itensInclusos.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <BsCheckCircle className="mt-0.5 shrink-0 text-help-pc-primary" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {servico.aviso && (
        <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-950">
          {servico.aviso}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-2 border-t border-slate-100 pt-4">
        <Button
          href={gerarLinkWhatsApp(servico.mensagemWhatsApp, `página de serviços | serviço ${servico.nome}`)}
          className="w-full gap-2 px-3 text-sm"
        >
          <BsChatDots aria-hidden="true" />
          Pedir orçamento
          <BsArrowRight aria-hidden="true" />
        </Button>
        <Button
          href="/contato"
          className="w-full bg-slate-100 px-3 text-sm text-slate-800 hover:bg-slate-200"
        >
          Orçar pelo site
        </Button>
      </div>
    </article>
  );
}
