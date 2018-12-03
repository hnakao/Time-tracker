export class Project {
    id: string;
    projectName: string;
    estimatedDuration: number;
    currentSpentTime: number;
    usersId: string[];
    description: string;
    createAt: Date;
    updateAt: Date;

    constructor(projectName: string, estimatedDuration: number,
                description: string, spentTime: number = 0, users?: string[],
                updateAt?: Date, createAt?: Date ) {
        this.projectName = projectName;
        this.estimatedDuration = estimatedDuration;
        this.currentSpentTime = spentTime;
        this.usersId = users;
        this.description = description;
        this.createAt = createAt;
        this.updateAt = updateAt;

    }
}
