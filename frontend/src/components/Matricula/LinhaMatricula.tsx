import LabelStatus from "../LabelStatus";
import ModalDeletar from "./ModalDeletar";
import ModalEditar from "./ModalEditar";

export default function LinhaMatricula(props: any) {
  return (
    <div className="px-6 mb-4 bg-[var(--secondary-color)] h-16 flex items-center justify-between">
      <text className="w-1/8">{props.ra}</text>
      <text className="w-1/6">{props.nome}</text>
      <LabelStatus className="w-1/4" status={props.status}></LabelStatus>
      <div />
      <div className="inline-flex">
        <ModalEditar
          ra={props.ra}
          nome={props.nome}
          status={props.status}
          email={props.email}
          workspace={props.workspace}
        />
        <ModalDeletar aluno={props.ra} workspace={props.workspace} />
      </div>
    </div>
  );
}
