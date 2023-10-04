-- CreateEnum
CREATE TYPE "Etapas" AS ENUM ('TCC1', 'TCC2');

-- AlterTable
ALTER TABLE "Professor" ADD COLUMN     "Bancas" INTEGER;

-- CreateTable
CREATE TABLE "Banca" (
    "id" SERIAL NOT NULL,
    "Etapa" "Etapas" NOT NULL,
    "raAluno" TEXT,
    "Titulo" TEXT NOT NULL,
    "Data" TIMESTAMP(3) NOT NULL,
    "Local" TEXT NOT NULL,

    CONSTRAINT "Banca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessoresEmBancas" (
    "Professor" TEXT NOT NULL,
    "Banca" INTEGER NOT NULL,

    CONSTRAINT "ProfessoresEmBancas_pkey" PRIMARY KEY ("Professor","Banca")
);

-- CreateTable
CREATE TABLE "Defesa" (
    "id" SERIAL NOT NULL,
    "Etapa" "Etapas" NOT NULL,
    "raAluno" TEXT,
    "Nota" DECIMAL(2,2),
    "Observacao" TEXT NOT NULL,

    CONSTRAINT "Defesa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Banca" ADD CONSTRAINT "Banca_raAluno_fkey" FOREIGN KEY ("raAluno") REFERENCES "Aluno"("ra") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessoresEmBancas" ADD CONSTRAINT "ProfessoresEmBancas_Professor_fkey" FOREIGN KEY ("Professor") REFERENCES "Professor"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessoresEmBancas" ADD CONSTRAINT "ProfessoresEmBancas_Banca_fkey" FOREIGN KEY ("Banca") REFERENCES "Banca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Defesa" ADD CONSTRAINT "Defesa_raAluno_fkey" FOREIGN KEY ("raAluno") REFERENCES "Aluno"("ra") ON DELETE SET NULL ON UPDATE CASCADE;
