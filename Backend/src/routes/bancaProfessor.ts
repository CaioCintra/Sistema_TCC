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

    const bancaProfessor = await prisma.banca_Professor.findUniqueOrThrow({
      where: {
        id: Number(id),
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

  app.put("/bancas_professores/:id", async (request) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);
    const updatedBancaProfessorData = request.body as {
      banca: number;
      professor: number;
    };

    try {
      const updatedBancaProfessor = await prisma.banca_Professor.update({
        where: {
          id: Number(id),
        },
        data: updatedBancaProfessorData,
      });

      if (!updatedBancaProfessor) {
        throw new Error(
          `Relação Banca-Professor com ID: ${id} não encontrada.`
        );
      }

      return updatedBancaProfessor;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar a relação Banca-Professor.");
    }
  });

  app.delete("/bancas_professores/:id", async (request) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    try {
      await prisma.banca_Professor.delete({
        where: {
          id: Number(id),
        },
      });

      return {
        message: `Relação Banca-Professor com ID: ${id} deletada com sucesso.`,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao deletar a relação Banca-Professor.");
    }
  });
}
