import { Category } from "../types";
import { Reservation } from "./reservation";

export class Item{
    private id?: number;
    private name: string;
    private category: Category;
    private price: number;
    private reservations: Array<Reservation>

    constructor(Item: {id?: number, name: string, category: Category, price: number}){
        this.id = Item.id;
        this.category = Item.category;
        this.name = Item.name;
        this.price = Item.price;
        this.reservations = [];
    }

    getId(){
        return this.id;
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