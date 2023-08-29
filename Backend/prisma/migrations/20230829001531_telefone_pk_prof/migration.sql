/*
  Warnings:

  - A unique constraint covering the columns `[telefone]` on the table `Professor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Professor_telefone_key" ON "Professor"("telefone");
