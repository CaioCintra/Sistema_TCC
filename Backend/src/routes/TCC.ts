import { FastifyInstance } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function rotasTCC(app: FastifyInstance) {
  app.get("/tcc", async () => {
    const tcc = await prisma.tCC.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        aluno_ra: true,
        workspace_id: true,
      },
    });
    return tcc;
  });

  app.get("/tcc/:id", async (request) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    const tcc = await prisma.tCC.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
      include: {
        aluno_ra: true,
        workspace_id: true,
      },
    });

    return tcc;
  });

  app.post("/tcc", async (request) => {
    const newTCCData = request.body as {
      workspace: number;
      ra: number;
      etapa: string;
      titulo: string;
      orientador_id: number;
      coorientador_id: number;
      status: string;
    };

    try {
      const createdTCC = await prisma.tCC.create({
        data: newTCCData,
        include: {
          aluno_ra: true,
          workspace_id: true,
        },
      });

      return createdTCC;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar um novo TCC.");
    }
  });

  app.put("/tcc/:id", async (request) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);
    const updatedTCCData = request.body as {
      etapa: string;
      titulo: string;
      orientador_id: number;
      coorientador_id: number | null;
      status: string;
    };

    try {
      const updatedTCC = await prisma.tCC.update({
        where: {
          id: Number(id),
        },
        data: updatedTCCData,
        include: {
          aluno_ra: true,
          workspace_id: true,
        },
      });

      if (!updatedTCC) {
        throw new Error(`TCC com ID: ${id} não encontrado.`);
      }

      return updatedTCC;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar o TCC.");
    }
  });

  app.delete("/tcc/:id", async (request) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    await prisma.tCC.delete({
      where: {
        id: Number(id),
      },
    });
  });
}
