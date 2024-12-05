class ReservationItem {
    private quantity: number;

    constructor(quantity: number) {
        this.quantity = quantity;
    }

    public getQuantity(): number {
        return this.quantity;
    }
}
