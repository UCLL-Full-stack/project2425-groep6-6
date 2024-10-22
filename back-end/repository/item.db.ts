import { Item } from "../model/item";
import { Reservation } from "../model/reservation";
import { Restaurant } from "../model/restaurant";
import { User } from "../model/user";



const items = [
    new Item({
        id: 1,
        name: 'Spaghetti',
        category: 'food',
        price: 14
    }),
    new Item({
        id: 2,
        name: 'Cola',
        category: 'drinks',
        price: 2
    })
];

const getFood = (): Item | null => {
    try {
        return items.find((item) => item.getCategory() === 'food') || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getDrinks = (): Item | null => {
    try {
        return items.find((item) => item.getCategory() === 'drinks') || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getItemById = (id: number): Item | null => {
    try {
        return items.find((item) => item.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}


const getAllItems = () => {
    try {
        return items;
    } catch(error){
        throw new Error('Database error. See server log for details.')
    }
}

const createItem = (item: Item) => {
    try {
        items.push(item);
    } catch(error){
        throw new Error('Database error. See server log for details.')
    }
}


export default {
    getAllItems,
    getFood,
    getDrinks,
    createItem,
    getItemById,
};