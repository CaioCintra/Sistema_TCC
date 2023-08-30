import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1100,
  height: 390,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
};

export default function ModalOrientador(props: any) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/professores");
        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, []);

  const [content, setContent] = useState({
    ra: props.ra,
    nome: props.nome,
    email: props.email,
    status: props.status,
    periodo_matricula: props.periodo,
    orientador: props.orientador,
  });

  const onChangeInput = (e: any) =>
    setContent({ ...content, [e.target.name]: e.target.value });

  const definirOrientador = async (e: any) => {
    e.preventDefault();
    if (content.orientador != ''){
        content.status = 'Orientador_Definido'
    }
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
              Definir Orientador
            </text>
            <p className="mt-5 mb-5 font-bold">
              Confira o nome do aluno e escolha seu professor orientador
            </p>

            <form onSubmit={definirOrientador} id="form">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Aluno
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                  onChange={onChangeInput}
                  value={content.nome}
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Orientador
                </label>
                <select
                  id="orientador"
                  name="orientador"
                  placeholder={props.orientador}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                  onChange={onChangeInput}
                  value={content.orientador}
                  required
                >
                    <option value=''>Selecione um orientador</option>
                  {data ? (
                    data.map((professor: any) => (
                      <option value={professor.nome}>{professor.nome}</option>
                    ))
                  ) : (
                    <></>
                  )}
                </select>
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
