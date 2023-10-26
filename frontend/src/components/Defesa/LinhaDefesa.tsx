import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LabelStatus from "../LabelStatus";
import EditIcon from "@mui/icons-material/Edit";
import FeedIcon from "@mui/icons-material/Feed";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function LinhaDefesa(props: any) {
  const [banca, setBanca] = useState(null);
  const [defesa, setDefesa] = useState(null);
  const [formattedData, setFormattedData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3333/bancas/${props.ra}`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API");
        }
        const data = await response.json();
        const dateUTC = new Date(data.Data);
        const dateLocal = new Date(
          dateUTC.getTime() + dateUTC.getTimezoneOffset() * 60000
        );
        const formattedDate = format(dateLocal, "dd/MM/yyyy");
        setFormattedData(formattedDate);
        setBanca(data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    const fetchDefesaData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3333/defesas/${props.ra}/TCC1`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API");
        }
        const dataDefesa = await response.json();
        setDefesa(dataDefesa);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
    fetchDefesaData();
  }, [props.ra]);

  return (
    <div className="px-4 bg-[var(--secondary-color)] h-16 flex items-center mb-2">
      <p className="w-56">{props.aluno}</p>
      <p className="w-56">{props.orientador}</p>
      <LabelStatus status={props.status}></LabelStatus>
      <p className="w-28 ml-11">{formattedData}</p>
      <p className="w-16 ml-7">{defesa ? defesa.Nota : "-"}</p>
      <p className="w-[26rem]">{defesa ? defesa.Observacao : "-"}</p>
      <div className="inline-flex">
        <Tooltip title="Declarações">
          <IconButton>
            <FeedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Editar">
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}
