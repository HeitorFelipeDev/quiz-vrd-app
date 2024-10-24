import { Pergunta } from '../types/quiz';

export const salvarPerguntasNoLocalStorage = (perguntas: Pergunta[]) => {
  localStorage.setItem('perguntas', JSON.stringify(perguntas));
};

export const obterPerguntasDoLocalStorage = (): Pergunta[] => {
  const perguntasArmazenadas = localStorage.getItem('perguntas');
  return perguntasArmazenadas ? JSON.parse(perguntasArmazenadas) : [];
};

export const limparLocalStorage = () => {
  localStorage.removeItem('perguntas');
};
