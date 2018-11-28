export class Report {
    id: string;
    projectId: string;
    userId: string;
    time: number;
    description: string;

    constructor(projectId: string, userId: string, time: number, description: string ) {
        this.projectId = projectId;
        this.userId = userId;
        this.time = time;
        this.description = description;
    }
}
