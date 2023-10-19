import { FastifyInstance } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const axios = require("axios");
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
    const url = "http://localhost:3000/aluno/DefinirOrientador?token=";
    const token = await bcrypt.hash("4luno5enha", 10);
    const alunoToken = await prisma.tokenAluno.findUniqueOrThrow({
      where: {
        ra,
      },
    });
    if (!alunoToken) {
      try {
        await prisma.tokenAluno.create({
          data: {
            ra: ra,
            token: token,
          },
        });
      } catch (error) {
        console.error(error);
        throw new Error("Erro ao criar relação entre ra e token.");
      }
    } else {
      try {
        await prisma.tokenAluno.update({
          where: {
            ra: ra,
          },
          data: {
            token: token,
          },
        });
      } catch (error) {
        console.error(error);
        throw new Error("Erro ao criar relação entre ra e token.");
      }
      const link = url + token
      return link
    }
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
