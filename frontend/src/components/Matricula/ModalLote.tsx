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
  height: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
};

export default function ModalLote(props: any) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [content, setContent] = useState({
    ra: "",
    nome: "",
    email: "",
  });

  function limparFormulario() {
    setContent({
      ra: "",
      nome: "",
      email: "",
    });
  }

  const onChangeInput = (e: any) =>
    setContent({ ...content, [e.target.name]: e.target.value });

const cadastrarAluno = async (e: any) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const textareaContent = content.conteudo;
    const alunos = textareaContent.split('\n').map((line) => line.split(','));

    for (const aluno of alunos) {
      const [ra, nome, email] = aluno.map((item) => item.trim());

      const response = await fetch("http://localhost:3333/alunos", {
        method: "POST",
        body: JSON.stringify({ ra, nome, email }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 500) {
        setError("RA já cadastrado");
      } else if (response.ok) {
        await fetch("http://localhost:3333/tcc", {
          method: "POST",
          body: JSON.stringify({
            workspace: props.workspace.ativo,
            ra: parseInt(ra),
            etapa: "TCC1",
            titulo: "",
            orientador_id: 0,
            coorientador_id: 0,
            status: "Matriculado_TCC1",
          }),
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    handleClose();
    limparFormulario();
    location.reload();
  } catch (err) {
    console.log("Erro ao cadastrar aluno:", err);
    setIsLoading(false);
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
      {props.workspace.ativo === props.workspace.tela ? (
        <Button
          variant="contained"
          className="uppercase bg-[var(--primary-color)] ml-4 hover:bg-slate-900 float-right"
          onClick={handleOpen}
        >
          Matricular em lote
        </Button>
      ) : (
        <></>
      )}
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
              Insira os dados do aluno separados por vírgula para matricular,
              divida cada aluno por quebra de linha, contendo respectivamente
              RA, nome e e-mail.
            </p>

            <form onSubmit={cadastrarAluno} id="form">
              <div className="mb-4">
                <textarea
                  id="conteudo"
                  name="conteudo"
                  rows="9"
                  className="w-full h-1/3 resize-none  border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                  onChange={onChangeInput}
                  required
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                className="mt-3 uppercase bg-[var(--primary-color)] hover:bg-slate-900 float-right bottom-0 right-0"
                disabled={isLoading}
              >
                {isLoading ? "CARREGANDO..." : "  MATRICULAR  "}
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
