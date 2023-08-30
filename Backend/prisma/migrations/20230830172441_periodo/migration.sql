-- CreateTable
CREATE TABLE "Periodo" (
    "nome" TEXT NOT NULL,
    "informar_orientador" TIMESTAMP(3) NOT NULL,
    "agendar_banca" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Periodo_nome_key" ON "Periodo"("nome");
