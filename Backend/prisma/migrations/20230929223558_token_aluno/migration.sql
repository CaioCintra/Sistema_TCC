-- CreateTable
CREATE TABLE "tokenAluno" (
    "ra" TEXT NOT NULL,
    "token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tokenAluno_ra_key" ON "tokenAluno"("ra");
