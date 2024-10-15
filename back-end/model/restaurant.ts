export class Restaurant {
    private id?: number;
    private name: string;
    private address: string;

    constructor(Restaurant: {name: string, address: string}){
        this.name = Restaurant.name;
        this.address = Restaurant.address;
    }

    getAddress(): string {
        return this.address;
    }
    getName(): string{
        return this.name;
    }
}
