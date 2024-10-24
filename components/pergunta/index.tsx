import { Pergunta } from "@/types/quiz";
import logo from "../../public/logo-vrd.png";
import { useState } from "react";

interface IPergunta extends Pergunta {
  selecionarAlternativa: (alternativa: string) => void;
  alternativaEscolhida: string | null;
  respostaCerta: string;
}

export default function PerguntaComponent({
  pergunta,
  respostas,
  respostaCerta,
  selecionarAlternativa,
  alternativaEscolhida
}: IPergunta) { 

  const [alternativaSelecionada, setAlternativaSelecionada] = useState<string | null>(null);

  function handlerSelecionarAlternativa(alternativa: string) {
    selecionarAlternativa(alternativa);
    setAlternativaSelecionada(alternativa);
  }
  
  return (
    <section className="pergunta-container">
      <section className="pergunta flex bg-[#00583F] p-4 rounded-lg items-center gap-4">
        <img src={logo.src} alt="Logo ViaRondon" />
        <h2 className="text-white font-bold text-4xl">{pergunta}</h2>
      </section>

      <section className="respostas grid grid-cols-2 gap-2 py-5">
        {Object.entries(respostas).map(([alternativa, resposta]) => (
          <button
            key={alternativa} // Use uma key única para cada item
            disabled={alternativaEscolhida !== null} 
            onClick={() => handlerSelecionarAlternativa(alternativa)}
            className={` 
              ${alternativaEscolhida && alternativaEscolhida === alternativa && alternativaEscolhida === respostaCerta ? "bg-vrd_verde text-white"
               : alternativaEscolhida && alternativaEscolhida === alternativa && alternativaEscolhida !== respostaCerta ? "bg-red-500 text-white"
               : alternativaEscolhida && respostaCerta === alternativa ? "bg-vrd_verde text-white" 
               : alternativaSelecionada === alternativa ? "bg-vrd_amarelo text-white" : "bg-vrd_branco text-black"}
              p-10 h-36 rounded-md flex items-center text-left text-2xl`}
          >
            <span className={`text-3xl ${alternativaEscolhida && alternativaEscolhida === alternativa ? "text-white" : (alternativaEscolhida && respostaCerta === alternativa ? "text-white" : "text-vrd_verde")} font-black uppercase mr-3`}>
              {alternativa})
            </span>
            {resposta}
          </button>
        ))}
      </section>
    </section>
  );
}
