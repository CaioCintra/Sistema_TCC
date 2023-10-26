import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Alert, AlertTitle, IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1100,
  height: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
};

export default function ModalIndividualAgendarBanca(props: any) {
  const [error, setError] = useState(null);
  const [professores, setProfessores] = useState([]);
  const [banca, setBanca] = useState([]);
  const [bancaExiste, setBancaExiste] = useState(false);
  const [selectedProfessores, setSelectedProfessores] = useState([""]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/professores`);
        setProfessores(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
      try {
        const response = await axios.get(
          `http://localhost:3333/bancas/${props.ra}`
        );
        if (response === null) {
          setBancaExiste(false);
        } else {
          setBancaExiste(true);
          setBanca(response.data);
          const data = new Date(response.data.Data);
          const formattedData = data.toISOString().split("T")[0];
          const hora = data.toISOString().split("T")[1].split(".")[0];
          setContent({
            aluno: props.ra,
            tituloTrabalho: response.data.Titulo,
            data: formattedData,
            horario: hora,
            local: response.data.Local,
          });
          setSelectedProfessores(response.data.Professores);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };
    fetchData();
  }, []);

  const handleProfessorChange = (e, index) => {
    const updatedSelectedProfessores = [...selectedProfessores];
    updatedSelectedProfessores[index] = e.target.value;
    setSelectedProfessores(updatedSelectedProfessores);
  };

  const adicionarNovoCampo = () => {
    if (selectedProfessores.length < 3) {
      setSelectedProfessores([...selectedProfessores, ""]);
    } else {
      setError("Limite de banca atingido");
    }
  };

  const removerNovoCampo = (index) => {
    const updatedSelectedProfessores = [...selectedProfessores];
    updatedSelectedProfessores.splice(index, 1);
    setSelectedProfessores(updatedSelectedProfessores);
  };

  const [content, setContent] = useState({
    aluno: props.ra,
    tituloTrabalho: "",
    data: "",
    horario: "",
    local: "",
  });

  const limparFormulario = () => {
    setContent({
      aluno: props.ra,
      tituloTrabalho: "",
      data: "",
      horario: "",
      local: "",
    });
  };

  const onChangeInput = (e) =>
    setContent({ ...content, [e.target.name]: e.target.value });

  const excluirBanca = async () => {
    await axios.delete(`http://localhost:3333/bancas/${banca.id}`);
    await fetch(`http://localhost:3333/alunos/${content.aluno}`, {
      method: "PUT",
      body: JSON.stringify({ status: "Orientador_Definido" }),
      headers: { "Content-Type": "application/json" },
    });
    handleClose();
    limparFormulario();
    location.reload();
  };

  const cadastrarBanca = async (e) => {
    e.preventDefault();
    console.log("selectedProfessores:", selectedProfessores);
    try {
      const response = await axios.post("http://localhost:3333/bancas", {
        Etapa: "TCC1",
        Titulo: content.tituloTrabalho,
        Data: `${content.data}T${content.horario}:00.000Z`,
        Local: content.local,
        Professores: selectedProfessores,
        raAluno: content.aluno,
      });

      if (response.status === 500) {
        setError("Erro ao cadastrar banca");
      } else if (response.status === 200) {
        try {
          await fetch(`http://localhost:3333/alunos/${content.aluno}`, {
            method: "PUT",
            body: JSON.stringify({ status: "Banca_TCC1_Agendada" }),
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error("Erro ao atualizar status do aluno:", error);
        }

        handleClose();
        limparFormulario();
        location.reload();
      }
    } catch (err) {
      console.error("Erro ao cadastrar banca:", err);
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
          className="z-0 absolute bottom-2 right-0"
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
            <text className="mt-3 mb-3 text-2xl font-bold">Agendar Banca</text>
            <p className="mt-5 mb-5 font-bold">
              Preencha os dados para agendar a banca
            </p>

            <form onSubmit={cadastrarBanca} id="form">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Aluno
                </label>
                <input
                  type="text"
                  id="aluno"
                  name="aluno"
                  className="w-full border border-gray-300 px-3 py-2 mr-2 rounded-md focus:ring focus:ring-gray-400"
                  value={props.nome}
                  disabled
                />
              </div>
              <label className="block text-gray-700 font-medium mb-2">
                Banca
              </label>
              <div className="relative mb-4 flex items-center">
                {selectedProfessores &&
                  selectedProfessores.map((professorId, index) => (
                    <div key={index} className="flex items-center">
                      <select
                        id={`professor-${index}`}
                        name={`professor-${index}`}
                        className="w-56 border border-gray-300 px-3 py-2 mr-2 rounded-md focus:ring focus:ring-gray-400"
                        onChange={(e) => handleProfessorChange(e, index)}
                        value={professorId}
                        required
                      >
                        <option value="">Selecione um professor</option>
                        {professores.map((prof, index) => (
                          <option key={index} value={prof.id}>
                            {prof.nome}
                          </option>
                        ))}
                      </select>
                      {index !== 0 && (
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700 mr-2 font-bold"
                          onClick={() => removerNovoCampo(index)}
                        >
                          X
                        </button>
                      )}
                    </div>
                  ))}
                <button
                  type="button"
                  className="relative top-0 right-0 bg-[var(--primary-color)] hover:bg-slate-900 text-white font-bold py-2 px-4 ml-2 rounded"
                  onClick={adicionarNovoCampo}
                >
                  +
                </button>
                <Button
                  variant="contained"
                  className="uppercase bg-[var(--primary-color)] ml-4 hover:bg-slate-900 float-right h-10"
                  href="../admin/cadastroProfessor"
                >
                  Cadastrar Professor
                </Button>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Título do Trabalho
                </label>
                <input
                  type="text"
                  id="tituloTrabalho"
                  name="tituloTrabalho"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                  onChange={onChangeInput}
                  value={content.tituloTrabalho}
                  required
                />
              </div>
              <div className="mb-4 flex">
                <div className="w-1/2 pr-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    Data
                  </label>
                  <input
                    type="date"
                    id="data"
                    name="data"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                    onChange={onChangeInput}
                    value={content.data}
                    required
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    Horário
                  </label>
                  <input
                    type="time"
                    id="horario"
                    name="horario"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                    onChange={onChangeInput}
                    value={content.horario}
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Local
                </label>
                <input
                  type="text"
                  id="local"
                  name="local"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                  onChange={onChangeInput}
                  value={content.local}
                  required
                />
              </div>
              <Button
                variant="contained"
                className="mt-3 uppercase bg-[var(--alert-color)] hover:bg-red-700 float-left bottom-0 left-0"
                onClick={excluirBanca}
              >
                Excluir Banca
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="mt-3 uppercase bg-[var(--primary-color)] hover:bg-slate-900 float-right bottom-0 right-0"
              >
                Agendar
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
