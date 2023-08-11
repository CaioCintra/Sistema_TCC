/*
  Warnings:

  - Added the required column `professorNome` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Aluno" ADD COLUMN     "professorNome" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_professorNome_fkey" FOREIGN KEY ("professorNome") REFERENCES "Professor"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;
