import { FastifyInstance } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const prisma = new PrismaClient();

export async function rotasLogin(app: FastifyInstance) {
  app.get("/login", async () => {
    const admins = await prisma.admin.findMany({
      orderBy: {
        login: "asc",
      },
    });
    return admins;
  });

  app.get("/login/:login/:senha", async (request) => {
    const paramsSchema = z.object({
      login: z.string(),
      senha: z.string(),
    });

    const { login } = paramsSchema.parse(request.params);
    const { senha } = paramsSchema.parse(request.params);

    const admin = await prisma.admin.findUniqueOrThrow({
      where: {
        login,
      },
    });

    if (!admin) {
      throw new Error(`Usuário não existe.`);
    }

    try {
      const match = await bcrypt.compare(senha, admin.senha);
      if (match) {
        return await bcrypt.hash("Senh4Ultr4Secret4", 10);
      } else {
        throw new Error("Senha Incorreta");
      }
    } catch (error) {
      throw error;
    }
  });

  app.get("/login/:token", async (request) => {
    const paramsSchema = z.object({
      token: z.string(),
    });

    const { token } = paramsSchema.parse(request.params);

    const match = await bcrypt.compare("Senh4Ultr4Secret4", token);

    if(match) {
      return true
    }else{
      return false
    }
  });

  app.post("/login", async (request) => {
    const newAdminData = request.body as {
      login: string;
      senha: string;
    };

    try {
      const hashedPassword = await bcrypt.hash(newAdminData.senha, 10);

      const createdAdmin = await prisma.admin.create({
        data: {
          login: newAdminData.login,
          senha: hashedPassword, // Armazena a senha criptografada
        },
      });

      return createdAdmin;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar conta.");
    }
  });

  app.put("/login/:login", async (request) => {
    const paramsSchema = z.object({
      login: z.string(),
    });

    const { login } = paramsSchema.parse(request.params);
    const updatedAdminData = request.body as {
      login: string;
      senha: string;
    };

    try {
      if (updatedAdminData.senha) {
        updatedAdminData.senha = await bcrypt.hash(updatedAdminData.senha, 10);
      }

      const updatedAdmin = await prisma.admin.update({
        where: {
          login: login,
        },
        data: updatedAdminData,
      });

      if (!updatedAdmin) {
        throw new Error(`Usuário não existe.`);
      }

      return updatedAdmin;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar o usuário.");
    }
  });

  app.delete("/login/:login", async (request) => {
    const paramsSchema = z.object({
      login: z.string(),
    });

    const { login } = paramsSchema.parse(request.params);

    await prisma.admin.delete({
      where: {
        login,
      },
    });
  });
}