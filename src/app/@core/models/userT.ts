export class UserT {
    _id: number;
    rol: string;
    userName: string;
    lastName: string;
    email: string;

    constructor(rol: string, userName: string, lastName: string, email: string ) {
        this.rol = rol;
        this.userName = userName;
        this.lastName = lastName;
        this.email = email;
    }
}
