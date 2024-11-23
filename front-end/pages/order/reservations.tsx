import React, { useEffect, useState } from 'react';
import Header from '@components/header';
import { getReservations } from '@services/orderService'; 
import { Reservation } from '@types'; 

const ReservationsPage: React.FC = () => {
  const [reservations, setReservations] = useState<Array<Reservation>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const fetchReservations = async () => {
    try {
      const data: Reservation[] = await getReservations(); 
      setReservations(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = sessionStorage.getItem('role');
      setRole(storedRole);
    }
    fetchReservations(); 
  }, []);

  return (
    <div>
      <Header />

      <h1>Reservations</h1>

      {loading ? (
        <p>Loading reservations...</p>
      ) : error ? (
        <p className="alert alert-danger">{error}</p> 
      ) : reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Date</th>
              {role === 'cook' && <th>Food</th>}
              {role === 'barman' && <th>Drinks</th>}
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.user.fullname || reservation.user.username}</td>
                <td>{new Date(reservation.date).toLocaleString()}</td> 
                {role === 'cook' && (
                  <td>
                    <ul>
                      {reservation.items
                        .filter((item) => item.item.category.toLowerCase() === 'food')
                        .map((item, index) => (
                          <li key={index}>
                            {item.item.name} - Quantity: {item.quantity}
                          </li>
                        ))}
                    </ul>
                  </td>
                )}
                {role === 'barman' && (
                  <td>
                    <ul>
                      {reservation.items
                        .filter((item) => item.item.category.toLowerCase() === 'drinks')
                        .map((item, index) => (
                          <li key={index}>
                            {item.item.name} - Quantity: {item.quantity}
                          </li>
                        ))}
                    </ul>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReservationsPage;
