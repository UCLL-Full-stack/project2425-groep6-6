import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from "next/head";
import RestaurantService from '@services/restaurantService';
import RestaurantDetails from '@components/restaurants/RestaurantDetails';
import Header from '@components/header';
import { Restaurant } from '@types';

const RestaurantPage: React.FC = () => {
    const router = useRouter();
    const { restaurantId } = router.query; // Get restaurantId from the URL
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

    useEffect(() => {
        const fetchRestaurant = async () => {
            if (restaurantId) {
                try {
                    const response = await RestaurantService.getRestaurantById(restaurantId as string);
                    const data = await response.json();
                    setRestaurant(data);
                } catch (error) {
                    console.error("Error fetching restaurant:", error);
                }
            }
        };
        fetchRestaurant();
    }, [restaurantId]);

    return (
        <>
            <Head>
                <title>Restaurant Details with id {restaurantId}</title>
            </Head>

            <Header />

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Restaurant Details with id {restaurantId}</h1>
                
                <section>
                    {restaurant ? (
                        <RestaurantDetails restaurant={restaurant} />
                    ) : (
                        <p>Loading restaurant details...</p>
                    )}
                </section>
            </main>
        </>
    );
};

export default RestaurantPage;
