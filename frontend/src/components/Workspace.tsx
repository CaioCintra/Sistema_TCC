import { WorkspaceService } from "@/services/workspace";
import * as React from "react";
import { useEffect, useState } from "react";

export const workspaceService = new WorkspaceService();
export default function Workspace() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/workspaces");
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

  function changeWorkspace(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedWorkspaceId = parseInt(event.target.value);
    workspaceService.updateWorkspace(selectedWorkspaceId);
    // location.reload();
}

  return (
    <div className="left-0 mr-14">
      <select
        placeholder="Workspace"
        className="w-full bg-[var(--secondary-color)] border-gray-300 px-3 py-2 rounded-md focus:ring-gray-400 text-xl"
        onChange={changeWorkspace}
      >
        {data ? (
          data.map((workspace: any) => (
            <option value={workspace.id} key={workspace.id}>
              {workspace.periodo}
            </option>
          ))
        ) : (
          <></>
        )}
      </select>
    </div>
  );
}
