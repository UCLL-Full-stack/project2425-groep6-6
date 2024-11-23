import React from 'react';
import { Item } from '@types';

interface OrderTableProps {
  orderedItems: Array<{ item: Item; quantity: number }>;
}

const OrderTable: React.FC<OrderTableProps> = ({ orderedItems }) => {
  return (
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
  );
};

export default OrderTable;
