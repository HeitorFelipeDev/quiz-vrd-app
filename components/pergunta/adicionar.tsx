import { useState } from "react";
import { Pergunta } from "@/types/quiz";

interface IAdicionarPergunta {
  adicionarPergunta: (novaPergunta: Pergunta) => void;
}

export default function AdicionarPerguntaComponent({
  adicionarPergunta,
}: IAdicionarPergunta) {
  const [step, setStep] = useState(1); 
  const [pergunta, setPergunta] = useState("");
  const [respostas, setRespostas] = useState({
    a: "",
    b: "",
    c: "",
    d: "",
  });
  
  const [respostaCorreta, setRespostaCorreta] = useState<Pergunta["respostaCorreta"] | "">("");
  const [dica, setDica] = useState("");
  const [categoria, setCategoria] = useState<"infantil" | "adulto">("infantil");
  const [error, setError] = useState("");

  const handleNextStep = () => {
    if (step === 1 && !pergunta) {
      setError("A pergunta é obrigatória");
      return;
    }
    if (
      step === 2 &&
      (!respostas.a ||
        !respostas.b ||
        !respostas.c ||
        !respostas.d ||
        !respostaCorreta)
    ) {
      setError("Todas as respostas e a correta são obrigatórias");
      return;
    }
    if (step === 3 && !dica) {
      setError("A dica é obrigatória");
      return;
    }
    setError("");
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleAdicionarPergunta = () => {
    if (!pergunta || !respostaCorreta || !dica || !categoria || !respostas) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    const novaPergunta: Pergunta = {
      pergunta,
      respostas,
      dica,
      respostaCorreta,
      categoria,
    };

    adicionarPergunta(novaPergunta);
    
    setPergunta("");
    setRespostas({ a: "", b: "", c: "", d: "" });
    setRespostaCorreta(""); // Limpa o estado da resposta correta
    setCategoria("infantil");
    setDica("");
    setStep(1);
    setError("");
  };

  return (
    <div className="w-screen h-screen bg-black bg-opacity-70 flex items-center justify-center top-0 left-0 absolute">
      <div className="bg-white p-8 rounded-md w-[580px]">
        <h2 className="text-2xl font-bold mb-4">Adicionar Pergunta</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {/* Etapa 1: Pergunta */}
        {step === 1 && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Pergunta"
              value={pergunta}
              onChange={(e) => setPergunta(e.target.value)}
              className="w-full text-xl outline-none p-6 border border-gray-400 rounded-md"
            />
          </div>
        )}

        {/* Etapa 2: Respostas */}
        {step === 2 && (
          <>
            <div className="mb-4">
              <label className="block text-xl font-bold mb-2">Resposta A:</label>
              <input
                type="text"
                value={respostas.a}
                onChange={(e) =>
                  setRespostas({ ...respostas, a: e.target.value })
                }
                className="w-full p-4 border border-gray-400 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xl font-bold mb-2">Resposta B:</label>
              <input
                type="text"
                value={respostas.b}
                onChange={(e) =>
                  setRespostas({ ...respostas, b: e.target.value })
                }
                className="w-full p-4 border border-gray-400 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xl font-bold mb-2">Resposta C:</label>
              <input
                type="text"
                value={respostas.c}
                onChange={(e) =>
                  setRespostas({ ...respostas, c: e.target.value })
                }
                className="w-full p-4 border border-gray-400 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xl font-bold mb-2">Resposta D:</label>
              <input
                type="text"
                value={respostas.d}
                onChange={(e) =>
                  setRespostas({ ...respostas, d: e.target.value })
                }
                className="w-full p-4 border border-gray-400 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xl font-bold mb-2">Resposta Correta:</label>
              <input
                type="text"
                value={respostaCorreta}
                onChange={(e) => {
                  const value = e.target.value as Pergunta["respostaCorreta"]; 
                  setRespostaCorreta(value);
                }}
                className="w-full p-4 border border-gray-400 rounded-md"
              />
            </div>
          </>
        )}

        {/* Etapa 3: Dica */}
        {step === 3 && (
          <div className="mb-4">
            <label className="block text-xl font-bold mb-2">Dica:</label>
            <input
              type="text"
              value={dica}
              onChange={(e) => setDica(e.target.value)}
              className="w-full p-4 border border-gray-400 rounded-md"
            />
          </div>
        )}

        {/* Etapa 4: Categoria */}
        {step === 4 && (
          <div className="mb-4">
            <label className="block text-xl font-bold mb-2">Categoria:</label>
            <select
              value={categoria}
              onChange={(e) =>
                setCategoria(e.target.value as "infantil" | "adulto")
              }
              className="w-full p-4 border border-gray-400 rounded-md"
            >
              <option value="infantil">Infantil</option>
              <option value="adulto">Adulto</option>
            </select>
          </div>
        )}

        {/* Navegação entre etapas */}
        <div className="flex justify-between items-end mt-4">
          {step > 1 && (
            <button
              onClick={handlePrevStep}
              className="h-16 px-10 bg-vrd_amarelo text-white font-bold rounded-md"
            >
              Voltar
            </button>
          )}

          {step < 4 ? (
            <button
              onClick={handleNextStep}
              className="h-16 px-10 bg-vrd_verde mt-10 text-white font-bold rounded-md"
            >
              Avançar
            </button>
          ) : (
            <button
              onClick={handleAdicionarPergunta}
              className="p-4 bg-vrd_verde text-white font-bold rounded-md"
            >
              Adicionar Pergunta
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
