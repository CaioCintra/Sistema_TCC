import { FastifyInstance } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
const prisma = new PrismaClient();

export async function rotasAlunoAuth(app: FastifyInstance) {
  app.get("/alunoAuth/:ra/:pagina", async (request) => {
    const paramsSchema = z.object({
      ra: z.string(),
      pagina: z.string(),
    });

    const { ra, pagina } = paramsSchema.parse(request.params);

    const aluno = await prisma.aluno.findUniqueOrThrow({
      where: {
        ra: parseInt(ra),
      },
    });

    if (!aluno) {
      throw new Error(`Usuário não existe.`);
    }

    const url = `http://localhost:3000/aluno/${pagina}?token=`;
    const token = randomUUID();

    try {
      const existingToken = await prisma.tokenAluno.findUnique({
        where: {
          ra,
        },
      });

      if (existingToken) {
        await prisma.tokenAluno.delete({
          where: {
            ra,
          },
        });
      }
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar relação entre ra e token.");
    }

    try {
      await prisma.tokenAluno.create({
        data: {
          ra,
          token,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar relação entre ra e token.");
    }

    const link = url + token;
    return link;
  });

  app.get("/alunoAuth/token/:token", async (request) => {
    const paramsSchema = z.object({
      token: z.string(),
    });

    const { token } = paramsSchema.parse(request.params);
    const match = await prisma.tokenAluno.findUniqueOrThrow({
      where: {
        token,
      },
    });

    if (match) {
      return true;
    } else {
      return false;
    }
  });

  app.get("/alunoAuth/ra-token/:token", async (request) => {
    const paramsSchema = z.object({
      token: z.string(),
    });

    const { token } = paramsSchema.parse(request.params);

    const tokens = await prisma.tokenAluno.findUniqueOrThrow({
      where: {
        token,
      },
    });

    return tokens;
  });
}
