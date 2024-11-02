import { Item } from "@types";

const getMenuItems = async () => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/items`, { 
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  };

  const getFoodItems = async () => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/food`, { 
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
};

const getDrinkItems = async () => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/drinks`, { 
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
};



const addItem = async (item: Item, type: 'food' | 'drinks') => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/items`; 
  const response = await fetch(url, {
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
  