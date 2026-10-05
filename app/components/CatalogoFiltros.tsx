import Link from "next/link";

export interface FiltroCatalogo {
  id: string;
  titulo: string;
  href: string;
}

interface CatalogoFiltrosProps {
  filtros: readonly FiltroCatalogo[];
  titulo?: string;
  className?: string;
}

export default function CatalogoFiltros({
  filtros,
  titulo = "Ir para",
  className = "",
}: CatalogoFiltrosProps) {
  return (
    <nav
      aria-label="Navegação do catálogo de serviços"
      className={`sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-6 py-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/95 ${className}`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <span className="shrink-0 text-sm font-bold text-slate-700">
          {titulo}
        </span>
        <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:pb-0">
          {filtros.map((filtro) => (
            <Link
              key={filtro.id}
              href={filtro.href}
              className="inline-flex min-h-10 shrink-0 items-center rounded-full border border-help-pc-primary-100 bg-help-pc-primary-50 px-4 py-2 text-sm font-semibold text-help-pc-primary-900 transition-colors hover:border-help-pc-primary hover:bg-help-pc-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-800 dark:text-help-pc-primary-100 dark:hover:border-help-pc-primary-400 dark:hover:bg-help-pc-primary-700 dark:focus-visible:ring-offset-slate-900"
            >
              {filtro.titulo}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
