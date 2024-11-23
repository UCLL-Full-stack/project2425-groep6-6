import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MenuService from '@services/menuService';
import OrderService from '@services/orderService';
import { Item } from '@types';
import Header from '@components/header';
import OrderTable from '@components/order/OrderTable';
import ConfirmOrderButton from '@components/order/confirmbutton';
import OrderSummary from '@components/order/ordersummary';

const OrderPage: React.FC = () => {
  const router = useRouter();
  const [orderedItems, setOrderedItems] = useState<Array<{ item: Item; quantity: number }>>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  useEffect(() => {
    const fetchOrderedItems = async () => {
      const { order } = router.query;
      if (!order) return;
  
      const parsedOrder = JSON.parse(order as string);
      console.log("Parsed Order: ", parsedOrder);
  
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
  }, [router.query]);

  const handleConfirmOrder = async () => {
    const userId = sessionStorage.getItem('username');
    if (!userId) {
      alert('You need to be logged in to confirm the order.');
      return;
    }

    const orderData = {
      date: new Date().toISOString(),  
      userId,
      items: orderedItems.map(({ item, quantity }) => ({
        item,
        quantity,
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
    <div>
      <Header />

      <h1>Your Order</h1>
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
    </div>
  );
};

export default OrderPage;
