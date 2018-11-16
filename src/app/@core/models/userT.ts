export class UserT {
    _id: string;
    rol: string;
    user_name: string;
    last_name: string;
    email: string;

    constructor(rol: string, user_name: string, last_name: string, email: string ) {
        this.rol = rol;
        this.user_name = user_name;
        this.last_name = last_name;
        this.email = email;
    }
}
