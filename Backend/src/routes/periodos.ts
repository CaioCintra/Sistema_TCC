import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { z } from "zod";

const prisma = new PrismaClient();

export async function rotasPeriodos(app: FastifyInstance) {
  app.get("/periodos", async () => {
    const periodos = await prisma.periodo.findMany({
      orderBy: {
        nome: "asc",
      },
    });
    return periodos;
  });

  app.get("/periodos/:nome", async (request) => {
    const paramsSchema = z.object({
      nome: z.string(),
    });

    const { nome } = paramsSchema.parse(request.params);

    const periodo = await prisma.periodo.findUniqueOrThrow({
      where: {
        nome,
      },
    });

    return periodo;
  });

  app.post("/periodos", async (request) => {
    const newperiodoData = request.body as {
      nome: string;
      informar_orientador: Date;
      agendar_banca: Date;
    };

    try {
      const createdperiodo = await prisma.periodo.create({
        data: newperiodoData,
      });

      return createdperiodo;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar um novo periodo.");
    }
  });

  app.put("/periodos/:nome", async (request) => {
    const paramsSchema = z.object({
      nome: z.string(),
    });

    const { nome } = paramsSchema.parse(request.params);
    const updatedperiodoData = request.body as {
      nome: string;
      informar_orientador: Date;
      agendar_banca: Date;
    };

    try {
      const updatedperiodo = await prisma.periodo.update({
        where: {
          nome: nome,
        },
        data: updatedperiodoData,
      });

      if (!updatedperiodo) {
        throw new Error(`periodo com nome: ${nome} não encontrado.`);
      }

      return updatedperiodo;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar o periodo.");
    }
  });

  app.delete("/periodos/:nome", async (request) => {
    const paramsSchema = z.object({
      nome: z.string(),
    });

    const { nome } = paramsSchema.parse(request.params);

    await prisma.periodo.delete({
      where: {
        nome,
      },
    });
  });
}
