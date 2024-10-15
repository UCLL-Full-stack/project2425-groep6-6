import { Role } from "../types";

export class User {

    private username: string;
    private password: string;
    private role: Role;
    private firstname: string;
    private lastname: string;

    constructor(User: { username: string, password: string, firstname: string, lastname: string, role: Role}){
        this.username = User.username;
        this.password = User.password;
        this.firstname = User.firstname;
        this.lastname = User.lastname;
        this.role = User.role;
    }
    getUsername(){
        return this.username;
    }
    getFirstname(){
        return this.firstname;
    }
    getLastname(){
        return this.lastname;
    }

}