import Head from "next/head";
import { useEffect, useState } from "react";
import { Restaurant } from "@types";
import RestaurantOverviewTable from "@components/restaurants/RestaurantOverviewTable";
import RestaurantService from "@services/restaurantService";
import Header from "@components/header";

const Restaurants: React.FC = () => {
    const [restaurants, setRestaurants] = useState<Array<Restaurant>>();
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

    const getRestaurants = async () => {
        const response = await RestaurantService.getAllRestaurants();
        const restaurantData = await response.json();
        setRestaurants(restaurantData);
    };

    useEffect(() => {
        getRestaurants();
    }, []);

    return (
        <>
            <Head>
                <title>Restaurants</title>
            </Head>

            <Header />

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Restaurants</h1>
                <section>
                    <h2>Restaurant Overview</h2>
                    {restaurants && (
                        <RestaurantOverviewTable restaurants={restaurants} selectRestaurant={setSelectedRestaurant} />
                    )}
                </section>

                {selectedRestaurant && (
                    <section>
                        <h2>Details of {selectedRestaurant.name}</h2>
                        {/* Add detailed information*/}
                    </section>
                )}
            </main>
        </>
    );
};

export default Restaurants;

   



   