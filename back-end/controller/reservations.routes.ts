/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Reservation:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            date:
 *              type: Date
 *              description: Reservation date.
 *            userid:
 *              type: number
 *              format: int64
 *              
 */
import express, { NextFunction, Request, Response } from 'express';
import { error } from 'console';
import restaurantService from '../service/restaurant.service';
import reservationDb from '../repository/reservation.db';
import reservationsService from '../service/reservations.service';
import { ReservationDTO, ReservationInput } from '../types';

const reservationRouter = express.Router();


/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Get a list of all reservations.
 *     responses:
 *      200:
 *              description: OK
 *      404:
 *              description: Not Found
 */
reservationRouter.get('/reservations', async (req: Request, res: Response, next: NextFunction) => {
    try{
        res.status(200).json(reservationsService.getAllReservations());
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Get a certain reservation.
 *     parameters:
 *       - in: path
 *         name: id
 *         type: number
 *         required: true
 *         description: Numeric ID of the reservation to get.
 *     responses:
 *       200:
 *              description: OK
 *       404:
 *              description: restaurant Not Found
 */
reservationRouter.get('/reservations/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10); 
    try{
        const reservation = reservationsService.getReservationById(id);
        return res.status(200).json(reservation);
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
    
});


//HIJ VINDT DE PARAMETERS NIET OM DE BODY MEE TE GEVEN => FIX ZOEKEN WANT FILE NOT FOUND/type
/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Create a new reservation.
 *     requestBody:
 *       description: reservation data needed to create a reservation.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/app/ReservationInput'
 *     responses:
 *       200:
 *         description: Reservation created successfully.
 *       400:
 *         description: Bad request due to invalid input data.
 *       404:
 *          description: UserID does not exist. 
 */
reservationRouter.post('/reservations', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reservationInput: ReservationInput = req.body;
        
        reservationsService.createReservation(reservationInput.date, reservationInput.userId, reservationInput.items);
        return res.status(200).json({ message: 'Schedule created successfully' });
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });

    }
});



export { reservationRouter };
