/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Item:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: name of item.
 *            price:
 *              type: number
 *              format: int64
 *            category:
 *              type: string
 *              description: name of item.
 */
import express, { NextFunction, Request, Response } from 'express';
import { error } from 'console';
import restaurantService from '../service/restaurant.service';
import reservationDb from '../repository/reservation.db';
import reservationsService from '../service/reservations.service';
import { ReservationDTO, ReservationInput } from '../types';
import itemService from '../service/item.service';

const itemRouter = express.Router();


/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get a list of all items.
 *     responses:
 *      200:
 *              description: OK
 *      404:
 *              description: Not Found
 */
itemRouter.get('/items', async (req: Request, res: Response, next: NextFunction) => {
    try{
        res.status(200).json(itemService.getAllItems());
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

/**
 * @swagger
 * /items/food:
 *   get:
 *     summary: Get a list of all items with category food.
 *     responses:
 *      200:
 *              description: OK
 *      404:
 *              description: Not Found
 */
itemRouter.get('/items/food', async (req: Request, res: Response, next: NextFunction) => {
    try{
        res.status(200).json(itemService.getFood());
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});


/**
 * @swagger
 * /items/drinks:
 *   get:
 *     summary: Get a list of all items with category drinks.
 *     responses:
 *      200:
 *              description: OK
 *      404:
 *              description: Not Found
 */
itemRouter.get('/items/drinks', async (req: Request, res: Response, next: NextFunction) => {
    try{
        res.status(200).json(itemService.getDrinks());
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get a certain item.
 *     parameters:
 *       - in: path
 *         name: id
 *         type: number
 *         required: true
 *         description: Numeric ID of the item to get.
 *     responses:
 *       200:
 *              description: OK
 *       404:
 *              description: restaurant Not Found
 */
itemRouter.get('/items/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10); 
    try{
        const item = itemService.getItemById(id);
        return res.status(200).json(item);
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
    
});




export { itemRouter };
