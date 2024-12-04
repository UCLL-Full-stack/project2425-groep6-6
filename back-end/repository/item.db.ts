import { Item } from "../model/item";
import { Reservation } from "../model/reservation";
import { Restaurant } from "../model/restaurant";
import { User } from "../model/user";
import { ItemInput } from "../types";
import database from "./database";



const items: Item[] = [
    // new Item({
    //     id: 1,
    //     name: 'Spaghetti',
    //     category: 'food',
    //     price: 14, 
    // }),
    // new Item({
    //     id: 2,
    //     name: 'Cola',
    //     category: 'drinks',
    //     price: 2
    // }),
    // new Item({
    //     id: 3,
    //     name: 'Cola Zero',
    //     category: 'drinks',
    //     price: 2
    // }),
    // new Item({
    //     id: 4,
    //     name: 'Pepsi',
    //     category: 'drinks',
    //     price: 2
    // }),
    // new Item({
    //     id: 5,
    //     name: 'Ice-tea',
    //     category: 'drinks',
    //     price: 2
    // }),new Item({
    //     id: 6,
    //     name: 'Boterham met confituur',
    //     category: 'food',
    //     price: 2
    // })
    // ,
    // new Item({
    //     id: 7,
    //     name: 'Boterham met choco',
    //     category: 'food',
    //     price: 40
    // })
];

// const getFood = (): Item[] | null => {
//     try {

//         return items.filter((item) => item.getCategory() === 'food') || null;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Database error. See server log for details.');
//     }
// }

const getItemsByReservationId = async (reservationId: number): Promise<Item[]> => {
    const itemsFromDb = await database.item.findMany({
        where: {
            reservations: {
                some: {
                    id: reservationId,  
                }
            }
        },
    });

    return itemsFromDb.map((itemPrisma) => Item.from(itemPrisma)); 
};

const getFood = async (): Promise<Item[]> => {
    const result = await database.item.findMany({
        where: {
            category: "food",
        },
    });
    return result.map((result) => Item.from(result));
};


// const getDrinks = (): Item[] | null => {
//     try {
//         return items.filter((item) => item.getCategory() === 'drinks') || null;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Database error. See server log for details.');
//     }
// }

const getDrinks = async (): Promise<Item[]> => {
    const result = await database.item.findMany({
        where: {
            category: "drinks",
        },
    });
    return result.map((result) => Item.from(result));
};



// const getItemById = (id: number): Item | null => {
//     try {
//         return items.find((item) => item.getId() === id) || null;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Database error. See server log for details.');
//     }
// }

const getItemById = async (id: number): Promise<Item> => {
    const result = await database.item.findUnique({
        where: {
            id: id,
        },
    });

    if (!result) {
        throw new Error(`Item with id ${id} not found`);
    }

    return Item.from(result);
};



// const getAllItems = () => {
//     try {
//         return items;
//     } catch(error){
//         throw new Error('Database error. See server log for details.')
//     }
// }

const getAllItems = async (): Promise<Item[]> => {
    const result = await database.item.findMany();
    return result.map((result) => Item.from(result));
};



const createItem = async (item: ItemInput): Promise<Item> =>{
    try {
        const result = await database.item.create({
            data: {
                name: item.name,
                category: item.category,
                price: item.price
            },
        });
        
        return Item.from(result);
    } catch (error) {
        throw new Error('Database error. Failed to create Item. See server log for details.');
    }
}




export default {
    getItemsByReservationId,
    getAllItems,
    getFood,
    getDrinks,
    createItem,
    getItemById,
};