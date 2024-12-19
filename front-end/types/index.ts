
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
  role?: 'admin' | 'chef' | 'bartender' | 'customer'; 
};

export type Item = {
  id: number; 
  name: string;
  price: number;
  category: string; // "food" or "drinks"
};

export type StatusMessage = {
  message: string;
  type: "error" | "success";
};

export type Reservation = {
  id: number;
  date: string; 
  user: User; 
  items: Array<{
    id: number;        
    amount: number;    
    category: string;  
    name: string;      
    quantity: number;  
  }>;
};




