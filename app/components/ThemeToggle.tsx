"use client";

import { useEffect, useSyncExternalStore } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

type Theme = "light" | "dark";

const STORAGE_KEY = "helppc-theme";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: theme }));
}

const THEME_EVENT = "helppc-theme-change";

function readStoredTheme(): Theme | null {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "dark" || stored === "light" ? stored : null;
}

// A fonte da verdade é a classe "dark" no <html>; o componente apenas a observa.
function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  function syncSystemTheme(event: MediaQueryListEvent) {
    if (!readStoredTheme()) {
      applyTheme(event.matches ? "dark" : "light");
    }
  }

  media.addEventListener("change", syncSystemTheme);
  window.addEventListener(THEME_EVENT, onChange);

  return () => {
    media.removeEventListener("change", syncSystemTheme);
    window.removeEventListener(THEME_EVENT, onChange);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(readStoredTheme() ?? (prefersDark ? "dark" : "light"));
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
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
