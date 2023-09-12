// import ModalDeletar from "./ModalDeletar";
// import ModalEditar from "./ModalEditar";

export default function LinhaDatas(props: any) {


  return (
    <div className="px-16 mb-4 bg-[var(--secondary-color)] h-16 flex items-center justify-between">
      <text className="text-lg font-bold w-1/12">{props.periodo}</text>
      <text className=""><b>Informar Orientador: </b>{props.orientador}</text>
      <text className=""><b>Agendar Banca: </b>{props.banca}</text>
      <div />
    </div>
  );
}
