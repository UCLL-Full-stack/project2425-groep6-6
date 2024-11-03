import { Restaurant } from "../model/restaurant";
import { User } from "../model/user";

const users = [
    new User({
        id: 1,
        username: 'GillesMuyshondt',
        firstname: 'Gilles',
        lastname: 'Muyshondt',
        role: 'customer',
        password: 'Password'
    }),
    new User({
        id: 2,
        username: 'Jolan',
        firstname: 'Jolan',
        lastname: 'Serruys',
        role: 'customer',
        password: 'Password'
    }),
    new User({
        id: 2,
        username: 'Remy',
        firstname: 'Remy',
        lastname: 'Muyshondt',
        role: 'chef',
        password: 'Password'
    }),
    new User({
        id: 2,
        username: 'Nathan',
        firstname: 'Nathan',
        lastname: 'Muyshondt',
        role: 'bartender',
        password: 'Password'
    }),
    new User({
        id: 2,
        username: 'Fleur',
        firstname: 'Fleur',
        lastname: 'Muyshondt',
        role: 'admin',
        password: 'Password'
    })
];

const getUserById = (id: number): User | null => {
    try {
        return users.find((user) => user.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getChefs = () => {
    try {
        return users.filter((user) => user.getRole() === 'chef') || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getCustomers = () => {
    try {
        return users.filter((user) => user.getRole() === 'customer') || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAdmins = () => {
    try {
        return users.filter((user) => user.getRole() === 'admin') || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getBartenders = () => {
    try {
        return users.filter((user) => user.getRole() === 'bartender') || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllUsers = () => {
    try {
        return users;
    } catch(error){
        throw new Error('Database error. See server log for details.')
    }
}

const createUser = (user: User) => {
    try {
        users.push(user);
    } catch(error){
        throw new Error('Database error. See server log for details.')
    }
}

export default {
    getAdmins,
    getAllUsers,
    getCustomers,
    getUserById,
    getBartenders,
    getChefs,
    createUser
};