import Layout from "@/components/layout";
import Link from "next/link";
import { FaGear } from "react-icons/fa6";

export default function Home() {
  return (
    <Layout>
      <div className="w-screen h-screen flex items-center justify-center flex-col">
        <img src="/logo-vrd.png" alt="Logo ViaRondon" />
        <h1 className="text-5xl mt-10 mb-5 uppercase font-extrabold text-vrd_verde">Bem-vindo ao Quiz!</h1>
        <p className="text-2xl mb-20 text-center w-[50%]">Olá! Este é o quiz da ViaRondon. Feito para testar seus conhecimentos sobre rodovias de um jeito fácil e divertido. Clique em <strong className="text-vrd_amarelo">Iniciar Quiz</strong> e boa sorte! :)</p>
        <Link href="/quiz">
          <button className="bg-[#00583F] p-4 px-20 w-max rounded-md text-white font-bold">
            Iniciar Quiz
          </button>
        </Link>
        <div className="w-20 h-20 absolute top-10 left-10 bg-zinc-100 text-zinc-400 flex items-center justify-center rounded-full">
          <Link href="/login"><FaGear size={40} /></Link>
        </div>
      </div>
    </Layout>
  );
}
