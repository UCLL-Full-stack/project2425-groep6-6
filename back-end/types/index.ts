import { Item } from "../model/item";
import { User } from "../model/user";

type Role = 'admin' | 'chef' | 'bartender' | 'customer';
export { Role, Category, RestaurantDTO, ReservationDTO, ReservationInput, ItemInput, LoginInput, UserInput};

type Category = 'drinks' | 'food';

type ItemDTO = {
    id?: number;
    name?: string;
    //rest toevoegen maar DTOS komen hier
}

type RestaurantDTO = {
    id?: number;
    name?: string;
    address?: string; 
    users?: Array<User>;
}

type ReservationDTO = {
    id?: number;
    date: Date;
    user: User;      
    items: Array<Item>;    
};


type ReservationInput = {
    id?: number;
    date: string;
    userId: number;      
    items: Array<Item>;    
};

type ItemInput = {
    id?: number;
    name: string;
    category: Category;
    price: number;
}

type UserInput = {
    id?: number;
    firstname: string;
    lastname: string;
    role: Role;
    password: string;
    username: string;

}

type LoginInput = {
    
    username: string;
   password: string;
}