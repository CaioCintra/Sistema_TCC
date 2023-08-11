-- DropForeignKey
ALTER TABLE "Aluno" DROP CONSTRAINT "Aluno_professorNome_fkey";

-- AlterTable
ALTER TABLE "Aluno" ALTER COLUMN "professorNome" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_professorNome_fkey" FOREIGN KEY ("professorNome") REFERENCES "Professor"("nome") ON DELETE SET NULL ON UPDATE CASCADE;
