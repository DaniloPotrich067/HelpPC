import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./layout/Sidebar";
import Footer from "./layout/Footer";

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: {
    default: "Assistência Técnica de Computadores em Dourados | Help PC",
    template: "%s | Help PC Dourados",
  },
  description:
    "Assistência técnica em Dourados-MS: formatação, manutenção e suporte para computadores e notebooks. Consulte serviços e solicite um orçamento à Help PC.",
  applicationName: "Help PC",
  category: "technology",
  icons: { icon: "/HelpIcon.svg" },
  keywords: [
    "assistência técnica em Dourados",
    "assistência técnica de computadores Dourados MS",
    "formatação de computador em Dourados",
    "manutenção de notebook em Dourados",
    "suporte técnico de informática Dourados",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Help PC",
    title: "Assistência Técnica de Computadores em Dourados | Help PC",
    description:
      "Formatação, manutenção e suporte para computadores e notebooks em Dourados-MS. Solicite seu orçamento.",
  },
  twitter: {
    card: "summary",
    title: "Assistência Técnica de Computadores em Dourados | Help PC",
    description:
      "Formatação, manutenção e suporte para computadores e notebooks em Dourados-MS.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full">
      {/* 1. Mudamos a body para englobar TUDO o que aparece na tela */}
      <body className="min-h-screen flex m-0 p-0 bg-gray-50 text-slate-900 dark:bg-help-pc-dark dark:text-slate-100">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Help PC",
              telephone: "+55-67-99900-1081",
              url: process.env.NEXT_PUBLIC_SITE_URL || undefined,
              logo: process.env.NEXT_PUBLIC_SITE_URL
                ? `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/HelpIcon.svg`
                : undefined,
              areaServed: { "@type": "City", name: "Dourados" },
              description:
                "Assistência técnica, formatação, manutenção e suporte para computadores e notebooks em Dourados-MS.",
              sameAs: [
                "https://www.instagram.com/helppc_067/",
                "https://www.facebook.com/profile.php?id=61593173941226",
              ],
            }),
          }}
        />
        {/* 2. A Sidebar agora fica no lugar correto (lado esquerdo) */}
        <Sidebar />

        {/* 3. Criamos um container para o conteúdo e o Footer (lado direito) */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* O main vai ocupar todo o espaço restante e empurrar o Footer para o rodapé */}
          <main className="flex-1 p-6">{children}</main>

          {/* O Footer agora fica fixo na base deste container da direita */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
