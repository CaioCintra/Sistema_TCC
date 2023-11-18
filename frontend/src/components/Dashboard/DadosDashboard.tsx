import React, { useEffect, useState } from "react";
import { workspaceService } from "../Workspace";
import Image from "next/image";

export default function DadosDashboard(props: any) {
  const [data, setData] = useState(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workspaceValue = await workspaceService.getWorkspace();
        setValue(workspaceValue);

        const response = await fetch(
          `http://localhost:3333/tcc/count/${workspaceValue.tela}`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API");
        }

        const data = await response.json();
        setData(data);
        console.log(data.count);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-center mt-7 items-center">
        <div className="w-72 h-72 rounded-lg shadow-xl m-4 bg-[var(--secondary-color)] flex flex-col items-center justify-center">
          <p className="text-2xl font-bold pt-5 px-4 text-center">
            TCCs Neste semestre:
          </p>
          <p className="text-8xl font-bold pt-8">
            {data ? data.totalCount : "..."}
          </p>
        </div>

        <div className="w-72 h-72 rounded-lg shadow-xl m-4 bg-[var(--secondary-color)] flex flex-col items-center justify-center">
          <p className="text-2xl font-bold pt-5 px-4 text-center">
            TCCs1 Neste semestre:
          </p>
          <p className="text-8xl font-bold pt-8">
            {data ? data.tcc1Count : "..."}
          </p>
        </div>

        <div className="w-72 h-72 rounded-lg shadow-xl m-4 bg-[var(--secondary-color)] flex flex-col items-center justify-center">
          <p className="text-2xl font-bold pt-5 px-4 text-center">
            TCCs2 Neste semestre:
          </p>
          <p className="text-8xl font-bold pt-8">
            {data ? data.tcc2Count : "..."}
          </p>
        </div>
      </div>
    </>
  );
}
