import Head from "next/head";
import { useEffect, useState } from "react";
import { Restaurant } from "@types";
import RestaurantOverviewTable from "@components/restaurants/RestaurantOverviewTable";
import RestaurantDetails from "@components/restaurants/RestaurantDetails"; 
import RestaurantService from "@services/restaurantService";
import Header from "@components/header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';
import AddRestaurant from "@components/restaurants/AddRestaurant";
import { useRouter } from "next/router";
import Link from "next/link";


const Restaurants: React.FC = () => {
    const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
    const { t } = useTranslation();
    const router = useRouter();


    const getRestaurants = async () => {
        const response = await RestaurantService.getAllRestaurants();
        const restaurantData = await response.json();
        setRestaurants(restaurantData);
    };

    const updateRestaurants = (updatedRestaurants: Array<Restaurant>) => {
        setRestaurants(updatedRestaurants);
    };

    useEffect(() => {
        getRestaurants();
    }, []);

    return (
        <>
            <Head>
                <title>{t("restaurants.title")}</title>
            </Head>

            <Header />

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>{t("restaurants.title")}</h1>
                <section>
                    <h2>{t("restaurants.overview")}</h2>
                    <RestaurantOverviewTable
                        restaurants={restaurants}
                        selectRestaurant={setSelectedRestaurant}
                        updateRestaurants={updateRestaurants}  
                    />
                </section>
            
                {sessionStorage.getItem("role") === "admin" && (
                <Link href={`restaurants/addRestaurantPage`} passHref>
                <button  className="btn btn-primary ml-2">
                Add Restaurant
                </button>
                </Link>
                )}
       
                {selectedRestaurant && (
                    <section>
                    <br />
                    <br />
                    <h2>{t("restaurants.details", { restaurantName: selectedRestaurant.name })}</h2>
                        <RestaurantDetails restaurant={selectedRestaurant} />
                    </section>
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

export default Restaurants;
