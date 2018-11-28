
export class Role {
    id: number;
    roleName: string;
    workMode: string;
    basicSalary: number;
    extraHours: number;
    payExtraHours: number;
    description: string;
    // TODO:--quit
    createdAt: string;
    updatedAt: string;

    constructor(roleName: string, workMode: string, basicSalary: number,
                description: string, extraHours: number, payExtraHours?: number) {
        this.roleName = roleName;
        this.workMode = workMode;
        this.basicSalary = basicSalary;
        this.extraHours = extraHours;
        this.payExtraHours = payExtraHours;
        this.description = description;
        // TODO:--quit
        this.createdAt = '2018-11-27T16:41:34.000Z';
        this.updatedAt = '2018-11-27T16:41:34.000Z';
    }
}
