import Image from "next/image";
import logo from "@/public/HelpIcon.svg";
import Link from "next/dist/client/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image src={logo} alt="Logo" width={80} height={100} loading="lazy" className="w-20 h-20 rounded"/>

      <section className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-center">
          Bem-vindo à Help PC!
        </h1>
        <p className="text-lg text-center">
          A melhor assistência técnica de Dourados-MS, oferecendo serviços de qualidade para o seu computador.
        </p>
      </section>

      <section className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold">Entre em <Link href="/contato" className="text-blue-500 hover:underline">Contato</Link></h2>
        <p className="text-lg text-center">
          Para mais informações ou para agendar um serviço, entre em contato conosco!
        </p>
      </section>

    </main>
  );
}
