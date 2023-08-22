import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Alert } from "@mui/material";

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

export default function ModalMatricula() {
  const [error, setError] = useState(null);

  const [content, setContent] = useState({
    ra: "",
    nome: "",
    email: "",
    status: "Matriculado_TCC1",
    periodo_matricula: "2023/2",
  });

  function limparFormulario() {
    setContent({
      ra: "",
      nome: "",
      email: "",
      status: "Matriculado_TCC1",
      periodo_matricula: "2023/2",
    });
  }

  const onChangeInput = (e: any) =>
    setContent({ ...content, [e.target.name]: e.target.value });

  const cadastrarAluno = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3333/alunos", {
        method: "POST",
        body: JSON.stringify(content),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 500) {
        // Define o erro no estado para exibir na renderização.
        setError("Erro interno do servidor");
      } else if (response.ok) {
        // Se a resposta for bem-sucedida, execute as ações desejadas.
        handleClose();
        limparFormulario();
        location.reload();
      }
    } catch (err) {
      // Se ocorrer um erro que não seja uma resposta 500, você pode escolher lidar com isso de alguma outra maneira, se necessário.
      console.log("Erro ao cadastrar aluno:", err);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {error && (
        <Alert
          action={
            <Button color="inherit" size="small" onClick={() => setError(null)}>
              UNDO
            </Button>
          }
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}
      <text className="text-2xl font-bold">Matricular TCC1</text>
      <Button
        variant="contained"
        className="uppercase bg-[var(--primary-color)] hover:bg-slate-900 float-right"
        onClick={handleOpen}
      >
        Matricular
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
              Matricular Aluno
            </text>
            <p className="mt-5 mb-5 font-bold">
              Insira os alunos para matricular
            </p>

            <form onSubmit={cadastrarAluno} id="form">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  RA
                </label>
                <input
                  type="text"
                  id="ra"
                  name="ra"
                  pattern="[0-9]{7}"
                  maxLength={7}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                  onChange={onChangeInput}
                  value={content.ra}
                  required
                />
              </div>
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
                  Período
                </label>
                <select
                  id="periodo_matricula"
                  name="periodo_matricula"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                  onChange={onChangeInput}
                  value={content.periodo_matricula}
                  required
                >
                  <option value="2023/2">2023/2</option>
                  <option value="2023/1">2023/1</option>
                  <option value="2022/2">2022/2</option>
                  <option value="2022/1">2022/1</option>
                </select>
              </div>
              <Button
                type="submit"
                variant="contained"
                className="mt-3 uppercase bg-[var(--primary-color)] hover:bg-slate-900 float-right bottom-0 right-0"
              >
                {" "}
                Matricular
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
