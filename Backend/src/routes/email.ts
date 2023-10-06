import { FastifyInstance } from "fastify";
import { z } from "zod";
const nodemailer = require("nodemailer");

export async function rotasEmail(app: FastifyInstance) {
  app.post("/email/:to/:subject/:body", async (request) => {
    const paramsSchema = z.object({
      to: z.string(),
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

    const { to } = paramsSchema.parse(request.params);
    const { subject } = paramsSchema.parse(request.params);
    const { body } = paramsSchema.parse(request.params);

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
