import React from 'react';
import { Restaurant } from '@types';

type Props = {
  restaurant: Restaurant;
};

const RestaurantDetails: React.FC<Props> = ({ restaurant }: Props) => {
  return (
    <>
      {restaurant && (
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
      )}
    </>
  );
};

export default RestaurantDetails;
