/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            username:
 *              type: string
 *              description: username of user.
 *            firstname:
 *              type: string
 *              description: firstname of user.
 *            lastname:
 *              type: string
 *              description: lastname of user.
 *              
 */
import express, { NextFunction, Request, Response } from 'express';
import { error } from 'console';
import restaurantService from '../service/restaurant.service';
import reservationDb from '../repository/reservation.db';
import reservationsService from '../service/reservations.service';
import { LoginInput, ReservationDTO, ReservationInput } from '../types';
import userService from '../service/user.service';

const userRouter = express.Router();


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users.
 *     responses:
 *      200:
 *              description: OK
 *      404:
 *              description: Not Found
 */
userRouter.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    try{
        res.status(200).json(userService.getAllUsers());
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

/**
 * @swagger
 * /users/chefs:
 *   get:
 *     summary: Get a list of all users with the role of chef.
 *     responses:
 *      200:
 *              description: OK
 *      404:
 *              description: Not Found
 */
userRouter.get('/users/chefs', async (req: Request, res: Response, next: NextFunction) => {
    try{
        res.status(200).json(userService.getChefs());
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

/**
 * @swagger
 * /users/customers:
 *   get:
 *     summary: Get a list of all users with the role of customer.
 *     responses:
 *      200:
 *              description: OK
 *      404:
 *              description: Not Found
 */
userRouter.get('/users/customers', async (req: Request, res: Response, next: NextFunction) => {
    try{
        res.status(200).json(userService.getCustomers());
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

/**
 * @swagger
 * /users/bartenders:
 *   get:
 *     summary: Get a list of all users with the role of bartender.
 *     responses:
 *      200:
 *              description: OK
 *      404:
 *              description: Not Found
 */
userRouter.get('/users/bartenders', async (req: Request, res: Response, next: NextFunction) => {
    try{
        res.status(200).json(userService.getBartenders());
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

/**
 * @swagger
 * /users/admins:
 *   get:
 *     summary: Get a list of all users with the role of admin.
 *     responses:
 *      200:
 *              description: OK
 *      404:
 *              description: Not Found
 */
userRouter.get('/users/admins', async (req: Request, res: Response, next: NextFunction) => {
    try{
        res.status(200).json(userService.getAdmins());
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});








/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a certain user.
 *     parameters:
 *       - in: path
 *         name: id
 *         type: number
 *         required: true
 *         description: Numeric ID of the user to get.
 *     responses:
 *       200:
 *              description: OK
 *       404:
 *              description: user Not Found
 */
userRouter.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10); 
    try{
        const user = userService.getUserById(id);
        return res.status(200).json(user);
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
    
});


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Log a user in.
 *     requestBody:
 *       description: Username and password.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: ''
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       400:
 *         description: Bad request due to invalid input data.
 *       404:
 *          description: User does not exist/Credentials are wrong. 
 */
userRouter.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    const userinput: LoginInput = req.body;
    try{
        
        return userService.userLogin(userinput.username, userinput.password);
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
    
});





export { userRouter };
