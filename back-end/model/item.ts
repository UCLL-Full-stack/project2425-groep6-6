import { ca } from "date-fns/locale";
import { Category } from "../types";
import { Reservation } from "./reservation";
import {Item as itemsPrisma} from  '@prisma/client'


export class Item{
    private id?: number;
    private name: string;
    private category: Category;
    private price: number;
    private reservations: Array<Reservation>
    private amount: number;
    itemId: any;
    quantity: any;

    constructor(Item: {id?: number, name: string, category: Category, price: number, reservations: Array<Reservation>, amount: number}){
        this.validate( Item.name, Item.category, Item.price, Item.id);
        this.id = Item.id;
        this.category = Item.category;
        this.name = Item.name;
        this.price = Item.price;
        this.reservations = Item.reservations || [];  
        this.amount = Item.amount;
    }

    validate(name: string, category: Category, price: number, id?: number): boolean {
    if (id && (!Number.isInteger(id) || id <= 0)) {
        throw new Error("ID must be a positive integer.");
    }

    if (typeof name !== 'string' || name.trim().length === 0) {
        throw new Error("Name must be a non-empty string.");
    }

    if (category !== 'drinks' && category !== 'food') {
        throw new Error("Category must be a valid Category instance.");
    }

    if (typeof price !== 'number' || price <= 0) {
        throw new Error("Price must be a positive number.");
    }

    return true; 
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
    getAmount(){
        return this.amount;
    }


    static from(itemPrisma: itemsPrisma, amount?: number): Item {
        return new Item({
          id: itemPrisma.id,
          name: itemPrisma.name,
          category: itemPrisma.category as Category,  
          price: itemPrisma.price,
          reservations: [],
          amount: amount?? 0
            
        });
      }

}