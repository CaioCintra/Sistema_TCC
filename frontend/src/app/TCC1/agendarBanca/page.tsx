"use client";
import AgendarBanca from "@/components/AgendarBanca/AgendarBanca";
import ConfirmarBanca from "@/components/AgendarBanca/ConfirmarBanca";
import { Box } from "@mui/material";

import React from "react";

export default function agendarBancaTCC1() {
  return (
    <Box>
      <AgendarBanca></AgendarBanca>
      <ConfirmarBanca></ConfirmarBanca>
    </Box>
  );
}
