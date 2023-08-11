import { FastifyInstance } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function rotasAlunos(app: FastifyInstance) {
  app.get("/alunos", async () => {
    const alunos = await prisma.aluno.findMany({
      orderBy: {
        ra: "asc",
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

  app.post("/alunos", async (request) => {});

  app.put("/alunos/:ra", async () => {});

  app.delete("/alunos/:ra", async () => {});
}
