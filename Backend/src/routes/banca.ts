import { FastifyInstance } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function rotasBanca(app: FastifyInstance) {
  app.get("/bancas", async () => {
    const bancas = await prisma.banca.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return bancas;
  });
  app.post("/bancas", async (request) => {
    const newBancaData = request.body as {
      Etapa: string;
      Titulo: string;
      Data: string;
      Local: string;
      Professores: string[];
      raAluno: string;
    };

    try {
      const professores = newBancaData.Professores.map((professor) => ({
        Professor: professor,
      }));

      const createdBanca = await prisma.banca.create({
        data: {
          Etapa: newBancaData.Etapa,
          Titulo: newBancaData.Titulo,
          Data: new Date(newBancaData.Data),
          Local: newBancaData.Local,
          Professores: {
            create: professores,
          },
          raAluno: newBancaData.raAluno,
        },
      });

      return createdBanca;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar uma nova banca.");
    }
  });
}
