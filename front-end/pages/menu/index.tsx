import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "@components/header"; 
import MenuService from "@services/menuService";
import ItemOverviewTable from "@components/items/ItemsOverviewtable";
import { Item } from "@types";
import { useRouter } from "next/router"; // Import the router for navigation

const Menu: React.FC = () => {
    const [foodItems, setFoodItems] = useState<Array<Item>>([]);
    const [drinkItems, setDrinkItems] = useState<Array<Item>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    const fetchMenuItems = async () => {
        try {
            const [foodResponse, drinkResponse] = await Promise.all([
                MenuService.getFoodItems(),
                MenuService.getDrinkItems()
            ]);
            setFoodItems(await foodResponse.json());
            setDrinkItems(await drinkResponse.json());
        } catch (error) {
            console.error("Error fetching menu items:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenuItems();
    }, []);

    // Retrieve user role from sessionStorage
    const role = sessionStorage.getItem("role");

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

                        {/* Show "Add New Food Item" button only if user is a cook */}
                        {role === 'cook' && (
                            <button 
                                onClick={() => router.push('/menu/addFoodItem')}
                            >
                                Add New Food Item
                            </button>
                        )}

                        {/* Show "Add New Drink Item" button only if user is a barman */}
                        {role === 'barman' && (
                            <button 
                                onClick={() => router.push('/menu/addDrinkItem')}
                            >
                                Add New Drink Item
                            </button>
                        )}
                    </>
                )}
            </main>
        </>
    );
};

export default Menu;
