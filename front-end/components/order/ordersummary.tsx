import React from 'react';

interface OrderSummaryProps {
  totalPrice: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ totalPrice }) => {
  return (
    <div>
      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
};

export default OrderSummary;
