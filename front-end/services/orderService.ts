import { Reservation } from "@types";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/reservations`;
const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("token");
  }
  return null; 
};

const createReservation = async (reservation: { 
  date: string; 
  userId: number; 
  items: Array<{ id: number; amount: number }> 
}): Promise<any> => {
  const token = getToken();
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
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
  const token = getToken();
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
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
