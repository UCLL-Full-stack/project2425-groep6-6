import AddItem from "@components/items/AddItems";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const AddDrinkItem: React.FC = () => {
    return <AddItem type="drinks" />;
};
export const getServerSideProps = async (context: { locale: any; }) => {
    const { locale } = context; 
    return {
      props: {
        ...(await serverSideTranslations(locale ?? "en", ["common"])), 
      },
    };
  };
export default AddDrinkItem;
