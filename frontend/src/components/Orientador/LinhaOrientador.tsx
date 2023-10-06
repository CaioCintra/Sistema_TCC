import LabelStatus from "../LabelStatus";
import ModalOrientador from "./ModalOrientador";
import ModalEmail from "./ModalEmail";

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
          <ModalEmail
            ra={props.ra}
            nome={props.nome}
            status={props.status}
            email={props.email}
            periodo={props.matricula}
            orientador={props.orientador}
          />
          <ModalOrientador
            ra={props.ra}
            nome={props.nome}
            status={props.status}
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
