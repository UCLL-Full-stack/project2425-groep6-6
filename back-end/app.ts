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

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

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
app.get('/restaurants', restaurantRouter);
app.get('/restaurants/:id', restaurantRouter);
app.get('/reservations', reservationRouter);
app.get('/reservations/:id', reservationRouter);
app.post('/reservations/:id', reservationRouter);
app.get('/items', itemRouter);
app.get('/items/:id', itemRouter);
app.get('/items/food', itemRouter);
app.get('/items/drinks', itemRouter);
app.post('/items', itemRouter);

app.get('/users', userRouter);
app.get('/users/admins', userRouter);
app.get('/users/chefs', userRouter);
app.get('/users/bartenders', userRouter);
app.get('/users/customers', userRouter);
app.get('/users/:id', userRouter);
app.post('/login', userRouter);
app.post('/users', userRouter);
