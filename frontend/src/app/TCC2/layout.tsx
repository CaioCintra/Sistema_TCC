import "../globals.css"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MenuLateral from "@/components/MenuLateral";

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
      <MenuLateral>{children}</MenuLateral>
      </body>
    </html>
  );
}
