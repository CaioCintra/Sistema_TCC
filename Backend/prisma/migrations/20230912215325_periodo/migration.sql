/*
  Warnings:

  - You are about to drop the column `banca` on the `Periodo` table. All the data in the column will be lost.
  - You are about to drop the column `orientador` on the `Periodo` table. All the data in the column will be lost.
  - Added the required column `agendar_banca` to the `Periodo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `informar_orientador` to the `Periodo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Periodo" DROP COLUMN "banca",
DROP COLUMN "orientador",
ADD COLUMN     "agendar_banca" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "informar_orientador" TIMESTAMP(3) NOT NULL;
