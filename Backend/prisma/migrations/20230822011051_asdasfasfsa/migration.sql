/*
  Warnings:

  - Changed the type of `status` on the `Aluno` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Aluno" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL;
