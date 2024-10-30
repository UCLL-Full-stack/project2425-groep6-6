import { Restaurant } from "../model/restaurant";

const restaurants = [
    new Restaurant({
        id: 1,
        name: 'GiJo',
        address: 'Diestsestraat 27, Leuven'
    })
];


const getRestaurantById = (id: number): Restaurant | null => {
    try {
        return restaurants.find((restaurant) => restaurant.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllRestaurants = () => {
    try {
        return restaurants;
    } catch(error){
        throw new Error('Database error. See server log for details.')
    }
}

const createRestaurant = (restaurant: Restaurant) => {
    try {
        restaurants.push(restaurant);

    } catch(error){
        throw new Error('Database error. See server log for details.')
    }
}

export default {
    getRestaurantById,
    getAllRestaurants,
    createRestaurant
};