-- CreateTable
CREATE TABLE "Aluno" (
    "ra" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "periodo_matricula" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_ra_key" ON "Aluno"("ra");
