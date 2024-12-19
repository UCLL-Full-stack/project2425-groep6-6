import { render, screen } from '@testing-library/react';
import ReservationTable from '@components/reservations/reservationTable';
import { Reservation } from '@types';  // Zorg ervoor dat de types correct zijn geïmporteerd
import { useTranslation } from 'next-i18next';

jest.mock('next-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('ReservationTable', () => {
  const mockReservations: Reservation[] = [
    {
      id: 1,
      user: { firstName: 'user1', username: 'user1' },
      date: '2024-12-18T12:00:00Z',
      items: [
        {
          id: 1,
          name: 'Pizza',
          category: 'food',
          amount: 20,
          quantity: 2,
        },
        {
          id: 2,
          name: 'Coke',
          category: 'drinks',
          amount: 15,
          quantity: 3,
        },
      ],
    },
    {
      id: 2,
      user: { firstName: 'user2', username: 'user2' },
      date: '2024-12-19T12:00:00Z',
      items: [
        {
          id: 3,
          name: 'Burger',
          category: 'food',
          amount: 25,
          quantity: 1,
        },
        {
          id: 4,
          name: 'Beer',
          category: 'drinks',
          amount: 10,
          quantity: 4,
        },
      ],
    },
  ];

  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,  
    });
  });

  test('renders reservation table for admin role', () => {
    render(<ReservationTable reservations={mockReservations} role="admin" />);

    expect(screen.getByText('reservations.username')).toBeInTheDocument();
    expect(screen.getByText('reservations.date')).toBeInTheDocument();
    expect(screen.getByText('reservations.type')).toBeInTheDocument();
    expect(screen.getByText('reservations.items')).toBeInTheDocument();
    expect(screen.getByText('reservations.amount')).toBeInTheDocument();

    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Coke')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();
    expect(screen.getByText('Burger')).toBeInTheDocument();
    expect(screen.getByText('Beer')).toBeInTheDocument();
  });

  test('renders reservation table for chef role', () => {
    render(<ReservationTable reservations={mockReservations} role="chef" />);

    expect(screen.getByText('reservations.food')).toBeInTheDocument();

    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Burger')).toBeInTheDocument();
    expect(screen.queryByText('Coke')).toBeNull();
    expect(screen.queryByText('Beer')).toBeNull();
  });

  test('renders reservation table for bartender role', () => {
    render(<ReservationTable reservations={mockReservations} role="bartender" />);

    expect(screen.getByText('reservations.drinks')).toBeInTheDocument();

    expect(screen.getByText('Coke')).toBeInTheDocument();
    expect(screen.getByText('Beer')).toBeInTheDocument();
    expect(screen.queryByText('Pizza')).toBeNull();
    expect(screen.queryByText('Burger')).toBeNull();
  });
});
