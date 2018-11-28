import { UserT } from './userT';
export class Project {
    id: string;
    projectName: string;
    estimatedDuration: number;
    currentSpentTime: number;
    usersId: string[];
    description: string;

    constructor(projectName: string, estimatedDuration: number,
        description: string, spentTime: number = 0, usersId: string[] = []) {
        this.projectName = projectName;
        this.estimatedDuration = estimatedDuration;
        this.currentSpentTime = spentTime;
        this.usersId = usersId;
        this.description = description;
    }
}
