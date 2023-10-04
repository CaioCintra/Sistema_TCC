"use client"
import React from "react";
import { Box } from "@mui/material";

const Erro404 = () => {
  return (
    <body className="bg-[var(--primary-color)] flex justify-center text-center">
      <Box className="bg-[var(--background-color)] w-[40%] top-1/4 rounded-lg p-10 absolute t-1/2 shadow-lg shadow-black">
        <p className="font-semibold text-[var(--third-color)] text-7xl">
          ERROR
        </p>
        <p className="font-semibold text-[var(--third-color)] text-9xl mb-5">404</p>
        <p className="font-semibold text-[var(--third-color)] text-4xl mb-10">
          Página não encontrada
        </p>
        <p className="font-semibold text-[var(--third-color)] text-lg">
          Desculpe, a página que você está tentando acessar não existe.
        </p>
      </Box>
    </body>
  );
};

export default Erro404;
