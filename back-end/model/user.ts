import { Role } from "../types";
import { Reservation } from "./reservation";
import { Restaurant } from "./restaurant";

export class User {
    private id?: number;
    private username: string;
    private password: string;
    private role: Role;
    private firstname: string;
    private lastname: string;
    private restaurants: Array<Restaurant>;
    private reservations: Array<Reservation>;

    constructor(User: { id?: number, username: string, password: string, firstname: string, lastname: string, role: Role}){
        this.id = User.id;
        this.username = User.username;
        this.password = User.password;
        this.firstname = User.firstname;
        this.lastname = User.lastname;
        this.role = User.role;
        this.restaurants = [];
        this.reservations = [];
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

}