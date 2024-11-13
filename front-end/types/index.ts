
export type Restaurant = {
  id: number;
  user: User;
  expertise: string;
  name: string;
  address: string;
};

export type User = {
  firstName?: string;
  lastName?: string;
  fullname?: string;
  email?: string;
  username?: string;
  password?: string;
  role?: 'admin' | 'cook' | 'bartender' | 'user'; 
};

export type Item = {
  id?: number; 
  name: string;
  price: number;
  category: string; // "Food" or "Drinks"
};