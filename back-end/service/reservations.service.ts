import { Item } from "../model/item";
import { Reservation } from "../model/reservation";
import { Restaurant } from "../model/restaurant";
import reservationDb from "../repository/reservation.db";
import restaurantDb from "../repository/restaurant.db";
import userDb from "../repository/user.db";
import { ReservationDTO, ReservationInput } from "../types";

const getReservationById = (id: number): Promise<Reservation>  => {
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

const getAllReservations = (): Promise<Reservation[]> => {
    try{
        const reservations = reservationDb.getAllReservations();
        return reservations;
    } catch(error){
        throw new Error('There are no restaurants.')
    }
}



const createReservation = async (reservationInput: ReservationInput): Promise<Reservation> => {
    try {
        return await reservationDb.createReservation(reservationInput);
              

    } catch (error) {
        throw new Error("Creation of reservation failed: " + error );
    }
}

// const convertToDTO = (reservation: Reservation): ReservationDTO => {
//     try {
//         const reservationDTO: ReservationDTO = {
//             id: reservation.getId(),
//             date: reservation.getDate(),
//             user: reservation.getUser(),
//             items: reservation.getItems(),  
//         };
//         return reservationDTO;
//     } catch (error) {
//         throw new Error("Converting to DTO error");
//     }
// };

export default { 
    getAllReservations,
    getReservationById,
    createReservation
};
