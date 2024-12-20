import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import restaurantDb from './repository/restaurant.db';
import { restaurantRouter } from './controller/restaurants.routes';
import { reservationRouter } from './controller/reservations.routes';
import { itemRouter } from './controller/item.routes';
import { userRouter } from './controller/user.routes';
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';

const app = express();
app.use(helmet());
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({
        path: [
            '/status', 
            '/api-docs', 
            /^\/api-docs\/.*/,
            '/users/login', 
            '/users/signup',
            '/restaurants',
            '/restaurants/id',
            '/items/food',
            '/items/drinks',
            '/items',

        ],
    })
);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});





const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});

app.post('/users/login', userRouter);
app.post('/users/signup', userRouter);





app.get('/restaurants', restaurantRouter);
app.get('/restaurants/:id', restaurantRouter);
app.get('/reservations', reservationRouter);
app.get('/reservations/:id', reservationRouter);
app.post('/reservations/:id', reservationRouter);
app.get('/items', itemRouter);
app.get('/items/:id', itemRouter);
app.delete('/items/:id', itemRouter);

app.get('/items/food', itemRouter);
app.get('/items/drinks', itemRouter);
app.post('/items', itemRouter);

app.get('/users', userRouter);
app.get('/users/admins', userRouter);
app.get('/users/chefs', userRouter);
app.get('/users/bartenders', userRouter);
app.get('/users/customers', userRouter);
app.get('/users/:id', userRouter);
app.post('/users/login', userRouter);
app.post('/users/signup', userRouter);
app.post('/restaurant', restaurantRouter);
app.post('/reservations', reservationRouter);
app.delete('/restaurants/:id', restaurantRouter)
app.put('/items/update/:id', itemRouter)