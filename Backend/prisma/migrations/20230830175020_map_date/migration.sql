/*
  Warnings:

  - You are about to drop the column `agendar_banca` on the `Periodo` table. All the data in the column will be lost.
  - You are about to drop the column `informar_orientador` on the `Periodo` table. All the data in the column will be lost.
  - Added the required column `banca` to the `Periodo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orientador` to the `Periodo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Periodo" DROP COLUMN "agendar_banca",
DROP COLUMN "informar_orientador",
ADD COLUMN     "banca" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "orientador" TIMESTAMP(3) NOT NULL;
