"use client"
import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { useForm } from 'react-hook-form'
import { AuthContext } from "@/contexts/AuthContext";

export default function TelaLogin() {
  const {register, handleSubmit } = useForm();
  const {signIn} = useContext(AuthContext);

  async function handleSignIn(data:any){
    await signIn(data);
  }

  return (
    <Box className="mt-64 justify-center items-center flex flex-col space-y-4">
      <text className="font-semibold text-[var(--third-color)] text-6xl m-5">
        Login
      </text>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <TextField
          id="outlined-input"
          label="Login"
          className="w-1/5"
          {...register('login')}
        />

        <TextField
          id="outlined-password-input"
          label="Senha"
          type="password"
          className="w-1/5"
          {...register('senha')}
        />

        <Button
          type="submit"
          variant="contained"
          className="h-14 w-1/5 bg-[var(--primary-color)] hover:bg-slate-900"
        >
          Entrar
        </Button>
      </form>
    </Box>
  );
}
