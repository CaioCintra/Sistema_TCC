import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LabelStatus from "./LabelStatus";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import ModalOrientador from "./ModalOrientador";

export default function LinhaOrientador(props: any) {
  return (
    <div className="px-6 mb-4 bg-[var(--secondary-color)] h-16 flex items-center justify-between">
      <text className="w-1/8">{props.ra}</text>
      <text className="w-1/6">{props.nome}</text>
      <LabelStatus className="w-1/4" status={props.status}></LabelStatus>
      <text className="w-1/6">
        {props.status == "Matriculado_TCC1" ? "-" : props.orientador}
      </text>
      <div />
      <div>
        <div className="inline-flex">
          <Tooltip title="Email">
            <IconButton>
              <MailOutlinedIcon />
            </IconButton>
          </Tooltip>
          <ModalOrientador
            ra={props.ra}
            nome={props.nome}
            status={props.status}
            email={props.email}
            periodo={props.matricula}
            orientador={props.orientador}
          />
          {/* <Tooltip title="Remover">
          <IconButton>
          <RemoveCircleOutlineIcon />
          </IconButton>
        </Tooltip> */}
        </div>
      </div>
    </div>
  );
}
