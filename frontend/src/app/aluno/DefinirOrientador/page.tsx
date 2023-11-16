"use client";
import { Alert, AlertTitle, Box } from "@mui/material";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";

export default function DefinirOrientador() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const urlRA = `http://localhost:3333/alunoAuth/ra-token/${token}`;
  const linkAddProfessor = `/aluno/RequisitarProfessor?token=${token}`;

  const [aluno, setAluno] = useState(null);
  const [professor, setProfessores] = useState(null);
  const [tccAluno, setTCC] = useState(null);
  const [orientador, setOrientador] = useState("");
  const [coorientador, setCoorientador] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange1 = (event: SelectChangeEvent) => {
    setOrientador(event.target.value as string);
  };

  const handleChange2 = (event: SelectChangeEvent) => {
    setCoorientador(event.target.value as string);
  };

  const workspace = 2;

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
      try {
        const urlTCC = `http://localhost:3333/tcc/${aluno.ra}/${workspace}`;
        const tcc = await axios.get(urlTCC);
        setTCC(tcc.data[0]);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, [urlRA]);

  const handleSubmit = async () => {
    if (orientador === "") {
      setError("Campo orientador vazio");
      return;
    }
    if (orientador == coorientador) {
      setError("Orientador igual a coorientador");
      return;
    }
    setIsLoading(true);
    console.log(tccAluno);
    const response = await fetch(`http://localhost:3333/tcc/${tccAluno.id}`, {
      method: "PUT",
      body: JSON.stringify({
        etapa: "TCC1",
        titulo: "",
        orientador_id: parseInt(orientador),
        coorientador_id: parseInt(coorientador),
        status: "Orientador_Definido",
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setIsLoading(false);
      window.location.href = `/aluno/DadosConfirmados?token=${token}`;
    } else {
      setError("Erro ao editar o campo");
      setIsLoading(false);
    }
  };

  return (
    <>
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
            onChange={handleChange1}
            required
          >
            {professor ? (
              professor
                .filter((prof: any) => prof.departamento === "DACOM")
                .map((prof: any) => (
                  <MenuItem value={prof.id} key={prof.id}>
                    {prof.nome}
                  </MenuItem>
                ))
            ) : (
              <></>
            )}
          </Select>
          <InputLabel
            id="demo-simple-select-helper-label2"
            className="font-bold text-xl mt-20"
          >
            Coorientador
          </InputLabel>
          <Select
            className="mt-6"
            labelId="demo-simple-select-helper2"
            id="demo-simple-select2"
            value={coorientador}
            label="--Coorientador--"
            onChange={handleChange2}
          >
            <MenuItem value="0">Não tenho coorientador</MenuItem>
            {professor ? (
              professor
                .filter((prof: any) => prof.departamento === "DACOM")
                .map((prof: any) => (
                  <MenuItem value={prof.id} key={prof.id}>
                    {prof.nome}
                  </MenuItem>
                ))
            ) : (
              <></>
            )}
          </Select>
          <div className="inline">
            <Button
              href={linkAddProfessor}
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
              disabled={isLoading}
            >
              {isLoading ? "CARREGANDO..." : "  CONFIRMAR  "}
            </Button>
          </div>
        </FormControl>
      </Box>
    </>
  );
}
