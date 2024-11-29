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
    <>
      {restaurant && (
        <div>
          <table>
            <tbody>
              <tr>
                <td>{t("restaurants.id")}:</td>
                <td>{restaurant.id}</td>
              </tr>
              <tr>
                <td>{t("restaurants.name")}:</td> 
                <td>{restaurant.name}</td>
              </tr>
              <tr>
                <td>{t("restaurants.location")}:</td> 
                <td>{restaurant.address}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <Link href="/menu">
              <button className="btn btn-primary">{t("restaurants.viewMenu")}</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantDetails;
