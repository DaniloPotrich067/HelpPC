import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./layout/Sidebar";
import Footer from "./layout/Footer";

export const metadata: Metadata = {
  title: "A melhor assistência técnica de Dourados-MS",
  description:
    "A Help PC é a melhor assistência técnica de Dourados-MS, oferecendo serviços de qualidade para o seu computador.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full">
      {/* 1. Mudamos a body para englobar TUDO o que aparece na tela */}
      <body className="min-h-screen flex m-0 p-0 bg-gray-50 text-slate-900 dark:bg-help-pc-dark dark:text-slate-100">
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
