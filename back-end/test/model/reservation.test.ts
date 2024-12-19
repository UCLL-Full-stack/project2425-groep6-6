import { hoursToMilliseconds, set } from "date-fns";
import { Reservation } from "../../model/reservation";
import { Restaurant } from "../../model/restaurant";
import { User } from "../../model/user";
import { Item } from "../../model/item";
const userna = 'Gilles';
const pass = 'Password';
const first = 'Gilles';
const last = 'Muyshondt';
const rol = 'customer';
const user = new User({username: userna, password: pass, firstname: first, lastname: last, role: rol});
const date = set(new Date(), {hours:8, minutes: 59});
const reservation = new Reservation({date: date, user});
const item1 = new Item({name: 'spaghetti', category: 'food', price: 14, reservations: [], amount: 1});
const item2 = new Item({name: 'water', category: 'drinks', price: 2, reservations: [], amount: 1});

test( 'given: valid values for Reservation, when: reservation is created, then: Reservation  is created with those values', () => {
    expect(reservation.getDate()).toEqual(date);
    expect(reservation.getUser()).toEqual(user);
    

});

test( 'given: an existing reservation, when: adding an item to reservation, then: item is registered for reservation', () => {
    reservation.addItem(item1);
    reservation.addItem(item2);
    expect(reservation.getItems()).toEqual([item1, item2]);

});
