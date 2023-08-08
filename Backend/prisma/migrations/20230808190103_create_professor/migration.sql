-- CreateTable
CREATE TABLE "Professor" (
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "Departamento" TEXT NOT NULL,
    "Telefone" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Professor_nome_key" ON "Professor"("nome");
