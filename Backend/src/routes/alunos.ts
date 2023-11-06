import { FastifyInstance } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function rotasAlunos(app: FastifyInstance) {
  app.get("/alunos", async () => {
    const alunos = await prisma.aluno.findMany({
      orderBy: {
        nome: "asc",
      },
    });
    return alunos;
  });

  app.get("/alunos/:ra", async (request) => {
    const paramsSchema = z.object({
      ra: z.string(), // Altere para z.string()
    });

    const { ra } = paramsSchema.parse(request.params);

    const aluno = await prisma.aluno.findUniqueOrThrow({
      where: {
        ra: Number(ra), // Certifique-se de converter para número aqui
      },
    });

    return aluno;
  });

  app.post("/alunos", async (request) => {
    const newAlunoData = request.body as {
      ra: number;
      nome: string;
      email: string;
    };

    try {
      const createdAluno = await prisma.aluno.create({
        data: {
          ...newAlunoData,
          ra: Number(newAlunoData.ra), // Certifique-se de converter para número aqui
        },
      });

      return createdAluno;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar um novo aluno.");
    }
  });

  app.put("/alunos/:ra", async (request) => {
    const paramsSchema = z.object({
      ra: z.string(), // Altere para z.string()
    });

    const { ra } = paramsSchema.parse(request.params);
    const updatedAlunoData = request.body as {
      nome: string;
      email: string;
    };

    try {
      const updatedAluno = await prisma.aluno.update({
        where: {
          ra: Number(ra), // Certifique-se de converter para número aqui
        },
        data: updatedAlunoData,
      });

      if (!updatedAluno) {
        throw new Error(`Aluno com RA: ${ra} não encontrado.`);
      }

      return updatedAluno;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar o aluno.");
    }
  });

  app.delete("/alunos/:ra", async (request) => {
    const paramsSchema = z.object({
      ra: z.string(), // Altere para z.string()
    });

    const { ra } = paramsSchema.parse(request.params);

    try {
      await prisma.tCC.deleteMany({
        where: {
          ra: Number(ra),
        },
      });
      await prisma.aluno.delete({
        where: {
          ra: Number(ra), // Certifique-se de converter para número aqui
        },
      });

      return { message: `Aluno com RA: ${ra} deletado com sucesso.` };
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao deletar o aluno.");
    }
  });

  app.get("/alunos/matricula", async (req, res) => {
    try {
      const alunos = await prisma.aluno.findMany({
        orderBy: {
          nome: "asc",
        },
      });

      const alunosComTCCs = await Promise.all(
        alunos.map(async (aluno) => {
          const tccs = await prisma.tCC.findMany({
            where: {
              ra: aluno.ra,
            },
          });

          return {
            ra: aluno.ra,
            nome: aluno.nome,
            email: aluno.email,
            status: tccs.length > 0 ? tccs[0].status : null,
          };
        })
      );

      return alunosComTCCs;
    } catch (error) {
      console.error("Erro na requisição:", error);
      res.status(500).json({ error: "Erro ao buscar dados da API" });
    }
  });

  app.get("/alunos/orientador", async (req, res) => {
    try {
      const alunos = await prisma.aluno.findMany({
        orderBy: {
          nome: "asc",
        },
      });

      const alunosComTCCs = await Promise.all(
        alunos.map(async (aluno) => {
          const tccs = await prisma.tCC.findMany({
            where: {
              ra: aluno.ra,
            },
          });

          return {
            ra: aluno.ra,
            nome: aluno.nome,
            email: aluno.email,
            status: tccs.length > 0 ? tccs[0].status : null,
            orientador: tccs[0].orientador_id,
            coorientador: tccs[0].coorientador_id,
            workspace: tccs[0].workspace,
          };
        })
      );

      return alunosComTCCs;
    } catch (error) {
      console.error("Erro na requisição:", error);
      res.status(500).json({ error: "Erro ao buscar dados da API" });
    }
  });
}
