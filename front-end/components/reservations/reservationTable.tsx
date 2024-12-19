import React from 'react';
import { Reservation } from '@types';
import { useTranslation } from 'next-i18next';

interface ReservationTableProps {
  reservations: Reservation[];
  role: string | null;
}

const ReservationTable: React.FC<ReservationTableProps> = ({ reservations, role }) => {
  const { t } = useTranslation();

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>{t('reservations.username')}</th>
            <th>{t('reservations.date')}</th>
            {role === 'chef' || role === 'bartender' || role === 'admin' ? <th>{t('reservations.type')}</th> : null}
            {role === 'chef' && <th>{t('reservations.food')}</th>}
            {role === 'bartender' && <th>{t('reservations.drinks')}</th>}
            {role === 'admin' && <th>{t('reservations.items')}</th>}
            <th>{t('reservations.amount')}</th> 
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => {
            const sortedItems = reservation.items.sort((a, b) => {
              const categoryA = a.category.toLowerCase();
              const categoryB = b.category.toLowerCase();
              if (categoryA === 'drinks' && categoryB !== 'drinks') return -1;
              if (categoryA === 'food' && categoryB !== 'food') return 1;
              return 0;
            });

            return (
              <tr key={reservation.id}>
                <td>{reservation.user.firstName || reservation.user.username}</td>
                <td>{new Date(reservation.date).toLocaleString()}</td>
                {role === 'chef' || role === 'bartender' || role === 'admin' ? (
                  <td>
                    <ul className="list-unstyled">
                      {sortedItems.map((item, index) => (
                        (role === 'chef' && item.category.toLowerCase() === 'food') ||
                        (role === 'bartender' && item.category.toLowerCase() === 'drinks') ||
                        role === 'admin' ? (
                          <li key={index}>
                            <strong>{item.category.charAt(0).toUpperCase() + item.category.slice(1)}:</strong>
                          </li>
                        ) : null
                      ))}
                    </ul>
                  </td>
                ) : null}
                {role === 'chef' && (
                  <td>
                    <ul className="list-unstyled">
                      {sortedItems
                        .filter((item) => item.category.toLowerCase() === 'food')
                        .map((item, index) => (
                          <li key={index}>{item.name}</li>
                        ))}
                    </ul>
                  </td>
                )}
                {role === 'bartender' && (
                  <td>
                    <ul className="list-unstyled">
                      {sortedItems
                        .filter((item) => item.category.toLowerCase() === 'drinks')
                        .map((item, index) => (
                          <li key={index}>{item.name}</li>
                        ))}
                    </ul>
                  </td>
                )}
                {role === 'admin' && (
                  <td>
                    <ul className="list-unstyled">
                      {sortedItems.map((item, index) => (
                        <li key={index}>{item.name}</li>
                      ))}
                    </ul>
                  </td>
                )}
                <td>
                  <ul className="list-unstyled">
                    {sortedItems.map((item, index) => (
                      <li key={index}>{item.amount}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTable;
