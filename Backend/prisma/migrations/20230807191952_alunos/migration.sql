/*
  Warnings:

  - You are about to alter the column `ra` on the `Aluno` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(7)`.
  - Changed the type of `status` on the `Aluno` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Matriculado_TCC1', 'Orientador_Definido', 'Banca_TCC1_Agendada', 'Banca_TCC1_Confirmada', 'Aprovado_TCC1', 'Reprovado_TCC1');

-- AlterTable
ALTER TABLE "Aluno" ALTER COLUMN "ra" SET DATA TYPE VARCHAR(7),
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL;
