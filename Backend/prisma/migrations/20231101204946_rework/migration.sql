/*
  Warnings:

  - You are about to drop the column `orientador` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `periodo_matricula` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `Data` on the `Banca` table. All the data in the column will be lost.
  - You are about to drop the column `Etapa` on the `Banca` table. All the data in the column will be lost.
  - You are about to drop the column `Local` on the `Banca` table. All the data in the column will be lost.
  - You are about to drop the column `Titulo` on the `Banca` table. All the data in the column will be lost.
  - You are about to drop the column `raAluno` on the `Banca` table. All the data in the column will be lost.
  - You are about to drop the column `Bancas` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the `Defesa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Periodo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfessoresEmBancas` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[celular]` on the table `Professor` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `ra` on the `Aluno` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `TCC_etapa` to the `Banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `Banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `local` to the `Banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nota` to the `Banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observacao` to the `Banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ra` to the `Banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_confirmacao` to the `Banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workspace` to the `Banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `celular` to the `Professor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Aluno" DROP CONSTRAINT "Aluno_orientador_fkey";

-- DropForeignKey
ALTER TABLE "Banca" DROP CONSTRAINT "Banca_raAluno_fkey";

-- DropForeignKey
ALTER TABLE "Defesa" DROP CONSTRAINT "Defesa_raAluno_fkey";

-- DropForeignKey
ALTER TABLE "ProfessoresEmBancas" DROP CONSTRAINT "ProfessoresEmBancas_Banca_fkey";

-- DropForeignKey
ALTER TABLE "ProfessoresEmBancas" DROP CONSTRAINT "ProfessoresEmBancas_Professor_fkey";

-- DropIndex
DROP INDEX "Professor_nome_key";

-- DropIndex
DROP INDEX "Professor_telefone_key";

-- AlterTable
ALTER TABLE "Aluno" DROP COLUMN "orientador",
DROP COLUMN "periodo_matricula",
DROP COLUMN "status",
DROP COLUMN "ra",
ADD COLUMN     "ra" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Banca" DROP COLUMN "Data",
DROP COLUMN "Etapa",
DROP COLUMN "Local",
DROP COLUMN "Titulo",
DROP COLUMN "raAluno",
ADD COLUMN     "TCC_etapa" "Etapas" NOT NULL,
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "local" TEXT NOT NULL,
ADD COLUMN     "nota" TEXT NOT NULL,
ADD COLUMN     "observacao" TEXT NOT NULL,
ADD COLUMN     "ra" INTEGER NOT NULL,
ADD COLUMN     "status_confirmacao" TEXT NOT NULL,
ADD COLUMN     "workspace" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "Bancas",
DROP COLUMN "telefone",
ADD COLUMN     "celular" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Professor_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Defesa";

-- DropTable
DROP TABLE "Periodo";

-- DropTable
DROP TABLE "ProfessoresEmBancas";

-- CreateTable
CREATE TABLE "Workspace" (
    "id" SERIAL NOT NULL,
    "periodo" TEXT NOT NULL,
    "observacoes" TEXT NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TCC" (
    "id" SERIAL NOT NULL,
    "workspace" INTEGER NOT NULL,
    "ra" INTEGER NOT NULL,
    "etapa" "Etapas" NOT NULL,
    "titulo" TEXT NOT NULL,
    "orientador_id" INTEGER NOT NULL,
    "coorientador_id" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Matriculado_TCC1',

    CONSTRAINT "TCC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Banca_Professor" (
    "id" SERIAL NOT NULL,
    "workspace" INTEGER NOT NULL,
    "ra" INTEGER NOT NULL,
    "etapa" "Etapas" NOT NULL,
    "professor" INTEGER NOT NULL,

    CONSTRAINT "Banca_Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instancias" (
    "id" SERIAL NOT NULL,
    "aluno" INTEGER NOT NULL,
    "workspace" TEXT NOT NULL,
    "Etapa" "Etapas" NOT NULL,
    "orientador" TEXT NOT NULL,
    "status_processo" TEXT NOT NULL,
    "status_TCC1" TEXT NOT NULL,
    "banca_TCC1" TEXT NOT NULL,
    "defesa_TCC1" TEXT NOT NULL,
    "status_TCC2" TEXT NOT NULL,
    "banca_TCC2" TEXT NOT NULL,
    "defesa_TCC2" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Instancias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_ra_key" ON "Aluno"("ra");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_celular_key" ON "Professor"("celular");

-- AddForeignKey
ALTER TABLE "TCC" ADD CONSTRAINT "TCC_ra_fkey" FOREIGN KEY ("ra") REFERENCES "Aluno"("ra") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TCC" ADD CONSTRAINT "TCC_workspace_fkey" FOREIGN KEY ("workspace") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banca" ADD CONSTRAINT "Banca_ra_fkey" FOREIGN KEY ("ra") REFERENCES "Aluno"("ra") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banca" ADD CONSTRAINT "Banca_workspace_fkey" FOREIGN KEY ("workspace") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banca_Professor" ADD CONSTRAINT "Banca_Professor_professor_fkey" FOREIGN KEY ("professor") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banca_Professor" ADD CONSTRAINT "Banca_Professor_ra_fkey" FOREIGN KEY ("ra") REFERENCES "Aluno"("ra") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banca_Professor" ADD CONSTRAINT "Banca_Professor_workspace_fkey" FOREIGN KEY ("workspace") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instancias" ADD CONSTRAINT "Instancias_aluno_fkey" FOREIGN KEY ("aluno") REFERENCES "Aluno"("ra") ON DELETE RESTRICT ON UPDATE CASCADE;
