import fastify from "fastify";
import cors from "@fastify/cors";
import { registerRoutes } from "./routes/routes";

const app = fastify();

app.register(cors, {
  origin: ["http://localhost:3000"],
});

registerRoutes(app);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Servidor executando em http://localhost:3333");
  });
