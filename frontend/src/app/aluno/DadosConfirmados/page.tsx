"use client";
import { Box } from "@mui/material";

export default function DadosConfirmados() {
  return (
    <Box className="bg-[var(--background-color)] w-[50%] top-1/3 rounded-lg p-10 absolute t-1/2 shadow-lg shadow-black">
      <p className="font-semibold text-[var(--third-color)] text-3xl text-center">
        Dados confirmados
      </p>
      <p className="font-medium text-[var(--third-color)] text-xl mt-10 text-center">
        Seus dados foram atualizados com sucesso.
      </p>
    </Box>
  );
}
