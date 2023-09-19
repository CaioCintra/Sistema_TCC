import fastify from "fastify";
import cors from '@fastify/cors'
import { rotasAlunos } from "./routes/alunos";
import { rotasProfessores } from "./routes/professores";
import { rotasTextos } from "./routes/textos";
import { rotasPeriodos } from "./routes/periodos";
import { rotasLogin } from "./routes/login";

const app = fastify();

app.register(cors, {
  origin: ['http://localhost:3000']
})

app.register(rotasLogin)
app.register(rotasAlunos)
app.register(rotasProfessores)
app.register(rotasTextos)
app.register(rotasPeriodos)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Servidor executando em http://localhost:3333");
  });
