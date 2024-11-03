import { Item } from "@types";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/items`;

const getMenuItems = async () => {
    return fetch(API_URL, { 
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
};

const getFoodItems = async () => {
    return fetch(`${API_URL}/food`, { 
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
};

const getDrinkItems = async () => {
    return fetch(`${API_URL}/drinks`, { 
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
};


const addItem = async (item: Item, type: 'food' | 'drinks') => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: item.name,
            category: type,  
            price: item.price,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to add item');
    }

    return response.json();
};

const MenuService = {
    getMenuItems,
    getFoodItems,
    getDrinkItems,
    addItem,
};

export default MenuService;
