import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function rotasAlunos(app:FastifyInstance) {
    app.get("/alunos", async () => {
        const alunos = await prisma.aluno.findMany({
            // orderBy: {
            //     createdAt: 'asc'
            // },
        })

        return alunos
    })

    app.get("/alunos/:ra", async () => {

    });

    app.post("/alunos", async () => {

    });

    app.put("/alunos/:ra", async () => {

    });

    app.delete("/alunos/:ra", async () => {

    });
}