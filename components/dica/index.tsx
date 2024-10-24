import { Pergunta } from "@/types/quiz"

interface IDica {
  perguntas: Array<Pergunta>;
  perguntaAtual: number;
  fecharDica: () => void;
}

export default function DicaComponent({
  perguntas,
  perguntaAtual,
  fecharDica
}: IDica) {
  return (
    <section className="absolute top-0 left-0 flex items-center justify-center h-screen w-screen bg-black bg-opacity-60">
      <div className="bg-[#00583F] bg-opacity-95 w-max h-[400px] p-10 flex items-center justify-between flex-col text-white text-center">
        <div>
          <h3 className="text-[#FAC922] text-3xl font-bold mb-5">DICA</h3>
          <p className="text-xl">{perguntas[perguntaAtual].dica}</p>
        </div>
        <button
          className="bg-[#FAC922] p-4 px-20 w-max rounded-md font-bold"
          onClick={() => fecharDica()}
        >
          Fechar
        </button>
      </div>
    </section>
  );
}
