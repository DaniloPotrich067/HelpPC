import type { Metadata } from "next";
import Link from "next/link";
import { isAuthenticated } from "@/app/lib/admin-auth";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: { absolute: "Painel | Help PC" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authenticated = await isAuthenticated();

  return (
    <div className="flex min-h-screen flex-1 flex-col">
      {authenticated && (
        <header className="border-b border-slate-200 bg-white text-slate-900 dark:border-slate-700">
          <nav className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3 text-sm font-semibold">
            <span className="text-help-pc-primary">Help PC · Painel</span>
            <Link href="/admin" className="hover:underline">Pedidos</Link>
            <Link href="/admin/cotacoes" className="hover:underline">Cotações</Link>
            <form action={logout} className="ml-auto">
              <button type="submit" className="rounded-lg border border-slate-300 px-3 py-1 hover:bg-slate-100">
                Sair
              </button>
            </form>
          </nav>
        </header>
      )}
      <main className="mx-auto w-full max-w-6xl flex-1 p-4 sm:p-6">{children}</main>
    </div>
  );
}
