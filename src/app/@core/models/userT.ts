
export class UserT {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: string;
    // --quit
    isDeleted: number;

    constructor( userName: string, lastName: string, email: string,
                password?: string, roleId?: string ) {
        this.firstName = userName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.roleId = roleId;
        this.isDeleted = 0;
    }
}

