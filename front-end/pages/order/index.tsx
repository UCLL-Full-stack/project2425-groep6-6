import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MenuService from '@services/menuService';
import OrderService from '@services/orderService';
import { Item } from '@types';
import Header from '@components/header';
import OrderTable from '@components/order/OrderTable';
import ConfirmOrderButton from '@components/order/confirmbutton';
import OrderSummary from '@components/order/ordersummary';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const OrderPage: React.FC = () => {
  const router = useRouter();
  const [orderedItems, setOrderedItems] = useState<Array<{ item: Item; quantity: number }>>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const userRole = typeof window !== "undefined" ? sessionStorage.getItem("role") : null;

  useEffect(() => {
    if (!userRole) {
      setMessage("You need to be logged in to view this page.");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      const fetchOrderedItems = async () => {
        const { order } = router.query;
        if (!order) return;

        const parsedOrder = JSON.parse(order as string);
        const items: Array<{ item: Item; quantity: number }> = [];

        try {
          const response = await MenuService.getMenuItems();
          const menuItems: Item[] = await response.json();

          for (const [id, quantity] of Object.entries(parsedOrder)) {
            const quantityNumber = Number(quantity);
            const foundItem = menuItems.find((item) => item.id === parseInt(id));

            if (foundItem) {
              items.push({ item: foundItem, quantity: quantityNumber });
            }
          }

          setOrderedItems(items);

          const total = items.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0);
          setTotalPrice(total);
        } catch (error) {
          console.error('Error fetching ordered items:', error);
        }
      };

      fetchOrderedItems();
    }
  }, [router.query, userRole, router]);

  const handleConfirmOrder = async () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      alert('You need to be logged in to confirm the order.');
      return;
    }

    const orderData = {
      date: new Date().toISOString(),
      userId: parseInt(userId),
      items: orderedItems.map(({ item, quantity }) => ({
        id: item.id,
        amount: quantity, 
      })),
    };

    try {
      await OrderService.createReservation(orderData);
      setIsOrderConfirmed(true);
      alert('Order confirmed successfully!');
      router.push('/');
    } catch (error) {
      console.error('Error confirming order:', error);
      alert('Failed to confirm order');
    }
  };

  return (
    <>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Your Order</h1>
      </main>

      <div>
        {message ? (
          <div style={{ color: 'red', textAlign: 'center' }}>{message}</div>
        ) : (
          <>
            {orderedItems.length === 0 ? (
              <p>No items in your order.</p>
            ) : (
              <>
                <OrderTable orderedItems={orderedItems} />
                <OrderSummary totalPrice={totalPrice} />
              </>
            )}

            {orderedItems.length > 0 && (
              <ConfirmOrderButton handleConfirmOrder={handleConfirmOrder} />
            )}

            {isOrderConfirmed && <p>Your order has been confirmed!</p>}
          </>
        )}
      </div>
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

export default OrderPage;
