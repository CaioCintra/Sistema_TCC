import React, { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
import LinhaBanca from "./LinhaBanca";

export default function AgendarBanca() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/alunos");
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

  const filteredData = data?.filter(
    (aluno) =>
      aluno.status === "Orientador_Definido" ||
      aluno.status === "Banca_TCC1_Agendada"
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2 className="text-xl -mt-5 mb-4 font-bold">Agendar Banca TCC1</h2>
      <div className="items-center space-y-1">
        <div className="px-6 flex font-extrabold">
          <text className="w-[15%]">RA</text>
          <text className="w-[27%]">Nome</text>
          <text className="w-[19%]">Status</text>
          <text className="w-[32%]">Orientador</text>
          <text className="">Ações</text>
        </div>
        <div className="h-[20rem]">
          {currentItems &&
            currentItems.map((aluno) => (
              <LinhaBanca
                key={aluno.ra}
                ra={aluno.ra}
                nome={aluno.nome}
                status={aluno.status}
                matricula={aluno.periodo}
                orientador={aluno.orientador}
                email={aluno.email}
              />
            ))}
        </div>
        <Pagination
          className="grid place-items-center"
          color="grey"
          count={Math.ceil(filteredData?.length / itemsPerPage)}
          shape="rounded"
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
