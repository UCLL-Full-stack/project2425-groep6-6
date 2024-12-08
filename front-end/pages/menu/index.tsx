import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Item } from '@types';
import ItemOverviewTable from '@components/items/ItemsOverviewtable';
import MenuService from '@services/menuService';
import Header from '@components/header';
import Head from 'next/head';
import Link from 'next/link';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';

const Menu: React.FC = () => {
  const [foodItems, setFoodItems] = useState<Array<Item>>([]);
  const [drinkItems, setDrinkItems] = useState<Array<Item>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [order, setOrder] = useState<{ [key: number]: number }>({});
  const router = useRouter();
  const { t } = useTranslation();

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

  const updateItems = (updatedItems: Array<Item>, type: 'food' | 'drinks') => {
    if (type === 'food') {
      setFoodItems(updatedItems);
    } else {
      setDrinkItems(updatedItems);
    }
  };

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

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <>
      <Head>
        <title>{t("menu.title")}</title>
        <meta name="description" content="Restaurant Menu" />
      </Head>
      <Header />

      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>{t("menu.title")}</h1>

        {!isLoggedIn && (
          <p className="alert alert-warning">
            {t("menu.loginAlert")} {' '}
            <Link href="/login">
              {t("menu.login")}
            </Link>
          </p>
        )}

        {loading ? (
          <p>Loading menu items...</p>
        ) : (
          <section style={{ display: 'flex', gap: '10rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h2>{t("menu.foodItems")}</h2>
              <ItemOverviewTable
                items={foodItems}
                onQuantityChange={handleQuantityChange}
                order={order}
                updateItems={(updatedItems) => updateItems(updatedItems, 'food')}
              />
            </div>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h2>{t("menu.drinkItems")}</h2>
              <ItemOverviewTable
                items={drinkItems}
                onQuantityChange={handleQuantityChange}
                order={order}
                updateItems={(updatedItems) => updateItems(updatedItems, 'drinks')}
              />
            </div>
          </section>
        )}

        {isLoggedIn && (
          <button onClick={handleOrder} className="btn btn-primary mt-10">
            {t("menu.order")}
          </button>
        )}

        {isLoggedIn && sessionStorage.getItem("role") === "chef" || sessionStorage.getItem("role") === "admin" && (
          <div>
            <Link href="/menu/addFoodItem">
              {t("menu.addFoodItem")}
            </Link>
          </div>
        )}

        {isLoggedIn && sessionStorage.getItem("role") === "bartender" || sessionStorage.getItem("role") === "admin" && (
          <div>
            <Link href="/menu/addDrinkItem">
              {t("menu.addDrinkItem")}
            </Link>
          </div>
        )}
      </main>
    </>
  );
};

export const getServerSideProps = async (context: { locale: any; }) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Menu;
