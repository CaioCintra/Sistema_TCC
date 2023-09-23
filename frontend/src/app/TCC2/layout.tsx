"use client"
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MenuLateral from "@/components/MenuLateral";
import { AuthContext, AuthProvider } from "@/contexts/AuthContext";
import { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { api } from "@/services/api";

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

  return (
    <html lang="en">
      <body className={inter.className}>
        <MenuLateral>
          {children}
        </MenuLateral>
      </body>
    </html>
  );
}
