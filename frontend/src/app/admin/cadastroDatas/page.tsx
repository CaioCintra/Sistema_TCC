"use client";
import LinhaDatas from "@/components/ConfigDatas/LinhaDatas";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
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
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <div>
        <IconButton href="/admin/menu" className="my-2">
          <ArrowBackIosRoundedIcon />
        </IconButton>
        <text className="text-2xl font-bold inline-block align-middle">
          Cadastrar Datas de Período
        </text>
      </div>
      <div className="p-6 flex flex-col items-center justify-center">
        {/* <ModalCadastrarDatas/> */}
        <div className="mt-5 w-10/12">
          <div className="px-16 mb-2 flex font-extrabold justify-between"></div>
          {data ? (
            data.map((periodo: any) => (
              <LinhaDatas
                periodo={periodo.nome}
                orientador={periodo.informar_orientador}
                banca={periodo.agendar_banca}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </Box>
  );
}
