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

  app.get("/bancas/:ra", async (request) => {
    const paramsSchema = z.object({
      ra: z.string(),
    });

    const { ra } = paramsSchema.parse(request.params);
    const bancas = await prisma.banca.findFirstOrThrow({
      where: {
        raAluno: ra,
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
          Data: newBancaData.Data,
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

  app.put("/bancas/:id", async (request) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    try {
      const deletedProfessores = await prisma.professoresEmBancas.deleteMany({
        where: {
          Banca: parseInt(id),
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar professores da banca.");
    }

    const updatedBancaData = request.body as {
      Etapa: string;
      Titulo: string;
      Data: string;
      Local: string;
      Professores: string[];
      raAluno: string;
    };

    try {
      const professores = updatedBancaData.Professores.map((professor) => ({
        Professor: professor,
      }));

      const createdBanca = await prisma.banca.update({
        where: {
          id: parseInt(id),
        },
        data: {
          Etapa: updatedBancaData.Etapa,
          Titulo: updatedBancaData.Titulo,
          Data: updatedBancaData.Data,
          Local: updatedBancaData.Local,
          Professores: {
            create: professores,
          },
          raAluno: updatedBancaData.raAluno,
        },
      });

      return createdBanca;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar uma nova banca.");
    }
  });

  app.delete("/bancas/:id", async (request) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    try {
      const deletedProfessores = await prisma.professoresEmBancas.deleteMany({
        where: {
          Banca: parseInt(id),
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao remover professores da banca.");
    }
    try {
      const deletedBanca = await prisma.banca.delete({
        where: {
          id: parseInt(id), // Convertendo a string para número, se necessário
        },
      });

      if (!deletedBanca) {
        throw new Error(`Banca com ID: ${id} não encontrada.`);
      }

      return deletedBanca;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao deletar a banca.");
    }
  });
}
