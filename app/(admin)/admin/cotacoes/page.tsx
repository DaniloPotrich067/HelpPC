import { requireAdmin } from "@/app/lib/admin-auth";
import { TIPOS_COTACAO } from "@/app/lib/cotacoes-tipos";
import { listCotacoes, listOrcamentosParaVinculo } from "@/app/lib/cotacoes";
import { removeCotacao } from "../actions";
import CotacaoForm from "../_components/CotacaoForm";

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function safeLink(link: string | null): string | null {
  return link && /^https?:\/\//i.test(link) ? link : null;
}

export default async function CotacoesPage() {
  await requireAdmin();

  const [cotacoes, orcamentos] = await Promise.all([listCotacoes(), listOrcamentosParaVinculo()]);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Cotação de peças e ferramentas</h1>

      <CotacaoForm orcamentos={orcamentos} />

      {cotacoes.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
          Nenhuma cotação registrada.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white text-slate-900">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Item</th>
                <th className="px-4 py-3">Fornecedor</th>
                <th className="px-4 py-3">Qtd.</th>
                <th className="px-4 py-3">Unitário</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Pedido</th>
                <th className="px-4 py-3"><span className="sr-only">Ações</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cotacoes.map((cotacao) => {
                const href = safeLink(cotacao.link);
                return (
                  <tr key={cotacao.id} className="align-top hover:bg-slate-50">
                    <td className="px-4 py-3">{TIPOS_COTACAO.find((t) => t.value === cotacao.tipo)?.label}</td>
                    <td className="px-4 py-3">
                      <span className="font-semibold">{cotacao.item}</span>
                      {href && (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="ml-2 text-help-pc-primary hover:underline">link</a>
                      )}
                      {cotacao.observacoes && (
                        <p className="mt-1 whitespace-pre-wrap text-xs text-slate-500">{cotacao.observacoes}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">{cotacao.fornecedor}</td>
                    <td className="px-4 py-3">{cotacao.quantidade}</td>
                    <td className="whitespace-nowrap px-4 py-3">{money.format(cotacao.precoUnitario)}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-semibold">
                      {money.format(cotacao.precoUnitario * cotacao.quantidade)}
                    </td>
                    <td className="px-4 py-3">{cotacao.orcamentoNome ?? "—"}</td>
                    <td className="px-4 py-3 text-right">
                      <form action={removeCotacao}>
                        <input type="hidden" name="id" value={cotacao.id} />
                        <button type="submit" className="font-semibold text-red-700 hover:underline">Excluir</button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
