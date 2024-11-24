import { Restaurant } from "../model/restaurant";
import { RestaurantInput } from "../types";
import database from "./database";

const restaurants: Restaurant[] = [
    // new Restaurant({
    //     id: 1,
    //     name: 'GiJo',
    //     address: 'Diestsestraat 27, Leuven'
    // })
];


const getRestaurantById = async (id: number): Promise<Restaurant>  => {
    const result = await database.restaurant.findUnique({
        where: {
            id: id,
        },
    });

    if (!result) {
        throw new Error(`Restaurant with id ${id} not found`);
    }

    return Restaurant.from(result);
}

const getAllRestaurants = async () => {
    
    const result = await database.restaurant.findMany();
    return result.map((result) => Restaurant.from(result));
    
}



const createRestaurant = async (restaurant: RestaurantInput) => {
    try {
        const result = await database.restaurant.create({
            data: {
                name: restaurant.name,
                address: restaurant.address
                
            },
        });
        
        return Restaurant.from(result);
    } catch (error) {
        throw new Error('Database error. Failed to create restaurant. See server log for details. ' + error);
    }
}


export default {
    getRestaurantById,
    getAllRestaurants,
    createRestaurant
};