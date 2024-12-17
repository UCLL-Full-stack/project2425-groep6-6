import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Restaurant } from '@types';

type Props = {
  restaurant: Restaurant;
};

const RestaurantDetails: React.FC<Props> = ({ restaurant }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="container mt-4">
      {restaurant && (
        <div>
          <div className="mb-4">
            <h3>{restaurant.name}</h3>
          </div>
          <div>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th>{t("restaurants.id")}:</th>
                  <td>{restaurant.id}</td>
                </tr>
                <tr>
                  <th>{t("restaurants.name")}:</th>
                  <td>{restaurant.name}</td>
                </tr>
                <tr>
                  <th>{t("restaurants.location")}:</th>
                  <td>{restaurant.address}</td>
                </tr>
              </tbody>
            </table>
            <div className="text-center mt-3">
              <Link href="/menu">
                <button className="btn btn-primary">{t("restaurants.viewMenu")}</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetails;
