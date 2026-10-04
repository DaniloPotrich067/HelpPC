import Image from "next/image";
import Link from "next/link";
import logo from "@/public/HelpIcon.svg";
import { gerarLinkWhatsApp } from "@/app/lib/catalogo-comercial";

export default function NavBar() {
  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          aria-label="Help PC, início"
          className="flex w-fit items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary"
        >
          <Image
            src={logo}
            alt=""
            width={48}
            height={48}
            priority
            className="h-12 w-12 object-contain"
          />
          <span className="text-xl font-black text-slate-900">Help PC</span>
        </Link>

        <nav aria-label="Orçamentos" className="grid grid-cols-2 gap-2 sm:flex">
          <Link
            href="/contato"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-help-pc-primary px-3 py-2 text-center text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-help-pc-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary focus-visible:ring-offset-2 sm:px-4 sm:text-sm"
          >
            Orçar pelo site
          </Link>
          <a
            href={gerarLinkWhatsApp(
              "Olá, vim pelo site da Help PC e gostaria de solicitar um orçamento.",
              "navegação principal",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-help-pc-accent px-3 py-2 text-center text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-help-pc-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary focus-visible:ring-offset-2 sm:px-4 sm:text-sm"
          >
            Orçar pelo WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
