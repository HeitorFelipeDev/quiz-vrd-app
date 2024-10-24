interface IResultado {
  acertos: number;
  erros: number;
  dicasUsadas: number;
  quantidadePerguntas: number;
}


export default function ResultadoComponent({
  acertos,
  erros,
  dicasUsadas,
  quantidadePerguntas
}: IResultado) {
  return (
    <div className="resultado gap-10 flex justify-center flex-col items-center">
      <hgroup className="text-center">
        <h1 className="text-5xl font-extrabold text-vrd_verde uppercase w-[450px]">Parabéns! Você concluiu o quiz</h1>
        <h2 className="text-3xl mt-2 font-bold text-zinc-400 uppercase">Seu resultado</h2>
      </hgroup>
      <h1 className="text-9xl font-black text-vrd_verde resultado-percentual">{(acertos/quantidadePerguntas) * 100}%</h1>
      <div className="flex justify-center gap-14">
        <div className="text-center">
          <h3 className="text-5xl font-extrabold text-vrd_amarelo uppercase">{dicasUsadas}</h3>
          <span className="text-xl mt-2 font-bold text-zinc-400">Dicas</span>
        </div>
        <div className="text-center">
          <h3 className="text-5xl font-extrabold text-vrd_amarelo uppercase">{acertos}</h3>
          <span className="text-xl mt-2 font-bold text-zinc-400">Acertou</span>
        </div>
        <div className="text-center">
          <h3 className="text-5xl font-extrabold text-vrd_amarelo uppercase">{erros}</h3>
          <span className="text-xl mt-2 font-bold text-zinc-400">Errou</span>
        </div>
      </div>
    </div>
  )
}