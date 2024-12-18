import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReservationTable from '@components/reservations/reservationTable';
import { Reservation } from '@types';
import { useTranslation } from 'next-i18next';

jest.mock('next-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('ReservationTable', () => {
  const mockReservations: Reservation[] = [
    {
      id: 1,
      user: { firstName: 'John', username: 'john123' },
      date: '2024-12-18T12:00:00Z',
      items: [{
          name: 'Pizza', category: 'food',
          item: {
              id: 0,
              name: '',
              price: 0,
              category: ''
          },
          quantity: 0
      }],
    },
    {
      id: 2,
      user: { firstName: 'Jane', username: 'jane123' },
      date: '2024-12-19T12:00:00Z',
      items: [{
          name: 'Coke', category: 'drinks',
          item: {
              id: 0,
              name: '',
              price: 0,
              category: ''
          },
          quantity: 0
      }],
    },
  ];

  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key, 
    });
  });

  test('renders the reservation table', () => {
    render(<ReservationTable reservations={mockReservations} role="admin" />);

    expect(screen.getByText('reservations.username')).toBeInTheDocument();
    expect(screen.getByText('reservations.date')).toBeInTheDocument();
    expect(screen.getByText('reservations.type')).toBeInTheDocument();

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Coke')).toBeInTheDocument();
  });
});
