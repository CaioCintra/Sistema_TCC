"use client";
import MenuLateral from "@/components/MenuLateral";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });
let token: any;
export const metadata: Metadata = {
  title: "Sistema TCC",
  description: "Sistema TCC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  function verificarToken() {
    useEffect(() => {
      token = localStorage.getItem("token-login");
      console.log(token);
      if (!token) window.location.href = "/";
    }, []);
  }

  verificarToken();

  return (
    <html lang="en">
      <body>
        <MenuLateral>{children}</MenuLateral>
      </body>
    </html>
  );
}
