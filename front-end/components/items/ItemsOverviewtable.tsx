import React from 'react';
import { Item } from '@types';
import Link from 'next/link';
import MenuService from '@services/menuService';

type Props = {
  items: Item[];
  order: { [key: number]: number };
  onQuantityChange: (id: number, quantity: number) => void;
  updateItems: (updatedItems: Item[]) => void; 
};

const ItemOverviewTable: React.FC<Props> = ({ items, order, onQuantityChange, updateItems }) => {
  const isLoggedIn = typeof window !== 'undefined' && sessionStorage.getItem('username') !== null;
  const isAdmin = sessionStorage.getItem('role') === 'admin';

  const handleQuantityChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(event.target.value, 10) || 0;
    onQuantityChange(id, quantity);
  };

  const handleDelete = async (id: number) => {
    try {
      await MenuService.deleteItem(id.toString());

      const updatedItems = items.filter(item => item.id !== id);
      updateItems(updatedItems);
      alert("Item successfully deleted.");
    } catch (error) {
      console.error(error);
      alert("Error occurred while deleting the item.");
    }
  };

  return (
    <>
      {items && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              {isLoggedIn && <th scope="col">Quantity</th>}
              {isAdmin && <th scope="col">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>€{(item.price ?? 0).toFixed(2)}</td>
                {isLoggedIn && (
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={order[item.id] || 0}
                      onChange={(e) => handleQuantityChange(item.id, e)}
                      className="form-control"
                    />
                  </td>
                )}
                {isAdmin && (
                  <td className="d-flex">
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                    <Link href={`/menu/update/${item.id}`} passHref>
                      <button className="btn btn-primary ml-2">
                        Update
                      </button>
                    </Link>
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
