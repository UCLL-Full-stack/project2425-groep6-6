export type Course = {
  id: number;
  name: string;
  description: string;
  phase: number;
  credits: number;
};

export type Restaurant = {
  id: number;
  user: User;
  expertise: string;
  courses: Course[];
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
