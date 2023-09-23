"use client";
import "../globals.css";
import type { GetServerSideProps, Metadata } from "next";
import { Inter } from "next/font/google";
import MenuLateral from "@/components/MenuLateral";
import { AuthContext, AuthProvider } from "@/contexts/AuthContext";
import { useContext } from "react";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { getAPIClient } from "@/services/axios";
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
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get("/alunos");
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log("sadofguihsdgiçsadhgpasdigjhasdfpoifgjsdflksdj");
  const apiClient = getAPIClient(ctx);
  const { ["TCC.token"]: token } = parseCookies(ctx);
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  await apiClient.get("/alunos");

  return {
    props: {},
  };
};
