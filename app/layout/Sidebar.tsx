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
              "flex min-h-12 items-center gap-3 border-l-4 px-4 py-3 text-base lg:text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary",
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
      <header className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
        <Link
          href="/"
          aria-label="Help PC, início"
          className="flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary"
        >
          <Image
            src={logo}
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 shrink-0 object-contain"
          />
          <span className="text-lg font-black text-slate-900">Help PC</span>
        </Link>
        <button
          type="button"
          aria-label="Abrir menu"
          aria-expanded={isMobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMobileOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-lg bg-help-pc-primary text-2xl text-white transition-colors hover:bg-help-pc-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary focus-visible:ring-offset-2"
        >
          <BsList aria-hidden="true" />
        </button>
      </header>

      {isMobileOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-help-pc-dark/60 transition-opacity duration-200 lg:hidden"
        />
      )}

      <aside
        id="mobile-navigation"
        aria-hidden={!isMobileOpen}
        inert={!isMobileOpen}
        className={`fixed inset-y-0 left-0 z-50 flex w-[80vw] max-w-72 flex-col overflow-y-auto border-r border-slate-200 bg-white px-4 py-6 shadow-xl transition-transform duration-200 lg:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setIsMobileOpen(false)}
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-lg text-2xl text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary"
        >
          <BsX aria-hidden="true" />
        </button>
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
