import LabelStatus from "../LabelStatus";
import ModalOrientador from "./ModalOrientador";
import ModalEmail from "./ModalEmail";
import { useState, useEffect } from "react";

export default function LinhaOrientador(props: any) {
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

  const [data, setData] = useState();
  const [data2, setData2] = useState();

  return (
    <div className="px-6 mb-4 bg-[var(--secondary-color)] h-16 flex items-center justify-between">
      <text className="w-1/8">{props.ra}</text>
      <text className="w-1/6">{props.nome}</text>
      <LabelStatus className="w-1/4" status={props.status}></LabelStatus>
      <text className="w-1/6">
        {props.status == "Matriculado_TCC1" ? "-" : data}
        {props.coorientador == 0 ? "" : " / " + data2}
      </text>
      <div />
      <div>
        <div className="inline-flex">
          <ModalEmail ra={props.ra} nome={props.nome} email={props.email} workspace={props.workspace} padrao={"Falta Orientador"} />
          <ModalOrientador
            ra={props.ra}
            nome={props.nome}
            status={props.status}
            orientador={props.orientador}
            coorientador={props.coorientador}
            workspace={props.workspace}
          />
        </div>
      </div>
    </div>
  );
}
