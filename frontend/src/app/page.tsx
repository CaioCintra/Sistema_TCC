"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import bcrypt from "bcryptjs";

async function fetchData(login:string) {
  try {
    const response = await fetch(`http://localhost:3333/login/${login}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar dados da API");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

async function loginSistema(login:string, senha:string) {
  try {
    const data = await fetchData(login);

    bcrypt.compare(senha, data.senha, function(err, result) {
      if(result) {
        window.location.href = "/TCC1/matricular";
      } else {
          console.log("A senha está incorreta.");
      }
    });
  } catch (error) {
    console.error("Erro no login:", error);
  }
}

loginSistema('usuario', 'senha');



export default function TelaLogin() {
  const [content, setContent] = useState({
    login: "",
    senha: "",
  });

  const handleLogin = () => {
    const { login, senha } = content;
    loginSistema(login, senha);
  };

  const handleChange = (event) => {
    setContent({ ...content, [event.target.name]: event.target.value });
  };

  return (
    <Box className="mt-64 justify-center items-center flex flex-col space-y-4">
      <text className="font-semibold text-[var(--third-color)] text-6xl m-5">
        Login
      </text>
      <TextField
        id="outlined-input"
        name="login"
        label="Login"
        className="w-1/5"
        value={content.login}
        onChange={handleChange}
      />

      <TextField
        id="outlined-password-input"
        name="senha"
        label="Senha"
        type="password"
        className="w-1/5"
        value={content.senha}
        onChange={handleChange}
      />

      <Button
        type="submit"
        variant="contained"
        className="h-14 w-1/5 bg-[var(--primary-color)] hover:bg-slate-900"
        onClick={handleLogin}
      >
        Entrar
      </Button>
    </Box>
  );
}
