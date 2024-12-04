import { Reservation } from "@types";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/reservations`;

const createReservation = async (reservation: { date: string; userId: number; items: Array<{ itemId: number }> }): Promise<any> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservation),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create reservation');
    }

    return response.json();
  } catch (error) {
    throw new Error(`Error creating reservation: ${error instanceof Error ? error.message : error}`);
  }
};


export const getReservations = async (): Promise<Reservation[]> => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch reservations');
    }

    return response.json(); 
  } catch (error) {
    throw new Error(`Error fetching reservations: ${error instanceof Error ? error.message : error}`);
  }
};

const OrderService = {
  createReservation,
  getReservations,
};

export default OrderService;
