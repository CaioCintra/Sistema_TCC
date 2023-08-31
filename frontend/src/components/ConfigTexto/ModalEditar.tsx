import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Alert, AlertTitle, IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1100,
  height: 580,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
};

export default function ModalEditarTexto(props: any) {
  const [error, setError] = useState(null);

  const [content, setContent] = useState({
    nome: props.nome,
    tipo: props.tipo,
    conteudo: props.conteudo,
  });

  function limparFormulario() {
    setContent({
      nome: props.nome,
      tipo: props.tipo,
      conteudo: props.conteudo,
    });
  }

  const onChangeInput = (e: any) =>
    setContent({ ...content, [e.target.name]: e.target.value });

  const editarTexto = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3333/textos/${props.nome}`,
        {
          method: "PUT",
          body: JSON.stringify(content),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 500) {
        setError("Texto com este nome já cadastrado");
      } else if (response.ok) {
        handleClose();
        limparFormulario();
        location.reload();
      }
    } catch (err) {
      console.log("Erro ao editar texto:", err);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div>
      {error && (
        <Alert
          className="z-50 absolute bottom-2 right-0"
          severity="error"
          variant="filled"
          action={
            <Button color="inherit" size="small" onClick={() => setError(null)}>
              <CloseIcon />
            </Button>
          }
          onClose={() => setError(null)}
        >
          <AlertTitle className="font-bold">Erro</AlertTitle>
          {error}
        </Alert>
      )}
      <Tooltip title="Editar">
        <IconButton>
          <EditIcon onClick={handleOpen} />
        </IconButton>
      </Tooltip>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => {
          handleClose();
          limparFormulario();
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <text className="mt-3 mb-3 text-2xl font-bold">Editar Texto</text>
            <p className="mt-5 mb-5 font-bold">
              Insira os dados do texto para editar
            </p>

            <form onSubmit={editarTexto} id="form">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder={props.nome}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                  onChange={onChangeInput}
                  value={content.nome}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Tipo
                </label>
                <select
                  id="tipo"
                  name="tipo"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                  onChange={onChangeInput}
                  placeholder={props.tipo}
                  value={content.tipo}
                  required
                >
                  <option value="Email">Email</option>
                  <option value="Ata">Ata</option>
                  <option value="Declaracao">Declaração</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Conteúdo
                </label>
                <textarea
                  id="conteudo"
                  name="conteudo"
                  rows="5"
                  placeholder={props.conteudo}
                  className="w-full h-1/3 resize-none  border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                  onChange={onChangeInput}
                  value={content.conteudo}
                  required
                />
              </div>

              <Button
                type="submit"
                variant="contained"
                className="mt-3 uppercase bg-[var(--primary-color)] hover:bg-slate-900 float-right bottom-0 right-0"
              >
                Editar
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
