import Image from "next/image";
import Link from "next/link";
import logo from "@/public/HelpIcon.svg";
import { FaFacebook, FaHome, FaInstagram, FaWhatsapp } from "react-icons/fa";
import ScrollToTopButton from "@/app/components/ScrollToTopButton";

const whatsappUrl =
  "https://wa.me/5567999001081?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Help%20PC%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os.";

export default function Footer() {
  return (
    <footer className="bg-help-pc-dark px-6 py-12 text-slate-300 md:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
        <div>
          <Link
            href="/"
            aria-label="Help PC, início"
            className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary"
          >
            <Image
              src={logo}
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 rounded-lg object-contain"
            />
            <span className="text-xl font-bold text-white">Help PC</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
            Tecnologia sem complicação. Assistência técnica em Dourados-MS e região.
          </p>
        </div>

        <nav aria-label="Links úteis">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            Links úteis
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary">Início</Link></li>
            <li><Link href="/sobre" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary">Sobre a Help PC</Link></li>
            <li><Link href="/servicos" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary">Serviços</Link></li>
            <li><Link href="/contato" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary">Contato</Link></li>
          </ul>
        </nav>

        <nav aria-label="Serviços">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            Serviços
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/servicos#precos" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary">Formatação e otimização</Link></li>
            <li><Link href="/servicos#precos" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary">Limpeza e manutenção</Link></li>
            <li><Link href="/servicos#precos" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary">Computadores e notebooks</Link></li>
            <li><Link href="/servicos#precos" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary">Impressoras e consoles</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            Fale com a gente
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            Atendimento em Dourados-MS e região, conforme disponibilidade.
          </p>
          <Link
            href="/contato"
            className="mt-4 inline-flex rounded-lg bg-help-pc-primary px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-help-pc-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary focus-visible:ring-offset-2 focus-visible:ring-offset-help-pc-dark"
          >
            Solicitar orçamento
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4" aria-label="Redes sociais">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp da Help PC"
            className="rounded p-1 transition-transform hover:scale-110 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary"
          >
            <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href="https://www.instagram.com/helppc_067/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da Help PC"
            className="rounded p-1 transition-transform hover:scale-110 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary"
          >
            <FaInstagram className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61593173941226"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook da Help PC"
            className="rounded p-1 transition-transform hover:scale-110 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary"
          >
            <FaFacebook className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>

        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} Help PC. Todos os direitos reservados.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded text-sm font-semibold transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-help-pc-primary"
          >
            <FaHome aria-hidden="true" /> Início
          </Link>
          <ScrollToTopButton />
        </div>
      </div>
    </footer>
  );
}
