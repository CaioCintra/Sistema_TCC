"use client";
import LinhaDatas from "@/components/ConfigDatas/LinhaDatas";
import { Box } from "@mui/material";

import React, { useEffect, useState } from "react";

export default function cadastroDatas() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/periodos");
        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API");
        }
        const data = await response.json();
        setData(data);
        console.log(data)
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <text className="text-2xl font-bold">Cadastrar Datas de Período</text>
      <div className="p-6 flex flex-col items-center justify-center">
    {/* <ModalCadastrarDatas/> */}
        <div className="mt-5 w-10/12">
        <div className="px-16 mb-2 flex font-extrabold justify-between">
        </div>
          {data ? (
            data.map((periodo: any) =>
                <LinhaDatas
                  periodo={periodo.nome}
                  orientador={periodo.informar_orientador}
                  banca={periodo.agendar_banca}
                />
              )
          ) : (
            <></>
          )}
        </div>
      </div>
    </Box>
  );
}
