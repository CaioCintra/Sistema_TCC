-- CreateEnum
CREATE TYPE "TipoTexto" AS ENUM ('Email', 'Ata', 'Declaracao');

-- CreateTable
CREATE TABLE "Textos" (
    "nome" TEXT NOT NULL,
    "tipo" "TipoTexto" NOT NULL,
    "conteudo" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Textos_nome_key" ON "Textos"("nome");
