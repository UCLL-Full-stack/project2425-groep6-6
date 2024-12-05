import { Restaurant } from "../model/restaurant";
import restaurantDb from "../repository/restaurant.db";
import { RestaurantDTO, RestaurantInput } from "../types";

const getRestaurantById = (id: number): Promise<Restaurant> => {
    try{
        const restaurant = restaurantDb.getRestaurantById(id);
        if (restaurant){
            return restaurant;
        } 
        throw new Error
    } catch(error){
        throw new Error('Restaurant with id ' + id + ' does not exist.')
    }
}

const getAllRestaurants = (): Promise<Restaurant[]> => {
    try{
        const restaurants = restaurantDb.getAllRestaurants();
        return restaurants;
    } catch(error){
        throw new Error('There are no restaurants.')
    }
}


const createRestaurant = (restaurant: RestaurantInput) => {
    try{
        return restaurantDb.createRestaurant(restaurant)
    }catch(error){
        throw new Error("Creation of object failed.")
    }
}


const deleteRestaurantById = (id: number): Promise<Restaurant> => {
    try{
        const restaurant = restaurantDb.deleteRestaurantById(id);
        if (restaurant){
            return restaurant;
        } 
        throw new Error
    } catch(error){
        throw new Error('Restaurant with id ' + id + ' does not exist.')
    }
}

export default { 
    getRestaurantById,
    getAllRestaurants,
    createRestaurant,
    deleteRestaurantById
 };