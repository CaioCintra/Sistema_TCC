import { FastifyInstance } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function rotasHistorico(app: FastifyInstance) {
  app.get("/historico/:ra", async (request) => {
    const paramsSchema = z.object({
      ra: z.string(),
    });

    const { ra } = paramsSchema.parse(request.params);

    const instancia = await prisma.instancias.findMany({
      where: {
        aluno: Number(ra),
      },
      orderBy: {
        timestamp: "asc",
      },
    });

    return instancia;
  });

  app.post("/historico", async (request) => {
    const newInstanciaData = request.body as {
      aluno: number;
      workspace: number;
      Etapa: string;
      orientador: number;
      status_processo: string;
    };

    try {
      const createdInstancia = await prisma.instancias.create({
        data: {
          ...newInstanciaData,
          timestamp: new Date(),
        },
      });

      return createdInstancia;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar uma nova instância.");
    }
  });
}
