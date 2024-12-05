import React, { useState } from 'react';
import { Reservation } from '@types';
import { getReservationById } from '@services/orderService';
import ReservationDetails from './ReservationDetails'; 

interface ReservationTableProps {
  reservations: Reservation[];
  role: string | null;
}

const ReservationTable: React.FC<ReservationTableProps> = ({ reservations, role }) => {
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRowClick = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getReservationById(id); 
      setSelectedReservation(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching reservation details');
    } finally {
      setLoading(false);
    }
  };

  // Filter the food and drink items
  const filterFoodItems = (reservation: Reservation) => 
    reservation.items.filter(item => item.category.toLowerCase() === 'food');

  const filterDrinkItems = (reservation: Reservation) => 
    reservation.items.filter(item => item.category.toLowerCase() === 'drinks');

  const filteredReservations = reservations.filter((reservation) => {
    if (role === 'chef') {
      return filterFoodItems(reservation).length > 0;
    }
    if (role === 'bartender') {
      return filterDrinkItems(reservation).length > 0;
    }
    return true;  
  });

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th> 
            <th>Date</th>
            {role === 'chef' && <th>Food</th>}
            {role === 'bartender' && <th>Drinks</th>}
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation) => (
            <tr
              key={reservation.id}
              onClick={() => handleRowClick(reservation.id)} 
              style={{ cursor: 'pointer' }}
            >
              <td>{reservation.user.username}</td> 
              <td>{new Date(reservation.date).toLocaleString()}</td>
              {role === 'chef' && filterFoodItems(reservation).length > 0 && (
                <td>Food</td> 
              )}
              {role === 'bartender' && filterDrinkItems(reservation).length > 0 && (
                <td>Drinks</td>  
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {loading && <p>Loading reservation details...</p>}
      {error && <p className="alert alert-danger">{error}</p>}

      {selectedReservation && (
        <ReservationDetails reservation={selectedReservation} role={role} />
      )}
    </div>
  );
};

export default ReservationTable;
