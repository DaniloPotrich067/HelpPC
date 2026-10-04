"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
};

export default function Button({
  children,
  onClick,
  href,
  className = "",
}: ButtonProps) {
  const styles = twMerge(
    clsx(
      "inline-flex items-center justify-center rounded-xl bg-help-pc-accent px-5 py-3 text-center font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-help-pc-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary focus-visible:ring-offset-2",
      className,
    ),
  );

  if (href?.startsWith("/")) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={styles}
    >
      {children}
    </button>
  );
}
