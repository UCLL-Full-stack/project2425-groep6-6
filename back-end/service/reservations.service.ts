import { Item } from "../model/item";
import { Reservation } from "../model/reservation";
import { Restaurant } from "../model/restaurant";
import reservationDb from "../repository/reservation.db";
import restaurantDb from "../repository/restaurant.db";
import userDb from "../repository/user.db";
import { ReservationDTO } from "../types";

const getReservationById = (id: number): Reservation | null => {
    try{
        const reservation = reservationDb.getReservationById(id);
        if (reservation){
            return reservation;
        } 
        throw new Error
    } catch(error){
        throw new Error('Restaurant with id ' + id + ' does not exist.')
    }
}

const getAllReservations = (): Reservation[] | null => {
    try{
        const reservations = reservationDb.getAllReservations();
        const reservationsDTO = [];
        reservations.forEach(reservation => {
            reservationsDTO.push(convertToDTO(reservation));
        });
        return reservations;
    } catch(error){
        throw new Error('There are no restaurants.')
    }
}

const addItemsToReservation = (id: number, items: Item[]) => {
    try{
        reservationDb.addItemsToReservation(id, items);
    } catch(error){
        throw new Error('Restaurant with id ' + id + ' does not exist.')
    }
}

const createReservation = async (date: string, userId: number, items: Array<Item>): Promise<ReservationDTO> => {
    const user = await userDb.getUserById(userId);
    if (user){
        const reservation = reservationDb.createReservation( new Reservation ({
            date: new Date(date),
            user: user
        }));
        return convertToDTO(reservation);

    } else {
        throw new Error('User with id ' + userId + ' does not exist');
    }

}

const convertToDTO = (reservation: Reservation): ReservationDTO => {
    try {
        const reservationDTO: ReservationDTO = {
            id: reservation.getId(),
            date: reservation.getDate(),
            user: reservation.getUser(),
            items: reservation.getItems()
        };
        return reservationDTO;
    } catch (error) {
        throw new Error("Converting to DTO error");
    }
};

export default { 
    addItemsToReservation,
    getAllReservations,
    getReservationById,
    createReservation
 };