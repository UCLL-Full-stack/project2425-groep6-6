import React from 'react';
import Link from 'next/link';
import { Restaurant } from '@types';

type Props = {
  restaurant: Restaurant;
};

const RestaurantDetails: React.FC<Props> = ({ restaurant }: Props) => {
  return (
    <>
      {restaurant && (
        <div>
          <table>
            <tbody>
              <tr>
                <td>ID:</td>
                <td>{restaurant.id}</td>
              </tr>
              <tr>
                <td>Name:</td>
                <td>{restaurant.name}</td>
              </tr>
              <tr>
                <td>Location:</td>
                <td>{restaurant.address}</td>
              </tr>
            </tbody>
          </table>
          <div>
          <Link href="/menu">
          <button className="btn btn-primary">View Menu</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantDetails;
