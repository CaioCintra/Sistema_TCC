import { useEffect, useState } from "react";
import LinhaDefesa from "./LinhaDefesa";
import { workspaceService } from "../Workspace";

export default function RegistrarDefesa() {
  const [data, setData] = useState(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workspaceValue = await workspaceService.getWorkspace();
        setValue(workspaceValue);
        const response = await fetch("http://localhost:3333/alunos/banca");
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
          <text className="w-[17rem]">Nome</text>
          <text className="w-[19rem]">Orientador</text>
          <text className="w-[19rem]">Status</text>
          <text className="w-[11rem]">Data</text>
          <text className="w-[8rem]">Nota</text>
          <text className="w-[35rem]">Observação</text>
          <text className="">Ações</text>
        </div>
        <div>
          {data ? (
            data.map((aluno: any) =>
              (aluno.status == "Banca_TCC1_Confirmada" ||
                aluno.status == "Aprovado_TCC1" ||
                aluno.status == "Reprovado_TCC1") &&
              parseInt(aluno.workspace) === value.tela ? (
                <LinhaDefesa
                  ra={aluno.ra}
                  nome={aluno.nome}
                  status={aluno.status}
                  orientador={aluno.orientador}
                  coorientador={aluno.coorientador}
                  data={aluno.data}
                  nota={aluno.nota}
                  observacao={aluno.observacao}
                  idBanca={aluno.id}
                  workspace={value}
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
