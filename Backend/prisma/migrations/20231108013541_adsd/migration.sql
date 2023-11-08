/*
  Warnings:

  - You are about to drop the column `alunoRa` on the `Banca_Professor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Banca_Professor" DROP CONSTRAINT "Banca_Professor_alunoRa_fkey";

-- DropForeignKey
ALTER TABLE "Banca_Professor" DROP CONSTRAINT "Banca_Professor_banca_fkey";

-- AlterTable
ALTER TABLE "Banca_Professor" DROP COLUMN "alunoRa";
