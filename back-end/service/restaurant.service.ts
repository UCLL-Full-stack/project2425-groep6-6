import { Restaurant } from "../model/restaurant";
import restaurantDb from "../repository/restaurant.db";

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

export default { 
    getRestaurantById,
    getAllRestaurants
 };