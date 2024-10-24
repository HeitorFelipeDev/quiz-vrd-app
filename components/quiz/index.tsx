import { useEffect, useState } from "react";
import { Pergunta } from "@/types/quiz";
import { obterPerguntasDoLocalStorage } from "@/utils/storage";
import PerguntaComponent from "../pergunta";
import ResultadoComponent from "../resultado";
import { GoLightBulb } from "react-icons/go";
import DicaComponent from "../dica";

interface IQuiz {
  categoria: Pergunta["categoria"];
}

export default function QuizComponent({ categoria }: IQuiz) {
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [alternativaSelecionada, setAlternativaSelecionada] = useState<
    string | null
  >(null);
  const [alternativaEscolhida, setAlternativaEscolhida] = useState<
    string | null
  >(null);
  const [mostrarDica, setMostrarDica] = useState(false);
  const [dicaUsadaNaPergunta, setDicaUsadaNaPergunta] = useState(false);
  const [botaoProximoDesabilidato, setBotaoProximoDesabilidato] =
    useState(false);

  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [dicasUsadas, setDicasUsadas] = useState(0);

  useEffect(() => {
    const todasPerguntas = obterPerguntasDoLocalStorage();

    const perguntasFiltradas = todasPerguntas.filter(
      (pergunta) => pergunta.categoria === categoria
    );

    const perguntasSelecionadas = perguntasFiltradas
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

    setPerguntas(perguntasSelecionadas);
  }, [categoria]);

  function verificarResposta() {
    setBotaoProximoDesabilidato(true);

    if (alternativaSelecionada) {
      setAlternativaEscolhida(alternativaSelecionada.toLowerCase());

      if (
        alternativaSelecionada ===
        perguntas[perguntaAtual].respostaCorreta.toLowerCase()
      ) {
        setAcertos((acertos) => acertos + 1);
      } else {
        setErros((erros) => erros + 1);
      }

      setTimeout(() => {
        proximaPergunta();
      }, 1000);
    }
  }

  function proximaPergunta() {
    setBotaoProximoDesabilidato(false);
    setAlternativaSelecionada(null);
    setAlternativaEscolhida(null);
    setDicaUsadaNaPergunta(false);
    setMostrarDica(false);
    setPerguntaAtual(perguntaAtual + 1);
  }

  function handleMostrarDica() {
    setDicaUsadaNaPergunta(true);
    setMostrarDica(!mostrarDica);
    if (!dicaUsadaNaPergunta) {
      setDicasUsadas((prev) => prev + 1);
    }
  }

  function desistir() {
    console.log("desistiu");
    setPerguntaAtual(0);
    setAlternativaSelecionada(null);
    setAlternativaEscolhida(null);
    setAcertos(0);
    setErros(0);
    setDicasUsadas(0);
    window.location.href = "/quiz";
  }

  function finalizarQuiz() {
    window.location.href = "/";
  }

  return (
    <div>
      {perguntas.length > 0 ? (
        perguntaAtual < perguntas.length ? (
          <div className="p-[36px] px-28">
            <header className="flex justify-between items-center mb-5">
              <h1 className="text-3xl text-zinc-400 font-bold text-center">
                {perguntaAtual + 1}/{perguntas.length}
              </h1>
              <div
                className="dica flex items-center"
                onClick={handleMostrarDica}
              >
                <div className="icon bg-vrd_amarelo flex items-center justify-center rounded-full w-14 h-14">
                  <GoLightBulb className="text-white" size={30} />
                </div>
                <p className="text-xl ml-[-20px] pl-6 pr-3 -z-10 text-white font-bold text-center bg-vrd_verde py-2 rounded-md">
                  Dica <span>{dicasUsadas}/5</span>
                </p>
              </div>
            </header>
            <PerguntaComponent
              id={perguntas[perguntaAtual].id}
              categoria={perguntas[perguntaAtual].categoria}
              pergunta={perguntas[perguntaAtual].pergunta}
              respostas={perguntas[perguntaAtual].respostas}
              respostaCorreta={perguntas[perguntaAtual].respostaCorreta}
              respostaCerta={perguntas[
                perguntaAtual
              ].respostaCorreta.toLocaleLowerCase()}
              alternativaEscolhida={alternativaEscolhida}
              dica={perguntas[perguntaAtual].dica}
              selecionarAlternativa={setAlternativaSelecionada}
            />
            <section className="buttons-container flex justify-between">
              <button
                onClick={desistir}
                className="bg-red-600 p-4 px-20 w-max rounded-md text-white font-bold"
              >
                Desistir
              </button>
              <button
                disabled={botaoProximoDesabilidato}
                onClick={verificarResposta}
                className="bg-vrd_verde p-4 px-20 w-max rounded-md text-white font-bold"
              >
                Responder
              </button>
            </section>
          </div>
        ) : (
          <div className="h-screen flex items-center flex-col justify-between p-10">
            <ResultadoComponent
              quantidadePerguntas={perguntas.length}
              acertos={acertos}
              erros={erros}
              dicasUsadas={dicasUsadas}
            />
            <button
              onClick={finalizarQuiz}
              className="bg-vrd_verde p-4 float-right px-20 w-max rounded-md text-white font-bold"
            >
              Finalizar
            </button>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center h-screen p-10 text-6xl uppercase font-bold">
          Sem Perguntas Cadastradas
        </div>
      )}

      {mostrarDica && (
        <DicaComponent
          fecharDica={handleMostrarDica}
          perguntas={perguntas}
          perguntaAtual={perguntaAtual}
        />
      )}
    </div>
  );
}
