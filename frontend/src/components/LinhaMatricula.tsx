import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LabelStatus from "./LabelStatus";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import ModalDeletar from "./ModalDeletar";

export default function LinhaMatricula(props: any) {
  return (
    <div className="px-6 mb-4 bg-[var(--secondary-color)] h-16 flex items-center justify-between">
      <text className="w-1/8">{props.ra}</text>
      <text className="w-1/6">{props.nome}</text>
      <LabelStatus className="w-1/4" status={props.status}></LabelStatus>
      <text className="w-1/6">{props.matricula}</text>
      <div />
      <div>
        <Tooltip title="Editar">
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <ModalDeletar aluno={props.ra}/>
      </div>
    </div>
  );
}
