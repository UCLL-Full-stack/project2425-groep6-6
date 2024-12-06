import React from 'react';
import { useTranslation } from 'next-i18next';
import { Restaurant } from '@types';
import RestaurantService from '@services/restaurantService';

type Props = {
  restaurants: Array<Restaurant>;
  selectRestaurant: (restaurant: Restaurant) => void;
  updateRestaurants: (restaurants: Array<Restaurant>) => void;
};

const handleDelete = async (id: string, updateRestaurants: (restaurants: Array<Restaurant>) => void, restaurants: Array<Restaurant>) => {
  try {
    await RestaurantService.deleteRestaurant(id);
    const updatedRestaurants = restaurants.filter((restaurant) => restaurant.id.toString() !== id);
    updateRestaurants(updatedRestaurants);
    alert("Restaurant succesvol verwijderd.");
  } catch (error) {
    console.error(error);
    alert("Er is een fout opgetreden bij het verwijderen van het restaurant.");
  }
};

const RestaurantOverviewTable: React.FC<Props> = ({ restaurants, selectRestaurant, updateRestaurants }) => {
  const { t } = useTranslation();

  const userRole = sessionStorage.getItem('role');

  return (
    <>
      {restaurants && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">{t("restaurants.name")}</th>
              <th scope="col">{t("restaurants.location")}</th>
              {userRole === 'admin' && <th scope="col">Delete</th>}  
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
                {userRole === 'admin' && (
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => {
                        handleDelete(restaurant.id.toString(), updateRestaurants, restaurants);
                      }}
                    >
                      delete restaurant
                    </button>
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

export default RestaurantOverviewTable;
