"use client";

import { useActionState, useEffect, useRef } from "react";
import { TIPOS_COTACAO } from "@/app/lib/cotacoes-tipos";
import { addCotacao } from "../actions";

const field = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900";

export default function CotacaoForm({ orcamentos }: { orcamentos: { id: string; name: string }[] }) {
  const [state, action, pending] = useActionState(addCotacao, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={action} className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 text-slate-900 sm:grid-cols-6">
      <div className="sm:col-span-2">
        <label htmlFor="tipo" className="mb-1 block text-sm font-semibold">Tipo</label>
        <select id="tipo" name="tipo" required defaultValue="peca" className={field}>
          {TIPOS_COTACAO.map((tipo) => <option key={tipo.value} value={tipo.value}>{tipo.label}</option>)}
        </select>
      </div>
      <div className="sm:col-span-4">
        <label htmlFor="item" className="mb-1 block text-sm font-semibold">Item *</label>
        <input id="item" name="item" required minLength={2} maxLength={150} className={field} />
      </div>
      <div className="sm:col-span-3">
        <label htmlFor="fornecedor" className="mb-1 block text-sm font-semibold">Fornecedor *</label>
        <input id="fornecedor" name="fornecedor" required minLength={2} maxLength={100} className={field} />
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="quantidade" className="mb-1 block text-sm font-semibold">Qtd.</label>
        <input id="quantidade" name="quantidade" type="number" min={1} max={9999} defaultValue={1} required className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="preco" className="mb-1 block text-sm font-semibold">Preço unitário (R$) *</label>
        <input id="preco" name="preco" inputMode="decimal" required placeholder="0,00" className={field} />
      </div>
      <div className="sm:col-span-3">
        <label htmlFor="link" className="mb-1 block text-sm font-semibold">Link</label>
        <input id="link" name="link" type="url" maxLength={500} className={field} />
      </div>
      <div className="sm:col-span-3">
        <label htmlFor="orcamentoId" className="mb-1 block text-sm font-semibold">Vincular a pedido</label>
        <select id="orcamentoId" name="orcamentoId" defaultValue="" className={field}>
          <option value="">Nenhum</option>
          {orcamentos.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
        </select>
      </div>
      <div className="sm:col-span-6">
        <label htmlFor="observacoes" className="mb-1 block text-sm font-semibold">Observações</label>
        <textarea id="observacoes" name="observacoes" rows={2} maxLength={1000} className={field} />
      </div>

      {state?.error && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700 sm:col-span-6">{state.error}</p>
      )}

      <div className="sm:col-span-6">
        <button type="submit" disabled={pending} className="rounded-lg bg-help-pc-accent px-4 py-2 font-semibold text-white disabled:opacity-60">
          {pending ? "Salvando..." : "Adicionar cotação"}
        </button>
      </div>
    </form>
  );
}
