import { PrismaClient, Category } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.reservationItem.deleteMany();
    await prisma.reservation.deleteMany();
    await prisma.item.deleteMany();
    await prisma.restaurant.deleteMany();
    await prisma.user.deleteMany();

    const restaurant1 = await prisma.restaurant.create({
        data: {
            name: 'Gourmet Delight',
            address: '123 Culinary Street',
        },
    });

    const restaurant2 = await prisma.restaurant.create({
        data: {
            name: 'Bistro Bliss',
            address: '456 Tasty Avenue',
        },
    });

    const admin = await prisma.user.create({
        data: {
            username: 'admin',
            password: await bcrypt.hash('admin123', 12),
            role: 'admin',
            firstname: 'Admin',
            lastname: 'User',
        },
    });

    const customer1 = await prisma.user.create({
        data: {
            username: 'jolan',
            password: await bcrypt.hash('jolan123', 12),
            role: 'customer',
            firstname: 'Jolan',
            lastname: 'Serruys',
        },
    });

    const customer2 = await prisma.user.create({
        data: {
            username: 'gilles',
            password: await bcrypt.hash('gilles123', 12),
            role: 'customer',
            firstname: 'Gilles',
            lastname: 'Muyshondt',
        },
    });

    const chef = await prisma.user.create({
        data: {
            username: 'chef',
            password: await bcrypt.hash('chef123', 12),
            role: 'chef',
            firstname: 'chef',
            lastname: 'chef',
        },
    });

    const bartender = await prisma.user.create({
        data: {
            username: 'bartender',
            password: await bcrypt.hash('bartender123', 12),
            role: 'bartender',
            firstname: 'bartender',
            lastname: 'bartender',
        },
    });


    const foodItems = [
        { name: 'Spaghetti Carbonara', category: Category.food, price: 15.99 },
        { name: 'Margherita Pizza', category: Category.food, price: 12.99 },
        { name: 'Caesar Salad', category: Category.food, price: 9.99 },
        { name: 'Beef Burger', category: Category.food, price: 14.99 },
        { name: 'Grilled Salmon', category: Category.food, price: 19.99 },
        { name: 'Chicken Alfredo', category: Category.food, price: 16.99 },
        { name: 'Vegetable Stir-fry', category: Category.food, price: 13.99 },
        { name: 'Tomato Soup', category: Category.food, price: 6.99 },
        { name: 'Ribeye Steak', category: Category.food, price: 24.99 },
        { name: 'Tuna Sandwich', category: Category.food, price: 8.99 },
    ];

    const drinkItems = [
        { name: 'Classic Mojito', category: Category.drinks, price: 7.99 },
        { name: 'Espresso Martini', category: Category.drinks, price: 8.99 },
        { name: 'Pina Colada', category: Category.drinks, price: 9.99 },
        { name: 'Lemonade', category: Category.drinks, price: 4.99 },
        { name: 'Iced Tea', category: Category.drinks, price: 3.99 },
        { name: 'Fanta', category: Category.drinks, price: 2.00},
        { name: 'Margarita', category: Category.drinks, price: 9.99 },
        { name: 'Cappuccino', category: Category.drinks, price: 4.49 },
        { name: 'Green Tea', category: Category.drinks, price: 2.99 },
        { name: 'Sparkling Water', category: Category.drinks, price: 1.99 },
    ];

    const foodItemsCreated = await Promise.all(
        foodItems.map((food) => prisma.item.create({ data: food }))
    );
    const drinkItemsCreated = await Promise.all(
        drinkItems.map((drink) => prisma.item.create({ data: drink }))
    );

    const reservation1 = await prisma.reservation.create({
        data: {
            date: new Date(),
            user: { connect: { id: customer1.id } },
        },
    });

    const reservation2 = await prisma.reservation.create({
        data: {
            date: new Date(),
            user: { connect: { id: customer2.id } },
        },
    });
    const reservation3 = await prisma.reservation.create({
        data: {
            date: new Date(),
            user: { connect: { id: chef.id } },
        },
    });
    
    const reservation4 = await prisma.reservation.create({
        data: {
            date: new Date(),
            user: { connect: { id: bartender.id } },
        },
    });
    
    const reservation5 = await prisma.reservation.create({
        data: {
            date: new Date(),
            user: { connect: { id: customer1.id } }, 
        },
    });

     await prisma.reservationItem.createMany({
        data: [
            { reservationId: reservation1.id, itemId: foodItemsCreated[0].id, amount: 2 },
            { reservationId: reservation1.id, itemId: drinkItemsCreated[0].id, amount: 3 },
            { reservationId: reservation2.id, itemId: foodItemsCreated[1].id, amount: 1 },
            { reservationId: reservation2.id, itemId: drinkItemsCreated[1].id, amount: 2 },
            { reservationId: reservation3.id, itemId: foodItemsCreated[2].id, amount: 2 },
            { reservationId: reservation3.id, itemId: drinkItemsCreated[9].id, amount: 1 },
            { reservationId: reservation4.id, itemId: foodItemsCreated[3].id, amount: 1 },
            { reservationId: reservation4.id, itemId: drinkItemsCreated[5].id, amount: 4 },
            { reservationId: reservation5.id, itemId: foodItemsCreated[4].id, amount: 1 },
            { reservationId: reservation5.id, itemId: drinkItemsCreated[6].id, amount: 2 },
        ],
    });
};


(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
