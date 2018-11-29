export class Project {
    id: string;
    projectName: string;
    estimatedDuration: number;
    currentSpentTime: number;
    users: string[];
    description: string;

    constructor(projectName: string, estimatedDuration: number,
        description: string, spentTime: number = 0, users: string[] = []) {
        this.projectName = projectName;
        this.estimatedDuration = estimatedDuration;
        this.currentSpentTime = spentTime;
        this.users = users;
        this.description = description;
    }
}
