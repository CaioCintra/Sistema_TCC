import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { z } from "zod";

const prisma = new PrismaClient();

export async function rotasProfessores(app: FastifyInstance) {
  app.get("/professores", async () => {
    const professores = await prisma.professor.findMany({
      orderBy: {
        nome: "asc",
      },
    });
    return professores;
  });

  app.get("/professores/:nome", async (request) => {
    const paramsSchema = z.object({
      nome: z.string(),
    });

    const { nome } = paramsSchema.parse(request.params);

    const professor = await prisma.professor.findUniqueOrThrow({
      where: {
        nome,
      },
    });

    return professor;
  });

  app.post("/professores", async (request) => {
    const newProfessorData = request.body as {
      nome: string;
      email: string;
      departamento: string;
      telefone: string;
    };

    try {
      const createdProfessor = await prisma.professor.create({
        data: newProfessorData,
      });

      return createdProfessor;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar um novo professor.");
    }
  });

  app.put("/professores/:nome", async (request) => {
    const paramsSchema = z.object({
      nome: z.string(),
    });

    const { nome } = paramsSchema.parse(request.params);
    const updatedProfessorData = request.body as {
      nome: string;
      email: string;
      departamento: string;
      telefone: string;
    };

    try {
      const updatedProfessor = await prisma.professor.update({
        where: {
          nome: nome,
        },
        data: updatedProfessorData,
      });

      if (!updatedProfessor) {
        throw new Error(`Professor com nome: ${nome} não encontrado.`);
      }

      return updatedProfessor;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar o professor.");
    }
  });

  app.delete("/professores/:nome", async (request) => {
    const paramsSchema = z.object({
      nome: z.string(),
    });

    const { nome } = paramsSchema.parse(request.params);

    await prisma.professor.delete({
      where: {
        nome,
      },
    });
  });
}
