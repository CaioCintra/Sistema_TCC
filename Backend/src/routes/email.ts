import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";

import { z } from "zod";
const nodemailer = require("nodemailer");

const prisma = new PrismaClient();

export async function rotasEmail(app: FastifyInstance) {
  app.post("/email/:ra/:subject/:body", async (request) => {
    const paramsSchema = z.object({
      ra: z.string(),
      subject: z.string(),
      body: z.string(),
    });
    let transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USERMAIL,
        pass: process.env.PASSMAIL,
      },
    });

    const { ra } = paramsSchema.parse(request.params);

    const alunos = await prisma.aluno.findUniqueOrThrow({
      where: {
        ra,
      },
    });

    const to = alunos.email;
    const aluno = alunos.nome;
    const orientador = alunos.orientador;

    const { subject } = paramsSchema.parse(request.params);
    var { body } = paramsSchema.parse(request.params);

    body = body.replace(/<aluno>/g, aluno);
    body = body.replace(/<orientador>/g, orientador);

    var link;

    try {
      const response = await fetch(`http://localhost:3333/alunoAuth/${ra}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API");
      }
      link = await response.text();
      body = body.replace(/<link>/g, link);
    } catch (error) {
      console.error("Erro ao verificar token:", error);
    }
    console.log("=============================", link);

    transport
      .sendMail({
        from: `Sistema TCC <${process.env.USERMAIL}>`,
        to: `${to}`,
        subject: `${subject}`,
        text: `${body}`,
      })
      .then(() => console.log("Email enviado"))
      .catch((err: any) => console.log("Email não enviado: ", err));
  });
}
