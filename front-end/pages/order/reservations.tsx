import React, { useEffect, useState } from 'react';
import Header from '@components/header';
import { getReservations } from '@services/orderService'; 
import { Reservation } from '@types'; 
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ReservationTable from '@components/reservations/reservationTable';

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
        <ReservationTable reservations={reservations} role={role} />
      )}
    </div>
  );
};

export const getServerSideProps = async (context: { locale: any; }) => {
  const { locale } = context; 
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])), 
    },
  };
};

export default ReservationsPage;
