import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MenuService from '@services/menuService';
import { Item } from '@types';
import UpdateItemForm from '@components/items/updateItemForm';
import Header from '@components/header';
import Head from 'next/head';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ItemUpdatePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState<Item | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        try {
          const fetchedItem = await MenuService.getItemById(id as string);
          if (fetchedItem) {
            setItem(fetchedItem);
            setError(null);
          } else {
            setError(`Item with ID: ${id} not found in the database`);
            setItem(null);
          }
        } catch (error) {
          console.error('Error fetching item:', error);
          setError(`Item with ID: ${id} not found in the database`);
          setItem(null);
        }
      };
      fetchItem();
    }
  }, [id]);

  const handleUpdate = async (updatedItem: Item) => {
    try {
      await MenuService.updateItem(id as string, updatedItem);
      router.push('/menu');
    } catch (error) {
      console.error('Error updating item:', error);
      setError('Error updating item');
    }
  };

  return (
    <div>
      <Head>
        <title>Update Item</title>
        <meta name="description" content="Restaurant Menu" />
      </Head>
      <Header />
      <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',textAlign: 'center'}}>
        <h1 style={{ marginBottom: '20px' }}>Update Item</h1>
        {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}
        {item ? (
      <UpdateItemForm item={item} onUpdate={handleUpdate} />
        ) : (<div></div>)}
        </div>

    </div>
  );
};

export const getServerSideProps = async (context: { locale: any }) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"]))
    },
  };
};

export default ItemUpdatePage;
