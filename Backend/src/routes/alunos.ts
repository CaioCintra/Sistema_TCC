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

  app.post("/alunos", async (request, reply) => {
    try {
      const alunoData = request.body as {
        ra: string;
        nome: string;
        email: string;
        status: string;
        periodo_matricula: string;
        orientador: string;
      };

      const novoAluno = await prisma.aluno.create({
        data: {
          ra: alunoData.ra,
          nome: alunoData.nome,
          email: alunoData.email,
          status: alunoData.status,
          periodo_matricula: alunoData.periodo_matricula,
          orientador: alunoData.orientador,
        },
      });

      reply.status(201).send(novoAluno);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ error: "Erro ao criar o aluno." });
    }
  });

  app.put("/alunos/:ra", async () => {});

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
