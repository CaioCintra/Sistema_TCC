import { FastifyInstance } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

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

  app.get("/professores/:id", async (request) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    const professor = await prisma.professor.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });

    return professor;
  });

  app.post("/professores", async (request) => {
    const newProfessorData = request.body as {
      nome: string;
      email: string;
      departamento: string;
      celular: string;
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

  app.put("/professores/:id", async (request) => {
    const paramsSchema = z.object({
      id: z.string(), // Altere para z.string()
    });

    const { id } = paramsSchema.parse(request.params);
    const updatedProfessorData = request.body as {
      nome: string;
      email: string;
      departamento: string;
      celular: string;
    };

    try {
      const updatedProfessor = await prisma.professor.update({
        where: {
          id: Number(id), // Certifique-se de converter para número aqui
        },
        data: updatedProfessorData,
      });

      if (!updatedProfessor) {
        throw new Error(`Professor com ID: ${id} não encontrado.`);
      }

      return updatedProfessor;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar o professor.");
    }
  });

  app.delete("/professores/:id", async (request) => {
    const paramsSchema = z.object({
      id: z.string(), // Altere para z.string()
    });

    const { id } = paramsSchema.parse(request.params);

    try {
      await prisma.professor.delete({
        where: {
          id: Number(id), // Certifique-se de converter para número aqui
        },
      });

      return { message: `Professor com ID: ${id} deletado com sucesso.` };
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao deletar o professor.");
    }
  });
}
