import { useEffect, useState } from "react";
import LinhaMatricula from "./LinhaMatricula";
import ModalMatricula from "./ModalMatricula";

export default function MatricularTCC() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/alunos/matricula");
        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ModalMatricula></ModalMatricula>
      <div className="m-10 mt-20 items-center space-y-1">
        <div className="px-6 flex font-extrabold">
          <text className="w-[20%]">RA</text>
          <text className="w-[34%]">Nome</text>
          <text className="w-[42%]">Status</text>
          <text className="w-[5%]">Ações</text>
        </div>
        <div>
          {data ? (
            data.map((aluno: any) =>
              aluno.status === "Matriculado_TCC1" ? (
                <LinhaMatricula
                  ra={aluno.ra}
                  nome={aluno.nome}
                  email={aluno.email}
                  status={aluno.status}
                />
              ) : (
                <></>
              )
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
