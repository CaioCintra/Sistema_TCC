import fastify from "fastify";
import { rotasAlunos } from "./routes/alunos";

const app = fastify();

app.register(rotasAlunos)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Servidor executando em http://localhost:3333");
  });
