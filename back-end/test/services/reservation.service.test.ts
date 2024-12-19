import { Category } from "@prisma/client";
import reservationDb from "../../repository/reservation.db";
import reservationService from "../../service/reservations.service";

jest.mock('../../repository/reservation.db', () => ({
    getReservationById: jest.fn(),
    getAllReservations: jest.fn(),
    createReservation: jest.fn(),
}));

describe('Reservation Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getReservationById', () => {
        it('should return a reservation', async () => {
            const mockReservation = { id: 1, user: {id:1, username: "Gilles"}, items: [{id:1, amount:2}], date: '2024-12-19' };
            (reservationDb.getReservationById as jest.Mock).mockResolvedValue(mockReservation);

            const result = await reservationService.getReservationById(1);

            expect(result).toEqual(mockReservation);
            expect(reservationDb.getReservationById).toHaveBeenCalledWith(1);
        });
    });

    describe('getAllReservations', () => {
        it('should return all reservations', async () => {
            const mockReservations = [
                { id: 1, user: {id:1, username: "Gilles"}, items: [{id:1, amount:2}], date: '2024-12-19' },
                { id: 2, user: {id:1, username: "Gilles"}, items: [{id:1, amount:2}], date: '2024-12-20' }
            ];
            (reservationDb.getAllReservations as jest.Mock).mockResolvedValue(mockReservations);

            
            const result = await reservationService.getAllReservations();
            expect(result).toEqual(mockReservations);
            expect(reservationDb.getAllReservations).toHaveBeenCalled();
        });

    
    });

    describe('createReservation', () => {
        it('should create a reservation successfully', async () => {
            const category = Category.drinks;
            const mockReservationInput = { userId: 1, items: [{id: 1, amount: 2, price:2, category:category, name: "test"}], date: '2024-12-19' };
            const mockReservation = { id: 1, user: {id:1, username: "Gilles"}, items: [{id: 1, amount: 2, price:2, category:category, name: "test"}], date: '2024-12-19' };

            (reservationDb.createReservation as jest.Mock).mockResolvedValue(mockReservation);

            const result = await reservationService.createReservation(mockReservationInput);

            expect(result).toEqual(mockReservation);
            expect(reservationDb.createReservation).toHaveBeenCalledWith(mockReservationInput);
        });

    });
});