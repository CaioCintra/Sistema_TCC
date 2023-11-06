import LinhaOrientador from "./LinhaOrientador";
import { useEffect, useState } from "react";

export default function DefinirOrientador() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/alunos/orientador");
        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <text className="text-2xl font-bold">Definir Orientador TCC1</text>
      <div className="m-10 mt-20 items-center space-y-1">
        <div className="px-6 flex font-extrabold">
          <text className="w-[13%]">RA</text>
          <text className="w-[26%]">Nome</text>
          <text className="w-[20%]">Status</text>
          <text className="w-[36%]">Orientador</text>
          <text className="">Ações</text>
        </div>
        <div>
          {data ? (
            data.map((aluno:any) =>
              aluno.status == "Matriculado_TCC1" || aluno.status == "Orientador_Definido" ? (
                <LinhaOrientador
                  ra={aluno.ra}
                  nome={aluno.nome}
                  status={aluno.status}
                  orientador = {aluno.orientador}
                  coorientador = {aluno.coorientador}
                  workspace = {aluno.workspace}
                  email = {aluno.email}
                />
              ) : (
                <></>
              )
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
