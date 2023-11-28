-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Status" ADD VALUE 'Matriculado_TCC2';
ALTER TYPE "Status" ADD VALUE 'Orientador_Definido_TCC2';
ALTER TYPE "Status" ADD VALUE 'Banca_TCC2_Agendada';
ALTER TYPE "Status" ADD VALUE 'Banca_TCC2_Confirmada';
ALTER TYPE "Status" ADD VALUE 'Aprovado_TCC2';
ALTER TYPE "Status" ADD VALUE 'Reprovado_TCC2';

-- AlterTable
ALTER TABLE "TCC" ALTER COLUMN "status" DROP DEFAULT;
