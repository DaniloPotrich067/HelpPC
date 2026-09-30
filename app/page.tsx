import Image from "next/image";
import logo from "@/public/HelpIcon.svg";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image src={logo} alt="Logo" width={80} height={100} loading="lazy" />

      <section className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-center">
          Bem-vindo à Help PC!
        </h1>
        <p className="text-lg text-center">
          A melhor assistência técnica de Dourados-MS, oferecendo serviços de qualidade para o seu computador.
        </p>
      </section>

      <section className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold">Nossos Serviços</h2>
        <ul className="list-disc list-inside text-lg">
          <li>Manutenção de Hardware</li>
          <li>Reparo de Software</li>
          <li>Instalação de Sistemas Operacionais</li>
          <li>Recuperação de Dados</li>
          <li>Consultoria Técnica</li>
        </ul>
      </section>

      <section className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold">Entre em Contato</h2>
        <p className="text-lg text-center">
          Para mais informações ou para agendar um serviço, entre em contato conosco!
        </p>
      </section>

    </main>
  );
}
