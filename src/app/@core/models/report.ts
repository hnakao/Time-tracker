export class Report {
    _id: string;
    name_dev: string;
    project_name: string;
    time_work: number;
    description: string;

    constructor(project_name: string, time_work: number, description: string ) {
        this.name_dev = '';
        this.project_name = project_name;
        this.time_work = time_work;
        this.description = description;
    }
}
