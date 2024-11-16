import React from 'react';
import { Item } from '@types';
import Link from 'next/link';

type Props = {
  items: Item[];
  order: { [key: number]: number };
  onQuantityChange: (id: number, quantity: number) => void;
};

const ItemOverviewTable: React.FC<Props> = ({ items, order, onQuantityChange }) => {
  const isLoggedIn = typeof window !== 'undefined' && sessionStorage.getItem('username') !== null;

  const handleQuantityChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(event.target.value, 10) || 0;
    onQuantityChange(id, quantity);
  };

  return (
    <>
      {items && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              {isLoggedIn && <th scope="col">Quantity</th>} {/* Only show Quantity column if logged in */}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${(item.price ?? 0).toFixed(2)}</td>
                {isLoggedIn ? (
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={order[item.id] || 0}
                      onChange={(e) => handleQuantityChange(item.id, e)}
                      className="form-control"
                    />
                  </td>
                ) : (
                  <td>
                    {isLoggedIn && <span>Login to change quantity</span> } 
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ItemOverviewTable;
