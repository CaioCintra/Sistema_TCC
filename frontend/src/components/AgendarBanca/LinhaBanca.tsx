import LabelStatus from "../LabelStatus";
import ModalEmail from "../Orientador/ModalEmail";
import ModalAgendarBanca from "./ModalAgendarBanca";
import { useState, useEffect } from "react";

export default function LinhaBanca(props: any) {
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
        timeZoneName: "short",
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
          time += parte.value;
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

  function formatarData(data: string){
    let [day, month, year] = data.split("/");
    let formattedDate = `${year}-${month}-${day}`;
    return formattedDate
  }

  return (
    <div className="px-6 mb-4 bg-[var(--secondary-color)] h-16 flex items-center">
      <p className="w-1/6">{props.nome}</p>
      <p className="w-1/5">
        {data}
        {props.coorientador == 0 ? "" : " / " + data2}
      </p>
      <p className="w-[16%]"><LabelStatus status={props.status}></LabelStatus></p>
      <p className="w-[15%]">{props.status == "Orientador_Definido" ? "-" : date}</p>
      <p className="w-[15%]">{props.status == "Orientador_Definido" ? "-" : time}</p>
      <p>{props.local ? props.local : "-"}</p>
      <div />
        <div className="inline-flex ml-auto">
          <ModalEmail ra={props.ra} />
          <ModalAgendarBanca
            ra={props.ra}
            nome={props.nome}
            status={props.status}
            orientador={props.orientador}
            coorientador={props.coorientador}
            titulo={props.titulo}
            data = {formatarData(date)}
            hora = {time}
            local = {props.local}
            workspace={props.workspace}
          />
      </div>
    </div>
  );
}
