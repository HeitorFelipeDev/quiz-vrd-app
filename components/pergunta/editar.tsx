import { useState } from "react";
import { Pergunta } from "@/types/quiz";

interface IEditarPergunta {
  pergunta: Pergunta;
  onSave: (perguntaAtualizada: Pergunta) => void;
  onClose: () => void;
}

export default function EditarPerguntaComponent({
  pergunta,
  onSave,
  onClose,
}: IEditarPergunta) {
  const [perguntaTexto, setPerguntaTexto] = useState<string>(pergunta.pergunta);
  const [respostas, setRespostas] = useState<Pergunta['respostas']>(pergunta.respostas);
  const [dica, setDica] = useState<string>(pergunta.dica);
  const [respostaCorreta, setRespostaCorreta] = useState<keyof Pergunta['respostas']>(pergunta.respostaCorreta);

  const handleSave = () => {
    const perguntaAtualizada: Pergunta = {
      ...pergunta,
      pergunta: perguntaTexto,
      respostas: respostas,
      dica,
      respostaCorreta,
    };
    onSave(perguntaAtualizada);
  };

  const handleRespostaChange = (key: keyof Pergunta['respostas'], value: string) => {
    setRespostas((prevRespostas) => ({
      ...prevRespostas,
      [key]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-white p-8 rounded-md w-[800px]"> {/* Aumentando a largura do modal */}
        <h2 className="text-3xl font-bold mb-6">Editar Pergunta</h2>

        <div className="mb-4">
          <label className="block mb-2">Pergunta:</label>
          <input
            type="text"
            value={perguntaTexto}
            onChange={(e) => setPerguntaTexto(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <h3 className="text-xl mb-2">Alternativas:</h3>
        <div className="grid grid-cols-2 gap-4"> {/* Usando grid para alternativas */}
          {Object.entries(respostas).map(([key, value]) => (
            <div key={key} className="mb-2">
              <label className="block mb-1">{key.toUpperCase()}:</label>
              <input
                type="text"
                value={value}
                onChange={(e) => handleRespostaChange(key as keyof Pergunta['respostas'], e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Dica:</label>
          <input
            type="text"
            value={dica}
            onChange={(e) => setDica(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Resposta Correta:</label>
          <input
            type="text"
            value={respostaCorreta}
            onChange={(e) => setRespostaCorreta(e.target.value as keyof Pergunta['respostas'])}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={handleSave}
            className="p-4 bg-vrd_verde text-white rounded-md font-bold"
          >
            Salvar
          </button>
          <button
            onClick={onClose}
            className="p-4 bg-red-600 text-white rounded-md font-bold"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
