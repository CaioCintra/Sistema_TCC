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
      ra: z.string(),
    });

    const { ra } = paramsSchema.parse(request.params);

    const aluno = await prisma.aluno.findUniqueOrThrow({
      where: {
        ra: Number(ra),
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
          ra: Number(newAlunoData.ra),
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
      ra: z.string(),
    });

    const { ra } = paramsSchema.parse(request.params);
    const updatedAlunoData = request.body as {
      nome: string;
      email: string;
    };

    try {
      const updatedAluno = await prisma.aluno.update({
        where: {
          ra: Number(ra),
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

  app.delete("/alunos/:ra/:workspace", async (request) => {
    const paramsSchema = z.object({
      ra: z.string(),
      workspace: z.string(),
    });

    const { ra } = paramsSchema.parse(request.params);
    const { workspace } = paramsSchema.parse(request.params);

    try {
      await prisma.tCC.deleteMany({
        where: {
          ra: Number(ra),
          workspace: Number(workspace),
        },
      });
      await prisma.aluno.delete({
        where: {
          ra: Number(ra),
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

          const alunoComTCC = {
            ra: aluno.ra,
            nome: aluno.nome,
            email: aluno.email,
            status: tccs.length > 0 ? tccs[0].status : null,
            workspace: tccs.length > 0 ? tccs[0].workspace : null,
          };

          return alunoComTCC;
        })
      );

      return alunosComTCCs;
    } catch (error) {
      console.error("Erro na requisição:", error);
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
            orientador:
              tccs[0] && tccs[0].orientador_id ? tccs[0].orientador_id : 0,
            coorientador:
              tccs[0] && tccs[0].coorientador_id ? tccs[0].coorientador_id : 0,
            workspace: tccs[0] ? tccs[0].workspace : null,
          };
        })
      );

      return alunosComTCCs;
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  });

  app.get("/alunos/banca", async (req, res) => {
    try {
      const alunos = await prisma.aluno.findMany({
        orderBy: {
          nome: "asc",
        },
      });

      const alunosComBancas = await Promise.all(
        alunos.map(async (aluno) => {
          const banca = await prisma.banca.findMany({
            where: {
              ra: aluno.ra,
            },
          });
          const tccs = await prisma.tCC.findMany({
            where: {
              ra: aluno.ra,
            },
          });
          if (banca.length > 0) {
            return {
              ra: aluno.ra,
              nome: aluno.nome,
              email: aluno.email,
              id: banca[0].id,
              data: banca[0].data,
              nota: banca[0].nota,
              local: banca[0].local,
              observacao: banca[0].observacao,
              status_confirmacao: banca[0].status_confirmacao,
              titulo: tccs[0].titulo,
              status: tccs.length > 0 ? tccs[0].status : null,
              orientador: tccs.length > 0 ? tccs[0].orientador_id : null,
              coorientador: tccs.length > 0 ? tccs[0].coorientador_id : null,
              workspace: tccs.length > 0 ? tccs[0].workspace : null,
            };
          } else {
            return {
              ra: aluno.ra,
              nome: aluno.nome,
              email: aluno.email,
              id: null,
              data: null,
              nota: null,
              local: null,
              observacao: null,
              status_confirmacao: null,
              titulo: null,
              status: tccs.length > 0 ? tccs[0].status : null,
              orientador: tccs.length > 0 ? tccs[0].orientador_id : null,
              coorientador: tccs.length > 0 ? tccs[0].coorientador_id : null,
              workspace: tccs.length > 0 ? tccs[0].workspace : null,
            };
          }
        })
      );

      return alunosComBancas;
    } catch (error) {
      console.error("Erro na requisição:", error);
      res.status(500).json({ error: "Erro ao buscar dados da API" });
    }
  });

  app.get("/alunos/historico", async (req, res) => {
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
  
          const alunoComTCC = {
            ra: aluno.ra,
            nome: aluno.nome,
            email: aluno.email,
            status: tccs.length > 0 ? tccs[0].status : null,
            workspace: tccs.length > 0 ? tccs[0].workspace : null,
          };
  
          return alunoComTCC;
        })
      );
  
      const statusPersonalizado = ["Matriculado_TCC1", "Orientador_Definido", "Banca_TCC1_Agendada","Banca_TCC1_Confirmada","Aprovado_TCC1","Reprovado_TCC1","Matriculado_TCC2", "Orientador_Definido_TCC2", "Banca_TCC2_Agendada","Banca_TCC2_Confirmada","Aprovado_TCC2","Reprovado_TCC2"];
  
      alunosComTCCs.sort((a, b) => {
        const statusA = a.status || "";
        const statusB = b.status || "";
  
        return statusPersonalizado.indexOf(statusA) - statusPersonalizado.indexOf(statusB);
      });
  
      return alunosComTCCs;
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  });  
}
