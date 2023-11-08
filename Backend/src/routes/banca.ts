import { FastifyInstance } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function rotasBanca(app: FastifyInstance) {
  app.get("/bancas", async () => {
    const bancas = await prisma.banca.findMany({
      include: {
        aluno_ra: true,
        workspace_id: true,
      },
    });
    return bancas;
  });

  app.get("/bancas/:ra", async (request) => {
    const paramsSchema = z.object({
      ra: z.string(),
    });

    const { ra } = paramsSchema.parse(request.params);
    const banca = await prisma.banca.findFirst({
      where: {
        aluno_ra: {
          ra: parseInt(ra),
        },
      },
      include: {
        aluno_ra: true,
        workspace_id: true,
      },
    });

    if (!banca) {
      throw new Error(`Banca com RA: ${ra} não encontrada.`);
    }

    return banca;
  });

  app.post("/bancas", async (request) => {
    const newBancaData = request.body as {
      TCC_etapa: string;
      data: string;
      local: string;
      nota: string;
      observacao: string;
      ra: number;
      status_confirmacao: string;
      workspace: number;
    };

    try {
      const createdBanca = await prisma.banca.create({
        data: newBancaData,
        include: {
          aluno_ra: true,
          workspace_id: true,
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
      const updatedBancaData = request.body as {
        TCC_etapa: string;
        data: string;
        local: string;
        nota: string;
        observacao: string;
        ra: number;
        status_confirmacao: string;
        workspace: number;
      };

      const updatedBanca = await prisma.banca.update({
        where: {
          id: parseInt(id),
        },
        data: updatedBancaData,
        include: {
          aluno_ra: true,
          workspace_id: true,
        },
      });

      if (!updatedBanca) {
        throw new Error(`Banca com ID: ${id} não encontrada.`);
      }

      return updatedBanca;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar a banca.");
    }
  });

  app.delete("/bancas/:id", async (request) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    try {
      const deletedBanca = await prisma.banca.delete({
        where: {
          id: parseInt(id),
        },
        include: {
          aluno_ra: true,
          workspace_id: true,
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

