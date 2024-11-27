import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Item } from '@types';
import ItemOverviewTable from '@components/items/ItemsOverviewtable';
import MenuService from '@services/menuService';
import Header from '@components/header';
import Head from 'next/head';
import Link from 'next/link';

const Menu: React.FC = () => {
  const [foodItems, setFoodItems] = useState<Array<Item>>([]);
  const [drinkItems, setDrinkItems] = useState<Array<Item>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [order, setOrder] = useState<{ [key: number]: number }>({});
  const router = useRouter();

  const fetchMenuItems = async () => {
    try {
      const [foodResponse, drinkResponse] = await Promise.all([
        MenuService.getFoodItems(),
        MenuService.getDrinkItems(),
      ]);
      const foodData = await foodResponse.json();
      const drinkData = await drinkResponse.json();
  
      console.log("Food Items: ", foodData);
      console.log("Drink Items: ", drinkData);
  
      setFoodItems(foodData);
      setDrinkItems(drinkData);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleQuantityChange = (id: number, quantity: number) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [id]: quantity,
    }));
  };

  const handleOrder = () => {
    router.push({
      pathname: '/order',
      query: { order: JSON.stringify(order) },
    });
  };

  const isLoggedIn = typeof window !== 'undefined' && sessionStorage.getItem('username') !== null;

  return (
    <>
      <Head>
        <title>Menu</title>
        <meta name="description" content="Restaurant Menu" />
      </Head>
      <Header />

      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Menu</h1>
        {!isLoggedIn && (
        <p className="alert alert-warning"> If you want to order, please{' '}
        <Link href="/login">
         login
        </Link> </p>
)}

        {loading ? (
          <p>Loading menu items...</p>
        ) : (
          <>
             <section>
             <h2>Food Items</h2>
              <ItemOverviewTable 
                items={foodItems} 
                onQuantityChange={handleQuantityChange} 
                order={order} 
              />

              <h2>Drink Items</h2>
              <ItemOverviewTable 
                items={drinkItems} 
                onQuantityChange={handleQuantityChange} 
                order={order} 
              />
            </section>
            {isLoggedIn && (
              <button onClick={handleOrder} className="btn btn-primary">Order</button>
            )}
          </>
        )}

          {isLoggedIn && sessionStorage.getItem("role")== "chef" && (
          <div>
          <Link href="/menu/addFoodItem">
          Add Food Item
          </Link>
          </div>)}
          {isLoggedIn && sessionStorage.getItem("role")== "bartender" && (
          <div>
          <Link href="/menu/addDrinkItem">
          Add Drink Item
          </Link>
          </div>)}


      </main>
    </>
  );
};

export default Menu;
