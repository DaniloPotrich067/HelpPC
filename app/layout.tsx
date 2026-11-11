import type { Metadata } from "next";
import { siteUrl } from "@/app/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Assistência Técnica de Computadores em Dourados | Help PC",
    template: "%s | Help PC Dourados",
  },
  description:
    "Assistência técnica em Dourados-MS: formatação, manutenção e suporte para computadores e notebooks. Consulte serviços e solicite um orçamento à Help PC.",
  applicationName: "Help PC",
  category: "technology",
  icons: { icon: [{ url: "/HelpIcon.svg", type: "image/svg+xml" }] },
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
    card: "summary_large_image",
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
        {children}
      </body>
    </html>
  );
}
