import { Item } from "@types";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/reservations`;

const createReservation = async (reservation: { date: string; userId: string; items: Array<{ item: Item; quantity: number }> }) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservation),
    });

    if (!response.ok) {
        throw new Error('Failed to create reservation');
    }

    return response.json(); 
};


export const getReservations = async (): Promise<any[]> => {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch reservations');
    }
  
    return response.json();
  };
  


const OrderService = {
    createReservation,
    getReservations,
};

export default OrderService;
