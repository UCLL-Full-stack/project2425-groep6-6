import { Item } from "../model/item";
import { Reservation } from "../model/reservation";
import { Restaurant } from "../model/restaurant";
import itemDb from "../repository/item.db";
import reservationDb from "../repository/reservation.db";
import restaurantDb from "../repository/restaurant.db";
import userDb from "../repository/user.db";
import { ReservationDTO } from "../types";

const getItemById = (id: number): Item | null => {
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

const getAllItems = (): Item[] | null => {
    try{
        const items = itemDb.getAllItems();
        return items;
    } catch(error){
        throw new Error('There are no items.')
    }
}

const getFood = (): Item[] | null => {
    try{
        const items = itemDb.getFood();
        return items;
    } catch(error){
        throw new Error('There are no food items.')
    }
}

const getDrinks = (): Item[] | null => {
    try{
        const items = itemDb.getDrinks();
        return items;
    } catch(error){
        throw new Error('There are no drinks items.')
    }
}

const createItem = (category: string, name: string, price: number) => {
    try{
    if (category === 'food') {
        const item = new Item({name: name, category: category, price: price})
        itemDb.createItem(item)
    } 
    else if (category === 'drinks') {
        const item = new Item({name: name, category: category, price: price})
        itemDb.createItem(item)
    } else {
        throw new Error('Category is not a category')

    }
    }
    catch(error){
        throw new Error('Creating item failed: ' + error)
    }
}



export default { 
    createItem, 
    getAllItems,
    getFood, 
    getDrinks,
    getItemById
 };