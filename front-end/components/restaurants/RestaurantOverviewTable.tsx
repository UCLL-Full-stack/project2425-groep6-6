import React from 'react';
import { useTranslation } from 'next-i18next';
import { Restaurant } from '@types';

type Props = {
  restaurants: Array<Restaurant>;
  selectRestaurant: (restaurant: Restaurant) => void;
};

const RestaurantOverviewTable: React.FC<Props> = ({ restaurants, selectRestaurant }) => {
  const { t } = useTranslation(); 

  return (
    <>
      {restaurants && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">{t("restaurants.name")}</th> 
              <th scope="col">{t("restaurants.location")}</th>
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
