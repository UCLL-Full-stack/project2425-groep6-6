import { User } from "./user";
import {Restaurant as RestaurantPrisma} from  '@prisma/client'


export class Restaurant {
    private id?: number;
    private name: string;
    private address: string;
    private users: Array<User>;

    constructor(Restaurant: {name: string, address: string, id? : number, users: User[]}){
        this.validate(Restaurant.name, Restaurant.address, Restaurant.id);

        this.id = Restaurant.id;
        this.name = Restaurant.name;
        this.address = Restaurant.address;
        this.users = Restaurant.users;
    }



    private validate(name: string, address: string, id?: number): boolean {
        if (id !== undefined && (!Number.isInteger(id) || id <= 0)) {
            throw new Error("ID, if provided, must be a positive integer.");
        }

        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error("Name must be a non-empty string.");
        }

        if (typeof address !== 'string' || address.trim().length === 0) {
            throw new Error("Address must be a non-empty string.");
        }

        return true; 
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
    getId() {
        return this.id;
    }
    addUser(user:User){
        if(!this.users.includes(user)){
            this.users.push(user);
        }
    }





    static async from({
        id,
        name,
        address
        
    }: RestaurantPrisma): Promise<Restaurant> {

        return new Restaurant({
          id: id,
          name: name,
          address: address,
          users: []
        

        });
      }
}
