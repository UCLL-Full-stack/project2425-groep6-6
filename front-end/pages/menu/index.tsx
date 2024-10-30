import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "@components/header"; 
import MenuService from "@services/menuService";
import ItemOverviewTable from "@components/items/ItemsOverviewtable";
import { Item } from "@types";

const Menu: React.FC = () => {
    const [foodItems, setFoodItems] = useState<Array<Item>>([]);
    const [drinkItems, setDrinkItems] = useState<Array<Item>>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchFoodItems = async () => {
        try {
            const response = await MenuService.getFoodItems();
            const data: Array<Item> = await response.json();
            setFoodItems(data);
        } catch (error) {
            console.error("Error fetching food items:", error);
        }
    };

    const fetchDrinkItems = async () => {
        try {
            const response = await MenuService.getDrinkItems();
            const data: Array<Item> = await response.json();
            setDrinkItems(data);
        } catch (error) {
            console.error("Error fetching drink items:", error);
        }
    };

    const fetchMenuItems = async () => {
        await Promise.all([fetchFoodItems(), fetchDrinkItems()]);
        setLoading(false);
    };

    useEffect(() => {
        fetchMenuItems();
    }, []);

    return (
        <>
            <Head>
                <title>Menu</title>
                <meta name="description" content="Restaurant Menu" />
            </Head>

            <Header />

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Menu</h1>
                {loading ? (
                    <p>Loading menu items...</p>
                ) : (
                    <>
                        <section>
                            <h2>Food Items</h2>
                            <ItemOverviewTable items={foodItems} />
                        </section>
                        <section>
                            <h2>Drink Items</h2>
                            <ItemOverviewTable items={drinkItems} />
                        </section>
                    </>
                )}
            </main>
        </>
    );
};

export default Menu;
