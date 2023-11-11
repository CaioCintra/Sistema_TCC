export class WorkspaceService {
    async updateWorkspace(workspaceId: number) {
      await fetch("http://localhost:3333/workspaces/tela", {
        method: "PUT",
        body: JSON.stringify({
          tela: workspaceId,
        }),
        headers: { "Content-Type": "application/json" },
      });
    }
  
    async getWorkspace(): Promise<number> {
      const response = await fetch("http://localhost:3333/workspaces/tela", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        throw new Error("Erro ao obter dados do workspace");
      }
  
      const data = await response.json();
      return data;
    }
  }
  