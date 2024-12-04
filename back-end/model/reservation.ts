import userDb from "../repository/user.db";
import { Item } from "./item";
import { User } from "./user";
import { Reservation as ReservationPrisma } from '@prisma/client';
import itemDb from "../repository/item.db";

export class Reservation {
    private id?: number;
    private date: Date;
    private user: User;
    private items: Array<Item>;

    constructor(reservationData: { id?: number, date: Date, user: User, items?: Array<Item> }) {
        this.validate(reservationData.date, reservationData.user, reservationData.id);
        this.id = reservationData.id;
        this.date = reservationData.date;
        this.user = reservationData.user;
        this.items = reservationData.items || [];
    }

    private validate(date: Date, user: User, id?: number): boolean {
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

    addItem(item: Item) {
        this.items.push(item);
    }

    getItems() {
        return this.items;
    }

    getId() {
        return this.id;
    }

    static async from(reservationPrisma: ReservationPrisma): Promise<Reservation> {
        const user = await userDb.getUserById(reservationPrisma.userId);
        const items = await itemDb.getItemsByReservationId(reservationPrisma.id);

        return new Reservation({
            id: reservationPrisma.id,
            date: reservationPrisma.date,
            user: user,
            items: items,
        });
    }
}
