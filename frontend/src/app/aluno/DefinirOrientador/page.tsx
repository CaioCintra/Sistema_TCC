"use client";
import { Box } from "@mui/material";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function DefinirOrientador() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const urlRA = `http://localhost:3333/alunoAuth/ra-token/${token}`;

  const [aluno, setAluno] = useState(null);
  const [professor, setProfessores] = useState(null);

  const [orientador, setOrientador] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setOrientador(event.target.value as string);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ra = await axios.get(urlRA);
        const urlAluno = `http://localhost:3333/alunos/${ra.data.ra}`;
        const aluno = await axios.get(urlAluno);
        setAluno(aluno.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
      try {
        const urlProfessor = `http://localhost:3333/professores`;
        const professor = await axios.get(urlProfessor);
        setProfessores(professor.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, [urlRA]);

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3333/alunos/${aluno.ra}`,
        {
          orientador: orientador,
          status: "Orientador_Definido",
        }
      );
      window.location.href = "/DadosConfirmados";
      return response.data;
    } catch (error) {
      throw new Error("Erro ao editar o campo");
    }
  };

  return (
    <Box className="bg-[var(--background-color)] w-[70%] top-1/3 rounded-lg p-10 absolute t-1/2 shadow-lg shadow-black">
      {aluno && (
        <p className="font-semibold text-[var(--third-color)] text-3xl">
          Olá {aluno.nome}
        </p>
      )}
      <br />
      <p className="font-semibold text-[var(--third-color)] text-xl">
        Informe seu orientador de TCC
      </p>
      <FormControl fullWidth className="mt-8">
        <InputLabel
          id="demo-simple-select-helper-label"
          className="font-bold text-xl"
        >
          Orientador
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper"
          id="demo-simple-select"
          value={orientador}
          label="--Orientador--"
          onChange={handleChange}
        >
          {professor ? (
            professor.map((professor: any) => (
              <MenuItem value={professor.nome}>{professor.nome}</MenuItem>
            ))
          ) : (
            <></>
          )}
        </Select>
        <div className="inline">
          <Button
            href="/RequisitarProfessor"
            variant="contained"
            className="font-medium h-14 w-auto mt-8 bg-[var(--primary-color)] hover:bg-slate-900"
          >
            MEU PROFESSOR NÃO ESTÁ NA LISTA
          </Button>
          <Button
            type="submit"
            variant="contained"
            className="font-medium h-14 w-auto mt-8 bg-[var(--primary-color)] hover:bg-slate-900 float-right"
            onClick={handleSubmit}
          >
            CONFIRMAR
          </Button>
        </div>
      </FormControl>
    </Box>
  );
}
