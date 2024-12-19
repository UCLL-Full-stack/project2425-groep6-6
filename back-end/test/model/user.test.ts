import { hoursToMilliseconds, set } from "date-fns";
import { Reservation } from "../../model/reservation";
import { Restaurant } from "../../model/restaurant";
import { User } from "../../model/user";
const userna = 'Gilles';
const pass = 'Password';
const first = 'Gilles';
const last = 'Muyshondt';
const rol = 'customer';
const user = new User({username: userna, password: pass, firstname: first, lastname: last, role: rol});
const restaurant = new Restaurant({name: 'restaurantname', address: 'restaurantaddress', users: []});
const date = set(new Date(), {hours:8, minutes: 59});
const reservation = new Reservation({date: date, user});

test( 'given: valid values for User, when: user is created, then: user  is created with those values', () => {
    expect(user.getFirstname()).toEqual(first);
    expect(user.getLastname()).toEqual(last);
    expect(user.getUsername()).toEqual(userna);
    expect(user.getPassword()).toEqual(pass);
    expect(user.getRole()).toEqual(rol);
    expect(user.getRestaurants()).toEqual([]);
    expect(user.getReservations()).toEqual([]);

});

test( 'given: an existing user, when: adding a restaurant to user, then: restaurant is registered for user', () => {
    user.addRestaurant(restaurant);
    expect(user.getRestaurants()).toEqual([restaurant]);
});

test( 'given: an existing user, when: adding a restaurant to user, then: restaurant is registered for user But the user will not be added if the restaurant is already a in of user', () => {
    user.addRestaurant(restaurant);
    user.addRestaurant(restaurant);
    expect(user.getRestaurants()).toEqual([restaurant]);
});

test( 'given: an existing user, when: adding a reservation to user, then: reservation is registered for user', () => {
    user.addReservations(reservation);
    expect(user.getReservations()).toEqual([reservation]);
});
test( 'given: an existing user, when: adding a reservation to user, then: reservation is registered for user But the user will not be added if the reservation is already a in of user', () => {
    user.addReservations(reservation);
    user.addReservations(reservation);
    expect(user.getReservations()).toEqual([reservation]);
});
