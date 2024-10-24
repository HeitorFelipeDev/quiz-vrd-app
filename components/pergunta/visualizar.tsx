import { Pergunta } from "@/types/quiz";

interface VisualizarPerguntaProps {
  pergunta: Pergunta;
  onClose: () => void;
}

export default function VisualizarPerguntaComponent({
  pergunta,
  onClose,
}: VisualizarPerguntaProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-white p-8 rounded-md w-[600px]">
        <h2 className="text-3xl font-bold mb-6">Visualizar Pergunta</h2>
        <h3 className="text-2xl mb-4">{pergunta.pergunta}</h3>
        <ul className="mb-4">
          {Object.entries(pergunta.respostas).map(([chave, valor]) => (
            <li key={chave} className="flex items-center gap-2">
              <span className="font-bold">{chave.toUpperCase()}:</span> {valor}
            </li>
          ))}
        </ul>
        <p className="mb-4">
          <strong>Dica:</strong> {pergunta.dica}
        </p>
        <p className="mb-4">
          <strong>Resposta:</strong> Alternativa <span className="uppercase">{pergunta.respostaCorreta}</span>
        </p>
        <button
          onClick={onClose}
          className="p-4 bg-vrd_verde text-white rounded-md font-bold"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
