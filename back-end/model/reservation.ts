import { Item } from "./item";
import { User } from "./user";

export class Reservation {
    private date: Date;
    private user: User;
    private items: Array<Item>;

    constructor(Reservation: { date: Date, user: User }){
        this.date = Reservation.date;
        this.user = Reservation.user;
        this.items = []
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
}