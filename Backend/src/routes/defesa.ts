import { FastifyInstance } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function rotasDefesa(app: FastifyInstance) {
  app.get("/defesas", async () => {
    const defesas = await prisma.defesa.findMany();
    return defesas;
  });

  app.get("/defesas/:id", async (request) => {
    const paramsSchema = z.object({
      id: z.number(),
    });

    const { id } = paramsSchema.parse(request.params);

    const defesa = await prisma.defesa.findUnique({
      where: {
        id,
      },
    });

    if (!defesa) {
      throw new Error(`Defesa com ID: ${id} não encontrada.`);
    }

    return defesa;
  });

  app.post("/defesas", async (request) => {
    const newDefesaData = request.body as {
      Etapa: string;
      raAluno: string;
      Nota: number;
      Observacao: string;
    };

    try {
      const createdDefesa = await prisma.defesa.create({
        data: newDefesaData,
      });

      return createdDefesa;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar uma nova defesa.");
    }
  });

  app.put("/defesas/:id", async (request) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);
    const updatedDefesaData = request.body as {
      Etapa: string;
      raAluno: string;
      Nota: number;
      Observacao: string;
    };

    try {
      const updatedDefesa = await prisma.defesa.update({
        where: {
          id: parseInt(id),
        },
        data: updatedDefesaData,
      });

      if (!updatedDefesa) {
        throw new Error(`Defesa com ID: ${id} não encontrada.`);
      }

      return updatedDefesa;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar a defesa.");
    }
  });

  app.delete("/defesas/:id", async (request) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    await prisma.defesa.delete({
      where: {
        id: parseInt(id),
      },
    });
  });
}
