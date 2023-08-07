/*
  Warnings:

  - The `status` column on the `Aluno` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Aluno" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Matriculado_TCC1';
