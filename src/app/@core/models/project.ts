import { UserT } from './userT';
export class Project {
    _id: number;
    project_name: string;
    estimated_duration: number;
    spent_time: number;
    user_asig: UserT[];
    description: string;

    constructor(project_name: string, estimated_duration: number,
        description: string, spent_time: number = 0, user_asig: UserT[] = []) {
        this.project_name = project_name;
        this.estimated_duration = estimated_duration;
        this.spent_time = spent_time;
        this.user_asig = user_asig;
        this.description = description;
    }
}
