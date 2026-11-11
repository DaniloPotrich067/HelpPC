import Sidebar from "@/app/layout/Sidebar";
import Footer from "@/app/layout/Footer";
import { dadosComerciais } from "@/app/lib/catalogo-comercial";
import { siteUrl } from "@/app/lib/site";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ComputerStore",
        "@id": `${siteUrl}/#negocio`,
        name: dadosComerciais.nome,
        telephone: dadosComerciais.contato.telefoneE164,
        url: siteUrl,
        logo: `${siteUrl}/HelpIcon.svg`,
        image: `${siteUrl}/opengraph-image`,
        address: {
          "@type": "PostalAddress",
          addressLocality: dadosComerciais.local.cidade,
          addressRegion: dadosComerciais.local.estado,
          addressCountry: "BR",
        },
        areaServed: {
          "@type": "City",
          name: dadosComerciais.local.cidade,
        },
        description:
          "Assistência técnica, formatação, manutenção e suporte para computadores e notebooks em Dourados-MS.",
        sameAs: [
          dadosComerciais.contato.instagram,
          dadosComerciais.contato.facebook,
        ],
      }),
    }}
  />
  {/* 2. A Sidebar agora fica no lugar correto (lado esquerdo) */}
  <Sidebar />

  {/* 3. Criamos um container para o conteúdo e o Footer (lado direito) */}
  <div className="flex min-h-screen min-w-0 flex-1 flex-col pt-14 lg:pt-0">
    {/* O main vai ocupar todo o espaço restante e empurrar o Footer para o rodapé */}
    <main className="flex-1">{children}</main>

    {/* O Footer agora fica fixo na base deste container da direita */}
    <Footer />
  </div>
    </>
  );
}
