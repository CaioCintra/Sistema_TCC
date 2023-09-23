"use client";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MenuLateral from "@/components/MenuLateral";
import { AuthProvider } from "@/contexts/AuthContext";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { getAPIClient } from "@/services/axios";
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
  useEffect(() => {
    const fetchData = async () => {
      const { ["TCC.token"]: token } = parseCookies();
      console.log(token);
      const apiUrl = `http://localhost:3333/login/${token}`;
      const response = await axios.get(apiUrl);
      const verify = response.data;
      console.log("verify: ", verify);
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