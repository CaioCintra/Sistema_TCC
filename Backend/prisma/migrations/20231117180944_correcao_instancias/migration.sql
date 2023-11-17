/*
  Warnings:

  - Changed the type of `workspace` on the `Instancias` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `orientador` on the `Instancias` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Instancias" DROP COLUMN "workspace",
ADD COLUMN     "workspace" INTEGER NOT NULL,
DROP COLUMN "orientador",
ADD COLUMN     "orientador" INTEGER NOT NULL;
