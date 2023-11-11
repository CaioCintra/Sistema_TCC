
export class WorkspaceService {
    private workspace: number = 2;

    updateWorkspace(workspaceId: number): void {
        this.workspace = workspaceId;
    }

    getWorkspace(): number {
        return this.workspace;
    }
}
