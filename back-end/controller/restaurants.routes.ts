/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Restaurant:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Restaurant name.
 *            adress:
 *              type: string
 *              description: Restaurant expertise.
 */
import express, { NextFunction, Request, Response } from 'express';
import { error } from 'console';
import restaurantService from '../service/restaurant.service';

const restaurantRouter = express.Router();


/**
 * @swagger
 * /restaurants:
 *   get:
 *     summary: Get a list of all restaurants.
 *     responses:
 *      200:
 *              description: OK
 *      404:
 *              description: Not Found
 */
restaurantRouter.get('/restaurants', async (req: Request, res: Response, next: NextFunction) => {
    

    try{
        res.status(200).json(restaurantService.getAllRestaurants());
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

/**
 * @swagger
 * /restaurants/{id}:
 *   get:
 *     summary: Get a certain restaurant.
 *     parameters:
 *       - in: path
 *         name: id
 *         type: number
 *         required: true
 *         description: Numeric ID of the restaurant to get.
 *     responses:
 *       200:
 *              description: OK
 *       404:
 *              description: restaurant Not Found
 */
restaurantRouter.get('/restaurants/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10); 
    try{
        const restaurant = restaurantService.getRestaurantById(id);
        return res.status(200).json(restaurant);
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
    
});






export { restaurantRouter };
