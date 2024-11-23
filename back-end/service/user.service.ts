import { User } from "../model/user";
import userDb from "../repository/user.db";
import { LoginInput, Role, UserInput } from "../types";

const getUserById = (id: number): Promise<User> => {
    try{
        const user = userDb.getUserById(id);
        return user;
         
    } catch(error){
        throw new Error('User with id ' + id + ' does not exist.')
    }
}

const getAllUsers = async (): Promise<User[]> => {
    try{
        const users = userDb.getAllUsers();
        return users;
    } catch(error){
        throw new Error('There are no users found.')
    }
}

const getCustomers = (): Promise <User[]> | null => {
    try{
        const customers = userDb.getCustomers();
        return customers;
    } catch(error){
        throw new Error('There are no customers found.')
    }
}

const getChefs = (): Promise<User[]> | null => {
    try{
        const chefs = userDb.getChefs();
        return chefs;
    } catch(error){
        throw new Error('There are no chefs found.')
    }
}

const getBartenders = (): Promise <User[]> | null => {
    try{
        const bartender = userDb.getBartenders();
        return bartender;
    } catch(error){
        throw new Error('There are no bartenders found.')
    }
}

const getAdmins = (): Promise <User[]> | null => {
    try{
        const admins = userDb.getAdmins();
        return admins;
    } catch(error){
        throw new Error('There are no admins found.')
    }
}

const createUser = ({ username, firstname, lastname, password, role }: UserInput ) => {
    try{
        if(role === 'admin' || role === 'customer' || role === 'chef' || role === 'bartender'){
            
            userDb.createUser({ username, firstname, lastname, password, role });
        } 
        else {
            throw new Error('The role was not found.')
        }
        return null
    } catch(error){
        throw new Error('Creation of user failed')
    }
}

const userLogin = ({ username, password }: LoginInput): Promise<User> => {
    try{
        
        return userDb.userLogin(username, password);
        
    } catch(error){
        throw new Error('Wrong Credentials')
    }
}


export default{createUser,
    getAdmins,
    getChefs,
    getCustomers,
    getBartenders, 
    getAllUsers,
    getUserById,
    userLogin
}