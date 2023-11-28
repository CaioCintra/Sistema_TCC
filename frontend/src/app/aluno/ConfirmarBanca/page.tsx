"use client";
import React, { useState, useEffect } from "react";
import BoxAgendarBanca from "./boxAgendarBanca";
import { workspaceService } from "@/components/Workspace";
import { useSearchParams } from "next/navigation";

export default function ConfirmarBanca() {
  const [aluno, setAluno] = useState(null);
  const [value, setValue] = useState(0);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const urlRA = `http://localhost:3333/alunoAuth/ra-token/${token}`;

  useEffect(() => {
    const fetchData = async () => {
      const workspaceValue = await workspaceService.getWorkspace();
      setValue(workspaceValue);
      const raData = await fetch(urlRA);
      const ra = await raData.json();
      const response = await fetch(
        `http://localhost:3333/alunos/banca/${ra.ra}`
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API");
      }
      const data = await response.json();
      console.log(data[0]);
      setAluno(data);
    };

    fetchData();
  }, []);

  return (
    <BoxAgendarBanca
      ra={aluno?.[0]?.ra}
      nome={aluno?.[0]?.nome}
      status={aluno?.[0]?.status}
      orientador={aluno?.[0]?.orientador}
      coorientador={aluno?.[0]?.coorientador}
      titulo={aluno?.[0]?.titulo}
      email={aluno?.[0]?.email}
      data={aluno?.[0]?.data}
      local={aluno?.[0]?.local}
      workspace={value}
      token={token}
    />
  );
}
