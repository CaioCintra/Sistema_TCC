"use client";
import React from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";

export default function login() {
  return (
    <Box className="mt-64 justify-center items-center flex flex-col space-y-4">
        <text className="font-semibold text-[var(--third-color)] text-6xl m-5">Login</text>
      <TextField id="outlined-input" label="RA" className="w-1/5" />

      <TextField id="outlined-password-input" label="Senha" type="password" className="w-1/5"/>

      <Button variant="contained" className="h-14 w-1/5 bg-[var(--primary-color)] hover:bg-slate-900">Entrar</Button>
    </Box>
  );
}
