"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import logo from "@/public/HelpIcon.svg";
import {
  BsEnvelope,
  BsHouse,
  BsInfoCircle,
  BsList,
  BsTools,
  BsX,
} from "@/app/components/icons";
import ThemeToggle from "@/app/components/ThemeToggle";

const navigation = [
  { href: "/", label: "Início", Icon: BsHouse },
  { href: "/sobre", label: "Sobre", Icon: BsInfoCircle },
  { href: "/servicos", label: "Serviços", Icon: BsTools },
  { href: "/contato", label: "Contato", Icon: BsEnvelope },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  function renderNavigation(isMobile = false) {
    return navigation.map(({ href, label, Icon }) => {
      const isActive = pathname === href;

      return (
        <Link
          key={href}
          href={href}
          aria-label={label}
          aria-current={isActive ? "page" : undefined}
          onClick={() => isMobile && setIsMobileOpen(false)}
          className={twMerge(
            clsx(
              "flex items-center gap-3 border-l-4 px-4 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary",
              isActive
                ? "border-help-pc-primary bg-help-pc-primary/10 text-help-pc-primary"
                : "border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
            ),
          )}
        >
          <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span>{label}</span>
        </Link>
      );
    });
  }

  return (
    <>
      <button
        type="button"
        aria-label={isMobileOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isMobileOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsMobileOpen((open) => !open)}
        className="fixed bottom-5 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-help-pc-primary text-xl text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-help-pc-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary focus-visible:ring-offset-2 lg:hidden"
      >
        {isMobileOpen ? <BsX aria-hidden="true" /> : <BsList aria-hidden="true" />}
      </button>

      {isMobileOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-help-pc-dark/50 transition-opacity duration-200 lg:hidden"
        />
      )}

      <aside
        id="mobile-navigation"
        aria-hidden={!isMobileOpen}
        inert={!isMobileOpen}
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white px-4 py-6 shadow-xl transition-transform duration-200 lg:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent renderNavigation={() => renderNavigation(true)} />
      </aside>

      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-6 lg:flex">
        <SidebarContent renderNavigation={renderNavigation} />
      </aside>
    </>
  );
}

function SidebarContent({ renderNavigation }: { renderNavigation: () => ReactNode }) {
  return (
    <>
      <Link
        href="/"
        aria-label="HelpPC, início"
        className="mb-10 flex items-center gap-3 rounded-xl px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary"
      >
        <Image
          src={logo}
          alt=""
          width={44}
          height={44}
          className="h-11 w-11 shrink-0 rounded-lg object-contain"
        />
        <span className="text-xl font-black text-slate-900">Help PC</span>
      </Link>

      <nav role="navigation" aria-label="Navegação principal" className="flex-1">
        <ul className="space-y-1">{renderNavigation()}</ul>
      </nav>

      <div className="mt-6 border-t border-slate-200 pt-5">
        <ThemeToggle />
        <p className="px-4 pb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          Precisa de ajuda?
        </p>
        <Link
          href="/contato"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary"
        >
          <BsEnvelope className="h-5 w-5" aria-hidden="true" />
          Fale com a Help PC
        </Link>
      </div>
    </>
  );
}
