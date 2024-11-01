import { User } from "../model/user";
import userDb from "../repository/user.db";
import { Role } from "../types";

const getUserById = (id: number): User | null => {
    try{
        const user = userDb.getUserById(id);
        if (user){
            return user;
        } 
        throw new Error
    } catch(error){
        throw new Error('User with id ' + id + ' does not exist.')
    }
}

const getAllUsers = (): User[] | null => {
    try{
        const users = userDb.getAllUsers();
        return users;
    } catch(error){
        throw new Error('There are no users found.')
    }
}

const getCustomers = (): User[] | null => {
    try{
        const customers = userDb.getCustomers();
        return customers;
    } catch(error){
        throw new Error('There are no customers found.')
    }
}

const getChefs = (): User[] | null => {
    try{
        const chefs = userDb.getChefs();
        return chefs;
    } catch(error){
        throw new Error('There are no chefs found.')
    }
}

const getBartenders = (): User[] | null => {
    try{
        const bartender = userDb.getBartenders();
        return bartender;
    } catch(error){
        throw new Error('There are no bartenders found.')
    }
}

const getAdmins = (): User[] | null => {
    try{
        const admins = userDb.getAdmins();
        return admins;
    } catch(error){
        throw new Error('There are no admins found.')
    }
}

const createUser = (username: string, firstname: string, lastname: string, password: string, role: string) => {
    try{
        if(role === 'admin' || role === 'customer' || role === 'chef' || role === 'bartender'){
            const user = new User({username, password, firstname, lastname, role})
            userDb.createUser(user);
        } 
        else {
            throw new Error('The role was not found.')
        }
        
    } catch(error){
        throw new Error('There are no admins found.')
    }
}


export default{createUser,
    getAdmins,
    getChefs,
    getCustomers,
    getBartenders, 
    getAllUsers,
    getUserById
}