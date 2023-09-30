/*
  Warnings:

  - A unique constraint covering the columns `[senha]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `tokenAluno` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Admin_senha_key" ON "Admin"("senha");

-- CreateIndex
CREATE UNIQUE INDEX "tokenAluno_token_key" ON "tokenAluno"("token");
