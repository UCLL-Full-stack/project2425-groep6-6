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
 *            username:
 *              type: string
 *              description: username of user.
 *            firstname:
 *              type: string
 *              description: firstname of user.
 *            lastname:
 *              type: string
 *              description: lastname of user.
 *            password:
 *              type: string
 *            role:
 *              type: string
 *              description: chef, bartender, admin, customer
 *      Login:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *              
 */
import express, { NextFunction, Request, Response } from 'express';
import { error } from 'console';
import restaurantService from '../service/restaurant.service';
import reservationDb from '../repository/reservation.db';
import reservationsService from '../service/reservations.service';
import { UserInput, LoginInput, ReservationDTO, ReservationInput } from '../types';
import userService from '../service/user.service';
import jwt from 'jsonwebtoken';
import  expressjwt, {}  from 'express-jwt';



const userRouter = express.Router();


/**
 * @swagger
 * /users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all users.
 *     responses:
 *      200:
 *              description: OK
 *      404:
 *              description: Not Found
 */
userRouter.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    try{
        //const {username, role } = req.auth;
        res.status(200).json( await userService.getAllUsers("role"));
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

/**
 * @swagger
 * /users/chefs:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all users with the role of chef.
 *     responses:
 *      200:
 *              description: OK
 *      404:
 *              description: Not Found
 */
userRouter.get('/users/chefs', async (req: Request , res: Response, next: NextFunction) => {
    try{
        //const {username, role} = req.auth;
        res.status(200).json(await userService.getChefs());
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

/**
 * @swagger
 * /users/customers:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all users with the role of customer.
 *     responses:
 *      200:
 *              description: OK
 *      404:
 *              description: Not Found
 */
userRouter.get('/users/customers', async (req: Request, res: Response, next: NextFunction) => {
    try{
        res.status(200).json(await userService.getCustomers());
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

/**
 * @swagger
 * /users/bartenders:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all users with the role of bartender.
 *     responses:
 *      200:
 *              description: OK
 *      404:
 *              description: Not Found
 */
userRouter.get('/users/bartenders', async (req: Request, res: Response, next: NextFunction) => {
    try{
        res.status(200).json(await userService.getBartenders());
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

/**
 * @swagger
 * /users/admins:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all users with the role of admin.
 *     responses:
 *      200:
 *              description: OK
 *      404:
 *              description: Not Found
 */
userRouter.get('/users/admins', async (req: Request , res: Response, next: NextFunction) => {
    try{
        //const {username, role} = req.auth
        res.status(200).json(await userService.getAdmins());
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});








/**
 * @swagger
 * /users/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
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
        const user = await userService.getUserById(id);
        return res.status(200).json(user);
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
    
});


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log a user in.
 *     requestBody:
 *       description: Username and password.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       400:
 *         description: Bad request due to invalid input data.
 *       404:
 *          description: User does not exist/Credentials are wrong. 
 */
userRouter.post('/users/login', async (req: Request, res: Response, next: NextFunction) => {
    const userinput: UserInput = req.body;
    try{
    
        return res.status(200).json(await userService.userLogin(userinput));
    }catch(error){
        return res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
    
});


/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Create a user
 *     requestBody:
 *       description: Create a user 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully.
 *       400:
 *         description: Bad request due to invalid input data.
 *        
 */
userRouter.post('/users/signup', async (req: Request, res: Response, next: NextFunction) => {
    const userinput: UserInput = req.body;
    try{
        const user = await userService.createUser(userinput);

        if (!user) {
            return res.status(409).json({ message: 'User already exists' });
        }

        return res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred, please try again later' });
    }
});






export { userRouter };
