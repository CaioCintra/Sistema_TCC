import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";

const prisma = new PrismaClient();

export async function rotasProfessores(app:FastifyInstance) {
  app.get("/professores", async () => {
    const professores = await prisma.professor.findMany({
      orderBy: {
        nome: "asc",
      },
    });

    return professores.map((professor) => {
      return {
        nome: professor.nome,
        email: professor.email,
        departamento: professor.departamento,
        telefone: professor.telefone,
      };
    });
  });
}