import { FastifyInstance } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function rotasAlunos(app: FastifyInstance) {
  app.get("/alunos", async () => {
    const alunos = await prisma.aluno.findMany({
      orderBy: {
        nome: "asc",
      },
    });
    return alunos;
  });

  app.get("/alunos/:ra", async (request) => {
    const paramsSchema = z.object({
      ra: z.string(),
    });

    const { ra } = paramsSchema.parse(request.params);

    const alunos = await prisma.aluno.findUniqueOrThrow({
      where: {
        ra,
      },
    });

    return alunos;
  });

  app.post("/alunos", async (request) => {
    const newAlunoData = request.body as {
      ra: string;
      nome: string;
      email: string;
      status: string;
      periodo_matricula: string;
      orientador: string;
    };

    try {
      const createdAluno = await prisma.aluno.create({
        data: newAlunoData,
      });

      return createdAluno;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar um novo aluno.");
    }
  });

  app.put("/alunos/:ra", async (request) => {
    const paramsSchema = z.object({
      ra: z.string(),
    });

    const { ra } = paramsSchema.parse(request.params);
    const updatedAlunoData = request.body as {
      nome: string;
      email: string;
      status: string;
      periodo_matricula: string;
      orientador: string;
    };

    try {
      const updatedAluno = await prisma.aluno.update({
        where: {
          ra: ra,
        },
        data: updatedAlunoData,
      });

      if (!updatedAluno) {
        throw new Error(`Aluno com RA: ${ra} não encontrado.`);
      }

      return updatedAluno;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar o aluno.");
    }
  });

  app.delete("/alunos/:ra", async (request) => {
    const paramsSchema = z.object({
      ra: z.string(),
    });

    const { ra } = paramsSchema.parse(request.params);

    await prisma.aluno.delete({
      where: {
        ra,
      },
    });
  });
}
