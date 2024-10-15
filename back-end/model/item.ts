export class Item{
    private name: string;
    private category: string;
    private price: number;

    constructor(Item: {name: string, category: string, price: number}){
        this.category = Item.category;
        this.name = Item.name;
        this.price = Item.price;
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


}