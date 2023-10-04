"use client";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import React, { useEffect } from "react";
import { getAPIClient } from "@/services/axios";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema TCC",
  description: "Sistema TCC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  if (!token) {
    window.location.href = "/erro/404";
    return null;
  }

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const apiUrl = `http://localhost:3333/alunoAuth/token/${token}`;
        const response = await axios.get(apiUrl);
        const verify = response.data;
        if (!verify) {
          window.location.href = "/erro/404";
        }
      } catch (error) {
        console.error("Erro ao verificar token:", error);
        window.location.href = "/erro/404";
      }
    };

    verifyToken();
  }, [token]);

  const apiClient = getAPIClient();
  try {
    apiClient.get("/alunos");
  } catch (error) {
    console.error("Erro ao obter dados:", error);
  }
  return (
    <AuthProvider>
      <html lang="en">
        <body className="bg-[var(--primary-color)] flex justify-center">{children}</body>
      </html>
    </AuthProvider>
  );
}
