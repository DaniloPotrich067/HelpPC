'use client'; // 💡 Necessário para usar o useState e interações de clique

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/HelpIcon.svg";
import { SlArrowLeftCircle } from "react-icons/sl";

export default function Sidebar() {
  // Estado que controla se a sidebar está expandida ou recolhida
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`
        h-screen bg-gray-800 text-white p-4 flex flex-col items-start sticky top-0
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-45" : "w-16"}
      `}
    >
      {/* Botão de recolher/abrir utilizando o ícone da seta */}
      <div className="w-full flex justify-end mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xl cursor-pointer hover:text-blue-400 transition-colors duration-200"
          title={isOpen ? "Recolher menu" : "Expandir menu"}
        >
          {/* Rotaciona a seta se a sidebar estiver fechada */}
          <SlArrowLeftCircle className={`transition-transform duration-300 ${!isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Logo com ajuste condicional para não quebrar o layout quando encolhida */}
      <div className="flex items-center gap-3 mb-4 overflow-hidden">
        <Link href="/">
          <Image src={logo} alt="Logo" width={40} height={40} priority className="flex-shrink-0 rounded" />
        </Link>
        {isOpen && <h2 className="text-xl font-bold transition-opacity duration-300">Menu</h2>}
      </div>

      {/* Links do Menu - Oculta o texto suavemente quando recolhida */}
      <ul className="flex-1 w-full overflow-hidden">
        <li className="mb-2">
          <Link href="/" className="hover:bg-gray-700 rounded p-2 flex items-center gap-3 w-full transition-colors">
            <span className="text-lg">🏠</span>
            {isOpen && <span className="whitespace-nowrap">Home</span>}
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/about" className="hover:bg-gray-700 rounded p-2 flex items-center gap-3 w-full transition-colors">
            <span className="text-lg">ℹ️</span>
            {isOpen && <span className="whitespace-nowrap">Sobre</span>}
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/servicos" className="hover:bg-gray-700 rounded p-2 flex items-center gap-3 w-full transition-colors">
            <span className="text-lg">🛠️</span>
            {isOpen && <span className="whitespace-nowrap">Serviços</span>}
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/contato" className="hover:bg-gray-700 rounded p-2 flex items-center gap-3 w-full transition-colors">
            <span className="text-lg">📲</span>
            {isOpen && <span className="whitespace-nowrap">Contato</span>}
          </Link>
        </li>
      </ul>
    </aside>
  );
}
