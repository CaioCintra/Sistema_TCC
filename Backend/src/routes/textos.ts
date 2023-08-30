import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { z } from "zod";

const prisma = new PrismaClient();

export async function rotasTextos(app: FastifyInstance) {
  app.get("/textos", async () => {
    const textos = await prisma.texto.findMany({
      orderBy: {
        nome: "asc",
      },
    });
    return textos;
  });

  app.get("/textos/:nome", async (request) => {
    const paramsSchema = z.object({
      nome: z.string(),
    });

    const { nome } = paramsSchema.parse(request.params);

    const texto = await prisma.texto.findUniqueOrThrow({
      where: {
        nome,
      },
    });

    return texto;
  });

  app.post("/textos", async (request) => {
    const newtextoData = request.body as {
      nome: string;
      tipo: string;
      conteudo: string;
    };

    try {
      const createdtexto = await prisma.texto.create({
        data: newtextoData,
      });

      return createdtexto;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar um novo texto.");
    }
  });

  app.put("/textos/:nome", async (request) => {
    const paramsSchema = z.object({
      nome: z.string(),
    });

    const { nome } = paramsSchema.parse(request.params);
    const updatedtextoData = request.body as {
      nome: string;
      tipo: string;
      conteudo: string;
    };

    try {
      const updatedtexto = await prisma.texto.update({
        where: {
          nome: nome,
        },
        data: updatedtextoData,
      });

      if (!updatedtexto) {
        throw new Error(`texto com nome: ${nome} não encontrado.`);
      }

      return updatedtexto;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar o texto.");
    }
  });

  app.delete("/textos/:nome", async (request) => {
    const paramsSchema = z.object({
      nome: z.string(),
    });

    const { nome } = paramsSchema.parse(request.params);

    await prisma.texto.delete({
      where: {
        nome,
      },
    });
  });
}
