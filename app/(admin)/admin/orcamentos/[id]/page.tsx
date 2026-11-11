import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/app/lib/admin-auth";
import { STATUS_OPTIONS, getOrcamento } from "@/app/lib/orcamentos";
import { changeStatus } from "../../actions";
import StatusBadge from "../../_components/StatusBadge";

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Campo_Grande",
});

export default async function OrcamentoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();

  const { id } = await params;
  const orcamento = await getOrcamento(id);
  if (!orcamento) notFound();

  const digits = orcamento.phone.replace(/\D/g, "");
  const whatsappHref =
    digits.length >= 10
      ? `https://wa.me/${digits.startsWith("55") ? digits : `55${digits}`}`
      : null;

  return (
    <section className="space-y-6">
      <Link href="/admin" className="text-sm font-semibold text-help-pc-primary hover:underline">
        ← Voltar aos pedidos
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold">{orcamento.name}</h1>
        <StatusBadge status={orcamento.status} />
      </div>

      <form action={changeStatus} className="flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-4 text-slate-900">
        <input type="hidden" name="id" value={orcamento.id} />
        <div>
          <label htmlFor="status" className="mb-1 block text-sm font-semibold">Status</label>
          <select id="status" name="status" defaultValue={orcamento.status}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2">
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="rounded-lg bg-help-pc-accent px-4 py-2 font-semibold text-white">
          Salvar status
        </button>
      </form>

      <dl className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 text-slate-900 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold uppercase text-slate-500">Telefone</dt>
          <dd>
            {orcamento.phone}
            {whatsappHref && (
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="ml-2 font-semibold text-help-pc-primary hover:underline">
                Abrir WhatsApp
              </a>
            )}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase text-slate-500">Equipamento</dt>
          <dd>{orcamento.equipment ?? "—"}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-semibold uppercase text-slate-500">Serviços</dt>
          <dd>
            <ul className="list-disc pl-5">
              {orcamento.services.map((service) => <li key={service}>{service}</li>)}
            </ul>
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-semibold uppercase text-slate-500">Descrição</dt>
          <dd className="whitespace-pre-wrap break-words">{orcamento.description}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase text-slate-500">Recebido em</dt>
          <dd>{dateFormat.format(orcamento.createdAt)}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase text-slate-500">Atualizado em</dt>
          <dd>{dateFormat.format(orcamento.updatedAt)}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-semibold uppercase text-slate-500">Anexo</dt>
          <dd>
            {orcamento.attachment ? (
              <a href={`/api/admin/anexos/${orcamento.attachment.id}`} className="font-semibold text-help-pc-primary hover:underline">
                {orcamento.attachment.filename} ({Math.ceil(orcamento.attachment.sizeBytes / 1024)} KB)
              </a>
            ) : (
              "—"
            )}
          </dd>
        </div>
      </dl>
    </section>
  );
}
