import { Restaurant } from "../../model/restaurant";
import { User } from "../../model/user";

const restaurantname = 'GiJo';
const restaurantaddress = 'Tiensestraat 25, Leuven'
const restaurant = new Restaurant({name: restaurantname, address: restaurantaddress, users: []});
const user = new User({username: 'Gilles', password: 'Password', firstname: 'Gilles', lastname: 'Muyshondt', role: 'customer'})
test( 'given: valid values for restaurant, when: restaurant is created, then: restaurant is created with those values', () => {
    expect(restaurant.getAddress()).toEqual(restaurantaddress);
    expect(restaurant.getName()).toEqual(restaurantname);
    expect(restaurant.getUsers()).toEqual([]);
});

test( 'given: an existing restaurant, when: adding a user to restaurant, then: user is registered for restaurant', () => {
    restaurant.addUser(user);
    expect(restaurant.getAddress()).toEqual(restaurantaddress);
    expect(restaurant.getName()).toEqual(restaurantname);
    expect(restaurant.getUsers()).toEqual([user]);
});

test ('given: an existing restaurant, when: adding a user to restaurant, then: user is registered for restaurant But the user will not be added if the user is already a member of the restaurant', () => {
    restaurant.addUser(user);
    restaurant.addUser(user);
    expect(restaurant.getAddress()).toEqual(restaurantaddress);
    expect(restaurant.getName()).toEqual(restaurantname);
    expect(restaurant.getUsers()).toEqual([user]);

});

