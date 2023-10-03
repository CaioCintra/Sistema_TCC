"use client";
import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { AuthContext } from "@/contexts/AuthContext";

export default function TelaLogin() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data: any) {
    await signIn(data);
  }

  return (
    <body className="bg-[var(--primary-color)] flex justify-center">
      <Box className="bg-[var(--background-color)] w-[40%] top-1/3 rounded-lg p-10 absolute t-1/2 justify-center items-center flex shadow-lg shadow-black">
        <p className="font-semibold text-[var(--third-color)] text-6xl mr-24">
          Login
        </p>
        <br />
        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
          <TextField
            id="outlined-input"
            label="Login"
            className="w-full"
            {...register("login")}
          />
          <br />
          <TextField
            id="outlined-password-input"
            label="Senha"
            type="password"
            className="w-full"
            {...register("senha")}
          />
          <br />
          <Button
            type="submit"
            variant="contained"
            className="h-14 w-full bg-[var(--primary-color)] hover:bg-slate-900"
          >
            Entrar
          </Button>
        </form>
      </Box>
    </body>
  );
}
