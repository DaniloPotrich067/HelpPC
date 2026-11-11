"use client";

import { useActionState } from "react";
import { login } from "../actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="w-full max-w-sm space-y-4 rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm">
      <h1 className="text-xl font-bold">Entrar no painel</h1>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-semibold">E-mail</label>
        <input id="email" name="email" type="email" autoComplete="username" required maxLength={254}
          className="w-full rounded-lg border border-slate-300 px-3 py-2" />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-semibold">Senha</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required maxLength={200}
          className="w-full rounded-lg border border-slate-300 px-3 py-2" />
      </div>

      {state?.error && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{state.error}</p>
      )}

      <button type="submit" disabled={pending}
        className="w-full rounded-lg bg-help-pc-accent px-4 py-2 font-semibold text-white disabled:opacity-60">
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
