import React, { useEffect, useState } from 'react';
import Header from '@components/header';
import { getReservations } from '@services/orderService'; 
import { Reservation } from '@types'; 
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ReservationTable from '@components/reservations/reservationTable';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const ReservationsPage: React.FC = () => {
  const [reservations, setReservations] = useState<Array<Reservation>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const { t } = useTranslation();
  

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

      if (storedRole !== 'admin' && storedRole !== 'chef' && storedRole !== 'bartender') {
        setMessage('You do not have permission to access this page. Redirecting to login...');
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        fetchReservations();
      }
    }
  }, [router]);

  return (
    <>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>{t('reservations.reservations')}</h1>
        {message && <p className="alert alert-warning">{message}</p>}
      </main>
      <div>
        {!message && (
          <>
            {loading ? (
              <p>{t('reservations.loading')}</p>
            ) : error ? (
              <p className="alert alert-danger">{error}</p>
            ) : reservations.length === 0 ? (
              <p>{t('reservations.warning')}</p>
            ) : (
              <ReservationTable reservations={reservations} role={role} />
            )}
          </>
        )}
      </div>
    </>
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
