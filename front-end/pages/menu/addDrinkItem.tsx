import AddItem from "@components/items/AddItems";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Header from "@components/header"; 
import Head from "next/head";

const AddDrinkItem: React.FC = () => {
  return (
    <>
      <Head>
        <title>Add Drink Item</title>
        <meta name="description" content="Add a new drink item to the menu" />
      </Head>
      <Header />
      <AddItem type="drinks" />
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
