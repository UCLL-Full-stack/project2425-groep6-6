import React from 'react';
import { Item } from '@types';



type Props = {
  items: Array<Item>;
};

const ItemOverviewTable: React.FC<Props> = ({ items }) => {
  return (
    <>
      {items && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${(item.price ?? 0).toFixed(2)}</td>
                </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ItemOverviewTable;
