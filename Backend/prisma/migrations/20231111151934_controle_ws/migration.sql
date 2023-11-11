-- CreateTable
CREATE TABLE "WorkspaceAtivo" (
    "id" SERIAL NOT NULL,
    "tela" INTEGER NOT NULL,
    "ativo" INTEGER NOT NULL,

    CONSTRAINT "WorkspaceAtivo_pkey" PRIMARY KEY ("id")
);
