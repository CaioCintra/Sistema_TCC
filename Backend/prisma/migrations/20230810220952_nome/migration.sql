/*
  Warnings:

  - You are about to drop the column `professorNome` on the `Aluno` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Aluno" DROP CONSTRAINT "Aluno_professorNome_fkey";

-- AlterTable
ALTER TABLE "Aluno" DROP COLUMN "professorNome",
ADD COLUMN     "orientador" TEXT;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_orientador_fkey" FOREIGN KEY ("orientador") REFERENCES "Professor"("nome") ON DELETE SET NULL ON UPDATE CASCADE;
