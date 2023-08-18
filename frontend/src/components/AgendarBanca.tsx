import React from "react";
import ModalMatricula from "./ModalMatricula";
import LinhaBanca from "./LinhaBanca";
import { Button } from "@mui/material";
import LinhaBancaConfirmada from "./LinhaBancaConfirmada";

export default function AgendarBanca() {
  return (
    <div>
      <ModalMatricula></ModalMatricula>

      <div className="m-10 mb-1 mt-20 items-center space-y-1">
        <div className="px-6 flex justify-between font-extrabold">
          <text>Aluno</text>
          <text>Orientador</text>
          <text>Status</text>
          <text>Data</text>
          <text>Horário</text>
          <text>Local</text>
          <text>Mais Informações</text>
          <text>Ações</text>
        </div>
        <LinhaBanca></LinhaBanca>
        <LinhaBanca></LinhaBanca>
        <LinhaBanca></LinhaBanca>
        <LinhaBanca></LinhaBanca>
      </div>
      <div className="flex justify-center">
        <Button
          className="min-w-0 bg-[var(--primary-color)] hover:bg-slate-900 rounded-lg min-w-8 h-8 w-8 m-2"
          variant="contained"
        >
          1
        </Button>
        <Button
          className="min-w-0 bg-[var(--primary-color)] hover:bg-slate-900 rounded-lg min-w-8 h-8 w-8 m-2"
          variant="contained"
        >
          2
        </Button>
        <Button
          className="min-w-0 bg-[var(--primary-color)] hover:bg-slate-900 rounded-lg min-w-8 h-8 w-8 m-2"
          variant="contained"
        >
          3
        </Button>
      </div>

      <div className="mt-10"></div>
      <ModalMatricula></ModalMatricula>

      <div className="m-10 mb-1 mt-20 items-center space-y-1">
        <div className="px-6 flex justify-between font-extrabold">
          <text>Aluno</text>
          <text>Orientador</text>
          <text>Status</text>
          <text>Data</text>
          <text>Horário</text>
          <text>Local</text>
          <text>Mais Informações</text>
          <text>Ações</text>
        </div>
        <LinhaBancaConfirmada></LinhaBancaConfirmada>
        <LinhaBancaConfirmada></LinhaBancaConfirmada>
        <LinhaBancaConfirmada></LinhaBancaConfirmada>
        <LinhaBancaConfirmada></LinhaBancaConfirmada>
      </div>
      <div className="flex justify-center">
        <Button
          className="min-w-0 bg-[var(--primary-color)] hover:bg-slate-900 rounded-lg min-w-8 h-8 w-8 m-2"
          variant="contained"
        >
          1
        </Button>
        <Button
          className="min-w-0 bg-[var(--primary-color)] hover:bg-slate-900 rounded-lg min-w-8 h-8 w-8 m-2"
          variant="contained"
        >
          2
        </Button>
        <Button
          className="min-w-0 bg-[var(--primary-color)] hover:bg-slate-900 rounded-lg min-w-8 h-8 w-8 m-2"
          variant="contained"
        >
          3
        </Button>
      </div>
    </div>
  );
}
