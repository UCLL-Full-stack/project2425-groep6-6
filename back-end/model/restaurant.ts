import { User } from "./user";

export class Restaurant {
    private id?: number;
    private name: string;
    private address: string;
    private users: Array<User>;

    constructor(Restaurant: {name: string, address: string}){
        this.name = Restaurant.name;
        this.address = Restaurant.address;
        this.users = new Array<User>;
    }

    getAddress(): string {
        return this.address;
    }
    getName(): string{
        return this.name;
    }
    getUsers(): Array<User>{
        return this.users;
    }
    addUser(user:User){
        if(!this.users.includes(user)){
            this.users.push(user);
        }
    }
}
