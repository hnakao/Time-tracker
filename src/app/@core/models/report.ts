export class Report {
    id: string;
    projectId: string;
    userId: string;
    time: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(projectId: string, userId: string, time: number, description: string,
                updatedAt?: Date, createdAt?: Date  ) {
        this.projectId = projectId;
        this.userId = userId;
        this.time = time;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
