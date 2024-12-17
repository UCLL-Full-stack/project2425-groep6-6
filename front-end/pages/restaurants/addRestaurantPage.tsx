import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AddRestaurant from "@components/restaurants/AddRestaurant";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Header from "@components/header";
import Head from "next/head";
import { useTranslation } from "next-i18next";

const AddRestaurantPage: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const { t } = useTranslation();

  
  const getRestaurants = async () => {
    console.log("Restaurant toegevoegd. Hier kun je de lijst opnieuw ophalen.");
  };

  return (
    <>
      <Head>
        <title>addRestaurant</title>
      </Head>
      <Header />
      <main className="container mt-4 d-flex flex-column justify-content-center align-items-center" >
        {message ? (
          <div className="text-center">
            <div className="alert alert-danger">{message}</div>
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">{t("errors.redirecting")}</span>
            </div>
          </div>
        ) : (
          <>
            <h1 className="mb-4">Add Restaurant</h1>
            <AddRestaurant onRestaurantAdded={getRestaurants} />
          </>
        )}
      </main>
    </>
  );
};

export const getServerSideProps = async (context: { locale: any }) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default AddRestaurantPage;
