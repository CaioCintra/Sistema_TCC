/*
  Warnings:

  - You are about to drop the column `banca_TCC1` on the `Instancias` table. All the data in the column will be lost.
  - You are about to drop the column `banca_TCC2` on the `Instancias` table. All the data in the column will be lost.
  - You are about to drop the column `defesa_TCC1` on the `Instancias` table. All the data in the column will be lost.
  - You are about to drop the column `defesa_TCC2` on the `Instancias` table. All the data in the column will be lost.
  - You are about to drop the column `status_TCC1` on the `Instancias` table. All the data in the column will be lost.
  - You are about to drop the column `status_TCC2` on the `Instancias` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Instancias" DROP COLUMN "banca_TCC1",
DROP COLUMN "banca_TCC2",
DROP COLUMN "defesa_TCC1",
DROP COLUMN "defesa_TCC2",
DROP COLUMN "status_TCC1",
DROP COLUMN "status_TCC2";
