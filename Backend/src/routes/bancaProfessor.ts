import { FastifyInstance } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function rotasBancaProfessor(app: FastifyInstance) {
  app.get("/bancas_professores", async () => {
    const bancasProfessores = await prisma.banca_Professor.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return bancasProfessores;
  });

  app.get("/bancas_professores/:id", async (request) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    const bancaProfessor = await prisma.banca_Professor.findMany({
      where: {
        banca: Number(id),
      },
    });

    return bancaProfessor;
  });

  app.post("/bancas_professores", async (request) => {
    const newBancaProfessorData = request.body as {
      banca: number;
      professor: number;
    };

    try {
      const createdBancaProfessor = await prisma.banca_Professor.create({
        data: {
          ...newBancaProfessorData,
          banca: Number(newBancaProfessorData.banca),
          professor: Number(newBancaProfessorData.professor),
        },
      });

      return createdBancaProfessor;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar nova relação Banca-Professor.");
    }
  });

  app.delete("/bancas_professores/:banca", async (request) => {
    const paramsSchema = z.object({
      banca: z.string(),
    });

    const { banca } = paramsSchema.parse(request.params);

    try {
      await prisma.banca_Professor.deleteMany({
        where: {
          banca: Number(banca),
        },
      });

      return {
        message: `Relação Banca-Professor deletada com sucesso.`,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao deletar a relação Banca-Professor.");
    }
  });
}
