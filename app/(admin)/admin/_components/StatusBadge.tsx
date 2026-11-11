import { statusLabel, type OrcamentoStatus } from "@/app/lib/orcamentos";

const STYLES: Record<OrcamentoStatus, string> = {
  a_enviar_mensagem: "bg-amber-100 text-amber-800",
  contato_feito: "bg-sky-100 text-sky-800",
  em_andamento: "bg-indigo-100 text-indigo-800",
  concluido: "bg-green-100 text-green-800",
  cancelado: "bg-slate-200 text-slate-700",
};

export default function StatusBadge({ status }: { status: OrcamentoStatus }) {
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${STYLES[status]}`}>
      {statusLabel(status)}
    </span>
  );
}
