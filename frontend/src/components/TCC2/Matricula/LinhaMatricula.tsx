import LabelStatus from "@/components/LabelStatus";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Alert, AlertTitle } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function LinhaMatricula(props: any) {
  const [error, setError] = useState(null);

  async function matricularTCC2() {
    console.log(props.workspaceAntigo);
    console.log(props.workspaceAntigo.ativo);
    if (props.workspaceAntigo == props.workspace.ativo) {
      setError("TCC1 e TCC2 no mesmo período");
      return;
    }
    await fetch("http://localhost:3333/tcc", {
      method: "POST",
      body: JSON.stringify({
        workspace: props.workspace.ativo,
        ra: parseInt(props.ra),
        etapa: "TCC2",
        titulo: "",
        orientador_id: 0,
        coorientador_id: 0,
        status: "Matriculado_TCC2",
      }),
      headers: { "Content-Type": "application/json" },
    });
    await fetch("http://localhost:3333/historico", {
      method: "POST",
      body: JSON.stringify({
        aluno: parseInt(props.ra),
        workspace: props.workspace.ativo,
        Etapa: "TCC2",
        orientador: 0,
        status_processo: "Matriculado_TCC2",
      }),
      headers: { "Content-Type": "application/json" },
    });
    location.reload();
  }

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
      <div className="px-6 mb-4 bg-[var(--secondary-color)] h-16 flex items-center justify-between">
        <text className="w-1/8">{props.ra}</text>
        <text className="w-1/6">{props.nome}</text>
        <LabelStatus className="w-1/4" status={props.status}></LabelStatus>
        <div />
        <div className="inline-flex">
          <Tooltip title="Matricular em TCC2">
            <IconButton>
              <HowToRegIcon onClick={matricularTCC2} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </>
  );
}
