import { Restaurant } from "../model/restaurant";
import { User } from "../model/user";
import { UserInput } from "../types";
import database from "./database";

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

// const getUserById = (id: number): User | null => {
//     try {
//         return users.find((user) => user.getId() === id) || null;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Database error. See server log for details.');
//     }
// }

const getUserById = async (id: number): Promise<User> => {
    const result = await database.user.findUnique({
        where: {
            id: id,
        },
    });

    if (!result) {
        throw new Error(`User with id ${id} not found`);
    }

    return User.from(result);
};
    

// const getChefs = () => {
//     try {
//         return users.filter((user) => user.getRole() === 'chef') || null;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Database error. See server log for details.');
//     }
// }


const getChefs = async (): Promise<User[]> => {
    const result = await database.user.findMany({
        where: {
            role: "chef",
        },
    });
    return result.map((result) => User.from(result));
};

// const getCustomers = () => {
//     try {
//         return users.filter((user) => user.getRole() === 'customer') || null;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Database error. See server log for details.');
//     }
// }

const getCustomers = async (): Promise<User[]> => {
    const result = await database.user.findMany({
        where: {
            role: "customer",
        },
    });
    return result.map((result) => User.from(result));
}

// const getAdmins = () => {
//     try {
//         return users.filter((user) => user.getRole() === 'admin') || null;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Database error. See server log for details.');
//     }
// }

const getAdmins = async (): Promise<User[]> => {
    const result = await database.user.findMany({
        where: {
            role: "admin",
        },
    });
    return result.map((result) => User.from(result));
}

// const getBartenders = () => {
//     try {
//         return users.filter((user) => user.getRole() === 'bartender') || null;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Database error. See server log for details.');
//     }
// }

const getBartenders = async (): Promise<User[]> => {
    const result = await database.user.findMany({
        where: {
            role: "bartender",
        },
    });
    return result.map((result) => User.from(result));
}

// const getAllUsers = () => {
//     try {
//         return users;
//     } catch(error){
//         throw new Error('Database error. See server log for details.')
//     }
// }

const getAllUsers = async (): Promise<User[]> => {
    const result = await database.user.findMany();
    return result.map((result) => User.from(result));
}



// const createUser = (user: User) => {
//     try {
//         users.push(user);
//     } catch(error){
//         throw new Error('Database error. See server log for details.')
//     }
// }

const createUser = async (user: UserInput): Promise<User | null> => {
    try {
        const existingUser = await database.user.findUnique({
            where: {
                username: user.username,
            },
        });

        if (existingUser) {
            return null;  
        }

        const result = await database.user.create({
            data: {
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                password: user.password, 
                role: user.role,
            },
        });

        return User.from(result);  
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Database error. Failed to create user. See server log for details.');
    }
};



// const userLogin = (username: string, password: string) => {
//     try {

//         const user = users.find(user => user.getUsername() === username);
//         if(user){
//             if(user.getPassword() === password){
//                 return user;
//             }
//         }     
//         throw new Error('Wrong Credentials');
//     } catch(error){
//         throw new Error('Wrong Credentials');
//     }
// }

const userLogin = async (username: string, password: string): Promise<User> => {
    try {
        const user = await database.user.findUnique({
            where: { username: username },
        });

        if (user && user.password === password) {
            return User.from(user); 
        }

        throw new Error('Wrong Credentials');
    } catch (error) {
        throw new Error('Wrong Credentials');
    }
};

export default {
    getAdmins,
    getAllUsers,
    getCustomers,
    getUserById,
    getBartenders,
    getChefs,
    createUser,
    userLogin
};