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
import { ItemInput, ReservationDTO, ReservationInput } from '../types';
import itemService from '../service/item.service';
import { expressjwt } from 'express-jwt';

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
        res.status(200).json(await itemService.getAllItems());
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
        res.status(200).json(await itemService.getFood());
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
        res.status(200).json(await itemService.getDrinks());
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
        const item = await itemService.getItemById(id);
        return res.status(200).json(item);
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
    
});


/**
 * @swagger
 * /items:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new item.
 *     requestBody:
 *       description: item data needed to create an item.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: item created successfully.
 *       400:
 *         description: Bad request due to invalid input data.
 */
itemRouter.post('/items', async (req: Request, res: Response, next: NextFunction) => {
    try {
        //const {username, role} = req.auth;
        const item: ItemInput = req.body;
        const role1 = "admin";
        
        return res.status(200).json(await itemService.createItem(item, role1));
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });

    }
});



/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: delete a certain item.
 *     parameters:
 *       - in: path
 *         name: id
 *         type: number
 *         required: true
 *         description: Numeric ID of the item to delete.
 *     responses:
 *       200:
 *              description: OK
 *       404:
 *              description: item Not Found
 */
itemRouter.delete('/items/:id', async (req: Request , res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10); 
    
    try{
        //get role and add it to function
        const role = "admin";
        const item = await itemService.deleteItemById(id, role);
        return res.status(200).json(item);
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
    
});



/**
 * @swagger
 * /items/update/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update item.
 *     parameters:
 *       - in: path
 *         name: id
 *         type: number
 *         required: true
 *     requestBody:
 *       description: item data needed to update an item.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: item created successfully.
 *       400:
 *         description: Bad request due to invalid input data.
 */
itemRouter.put('/items/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const item: ItemInput = req.body;
        const id = parseInt(req.params.id, 10); 
        item.id = id;

        //get role and add it to function
        const role = "admin";

        return res.status(200).json(await itemService.updateItem(item, role));
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });

    }
});



export { itemRouter };
