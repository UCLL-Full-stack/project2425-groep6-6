import { Prisma } from "@prisma/client";
import { Role } from "../types";
import { Reservation } from "./reservation";
import { Restaurant } from "./restaurant";
import{
    
    User as UserPrisma
} from '@prisma/client'
import { error } from "console";

export class User {
    private id?: number;
    private username: string;
    private password: string;
    private role: Role;
    private firstname: string;
    private lastname: string;
    private restaurants: Array<Restaurant>;
    private reservations: Array<Reservation>;

    constructor(User: { id?: number, username: string, password: string, firstname: string, lastname: string, role: Role, restaurants?: Restaurant[], reservations?: Reservation[]}){

        this.validate(User.username, User.password, User.firstname, User.lastname, User.role, User.id)

        this.id = User.id;
        this.username = User.username;
        this.password = User.password;
        this.firstname = User.firstname;
        this.lastname = User.lastname;
        this.role = User.role;
        this.restaurants = [];
        this.reservations = [];
        if(User.reservations){
            this.reservations = User.reservations
        }
        if(User.restaurants){
            this.restaurants = User.restaurants;
        }
        
        
    }


    private validate(
        username: string,
        password: string,
        firstname: string,
        lastname: string,
        role: string,
        id?: number
    ): boolean {
        if (id !== undefined && (!Number.isInteger(id) || id <= 0)) {
            throw new Error("ID, if provided, must be a positive integer.");
        }

        if (typeof username !== 'string' || username.trim().length === 0) {
            throw new Error("Username must be a non-empty string.");
        }

        if (typeof password !== 'string' || password.trim().length === 0) {
            throw new Error("Password must be a non-empty string.");
        }

        if (typeof firstname !== 'string' || firstname.trim().length === 0) {
            throw new Error("Firstname must be a non-empty string.");
        }

        if (typeof lastname !== 'string' || lastname.trim().length === 0) {
            throw new Error("Lastname must be a non-empty string.");
        }

        if (role !== 'admin' && role !== 'chef' && role !== 'bartender' && role !== 'customer') {
            throw new Error("Role must be a valid Role instance.");
        }

        return true; 
    }


    getId() {
        return this.id;
    }
    getUsername(): string{
        return this.username;
    }
    getFirstname(): string{
        return this.firstname;
    }
    getLastname(): string{
        return this.lastname;
    }
    getRole(): string{
        return this.role;
    }
    getPassword(): string{
        return this.password;
        //HASH
    }
    getRestaurants(): Array<Restaurant>{
        return this.restaurants;
    }
    getReservations(): Array<Reservation>{
        return this.reservations;
    }
    addRestaurant(restaurant: Restaurant){
        if(!this.restaurants.includes(restaurant)){
            this.restaurants.push(restaurant);
        }
    }
    addReservations(reservation: Reservation){
        if(!this.reservations.includes(reservation)){
            this.reservations.push(reservation);
        }
    }


    static from({
        id,
        username,
        password,
        role,
        firstname,
        lastname,
        //restaurants,
        //reservations,
    }: UserPrisma /*& { restaurants: RestaurantPrisma[]; reservations: ReservationPrisma[] }*/) {
       
        return new User({
            id,
            username,
            password,
            role: role,
            //role,
            firstname,
            lastname,
            //restaurants: restaurants.map((restaurant: Restaurant) => Restaurant.from(restaurant)),
            //reservations: reservations.map((reservation: Reservation) => Reservation.from(reservation)),
        });
    
    }
    
}