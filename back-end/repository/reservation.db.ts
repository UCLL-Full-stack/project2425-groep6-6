import { Item } from "../model/item";
import { Reservation } from "../model/reservation";
import { Restaurant } from "../model/restaurant";
import { User } from "../model/user";



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

const getReservationById = (id: number): Reservation | null => {
    try {
        return reservations.find((reservation) => reservation.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}


const getAllReservations = (): Reservation[] => {
    try {
        return reservations;
    } catch(error){
        throw new Error('Database error. See server log for details.')
    }
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

const createReservation = (reservation: Reservation) => {
    try {
        reservations.push(reservation);
        return reservation;
    } catch(error){
        throw new Error('Database error. See server log for details.')
    }
}

export default {
    addItemsToReservation,
    getAllReservations,
    getReservationById,
    createReservation
};