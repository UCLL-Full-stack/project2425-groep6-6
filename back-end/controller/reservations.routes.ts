/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Reservation:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *           description: Reservation date.
 *         userId:
 *           type: number
 *           format: int64
 *           description: The ID of the user who made the reservation.
 *         items:
 *           type: array
 *           description: A list of items reserved. Each item corresponds to a unique item in the menu. Duplicates may be handled by the backend.
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 format: int64
 *                 description: The ID of the reserved item. It must exist in the menu. Duplicates will be removed if applicable.
 *               amount:
 *                 type: number
 *                 description: The ID of the reserved item. It must exist in the menu. Duplicates will be removed if applicable.
 *       required:
 *         - date
 *         - userId
 *         - items
 *       example:
 *         date: "2023-12-31T19:00:00Z"
 *         userId: 2
 *         items:
 *           - itemId: 1
 *           - itemId: 1 
 *           - itemId: 2
 */


import express, { Request, Response } from 'express';
import reservationsService from '../service/reservations.service';
import { ReservationInput } from '../types';

const reservationRouter = express.Router();

/**
 * @swagger
 * /reservations:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all reservations.
 *     responses:
 *      200:
 *        description: OK
 *      404:
 *        description: Not Found
 */
reservationRouter.get('/reservations', async (req: Request, res: Response) => {
    try {
        const reservations = await reservationsService.getAllReservations();
        res.status(200).json(reservations);
    } catch (error) {
        return res.status(404).json({
            message: error instanceof Error ? error.message : 'An unknown error occurred',
            error
        });
    }
});

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a certain reservation.
 *     parameters:
 *       - in: path
 *         name: id
 *         type: number
 *         required: true
 *         description: Numeric ID of the reservation to get.
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Reservation Not Found
 */
reservationRouter.get('/reservations/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
        const reservation = await reservationsService.getReservationById(id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        return res.status(200).json(reservation);
    } catch (error) {
        return res.status(404).json({
            message: error instanceof Error ? error.message : 'An unknown error occurred',
            error
        });
    }
});

/**
 * @swagger
 * /reservations:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new reservation.
 *     requestBody:
 *       description: Reservation data needed to create a reservation.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: Reservation created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   format: int64
 *                   description: The unique identifier of the created reservation.
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: The reservation date.
 *                 userId:
 *                   type: number
 *                   format: int64
 *                   description: The ID of the user who made the reservation.
 *                 items:
 *                   type: array
 *                   description: A list of items reserved. Each item corresponds to a unique item in the menu.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         format: int64
 *                         description: The unique ID of the reserved item.
 *                       name:
 *                         type: string
 *                         description: The name of the reserved item.
 *                       category:
 *                         type: string
 *                         description: The category of the reserved item (e.g., 'food', 'drink').
 *                       price:
 *                         type: number
 *                         format: float
 *                         description: The price of the reserved item.
 *                       amount:
 *                         type: number          
 *       400:
 *         description: Bad request due to invalid input data.
 *       404:
 *         description: UserID does not exist or the itemId is invalid.
 */

reservationRouter.post('/reservations', async (req: Request, res: Response) => {
    const reservationInput: ReservationInput = req.body;
    try {
        
        const newReservation = await reservationsService.createReservation(reservationInput);
        return res.status(201).json(newReservation); 
    } catch (error) {
        return res.status(404).json({
            message: error instanceof Error ? error.message : 'An unknown error occurred',
            error
        });
    }
});

export { reservationRouter };
