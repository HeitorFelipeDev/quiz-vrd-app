import Link from "next/link";

export default function Quiz() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-10">
      <h3 className="text-4xl font-bold w-[600px] text-center uppercase text-vrd_verde">Antes de começarmos, selecione o modo do Quiz</h3>
      <div className="flex justify-center items-center gap-10">
        <Link href="/quiz/adulto">
          <button className="p-6 w-64 text-xl font-medium rounded-md bg-vrd_verde text-white">Adulto</button>
        </Link>
        <Link href="/quiz/infantil">
          <button className="p-6 w-64 text-xl font-medium rounded-md bg-vrd_amarelo text-white">Infantil</button>
        </Link>
      </div>
    </div>
  )
}