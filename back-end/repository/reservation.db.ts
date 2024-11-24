import { Item } from "../model/item";
import { Reservation } from "../model/reservation";
import { Restaurant } from "../model/restaurant";
import { User } from "../model/user";
import { ReservationInput } from "../types";
import database from "./database";



const reservations = [
    new Reservation({
        id: 1,
        date: new Date(),
        user: new User({
            id: 1,
            username: 'GillesMuyshondt',
            firstname: 'Gilles',
            lastname: 'Muyshondt',
            role: 'customer',
            password: 'Password'
        })
    })
];

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


const getAllReservations = async () => {
    const result = await database.reservation.findMany();
    return result.map((result) => Reservation.from(result));
}

const addItemsToReservation = (id: number, items: Item[]) => {
    try {
        const reservation = reservations.find((reservation) => reservation.getId() === id) || null;
        if(reservation){
            items.forEach((item) => reservation.addItem(item));
        }
    } catch(error){
        throw new Error('Database error. See server log for details.')
    }
}

const createReservation = async (reservation: ReservationInput) => {
    try {
        const result = await database.reservation.create({
            data: {
                date: reservation.date,
                userId: reservation.userId,
                
            },
        });
        
        return Reservation.from(result);
    } catch (error) {
        throw new Error('Database error. Failed to create restaurant. See server log for details. ' + error);
    }
}

export default {
    addItemsToReservation,
    getAllReservations,
    getReservationById,
    createReservation
};