import { Restaurant } from "../model/restaurant";
import restaurantDb from "../repository/restaurant.db";
import { RestaurantDTO } from "../types";

const getRestaurantById = (id: number): Restaurant | null => {
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

const getAllRestaurants = (): Restaurant[] | null => {
    try{
        const restaurants = restaurantDb.getAllRestaurants();
        return restaurants;
    } catch(error){
        throw new Error('There are no restaurants.')
    }
}


const convertToDTO = (restaurant: Restaurant): RestaurantDTO => {
    try {
        const restaurantDTO: RestaurantDTO = {
            id: restaurant.getId(),
            name: restaurant.getName(),
            address: restaurant.getAddress(),
            users: restaurant.getUsers()
        }
        return restaurantDTO;
    } catch(error){
        throw new Error("Converting to DTO error");
    }
    
}

export default { 
    getRestaurantById,
    getAllRestaurants
 };