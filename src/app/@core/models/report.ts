export class Report {
    _id: string;
    projectName: string;
    userName: string;
    timeWork: number;
    description: string;

    constructor(userName: string, projectName: string, timeWork: number, description: string ) {
        this.userName = userName;
        this.projectName = projectName;
        this.timeWork = timeWork;
        this.description = description;
    }
}
