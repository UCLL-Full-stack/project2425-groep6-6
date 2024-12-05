import { Item } from "../model/item";
import { Reservation } from "../model/reservation";
import { Restaurant } from "../model/restaurant";
import itemDb from "../repository/item.db";
import reservationDb from "../repository/reservation.db";
import restaurantDb from "../repository/restaurant.db";
import userDb from "../repository/user.db";
import { ItemInput, ReservationDTO } from "../types";

const getItemById = (id: number): Promise<Item | null> => {
    try{
        const item = itemDb.getItemById(id);
        if (item){
            return item;
        } 
        throw new Error
    } catch(error){
        throw new Error('Item with id ' + id + ' does not exist.')
    }
}

const getAllItems = (): Promise<Item[]> => {
    try{
        const items = itemDb.getAllItems();
        return items;
    } catch(error){
        throw new Error('There are no items.')
    }
}

const getFood = (): Promise<Item[]> => {
    try{
        const items = itemDb.getFood();
        return items;
    } catch(error){
        throw new Error('There are no food items.')
    }
}

const getDrinks = (): Promise<Item[]> => {
    try{
        const items = itemDb.getDrinks();
        return items;
    } catch(error){
        throw new Error('There are no drinks items.')
    }
}

const createItem = ({category, name, price}: ItemInput): Promise<Item> => {
    try{
    if (category === 'food' && price < 0) {
        return itemDb.createItem({category, name, price})
    } 
    else if (category === 'drinks'  && price < 0) {
        return itemDb.createItem({category, name, price})
    } else {
        throw new Error('Category is not a category (drinks, food) and price must be 0 or more')

    }
    }
    catch(error){
        throw new Error('Creating item failed: ' + error)
    }
}



const deleteItemById = (id: number) => {
    try{
        const item = itemDb.deleteItemById(id);
        
        return item;
    } catch(error){
        throw new Error('Item with id ' + id + ' does not exist.')
    }
}


export default { 
    createItem, 
    getAllItems,
    getFood, 
    getDrinks,
    getItemById,
    deleteItemById
 };