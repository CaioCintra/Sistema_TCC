import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";

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
  

}

