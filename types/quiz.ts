export interface Pergunta {
  id?: string;
  pergunta: string;
  respostas: {
    a: string,
    b: string,
    c: string,
    d: string,
  };
  respostaCorreta: keyof Pergunta['respostas'];
  dica: string;
  categoria: 'adulto' | 'infantil' | 'todas'
}