import Tooltip from "@mui/material/Tooltip";
import LabelStatus from "../LabelStatus";
import { useEffect, useState } from "react";
import ModalDefesa from "./ModalDefesa";
import ModalDeclaracoes from "./ModalDeclaracoes";

export default function LinhaDefesa(props: any) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3333/professores/${props.orientador}`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API");
        }
        const data = await response.json();
        setData(data.nome);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
      if (props.coorientador != 0) {
        try {
          const response = await fetch(
            `http://localhost:3333/professores/${props.coorientador}`
          );
          if (!response.ok) {
            throw new Error("Erro ao buscar dados da API");
          }
          const data2 = await response.json();
          setData2(data2.nome);
        } catch (error) {
          console.error("Erro na requisição:", error);
        }
      }
    };

    fetchData();
  }, [props.coorientador, props.orientador]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
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

      let date = "";
      let time = "";

      for (const parte of partes) {
        if (parte.type === "day") {
          date += parte.value;
        } else if (parte.type === "month") {
          date += `/${parte.value}`;
        } else if (parte.type === "year") {
          date += `/${parte.value}`;
        } else if (parte.type === "hour") {
          time += (parseInt(parte.value) + 3).toString().padStart(2, "0");
        } else if (parte.type === "minute") {
          time += `:${parte.value}`;
        }
      }

      return { date, time };
    }

    const dataFormatada = formatarDataBrasileira(new Date(props.data));
    setDate(dataFormatada.date);
    setTime(dataFormatada.time);
  }, [props.data]);

  const [data, setData] = useState();
  const [data2, setData2] = useState();

  let observacao = props.observacao;

  if (observacao.length > 70) {
    observacao = observacao.substring(0, 70) + "...";
  }

  return (
    <div className="px-4 bg-[var(--secondary-color)] h-16 flex items-center mb-2">
      <p className="w-56">{props.nome}</p>
      <p className="w-56">
        {data}
        {props.coorientador == 0 ? "" : " / " + data2}
      </p>
      <p className="w-[13rem]">
        <LabelStatus status={props.status}></LabelStatus>
      </p>
      <p className="w-28 ml-11">{date}</p>
      <p className="w-[6rem] ml-7">
        {props.status !== "Banca_TCC1_Confirmada" ? props.nota : "-"}
      </p>
      <Tooltip title={props.observacao}>
        <p className="w-[25rem]">
          {props.status !== "Banca_TCC1_Confirmada" ? observacao : "-"}
        </p>
      </Tooltip>
      <div className="inline-flex">
        <ModalDeclaracoes
          ra={props.ra}
          nome={props.nome}
          idBanca={props.idBanca}
          orientador={props.orientador}
          coorientador={props.coorientador}
          workspace={props.workspace}
          etapa={props.etapa}
          titulo={props.titulo}
          data={props.data}
        />
        <ModalDefesa
          ra={props.ra}
          nome={props.nome}
          idBanca={props.idBanca}
          nota={props.nota}
          orientador={props.orientador}
          observacao={props.observacao}
          workspace={props.workspace}
        />
      </div>
    </div>
  );
}
