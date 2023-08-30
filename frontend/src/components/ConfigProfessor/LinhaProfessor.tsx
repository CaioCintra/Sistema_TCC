import ModalDeletar from "./ModalDeletar";
import ModalEditar from "./ModalEditar";

export default function LinhaProfessor(props: any) {

  var telefoneFormatado:any = props.telefone;
  const numerosApenas = props.telefone.replace(/\D/g, '');

  if(props.telefone.length == 10){
    telefoneFormatado = `(${numerosApenas.substring(0, 2)}) ${numerosApenas.substring(2, 6)}-${numerosApenas.substring(6)}`;
  }else{
    telefoneFormatado = `(${numerosApenas.substring(0, 2)}) ${numerosApenas[2]} ${numerosApenas.substring(3, 7)}-${numerosApenas.substring(7)}`;
  }

  return (
    <div className="px-16 mb-4 bg-[var(--secondary-color)] h-16 flex items-center justify-between">
      <text className="w-[19%]">{props.nome}</text>
      <text className="w-[20%]">{props.email}</text>
      <text className="w-[26%]">{props.departamento}</text>
      <text className="w-1/6">{telefoneFormatado}</text>
      <div />
      <div className="inline-flex">
        <ModalEditar
          nome={props.nome}
          email={props.email}
          departamento={props.departamento}
          telefone={props.telefone}
        />
        <ModalDeletar professor={props.nome} />
      </div>
    </div>
  );
}
