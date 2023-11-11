import { FastifyInstance } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function rotasWorkspace(app: FastifyInstance) {
  app.get("/workspaces", async () => {
    const workspaces = await prisma.workspace.findMany({
      orderBy: {
        periodo: "desc",
      },
    });
    return workspaces;
  });

  app.get("/workspaces/:id", async (request) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    const workspace = await prisma.workspace.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });

    return workspace;
  });

  app.post("/workspaces", async (request) => {
    const newWorkspaceData = request.body as {
      periodo: string;
      observacoes: string;
    };

    try {
      const createdWorkspace = await prisma.workspace.create({
        data: newWorkspaceData,
      });

      return createdWorkspace;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar um novo workspace.");
    }
  });

  app.put("/workspaces/:id", async (request) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);
    const updatedWorkspaceData = request.body as {
      periodo: string;
      observacoes: string;
    };

    try {
      const updatedWorkspace = await prisma.workspace.update({
        where: {
          id: Number(id),
        },
        data: updatedWorkspaceData,
      });

      if (!updatedWorkspace) {
        throw new Error(`Workspace com ID: ${id} não encontrado.`);
      }

      return updatedWorkspace;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar o workspace.");
    }
  });

  app.delete("/workspaces/:id", async (request) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    await prisma.workspace.delete({
      where: {
        id: Number(id),
      },
    });
  });

  app.get("/workspaces/tela", async (request) => {
    const workspace = await prisma.workspaceAtivo.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return workspace[0];
  });

  app.put("/workspaces/tela", async (request) => {
    const updatedWorkspaceData = request.body as {
      tela: Number;
      ativo: Number;
    };

    const updatedWorkspace = await prisma.workspaceAtivo.update({
      where: {
        id: 1,
      },
      data: updatedWorkspaceData,
    });
    return updatedWorkspace;
  });
}
