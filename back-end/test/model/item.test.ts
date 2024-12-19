import { Item } from "../../model/item";
import { Reservation } from "../../model/reservation";

const name = 'water';
const cat = 'drinks';
const price = 2
const amount = 2
const item = new Item({name: name, category: cat, price: price, reservations: [], amount:amount});

test( 'given: valid values for item, when: item is created, then: item  is created with those values', () => {
    expect(item.getName()).toEqual(name);
    expect(item.getCategory()).toEqual(cat);
    expect(item.getPrice()).toEqual(price);
    expect(item.getAmount()).toEqual(amount);


});
