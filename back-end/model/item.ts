import { Category } from "../types";
import { Reservation } from "./reservation";

export class Item{
    private name: string;
    private category: Category;
    private price: number;
    private reservations: Array<Reservation>

    constructor(Item: {name: string, category: Category, price: number}){
        this.category = Item.category;
        this.name = Item.name;
        this.price = Item.price;
        this.reservations = [];
    }

    getName(): string{
        return this.name;
    }
    getCategory(): string{
        return this.category;
    }
    getPrice(): number{
        return this.price;
    }
    getReservations(){
        return this.reservations;
    }


}