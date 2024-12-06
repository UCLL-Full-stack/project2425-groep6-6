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

const getToken = (): string | null => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("token");
    }
    return null; 
  };
  
  const token = getToken();
  
const addItem = async (item: Item, type: 'food' | 'drinks') => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`

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



const deleteItem = async (id: string) => {

    const response = await fetch(`http://localhost:3000/items/${id}`, {  
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      console.error(`Failed to delete item with ID ${id}: ${response.statusText}`);
      throw new Error('Failed to delete item');
    }
  
    return response.json();
  };

  const updateItem = async (id: string, item: Item) => {
    const response = await fetch(`http://localhost:3000/items/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: item.name,
        price: item.price,
        category: item.category,
      }),
    });
  
    if (!response.ok) {
      console.error(`Failed to update item with ID ${id}: ${response.statusText}`);
      throw new Error('Failed to update item');
    }
  
    return response.json();
  };
  
  const getItemById = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/items/${id}`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('item with id: ,'+ id +' is not in the database');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching item:', error);
      throw new Error('item with id: ,'+ id +' is not in the database');
    }
  };
  
  
  

  
const MenuService = {
    getMenuItems,
    getFoodItems,
    getDrinkItems,
    addItem,
    deleteItem,
    updateItem,
    getItemById
};

export default MenuService;
