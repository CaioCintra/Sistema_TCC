import React, { useState, useEffect } from "react";
import LinhaBanca from "./LinhaBanca";
import { workspaceService } from "../../Workspace";

export default function ConfirmarBanca() {
  const [data, setData] = useState(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workspaceValue = await workspaceService.getWorkspace();
        setValue(workspaceValue);
        const response = await fetch(`http://localhost:3333/alunos/banca/ws/${workspaceValue.tela}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API");
        }
        const data = await response.json();
        setData(data);
        console.log(data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data
    ? data.filter(
        (aluno) =>
          aluno &&
          (aluno.status === "Banca_TCC2_Agendada" ||
            aluno.status === "Banca_TCC2_Confirmada") &&
          parseInt(aluno.workspace) === value.tela
      )
    : [];

  if (data === null) {
    return null;
  }

  return (
    <div>
      <text className="mt-3 mb-3 text-2xl font-bold">Confirmar Banca</text>
      <div className="mt-4 items-center space-y-1">
        <div className="px-6 flex font-extrabold">
          <p className="w-[21%]">Nome</p>
          <p className="w-[28%]">Orientador</p>
          <p className="w-[19%]">Status</p>
          <p className="w-[19%]">Data</p>
          <p className="w-[19%]">Horário</p>
          <p className="w-[19%]">Local</p>
          <p className="">Ações</p>
        </div>
        <div className="h-[20rem]">
          {filteredData.map((aluno) => (
            <LinhaBanca
              key={aluno.ra}
              ra={aluno.ra}
              nome={aluno.nome}
              status={aluno.status}
              orientador={aluno.orientador}
              coorientador={aluno.coorientador}
              titulo={aluno.titulo}
              email={aluno.email}
              data={aluno.data}
              local={aluno.local}
              workspace={value}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
