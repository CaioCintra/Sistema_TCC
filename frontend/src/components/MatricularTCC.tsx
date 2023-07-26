import LinhaMatricula from "./LinhaMatricula";
import ModalMatricula from "./ModalMatricula";

export default function MatricularTCC() {
  return (
    <div>
      <ModalMatricula></ModalMatricula>

      <div className="m-10 mt-20 items-center space-y-1">
        <div className="px-6 flex justify-between font-extrabold">
            <text>RA</text>
            <text>Nome</text>
            <text>Status</text>
            <text>Data</text>
            <text>Ações</text>
            </div>
        <LinhaMatricula></LinhaMatricula>
        <LinhaMatricula></LinhaMatricula>
        <LinhaMatricula></LinhaMatricula>
        
      </div>
    </div>
  );
}