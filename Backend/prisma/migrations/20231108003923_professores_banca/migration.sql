/*
  Warnings:

  - You are about to drop the column `etapa` on the `Banca_Professor` table. All the data in the column will be lost.
  - You are about to drop the column `ra` on the `Banca_Professor` table. All the data in the column will be lost.
  - You are about to drop the column `workspace` on the `Banca_Professor` table. All the data in the column will be lost.
  - Added the required column `banca` to the `Banca_Professor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Banca_Professor" DROP CONSTRAINT "Banca_Professor_ra_fkey";

-- DropForeignKey
ALTER TABLE "Banca_Professor" DROP CONSTRAINT "Banca_Professor_workspace_fkey";

-- AlterTable
ALTER TABLE "Banca_Professor" DROP COLUMN "etapa",
DROP COLUMN "ra",
DROP COLUMN "workspace",
ADD COLUMN     "alunoRa" INTEGER,
ADD COLUMN     "banca" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Banca_Professor" ADD CONSTRAINT "Banca_Professor_banca_fkey" FOREIGN KEY ("banca") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banca_Professor" ADD CONSTRAINT "Banca_Professor_alunoRa_fkey" FOREIGN KEY ("alunoRa") REFERENCES "Aluno"("ra") ON DELETE SET NULL ON UPDATE CASCADE;
