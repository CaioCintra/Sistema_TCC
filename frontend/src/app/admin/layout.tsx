"use client";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MenuLateral from "@/components/MenuLateral";
import { AuthProvider } from "@/contexts/AuthContext";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { getAPIClient } from "@/services/axios";

const inter = Inter({ subsets: ["latin"] });
let token: any;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const fetchData = async () => {
      const { ["TCC.token"]: token } = parseCookies();
      const apiUrl = `http://localhost:3333/login/${token}`;
      try {
        const response = await fetch(apiUrl);
        const verify = await response.json();
        if (!verify) {
          window.location.href = "/";
          return;
        }
        if (!token) {
          window.location.href = "/";
          return;
        }

        const apiClient = getAPIClient();
        try {
          await apiClient.get("/alunos");
        } catch (error) {
          console.error("Erro ao obter dados:", error);
        }
      } catch (error) {
        console.error("Erro ao fazer a requisição:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <MenuLateral>{children}</MenuLateral>
        </body>
      </html>
    </AuthProvider>
  );
}
