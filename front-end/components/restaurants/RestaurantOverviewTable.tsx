import React from 'react';
import { Restaurant } from '@types';

type Props = {
  restaurants: Array<Restaurant>;
  selectRestaurant: (restaurant: Restaurant) => void;
};

const RestaurantOverviewTable: React.FC<Props> = ({ restaurants, selectRestaurant }) => {
  return (
    <>
      {restaurants && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr
                key={restaurant.id}
                onClick={() => selectRestaurant(restaurant)} 
                role="button"
              >
                <td>{restaurant.name}</td>
                <td>{restaurant.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default RestaurantOverviewTable;
