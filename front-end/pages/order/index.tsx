import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MenuService from '@services/menuService';
import OrderService from '@services/orderService';
import { Item } from '@types';
import Header from '@components/header';

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
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      alert('You need to be logged in to confirm the order.');
      return;
    }

    const orderData = {
      items: orderedItems.map(({ item, quantity }) => ({
        item,
        quantity,
      })),
      userId,
    };

    try {
      await OrderService.confirmOrder(orderData);
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
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orderedItems.map(({ item, quantity }) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{quantity}</td>
                <td>${(item.price * quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>

      {orderedItems.length > 0 && (
        <button onClick={handleConfirmOrder} className="btn btn-primary">
          Confirm Order
        </button>
      )}

      {isOrderConfirmed && <p>Your order has been confirmed!</p>}
    </div>
  );
};

export default OrderPage;
