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
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
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

    extrairHoraEDia(props.data);
  }, [props.data, props.ra]);

  const handleProfessorChange = (e, index) => {
    const updatedSelectedProfessores = [...selectedProfessores];
    updatedSelectedProfessores[index] = e.target.value;
    setSelectedProfessores(updatedSelectedProfessores);
  };

  function extrairHoraEDia(datetimeString: any) {
    const dataHora = new Date(datetimeString);

    const horaMinuto =
      ("0" + dataHora.getHours()).slice(-2) +
      ":" +
      ("0" + dataHora.getMinutes()).slice(-2);

    const dataFormatada =
      ("0" + dataHora.getDate()).slice(-2) +
      "/" +
      ("0" + (dataHora.getMonth() + 1)).slice(-2) +
      "/" +
      dataHora.getFullYear();

    setTime(horaMinuto);
    setDate(dataFormatada);
  }

  const confirmarBanca = async () => {
    await fetch(`http://localhost:3333/tcc/${props.ra}/${workspace}`, {
      method: "PUT",
      body: JSON.stringify({
        status: "Banca_TCC1_Confirmada",
      }),
      headers: { "Content-Type": "application/json" },
    });
    await fetch("http://localhost:3333/historico", {
      method: "POST",
      body: JSON.stringify({
        aluno: parseInt(props.ra),
        workspace: workspace,
        Etapa: "TCC1",
        orientador: props.orientador,
        status_processo: "Banca_TCC1_Confirmada",
      }),
      headers: { "Content-Type": "application/json" },
    });
    await fetch(`http://localhost:3333/bancas/${banca.id}`, {
      method: "PUT",
      body: JSON.stringify({
        status_confirmacao: "Confirmada",
      }),
      headers: { "Content-Type": "application/json" },
    });
    window.location.href = `/aluno/DadosConfirmados?token=${props.token}`;
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
      await fetch("http://localhost:3333/historico", {
        method: "POST",
        body: JSON.stringify({
          aluno: parseInt(props.ra),
          workspace: workspace,
          Etapa: "TCC1",
          orientador: props.orientador,
          status_processo: "Banca_TCC1_Agendada",
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
                    value={professorId}
                    disabled
                  >
                    <option value="">Selecione um professor</option>
                    {professores.map((prof, index) => (
                      <option key={index} value={prof.id}>
                        {prof.nome}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
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
              value={props.titulo}
              disabled
            />
          </div>
          <div className="mb-4 flex">
            <div className="w-1/2 pr-2">
              <label className="block text-gray-700 font-medium mb-2">
                Data
              </label>
              <input
                type="text"
                id="data"
                name="data"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                value={date}
                disabled
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700 font-medium mb-2">
                Horário
              </label>
              <input
                type="text"
                id="horario"
                name="horario"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
                value={time}
                disabled
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
              value={props.local}
              disabled
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            className="mt-3 uppercase bg-[var(--primary-color)] hover:bg-slate-900 float-right bottom-0 right-0"
            onClick={confirmarBanca}
          >
            Confirmar Banca
          </Button>
        </form>
      </Box>
    </div>
  );
}
