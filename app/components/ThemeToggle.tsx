"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

type Theme = "light" | "dark";

const STORAGE_KEY = "helppc-theme";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
  window.dispatchEvent(new CustomEvent("helppc-theme-change", { detail: theme }));
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    const savedTheme: Theme | null =
      storedTheme === "dark" || storedTheme === "light" ? storedTheme : null;
    const initialTheme = savedTheme ?? (media.matches ? "dark" : "light");

    applyTheme(initialTheme);
    setTheme(initialTheme);

    function syncToggle(event: Event) {
      setTheme((event as CustomEvent<Theme>).detail);
    }

    function syncSystemTheme(event: MediaQueryListEvent) {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        const nextTheme = event.matches ? "dark" : "light";
        applyTheme(nextTheme);
        setTheme(nextTheme);
      }
    }

    media.addEventListener("change", syncSystemTheme);
    window.addEventListener("helppc-theme-change", syncToggle);
    return () => {
      media.removeEventListener("change", syncSystemTheme);
      window.removeEventListener("helppc-theme-change", syncToggle);
    };
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
    setTheme(nextTheme);
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      aria-pressed={isDark}
      className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary"
    >
      {isDark ? (
        <FaSun className="h-5 w-5 shrink-0" aria-hidden="true" />
      ) : (
        <FaMoon className="h-5 w-5 shrink-0" aria-hidden="true" />
      )}
      <span>{isDark ? "Modo claro" : "Modo escuro"}</span>
    </button>
  );
}
