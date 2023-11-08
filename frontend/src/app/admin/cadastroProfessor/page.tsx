"use client";
import LinhaProfessor from "@/components/ConfigProfessor/LinhaProfessor";
import ModalCadastrarProfessor from "@/components/ConfigProfessor/ModalCadastrarProfessor";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { Box, Button, IconButton } from "@mui/material";

import React, { useEffect, useState } from "react";

export default function cadastroProfessor() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/professores");
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
          Cadastrar Professor
        </text>
      </div>
      <div className="p-6 flex flex-col items-center justify-center">
        <ModalCadastrarProfessor />
        <div className="mt-5 w-10/12">
          <div className="px-16 mb-2 flex font-extrabold justify-between">
            <text>Nome</text>
            <text>Email</text>
            <text>Departamento</text>
            <text>Telefone</text>
            <text>Ações</text>
          </div>
          {data ? (
            data.map((professor: any) => (
              <LinhaProfessor
                nome={professor.nome}
                email={professor.email}
                departamento={professor.departamento}
                celular={professor.celular}
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
