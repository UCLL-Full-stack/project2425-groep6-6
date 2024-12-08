import { Item } from "../model/item";
import { Reservation } from "../model/reservation";
import { Restaurant } from "../model/restaurant";
import { User } from "../model/user";
import { ReservationInput } from "../types";
import database from "./database";

const reservations: any[] = [];

const getReservationById = async (id: number): Promise<Reservation> => {
    const result = await database.reservation.findUnique({
        where: {
            id: id,
        },
    });

    if (!result) {
        throw new Error(`Reservation with id ${id} not found`);
    }

    return Reservation.from(result);
}


const getAllReservations = async (): Promise<Reservation[]> => {
    try {
        const result = await database.reservation.findMany({
            include: {
                user: true,
                items: true,
            },
           
        });

        const reservations = await Promise.all(result.map((r) => Reservation.from(r)));

        return reservations;
    } catch (error) {
        console.error("Error fetching reservations:", error);
        throw error;
    }
};

const createReservation = async (reservationInput: ReservationInput) => {
    try {
        console.log('Creating reservation with input:', reservationInput);  
        const result = await database.reservation.create({
            data: {
                date: reservationInput.date,
                userId: reservationInput.userId,
            },
            include: {
                items: true, 
            },
        });
        console.log('Created reservation:', result);  

        await addItemsToReservation(result.id, reservationInput.items);

        return Reservation.from(result);
    } catch (error) {
        console.error('Error during reservation creation:', error);  
        throw new Error('Database error. Failed to create reservation. See server log for details. ' + error);
    }
}

const addItemsToReservation = async (id: number, items: { itemId: number }[]) => {
    try {
        const updatedReservation = await database.reservation.update({
            where: {
                id: id,
            },
            data: {
                items: {
                    connect: items.map((item) => ({
                        id: item.itemId, 
                    })),
                },
            },
            include: {
                items: true,
            },
        });

        return Reservation.from(updatedReservation);
    } catch (error) {
        console.error("Error adding items to reservation:", error);
        throw new Error('Database error. See server log for details.');
    }
}


export default {
    addItemsToReservation,
    getAllReservations,
    getReservationById,
    createReservation
};
