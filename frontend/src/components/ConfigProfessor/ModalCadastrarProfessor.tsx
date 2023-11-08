import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Alert, AlertTitle } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

export default function ModalCadastrarProfessor() {
  const [error, setError] = useState(null);

  const [content, setContent] = useState({
    nome: "",
    email: "",
    departamento: "",
    celular: "",
  });

  function limparFormulario() {
    setContent({
      nome: "",
      email: "",
      departamento: "",
      celular: "",
    });
  }

  const onChangeInput = (e: any) =>
    setContent({ ...content, [e.target.name]: e.target.value });

  const cadastrarProfessor = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3333/professores", {
        method: "POST",
        body: JSON.stringify(content),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 500) {
        setError("Professor já cadastrado");
      } else if (response.ok) {
        handleClose();
        limparFormulario();
        location.reload();
      }
    } catch (err) {
      console.log("Erro ao cadastrar professor:", err);
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
      <Button
        className="m-5 p-5 justify-center uppercase bg-[var(--primary-color)] hover:bg-slate-900 text-l font-bold"
        variant="contained"
        onClick={handleOpen}
      >
        Cadastrar Professor
      </Button>
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
            <text className="mt-3 mb-3 text-2xl font-bold">
              Cadastrar Professor
            </text>
            <p className="mt-5 mb-5 font-bold">
              Insira os dados do professor para cadastrar
            </p>

            <form onSubmit={cadastrarProfessor} id="form">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  pattern="^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                  onChange={onChangeInput}
                  value={content.nome}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                  onChange={onChangeInput}
                  value={content.email}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Departamento
                </label>
                <input
                  type="text"
                  id="departamento"
                  name="departamento"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                  onChange={onChangeInput}
                  value={content.departamento}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Celular
                </label>
                <input
                  type="tel"
                  id="celular"
                  name="celular"
                  pattern="^\d{10,11}$"
                  maxLength={11}
                  minLength={10}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                  onChange={onChangeInput}
                  value={content.celular}
                  required
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                className="mt-3 uppercase bg-[var(--primary-color)] hover:bg-slate-900 float-right bottom-0 right-0"
              >
                Cadastrar
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
