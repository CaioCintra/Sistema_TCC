/*
  Warnings:

  - You are about to drop the `Textos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Textos";

-- CreateTable
CREATE TABLE "Texto" (
    "nome" TEXT NOT NULL,
    "tipo" "TipoTexto" NOT NULL,
    "conteudo" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Texto_nome_key" ON "Texto"("nome");
