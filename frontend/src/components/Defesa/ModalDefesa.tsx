import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

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

export default function ModalDefesa(props: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    limparFormulario();
  };

  const [content, setContent] = useState({
    nota: "",
    observacao: "",
  });

  function limparFormulario() {
    setContent({
      nota: "",
      observacao: "",
    });
  }

  const onChangeInput = (e: any) =>
    setContent({ ...content, [e.target.name]: e.target.value });

  const registrarDefesa = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3333/bancas/${props.idBanca}`, {
      method: "PUT",
      body: JSON.stringify({
        nota: content.nota,
        observacao: content.observacao,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (parseFloat(content.nota) >= 6.0) {
      await fetch(`http://localhost:3333/tcc/${props.ra}/${props.workspace}`, {
        method: "PUT",
        body: JSON.stringify({
          status: "Aprovado_TCC1",
        }),
        headers: { "Content-Type": "application/json" },
      });
    } else {
      await fetch(`http://localhost:3333/tcc/${props.ra}/${props.workspace}`, {
        method: "PUT",
        body: JSON.stringify({
          status: "Reprovado_TCC1",
        }),
        headers: { "Content-Type": "application/json" },
      });
    }
    handleClose();
    location.reload();
  };

  return (
    <div>
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
              Registrar Defesa
            </text>
            <p className="mt-5 mb-5 font-bold">
              Confira o nome do aluno e atribua sua nota, e observações caso
              necessário.
            </p>

            <form onSubmit={registrarDefesa} id="form">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Aluno
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                  value={props.nome}
                  disabled
                />
              </div>
              <label className="block text-gray-700 font-medium mb-2">
                Nota
              </label>
              <input
                type="text"
                id="nota"
                name="nota"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400 mb-4"
                onChange={onChangeInput}
                value={content.nota}
                placeholder="Insira a nota atribuída"
                pattern="^(10|\d{0,1}(\.\d)?)$"
                title="Por favor, insira um valor entre 0.0 e 10.0"
                required
              />

              <label className="block text-gray-700 font-medium mb-2">
                Observações
              </label>
              <textarea
                id="observacao"
                name="observacao"
                rows="5"
                className="w-full h-1/3 resize-none  border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400 mb-4"
                onChange={onChangeInput}
                placeholder="Insira as observações feitas (Opcional)"
                value={content.observacao}
              />
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
