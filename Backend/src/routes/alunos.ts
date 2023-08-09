import { FastifyInstance } from "fastify";
import { z } from "zod";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function rotasAlunos(app: FastifyInstance) {
  app.get("/alunos", async () => {
    const alunos = await prisma.aluno.findMany({
      orderBy: {
        ra: "asc",
      },
    });

    return alunos.map((aluno) => {
      return {
        ra: aluno.ra,
        nome: aluno.nome,
        email: aluno.email,
        status: aluno.status,
        periodo: aluno.periodo_matricula,
      };
    });
  });

  app.get("/alunos/:ra", async (request) => {
    const paramsSchema = z.object({
      ra: z.string(),
    });

    const { ra } = paramsSchema.parse(request.params);

    const aluno = await prisma.aluno.findUniqueOrThrow({
      where: {
        ra,
      },
    });

    return aluno;
  });

  app.post("/alunos", async (request) => {});

  app.put("/alunos/:ra", async () => {});

  app.delete("/alunos/:ra", async () => {});
}
