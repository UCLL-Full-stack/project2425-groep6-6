import { Item } from "../../model/item";

const name = 'water';
const cat = 'drinks';
const price = 2
const item = new Item({name: name, category: cat, price: price});

test( 'given: valid values for item, when: item is created, then: item  is created with those values', () => {
    expect(item.getName()).toEqual(name);
    expect(item.getCategory()).toEqual(cat);
    expect(item.getPrice()).toEqual(price);

});
