/*
  Warnings:

  - You are about to drop the column `Departamento` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `Telefone` on the `Professor` table. All the data in the column will be lost.
  - Added the required column `departamento` to the `Professor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `Professor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "Departamento",
DROP COLUMN "Telefone",
ADD COLUMN     "departamento" TEXT NOT NULL,
ADD COLUMN     "telefone" TEXT NOT NULL;
