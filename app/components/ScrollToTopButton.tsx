"use client";

import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="inline-flex items-center gap-2 rounded text-sm font-semibold transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary"
    >
      <FaArrowUp aria-hidden="true" /> Voltar ao topo
    </button>
  );
}
