
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
  role?: string;
};
