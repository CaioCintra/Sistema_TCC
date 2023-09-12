"use client";

import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import { Box, Button, ButtonGroup } from "@mui/material";

import React from "react";

export default function agendarBancaTCC1() {
  return (
    <Box className="flex flex-col space-y-4">
      <text className="mt-5 mb-14 text-2xl font-bold">
        Configurações de administrador
      </text>
      <div className="flex flex-col items-center justify-center space-y-4">
        <Button
          href="/admin/cadastroDatas"
          className="w-1/3 h-20 uppercase bg-[var(--primary-color)] hover:bg-slate-900 text-lg font-bold"
          variant="contained"
          startIcon={<EditCalendarIcon />}
        >
          DEFINIR DATAS
        </Button>
        <br />
        <Button
          href="/admin/cadastroProfessor"
          className="w-1/3 h-20 uppercase bg-[var(--primary-color)] hover:bg-slate-900 text-lg font-bold"
          variant="contained"
          startIcon={<PersonIcon />}
        >
          CADASTRAR PROFESSOR
        </Button>
        <br />
        <Button
          href="/admin/cadastroTextos"
          className="w-1/3 h-20 uppercase bg-[var(--primary-color)] hover:bg-slate-900 text-lg font-bold"
          variant="contained"
          startIcon={<DescriptionIcon />}
        >
          EDITAR TEXTOS PADRÃO
        </Button>
      </div>
    </Box>
  );
}
