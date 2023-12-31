"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import BoxAgendarBanca from "./boxAgendarBanca";
import { workspaceService } from "@/components/Workspace";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1100,
  height: 670,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
};

export default function AgendarBanca() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const urlRA = `http://localhost:3333/alunoAuth/ra-token/${token}`;

  const [aluno, setAluno] = useState(null);
  const [tccAluno, setTCC] = useState(null);
  const [banca, setBanca] = useState(null);
  const [value, setValue] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const workspaceValue = await workspaceService.getWorkspace();
      setValue(workspaceValue);
      const ra = await axios.get(urlRA);
      const urlAluno = `http://localhost:3333/alunos/${ra.data.ra}`;
      const alunoData = await axios.get(urlAluno);
      setAluno(alunoData.data);
      const urlTCC = `http://localhost:3333/tcc/${aluno?.ra}/${value.ativo}`;
      const tcc = await axios.get(urlTCC);
      setTCC(tcc.data[0]);

      if (tcc.data.status !== "Orientador_Definido") {
        const urlBanca = `http://localhost:3333/bancas/${aluno.ra}`;
        const banca = await axios.get(urlBanca);
        setBanca(banca.data[0]);
        formatarDataBrasileira(banca.data[0]);
      }
    };

    fetchData();
  }, [urlRA]);

  function formatarDataBrasileira(data) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Sao_Paulo",
    };
    const formatoBrasileiro = new Intl.DateTimeFormat("pt-BR", options);
    const partes = formatoBrasileiro.formatToParts(data);

    let formattedDate = "";
    let formattedTime = "";

    for (const parte of partes) {
      if (parte.type === "day") {
        formattedDate += parte.value;
      } else if (parte.type === "month") {
        formattedDate += `/${parte.value}`;
      } else if (parte.type === "year") {
        formattedDate += `/${parte.value}`;
      } else if (parte.type === "hour") {
        formattedTime += (parseInt(parte.value) + 3)
          .toString()
          .padStart(2, "0");
      } else if (parte.type === "minute") {
        formattedTime += `:${parte.value}`;
      }
    }

    setDate(formattedDate);
    setTime(formattedTime);
  }

  return (
    <BoxAgendarBanca
      ra={aluno ? aluno.ra : ""}
      nome={aluno ? aluno.nome : ""}
      status={tccAluno ? tccAluno.status : ""}
      orientador={tccAluno ? tccAluno.orientador : ""}
      coorientador={tccAluno ? tccAluno.coorientador : ""}
      titulo={tccAluno ? tccAluno.titulo : ""}
      data={date}
      hora={time}
      local={banca ? banca.local : ""}
      workspace={value}
      token={token}
    />
  );
}
