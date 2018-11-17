import { UserT } from './userT';
export class Project {
    _id: number;
    projectName: string;
    estimatedDuration: number;
    spentTime: number;
    userAsig: UserT[];
    description: string;

    constructor(projectName: string, estimatedDuration: number,
        description: string, spentTime: number = 0, userAsig: UserT[] = []) {
        this.projectName = projectName;
        this.estimatedDuration = estimatedDuration;
        this.spentTime = spentTime;
        this.userAsig = userAsig;
        this.description = description;
    }
}
