"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import bcrypt from "bcryptjs";
const jose = require("node-jose");

async function gerarToken(login: string) {
  try {
    const keystore = jose.JWK.createKeyStore();
    const key = await keystore.generate("oct", 256, { alg: "HS256" });
    const payload = { login };
    const headers = { alg: "HS256" };

    const compactToken = await jose.JWS.createSign({ format: "compact" }, key)
      .update(JSON.stringify(headers))
      .update(".")
      .update(JSON.stringify(payload))
      .final();

    return compactToken;
  } catch (error) {
    console.error("Erro ao gerar token:", error);
    return null;
  }
}

async function fetchData(login: string) {
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

async function loginSistema(login: string, senha: string) {
  try {
    const data = await fetchData(login);

    bcrypt.compare(senha, data.senha, async function (err, result) {
      if (result) {
        try {
          const token = await gerarToken(login);
          if (token == null) {
            console.log("Erro ao gerar token");
            return;
          }
          localStorage.setItem("token-login", token);
          window.location.href = "/TCC1/matricular";
        } catch (error) {
          console.error("Erro ao gerar token:", error);
        }
      } else {
        console.log("A senha está incorreta.");
      }
    });
  } catch (error) {
    console.error("Erro no login:", error);
  }
}

loginSistema("usuario", "senha");

export default function TelaLogin() {
  const [content, setContent] = useState({
    login: "",
    senha: "",
  });

  const handleLogin = () => {
    const { login, senha } = content;
    loginSistema(login, senha);
  };

  const handleChange = (event: any) => {
    setContent({ ...content, [event.target.name]: event.target.value });
  };

  return (
    <Box className="mt-auto justify-center items-center flex flex-col space-y-4">
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
