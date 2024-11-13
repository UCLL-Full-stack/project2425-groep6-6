import { Item } from "./item";
import { User } from "./user";

export class Reservation {
    private id?: number;
    private date: Date;
    private user: User;
    private items: Array<Item>;

    constructor(Reservation: { id?:number, date: Date, user: User }){
        this.validate(Reservation.date, Reservation.user, Reservation.id);

        this.id = Reservation.id;
        this.date = Reservation.date;
        this.user = Reservation.user;
        this.items = []
    }


    private validate( date: Date, user: User, id?: number): boolean {
        if (id !== undefined && (!Number.isInteger(id) || id <= 0)) {
            throw new Error("ID, if provided, must be a positive integer.");
        }

        if (!(date instanceof Date) || isNaN(date.getTime())) {
            throw new Error("Date must be a valid Date object.");
        }

        if (date > new Date()) {
            throw new Error("Date cannot be in the future.");
        }

        if (!(user instanceof User)) {
            throw new Error("User must be a valid User instance.");
        }

        return true; 
    }


    getDate(): Date {
        return this.date;
    }
    getUser(): User {
        return this.user;
    }
    addItem(item: Item){
        this.items.push(item);
    }
    getItems(){
        return this.items;
    }
    getId(){
        return this.id;
    }
}