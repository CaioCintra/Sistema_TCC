"use client";
import AgendarBanca from "@/components/TCC2/AgendarBanca/AgendarBanca";
import ConfirmarBanca from "@/components/TCC2/AgendarBanca/ConfirmarBanca";
import { Box } from "@mui/material";

import React from "react";

export default function agendarBancaTCC2() {
  return (
    <Box>
      <text className="text-2xl font-bold">Agendar Banca TCC2</text>
      <AgendarBanca></AgendarBanca>
      <ConfirmarBanca></ConfirmarBanca>
    </Box>
  );
}
