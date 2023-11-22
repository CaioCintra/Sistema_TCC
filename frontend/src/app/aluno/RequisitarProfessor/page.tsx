"use client";
import { Button } from "@mui/material";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

export default function RequisitarProfessor() {
  const [aluno, setAluno] = useState(null);
  const [professorInfo, setProfessorInfo] = useState({
    nome: "",
    email: "",
    departamento: "",
    celular: "",
  });
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const urlRA = `http://localhost:3333/alunoAuth/ra-token/${token}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ra = await axios.get(urlRA);
        const urlAluno = `http://localhost:3333/alunos/${ra.data.ra}`;
        const alunos = await axios.get(urlAluno);
        setAluno(alunos.data);
      } catch (error) {
        console.error("Erro ao obter dados do aluno:", error);
      }
    };

    fetchData();
  }, [urlRA]);

  async function requisitar(event) {
    event.preventDefault();

    try {
      await axios.post("http://localhost:3333/email/pratcc", {
        ra: parseInt(aluno.ra),
        nome: aluno.nome,
        email: aluno.email,
        professor: professorInfo.nome,
        emailProfessor: professorInfo.email,
        departamento: professorInfo.departamento,
        celular: professorInfo.celular,
      });

      setProfessorInfo({
        nome: "",
        email: "",
        departamento: "",
        celular: "",
      });
    } catch (error) {
      console.error("Erro ao requisitar professor:", error);
    }
    window.location.href = `/aluno/DadosConfirmados?token=${token}`;
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setProfessorInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  }

  return (
    <Box className="bg-[var(--background-color)] w-[50%] top-[20%] rounded-lg p-10 absolute t-1/2 shadow-lg shadow-black">
      <div>
        <p className="mt-5 mb-5 font-bold">
          Preencha os dados do professor que deseja adicionar, o professor
          responsável receberá um email e entrará em contato sobre a adição.
        </p>
        <form onSubmit={requisitar} id="form">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Nome do Professor
            </label>
            <input
              type="text"
              id="nomeProfessor"
              name="nome"
              value={professorInfo.nome}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email do Professor
            </label>
            <input
              type="email"
              id="emailProfessor"
              name="email"
              value={professorInfo.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
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
              value={professorInfo.departamento}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
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
              value={professorInfo.celular}
              onChange={handleInputChange}
              pattern="^\d{10,11}$"
              maxLength={11}
              minLength={10}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-gray-400"
              required
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            className="mt-3 uppercase bg-[var(--primary-color)] hover:bg-slate-900 float-right bottom-0 right-0"
          >
            Enviar
          </Button>
        </form>
      </div>
    </Box>
  );
}
