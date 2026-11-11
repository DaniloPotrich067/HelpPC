import Link from "next/link";
import { requireAdmin } from "@/app/lib/admin-auth";
import {
  STATUS_OPTIONS,
  countByStatus,
  isOrcamentoStatus,
  listOrcamentos,
} from "@/app/lib/orcamentos";
import StatusBadge from "./_components/StatusBadge";

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Campo_Grande",
});

export default async function PedidosPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string | string[] }>;
}) {
  await requireAdmin();

  const { status: rawStatus } = await searchParams;
  const status = isOrcamentoStatus(rawStatus) ? rawStatus : undefined;

  const [orcamentos, counts] = await Promise.all([
    listOrcamentos(status),
    countByStatus(),
  ]);

  const tabs = [{ value: undefined, label: "Todos" }, ...STATUS_OPTIONS];
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold">Pedidos de orçamento</h1>

      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const active = tab.value === status;
          const count = tab.value ? counts[tab.value] : total;
          return (
            <Link
              key={tab.label}
              href={tab.value ? `/admin?status=${tab.value}` : "/admin"}
              aria-current={active ? "page" : undefined}
              className={`rounded-full border px-3 py-1 text-sm font-semibold ${
                active
                  ? "border-help-pc-primary bg-help-pc-primary text-white"
                  : "border-slate-300 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {tab.label} ({count})
            </Link>
          );
        })}
      </div>

      {orcamentos.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
          Nenhum pedido encontrado.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white text-slate-900">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Telefone</th>
                <th className="px-4 py-3">Serviços</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"><span className="sr-only">Ações</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orcamentos.map((orcamento) => (
                <tr key={orcamento.id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-4 py-3">{dateFormat.format(orcamento.createdAt)}</td>
                  <td className="px-4 py-3 font-semibold">{orcamento.name}</td>
                  <td className="whitespace-nowrap px-4 py-3">{orcamento.phone}</td>
                  <td className="max-w-xs px-4 py-3">
                    {orcamento.services.join(" · ")}
                    {orcamento.hasAttachment && <span title="Possui anexo"> 📎</span>}
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={orcamento.status} /></td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/orcamentos/${orcamento.id}`} className="font-semibold text-help-pc-primary hover:underline">
                      Abrir
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
