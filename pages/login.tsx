import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";

export default function Login() {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  
    const senhaCorreta = "1234"; 

    setLoading(true);
    setErro(false);
    setSucesso(false);

    if (senha.trim() === "") {
      setErro(true);
      setLoading(false);
      return;
    }

    if (senha === senhaCorreta) {
      setSucesso(true);
      window.location.href = "/admin";
    } else {
      setErro(true);
    }

    setLoading(false);
  };

  return (
    <div className="login-container w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold uppercase">Login</h1>
      <p className="text-zinc-600 text-xl mb-10">Digite a senha para continuar</p>


      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          className="text-3xl border border-zinc-300 h-20 outline-none p-4 rounded-md w-96"
          type="password"
          id="senha"
          name="senha"
          autoComplete="off"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)} 
        />
        <button 
          type="submit" 
          className={`bg-vrd_verde h-20 px-12 rounded-md text-white ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading} 
        >
          {loading ? <span>Loading...</span> : <FaSignInAlt size={30} />}
        </button>
      </form>
      <div className="h-20">
      {erro && <p className="text-red-600 text-3xl font-medium mt-4">Senha inválida. Tente novamente.</p>}
      {sucesso && <p className="text-vrd_verde text-3xl font-medium mt-4">Login bem-sucedido!</p>}
      </div>
    </div>
  );
}
