import React from 'react';
import { Reservation } from '@types';

interface ReservationDetailsProps {
  reservation: Reservation;
  role: string | null;
}

const ReservationDetails: React.FC<ReservationDetailsProps> = ({ reservation, role }) => {
  return (
    <div className="reservation-details">
      <h3>Reservation Details</h3>
      <p><strong>User:</strong> {reservation.user.firstName} {reservation.user.lastName} ({reservation.user.username})</p>
      <p><strong>Date:</strong> {new Date(reservation.date).toLocaleString()}</p>

      {role === 'chef' && (
        <div>
          <h4>Food Items:</h4>
          {reservation.items && reservation.items.filter(item => item?.category?.toLowerCase() === 'food').length > 0 ? (
            <ul>
              {reservation.items
                .filter((item) => item?.category?.toLowerCase() === 'food')
                .map((item, index) => (
                  <li key={index}>
                    {item.name} - Price: ${item.price} 
                  </li>
                ))}
            </ul>
          ) : (
            <p>No food items found.</p>
          )}
        </div>
      )}

      {role === 'bartender' && (
        <div>
          <h4>Drink Items:</h4>
          {reservation.items && reservation.items.filter(item => item?.category?.toLowerCase() === 'drinks').length > 0 ? (
            <ul>
              {reservation.items
                .filter((item) => item?.category?.toLowerCase() === 'drinks')
                .map((item, index) => (
                  <li key={index}>
                    {item.name} - Price: ${item.price} 
                  </li>
                ))}
            </ul>
          ) : (
            <p>No drink items found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReservationDetails;
