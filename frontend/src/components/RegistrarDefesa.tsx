import LinhaDefesa from "./LinhaDefesa";

export default function RegistrarDefesa() {
  return (
    <div>

      <div className="m-10 mt-20 items-center space-y-1">
        <div className="px-6 flex justify-between font-extrabold">
          <text>Aluno</text>
          <text>Orientador</text>
          <text>Status</text>
          <text>Data</text>
          <text>Nota</text>
          <text>Observações</text>
          <text>Ações</text>
        </div>
        <LinhaDefesa status="Aprovado TCC1"></LinhaDefesa>
        <LinhaDefesa status="Aprovado TCC1"></LinhaDefesa>
        <LinhaDefesa status="Reprovado TCC1"></LinhaDefesa>
      </div>
    </div>
  );
}
