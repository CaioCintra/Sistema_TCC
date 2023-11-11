import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

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

export default function ModalEditar(props: any) {
  const [content, setContent] = useState({
    ra: props.ra,
    nome: props.nome,
    email: props.email,
  });

  function limparFormulario() {
    setContent({
      ra: props.ra,
      nome: props.nome,
      email: props.email,
    });
  }

  const onChangeInput = (e: any) =>
    setContent({ ...content, [e.target.name]: e.target.value });

  const cadastrarAluno = async (e: any) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3333/alunos/${props.ra}`, {
        method: "PUT",
        body: JSON.stringify(content),
        headers: { "Content-Type": "application/json" },
      });
      handleClose();
      location.reload();
    } catch (err) {
      console.log("Erro ao atualizar aluno");
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {props.workspace.ativo === props.workspace.tela ? (
        <Tooltip title="Editar">
        <IconButton>
          <EditIcon onClick={handleOpen} />
        </IconButton>
      </Tooltip>
      ) : (
        <Tooltip title="Período inativo">
        <IconButton disabled>
          <EditIcon/>
        </IconButton>
      </Tooltip>
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
            <text className="mt-3 mb-3 text-2xl font-bold">Editar Aluno</text>
            <p className="mt-5 mb-5 font-bold">
              Edite as informações necessárias
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
                  placeholder={props.ra}
                  maxLength={7}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                  onChange={onChangeInput}
                  value={content.ra}
                  required
                  disabled
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
                  placeholder={props.nome}
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
              <Button
                type="submit"
                variant="contained"
                className="mt-3 uppercase bg-[var(--primary-color)] hover:bg-slate-900 float-right bottom-0 right-0"
              >
                {" "}
                Salvar
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
