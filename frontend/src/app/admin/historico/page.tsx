"use client";
import LinhaHistorico from "@/components/Dashboard/LinhaHistorico";
import { workspaceService } from "@/components/Workspace";
import { Button, ButtonGroup, Switch } from "@mui/material";
import { useEffect, useState } from "react";

export default function Historico() {
  const [data, setData] = useState(null);
  const [value, setValue] = useState(0);
  const [filterValue, setFilterValue] = useState("workspace");
  const [orderBy, setOrderBy] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workspaceValue = await workspaceService.getWorkspace();
        setValue(workspaceValue);
        const response = await fetch("http://localhost:3333/alunos/historico");
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

  return (
    <div>
      <text className="text-2xl font-bold">Histórico</text>
      <div className="flex space-x-4 mb-4 float-right">
        <Switch
          checked={filterValue === "workspace"}
          onChange={() =>
            setFilterValue((prevFilterValue) =>
              prevFilterValue === "workspace" ? "" : "workspace"
            )
          }
        />
        <label className="mt-2">Filtrar por Workspace</label>
        <ButtonGroup
          disableElevation
          variant="contained"
          color="inherit"
          aria-label="Disabled elevation buttons"
        >
          <Button
            variant="contained"
            className="uppercase bg-[var(--primary-color)] hover:bg-slate-900 float-right text-white"
            onClick={() => setOrderBy("ra")}
          >
            Ordenar por RA
          </Button>
          <Button
            variant="contained"
            className="uppercase bg-[var(--primary-color)] hover:bg-slate-900 float-right text-white"
            onClick={() => setOrderBy("nome")}
          >
            Ordenar por Nome
          </Button>
          <Button
            variant="contained"
            className="uppercase bg-[var(--primary-color)] hover:bg-slate-900 float-right text-white"
            onClick={() => setOrderBy("")}
          >
            Ordenar por status
          </Button>
        </ButtonGroup>
      </div>
      <div className="m-10 mt-20 items-center space-y-1">
        <div className="px-6 flex font-extrabold">
          <text className="w-[20%]">RA</text>
          <text className="w-[34%]">Nome</text>
          <text className="w-[42%]">Status</text>
          <text className="w-[5%]">Ações</text>
        </div>
        <div>
          {data ? (
            data
              .filter((aluno: any) => {
                if (filterValue === "workspace") {
                  return parseInt(aluno.workspace) === value.tela;
                } else {
                  return true;
                }
              })
              .sort((a: any, b: any) => {
                if (orderBy) {
                  const valueA =
                    typeof a[orderBy] === "string"
                      ? a[orderBy]
                      : String(a[orderBy]);
                  const valueB =
                    typeof b[orderBy] === "string"
                      ? b[orderBy]
                      : String(b[orderBy]);
                  return valueA.localeCompare(valueB);
                } else {
                  return 0;
                }
              })
              .map((aluno: any) => (
                <LinhaHistorico
                  ra={aluno.ra}
                  nome={aluno.nome}
                  email={aluno.email}
                  status={aluno.status}
                  workspace={value}
                  key={aluno.ra}
                />
              ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
