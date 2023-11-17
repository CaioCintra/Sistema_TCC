"use client";
import DadosDashboard from "@/components/Dashboard/DadosDashboard";
import { Box } from "@mui/material";

import React from "react";

export default function agendarBancaTCC1() {
  return (
    <Box>
      <text className="text-2xl font-bold">Dashboard</text>
      <a href="/admin/historico">
        <div className="text-2xl font-bold bg-[var(--primary-color)] text-[var(--secondary-color)] mt-11 h-24 w-11/12 mx-auto flex items-center justify-center rounded-lg">
          Histórico de alunos
        </div>
      </a>

      <DadosDashboard />
    </Box>
  );
}
