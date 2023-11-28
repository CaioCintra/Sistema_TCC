import { useEffect, useState } from "react";
import LinhaMatricula from "./LinhaMatricula";
import { workspaceService } from "@/components/Workspace";

export default function MatricularTCC() {
  const [data, setData] = useState(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workspaceValue = await workspaceService.getWorkspace();
        setValue(workspaceValue);
        const response = await fetch("http://localhost:3333/alunos/matricula");
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
      <text className="mt-3 mb-3 text-2xl font-bold">Matricular TCC2</text>
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
              aluno.status === "Aprovado_TCC1" ||
              (aluno.status === "Matriculado_TCC2" &&
                parseInt(aluno.workspace) === value.tela) ? (
                <LinhaMatricula
                  ra={aluno.ra}
                  nome={aluno.nome}
                  email={aluno.email}
                  status={aluno.status}
                  workspaceAntigo={parseInt(aluno.workspace)}
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
