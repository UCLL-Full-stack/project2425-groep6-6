import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AddItem from "@components/items/AddItems";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Header from "@components/header"; 
import Head from "next/head";

const AddDrinkItem: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const userRole = typeof window !== "undefined" ? sessionStorage.getItem("role") : null;

  useEffect(() => {
    if (userRole !== "admin" && userRole !== "bartender") {
      setMessage("You do not have permission to access this page. You are directed to the login page.");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  }, [userRole, router]);

  return (
    <>
      <Head>
        <title>Add Drink Item</title>
        <meta name="description" content="Add a new drink item to the menu" />
      </Head>
      <Header />
      {message ? (
        <div className="alert alert-danger">{message}</div>
      ) : (
        <AddItem type="drinks" />
      )}
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

export default AddDrinkItem;
