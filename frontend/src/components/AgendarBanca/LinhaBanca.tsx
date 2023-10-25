import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LabelStatus from "../LabelStatus";
import EditIcon from "@mui/icons-material/Edit";
import ModalEmail from "../Orientador/ModalEmail";
import ModalIndividualAgendarBanca from "./ModalIndividualAgendarBanca";

export default function LinhaBanca(props: any) {
  return (
    <div className="px-6 mb-4 bg-[var(--secondary-color)] h-16 flex items-center justify-between">
      <text className="w-1/8">{props.ra}</text>
      <text className="w-1/6">{props.nome}</text>
      <LabelStatus className="w-1/4" status={props.status}></LabelStatus>
      <text className="w-1/6">{props.orientador}</text>
      <div />
      <div>
        <div className="inline-flex">
          <ModalEmail ra={props.ra} />
          <ModalIndividualAgendarBanca ra={props.ra} nome={props.nome} />
        </div>
      </div>
    </div>
  );
}
