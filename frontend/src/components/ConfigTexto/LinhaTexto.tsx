import ModalEditar from "../Matricula/ModalEditar";
import ModalDeletar from "../ConfigTexto/ModalDeletar";
import ModalVisualizar from "../ConfigTexto/ModalVisualizar";

export default function LinhaTexto(props: any) {
  return (
    <div className="px-16 mb-4 bg-[var(--secondary-color)] h-16 flex items-center justify-between">
      <text className="w-[45%]">{props.nome}</text>
      <text className="w-1/3">{props.tipo}</text>
      <div />
      <div className="inline-flex">
        <ModalVisualizar
          nome={props.nome}
          tipo={props.tipo}
          conteudo={props.conteudo}
        />
        <ModalEditar
          nome={props.nome}
          tipo={props.tipo}
          conteudo={props.conteudo}
        />
        <ModalDeletar texto={props.nome} />
      </div>
    </div>
  );
}
