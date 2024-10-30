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

  
  const MenuService = {
    getMenuItems,
    getFoodItems,
    getDrinkItems,
  };
  
  export default MenuService;
  