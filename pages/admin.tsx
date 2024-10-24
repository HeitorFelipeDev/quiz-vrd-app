import {
  obterPerguntasDoLocalStorage,
  salvarPerguntasNoLocalStorage,
} from "@/utils/storage";
import { useEffect, useState } from "react";
import { Pergunta } from "@/types/quiz";
import { FaTrashAlt, FaRegEdit, FaEye } from "react-icons/fa";
import AdicionarPerguntaComponent from "@/components/pergunta/adicionar";
import VisualizarPerguntaComponent from "@/components/pergunta/visualizar";
import EditarPerguntaComponent from "@/components/pergunta/editar";
import { v4 as uuidv4 } from 'uuid';

export default function Admin() {
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [perguntasPorPagina] = useState(2);
  const [categoria, setCategoria] = useState<"todas" | "infantil" | "adulto">(
    "todas"
  );
  const [showAdicionarPergunta, setShowAdicionarPergunta] = useState(false);

  useEffect(() => {
    // Carrega perguntas do local storage ao inicializar o componente
    const todasPerguntas = obterPerguntasDoLocalStorage();
    setPerguntas(todasPerguntas);
  }, []);

  const adicionarPergunta = (novaPergunta: Omit<Pergunta, 'id'>) => {
    const perguntaComId: Pergunta = { ...novaPergunta, id: uuidv4() }; // Adiciona o ID
    setPerguntas((prevPerguntas) => {
      const novasPerguntas: Pergunta[] = [...prevPerguntas, perguntaComId]; // Define o tipo aqui
      salvarPerguntasNoLocalStorage(novasPerguntas);
      return novasPerguntas; 
    });
  };

  const excluirPergunta = (perguntaParaExcluir: Pergunta) => {
    setPerguntas((prevPerguntas) => {
      const novasPerguntas = prevPerguntas.filter(
        (pergunta) => pergunta.id !== perguntaParaExcluir.id
      );
      salvarPerguntasNoLocalStorage(novasPerguntas);
      return novasPerguntas;
    });
  };
  
  const [perguntaEditada, setPerguntaEditada] = useState<Pergunta | null>(null);
  const editarPergunta = (perguntaAtualizada: Pergunta) => {
    setPerguntas((prevPerguntas) =>
      prevPerguntas.map((p) =>
        p.id === perguntaAtualizada.id ? perguntaAtualizada : p
      )
    );
    setPerguntaEditada(null);
  };

  const handleEditClick = (pergunta: Pergunta) => {
    setPerguntaEditada(pergunta);
  };

  const [perguntaVisualizada, setPerguntaVisualizada] =
    useState<Pergunta | null>(null);

  const visualizarPergunta = (pergunta: Pergunta) => {
    setPerguntaVisualizada(pergunta);
  };

  const perguntasFiltradas = perguntas.filter(
    (pergunta) => categoria === "todas" || pergunta.categoria === categoria
  );

  const totalPaginas = Math.ceil(
    perguntasFiltradas.length / perguntasPorPagina
  );
  const perguntasSelecionadas = perguntasFiltradas.slice(
    (paginaAtual - 1) * perguntasPorPagina,
    paginaAtual * perguntasPorPagina
  );

  return (
    <div className="p-[36px] w-screen flex flex-col min-h-screen">
      <header className="flex items-center justify-between w-full">
        <div className="flex gap-2 items-center">
          <img src="/logo-vrd.png" className="w-32" alt="Logo ViaRondon" />
          <h1 className="text-3xl font-extrabold text-vrd_verde">
            Admin Dashboard
          </h1>
        </div>
        <div className="flex gap-4 items-center">
          <h3 className="text-xl font-bold uppercase text-zinc-400">
            Categorias
          </h3>
          <select
            value={categoria}
            onChange={(e) =>
              setCategoria(e.target.value as "todas" | "infantil" | "adulto")
            }
            className="py-4 px-3 w-48 rounded-md bg-vrd_branco outline-none"
          >
            <option value="todas">Todas</option>
            <option value="infantil">Infantil</option>
            <option value="adulto">Adulto</option>
          </select>
        </div>
        <div className="buttons flex gap-10">
          <button
            className="p-6 text-xl rounded-md bg-red-600 text-white font-bold"
            onClick={() => {
              setPerguntas([]);
              salvarPerguntasNoLocalStorage([]);
            }}
          >
            Apagar todas
          </button>
          <button
            className={`p-6 text-xl rounded-md bg-vrd_verde text-white font-bold ${
              showAdicionarPergunta && "z-10"
            }`}
            onClick={() => setShowAdicionarPergunta(!showAdicionarPergunta)}
          >
            {showAdicionarPergunta ? "Fechar" : "Adicionar Pergunta"}
          </button>
        </div>
      </header>

      <section className="perguntas-cadastradas mt-10 flex-grow">
        <ul>
          {perguntasSelecionadas.length > 0 ? (
            perguntasSelecionadas.map((pergunta, index) => (
              <li
                key={index}
                className="border-b p-10 bg-vrd_branco mb-5 rounded-md flex items-center justify-between"
              >
                <h3 className="text-2xl font-medium">{pergunta.pergunta}</h3>
                <div className="buttons flex gap-5">
                  <button
                    onClick={() => visualizarPergunta(pergunta)}
                    className="w-16 h-16 bg-zinc-400 rounded-lg text-white flex justify-center items-center"
                  >
                    <FaEye size={30} />
                  </button>
                  <button
                    onClick={() => handleEditClick(pergunta)}
                    className="w-16 h-16 bg-vrd_amarelo rounded-lg text-white flex justify-center items-center"
                  >
                    <FaRegEdit size={30} />
                  </button>
                  <button
                    onClick={() => excluirPergunta(pergunta)}
                    className="w-16 h-16 bg-red-600 rounded-lg text-white flex justify-center items-center"
                  >
                    <FaTrashAlt size={30} />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="py-2 text-3xl text-gray-500 text-center">
              Nenhuma pergunta cadastrada.
            </li>
          )}
        </ul>
      </section>

      {showAdicionarPergunta && (
        <div className="mt-6">
          <AdicionarPerguntaComponent adicionarPergunta={adicionarPergunta} />
        </div>
      )}

      {perguntaVisualizada && (
        <VisualizarPerguntaComponent
          pergunta={perguntaVisualizada}
          onClose={() => setPerguntaVisualizada(null)}
        />
      )}

      {perguntaEditada && (
        <EditarPerguntaComponent
          pergunta={perguntaEditada}
          onSave={editarPergunta}
          onClose={() => setPerguntaEditada(null)}
        />
      )}

      <div className="pagination items-center fixed bottom-[36px] left-[36px] right-[36px] flex justify-between mt-4">
        <button
          onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
          disabled={paginaAtual === 1}
          className={`p-6 px-20 text-xl rounded-md ${
            paginaAtual === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-vrd_amarelo"
          } text-white font-bold`}
        >
          Anterior
        </button>
        <span className="text-zinc-600 font-medium">
          Página {paginaAtual} de {totalPaginas || 1}
        </span>
        <button
          onClick={() =>
            setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))
          }
          disabled={paginaAtual === totalPaginas}
          className={`p-6 px-20 text-xl rounded-md ${
            paginaAtual === totalPaginas
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-vrd_verde"
          } text-white font-bold`}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
