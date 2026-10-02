import { BsInstagram, BsFacebook, BsWhatsapp } from "react-icons/bs";
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <p className="text-center">
        &copy; {new Date().getFullYear()} Help PC. Todos os direitos reservados.
      </p>
      <div className="flex justify-center space-x-4 mt-2">
        <a
          href="https://www.instagram.com/helppc_067/"
          className="hover:text-blue-500"
        >
          <BsInstagram />
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61593173941226"
          className="hover:text-blue-500"
        >
          <BsFacebook />
        </a>
        <a
          href="https://wa.me/5567999001081?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Help%20PC%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os.%20Podem%20me%20ajudar%3F%20%F0%9F%92%BB&utm_source=site&utm_medium=whatsapp&utm_campaign=geracao_de_leads"
          className="hover:text-green-500"
        >
          <BsWhatsapp />
        </a>
      </div>
    </footer>
  );
}
