"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Alert, AlertTitle, IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1100,
  height: 670,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
};

export default function BoxAgendarBanca(props: any) {
  const [error, setError] = useState(null);
  const [professores, setProfessores] = useState([]);
  const [banca, setBanca] = useState([]);
  const [bancaExiste, setBancaExiste] = useState(false);
  const [selectedProfessores, setSelectedProfessores] = useState([""]);

  const workspace = props.workspace.ativo;

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

          try {
            const professoresBancaResponse = await axios.get(
              `http://localhost:3333/bancas_professores/${response.data.id}`
            );
            const professoresBancaData = professoresBancaResponse.data;
            const selectedProfessoresData = professoresBancaData.map(
              (professor) => professor.professor
            );
            console.log(selectedProfessoresData);
            setSelectedProfessores(selectedProfessoresData);
          } catch (error) {
            console.error("Erro na requisição de professores da banca:", error);
          }
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
      if (bancaExiste) {
        setContent({
          aluno: props.ra,
          tituloTrabalho: props.titulo,
          data: props.data,
          horario: props.hora,
          local: props.local,
        });
      } else {
        setContent({
          aluno: props.ra,
          tituloTrabalho: props.titulo,
          data: "",
          horario: "",
          local: props.local,
        });
      }
    };
    fetchData();
  }, [props.data, props.ra]);

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
    tituloTrabalho: props.titulo,
    data: props.data,
    horario: props.hora,
    local: props.local,
  });

  const limparFormulario = () => {
    setContent({
      aluno: props.ra,
      tituloTrabalho: props.titulo,
      data: props.data,
      horario: props.hora,
      local: props.local,
    });
  };

  const onChangeInput = (e) =>
    setContent({ ...content, [e.target.name]: e.target.value });

  const excluirBanca = async () => {
    await axios.delete(`http://localhost:3333/bancas_professores/${banca.id}`);
    await axios.delete(`http://localhost:3333/bancas/${banca.id}`);
    await fetch(`http://localhost:3333/tcc/${props.ra}/${workspace}`, {
      method: "PUT",
      body: JSON.stringify({ status: "Orientador_Definido" }),
      headers: { "Content-Type": "application/json" },
    });
    limparFormulario();
    location.reload();
  };

  const cadastrarBanca = async (e) => {
    e.preventDefault();

    let bancaId;
    if (bancaExiste) {
      const response = await axios.put(
        `http://localhost:3333/bancas/${banca.id}`,
        {
          data: `${content.data}T${content.horario}:00.000Z`,
          local: content.local,
        }
      );
      if (response.status === 500) {
        setError("Erro ao atualizar banca");
      }
      bancaId = banca.id;
    } else {
      const response = await axios.post("http://localhost:3333/bancas", {
        TCC_etapa: "TCC1",
        data: `${content.data}T${content.horario}:00.000Z`,
        local: content.local,
        nota: "0",
        observacao: "",
        ra: content.aluno,
        status_confirmacao: "Não Confirmada",
        workspace: workspace,
      });
      bancaId = response.data.id;
      if (response.status === 500) {
        setError("Erro ao cadastrar banca");
      }
    }

    try {
      await fetch(`http://localhost:3333/tcc/${props.ra}/${workspace}`, {
        method: "PUT",
        body: JSON.stringify({
          status: "Banca_TCC1_Agendada",
          titulo: content.tituloTrabalho,
        }),
        headers: { "Content-Type": "application/json" },
      });
      await axios.delete(`http://localhost:3333/bancas_professores/${bancaId}`);
      for (let i = 0; i < selectedProfessores.length; i++) {
        const professorBancaResponse = await axios.post(
          "http://localhost:3333/bancas_professores",
          {
            banca: bancaId,
            professor: selectedProfessores[i],
          }
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar status do aluno:", error);
    }

    handleClose();
    limparFormulario();
    window.location.href = `/aluno/DadosConfirmados?token=${props.token}`;
  };

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
          <label className="block text-gray-700 font-medium mb-2">Banca</label>
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
            type="submit"
            variant="contained"
            className="mt-3 uppercase bg-[var(--primary-color)] hover:bg-slate-900 float-right bottom-0 right-0"
          >
            Agendar
          </Button>
        </form>
      </Box>
    </div>
  );
}
