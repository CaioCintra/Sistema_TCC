"use client";
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import { api } from "../services/api";
import axios from "axios";

type SignInData = {
  login: string;
  senha: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
};

type User = {
  login: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "TCC.token": token } = parseCookies();

    if (token) {
      setUser(user);
    }
  }, []);

  async function getToken(login: string, senha: string) {
    const apiUrl = `http://localhost:3333/login/${login}/${senha}`;

    try {
      const response = await axios.get(apiUrl);
      const uuid = response.data;
      return uuid;
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
      throw new Error("Erro ao obter o token");
    }
  }

  async function signIn({ login, senha }: SignInData) {
    const token = await getToken(login, senha);
    if (!token) throw new Error("Token não encontrado");

    setCookie(undefined, "TCC.token", token, {
      maxAge: 1 * 60 * 60, // Uma hora
    });

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    setUser(user);

    window.location.href = "/TCC1/matricular";
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
