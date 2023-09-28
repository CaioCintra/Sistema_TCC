import { FastifyInstance } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

export async function rotasAlunoAuth(app: FastifyInstance) {
  app.get("/alunoAuth/:ra", async (request) => {
    const paramsSchema = z.object({
      ra: z.string(),
    });

    const { ra } = paramsSchema.parse(request.params);

    const aluno = await prisma.aluno.findUniqueOrThrow({
      where: {
        ra,
      },
    });

    if (!aluno) {
      throw new Error(`Usuário não existe.`);
    }
    const url = "http://localhost:3000/aluno/DefinirOrientador?token="
    const token = await bcrypt.hash("4luno5enha", 10);
    return url+token
  });

  app.get("/alunoAuth/token/:token", async (request) => {
    const paramsSchema = z.object({
      token: z.string(),
    });

    const { token } = paramsSchema.parse(request.params);
    const match = await bcrypt.compare("4luno5enha", token);

    if (match) {
      return true;
    } else {
      return false;
    }
  });
}
