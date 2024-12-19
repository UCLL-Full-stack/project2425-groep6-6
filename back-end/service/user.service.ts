import { User } from "../model/user";
import userDb from "../repository/user.db";
import { LoginInput, Role, UserInput } from "../types";
import bcrypt from 'bcrypt';
import * as jwtauth from '../util/jwt';

const getUserById = (id: number): Promise<User> => {
    try {
        const user = userDb.getUserById(id);
        return user;
    } catch (error) {
        throw new Error('User with id ' + id + ' does not exist.')
    }
}

const getAllUsers = async (role: string): Promise<User[]> => {
    try {
        if(role === "admin"){
            const users = userDb.getAllUsers();
            return users;
        }
        throw new Error("Access denied")
    } catch (error) {
        throw new Error('There are no users found.' + error)
    }
}

const getCustomers = (): Promise<User[]> | null => {
    try {
        const customers = userDb.getCustomers();
        return customers;
    } catch (error) {
        throw new Error('There are no customers found.')
    }
}

const getChefs = (): Promise<User[]> | null => {
    try {
        const chefs = userDb.getChefs();
        return chefs;
    } catch (error) {
        throw new Error('There are no chefs found.')
    }
}

const getBartenders = (): Promise<User[]> | null => {
    try {
        const bartender = userDb.getBartenders();
        return bartender;
    } catch (error) {
        throw new Error('There are no bartenders found.')
    }
}

const getAdmins = (): Promise<User[]> | null => {
    try {
        const admins = userDb.getAdmins();
        return admins;
    } catch (error) {
        throw new Error('There are no admins found.')
    }
}

const createUser = async ({ username, firstname, lastname, password, role }: UserInput): Promise<User> => {
    try {
        if (role === 'admin' || role === 'customer' || role === 'chef' || role === 'bartender') {
            const usernameCheck = await userDb.existingUser(username!);
            if (usernameCheck) {
                throw new Error("Username is already in use")
            } else {
                const hashedpassword = await bcrypt.hash(password!, 10);

                const createduser = userDb.createUser({ username, firstname, lastname, password: hashedpassword, role });
                return createduser;
            }
        } else {
            throw new Error('The role was not found.')
        }
    } catch (error) {
        throw new Error("Creation failed: " + error)
    }
}

interface LoginResponse {
    token: string;
    id: number;
    username: string;
    role: string;
}

const userLogin = async ({ username, password }: UserInput): Promise<LoginResponse | undefined> => {
    try {
        return await authenticate({ username, password });
    } catch (error) {
        throw new Error("Wrong Credentials: " + error);
    }
};

const authenticate = async (user: UserInput): Promise<LoginResponse> => {
    if (user.username && user.password) {
        const account = await userDb.getUserByUsername(user.username);
        if (!account) {
            throw new Error("User does not exist")
        }
        const password = account.getPassword();
        if (await bcrypt.compare(user.password, password)) {
            
            const token = jwtauth.generateSWTtoken(user.username, account.getRole());
            const id = account.getId() ?? 0;  
            return {
                token,
                id,  
                username: account.getUsername(),
                role: account.getRole()
            };
        } else {
            throw new Error("Password or username is incorrect.")
        }
    } else {
        throw new Error("Username and password are required.")
    }
};


export default {
    createUser,
    getAdmins,
    getChefs,
    getCustomers,
    getBartenders,
    getAllUsers,
    getUserById,
    userLogin
}
