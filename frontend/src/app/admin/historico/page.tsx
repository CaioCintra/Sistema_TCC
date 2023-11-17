"use client"
import LinhaHistorico from "@/components/Dashboard/LinhaHistorico";
import { workspaceService } from "@/components/Workspace";
import { useEffect, useState } from "react";

export default function Historico() {
  const [data, setData] = useState(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workspaceValue = await workspaceService.getWorkspace();
        setValue(workspaceValue);
        const response = await fetch("http://localhost:3333/alunos/historico");
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
      <text className="text-2xl font-bold">Histórico</text>
      <div className="m-10 mt-20 items-center space-y-1">
        <div className="px-6 flex font-extrabold">
          <text className="w-[20%]">RA</text>
          <text className="w-[34%]">Nome</text>
          <text className="w-[42%]">Status</text>
          <text className="w-[5%]">Ações</text>
        </div>
        <div>
          {data ? (
            data.map((aluno: any) =>
              parseInt(aluno.workspace) === value.tela ? (
                <LinhaHistorico
                  ra={aluno.ra}
                  nome={aluno.nome}
                  email={aluno.email}
                  status={aluno.status}
                  workspace={value}
                  key={aluno.ra}
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
