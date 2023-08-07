import fastify from "fastify";
import cors from '@fastify/cors'
import { rotasAlunos } from "./routes/alunos";

const app = fastify();

app.register(cors, {
  origin: ['http://localhost:3000']
})

app.register(rotasAlunos)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Servidor executando em http://localhost:3333");
  });
