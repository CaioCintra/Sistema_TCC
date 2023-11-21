import * as React from "react";
import { Box, Button, IconButton, Modal, Tooltip } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useState, useEffect } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1100,
  height: 460,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
  overflowY: "auto",
};

export default function WorkspaceEdit(props: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function finalizarWorkspace() {
    setIsLoading1(true);
    try {
      const response = await fetch(`http://localhost:3333/workspaces/tela`, {
        method: "PUT",
        body: JSON.stringify({ ativo: 0 }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
    } catch (error) {
      console.error("Erro na requisição:", error.message);
    }
    location.reload();
    setIsLoading1(false);
  }

  async function criarWorkspace(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const periodo = formData.get("periodo") as string;
    const observacoes = formData.get("observacoes") as string;

    try {
      const responsePost = await fetch(`http://localhost:3333/workspaces`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          periodo: periodo,
          observacoes: observacoes,
        }),
      });

      const novoWorkspace = await responsePost.json();
      const novoWorkspaceId = novoWorkspace.id;

      const response = await fetch(`http://localhost:3333/workspaces/tela`, {
        method: "PUT",
        body: JSON.stringify({ ativo: novoWorkspaceId, tela: novoWorkspaceId }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
    } catch (error) {
      console.error("Erro na requisição:", error.message);
    }

    location.reload();
    setIsLoading(false);
  }

  return (
    <>
      <Tooltip title="Editar Workspace">
        <IconButton>
          <EditNoteIcon onClick={handleOpen} />
        </IconButton>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p className="text-4xl font-bold text-center mb-5">Atenção</p>
          <p className="text-lg font-bold text-center mb-3">
            Ao finalizar um workspace, os dados contidos nele não poderão ser
            alterados, confira se tudo está correto.
          </p>
          <p className="text-lg font-bold text-center mb-3">
            Ao criar um novo workspace, o anterior será finalizado
            automaticamente.
          </p>

          <form onSubmit={criarWorkspace} id="form">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Período
              </label>
              <input
                type="text"
                id="periodo"
                name="periodo"
                pattern="^\d{4}\/\d$"
                maxLength={6}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Observações
              </label>
              <textarea
                id="observacoes"
                name="observacoes"
                rows={2}
                className="w-full h-1/3 resize-none border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                required
              />
            </div>
            <Button
              variant="contained"
              className="mt-3 uppercase bg-[var(--alert-color)] hover:bg-slate-900 float-left bottom-0 left-0"
              disabled={isLoading1}
              onClick={finalizarWorkspace}
            >
              {isLoading1 ? "CARREGANDO..." : "  Finalizar workspace "}
            </Button>
            <Button
              type="submit"
              variant="contained"
              className="mt-3 uppercase bg-[var(--primary-color)] hover:bg-slate-900 float-right bottom-0 right-0"
              disabled={isLoading}
            >
              {isLoading ? "CARREGANDO..." : "  Criar novo workspace  "}
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
