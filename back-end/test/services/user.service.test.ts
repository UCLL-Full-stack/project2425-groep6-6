import userDb from "../../repository/user.db";
import userService from "../../service/user.service";
import bcrypt from 'bcrypt';
import * as jwtauth from '../../util/jwt';

jest.mock('../../repository/user.db', () => ({
    getUserById: jest.fn(),
    getAllUsers: jest.fn(),
    getCustomers: jest.fn(),
    getChefs: jest.fn(),
    getBartenders: jest.fn(),
    getAdmins: jest.fn(),
    createUser: jest.fn(),
    existingUser: jest.fn(),
    getUserByUsername: jest.fn(),
}));

jest.mock('bcrypt', () => ({
    hash: jest.fn(),
    compare: jest.fn(),
}));

jest.mock('../../util/jwt', () => ({
    generateSWTtoken: jest.fn(),
}));

describe('User Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getUserById', () => {
        it('should return a user when found', async () => {
            const mockUser = { id: 1, username: 'Gilles', role: 'admin' };
            (userDb.getUserById as jest.Mock).mockResolvedValue(mockUser);

            const result = await userService.getUserById(1);

            expect(result).toEqual(mockUser);
            expect(userDb.getUserById).toHaveBeenCalledWith(1);
        });

        
    });

    describe('createUser', () => {
        it('should create a user when username is unique', async () => {
            (userDb.existingUser as jest.Mock).mockResolvedValue(false);
            (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
            const mockUser = { id: 1, username: 'Gilles', firstname: 'Gilles', lastname: 'Muyshondt', role: 'admin' };
            (userDb.createUser as jest.Mock).mockResolvedValue(mockUser);

            const result = await userService.createUser({
                username: 'Gilles',
                firstname: 'Gilles',
                lastname: 'Muyshondt',
                password: 'password123',
                role: 'admin',
            });

            expect(result).toEqual(mockUser);
            expect(userDb.existingUser).toHaveBeenCalledWith('Gilles');
            expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
            expect(userDb.createUser).toHaveBeenCalledWith({
                username: 'Gilles',
                firstname: 'Gilles',
                lastname: 'Muyshondt',
                password: 'hashedPassword',
                role: 'admin',
            });
        });

        it('should throw an error when username already exists', async () => {
            (userDb.existingUser as jest.Mock).mockResolvedValue(true);

            await expect(
                userService.createUser({
                    username: 'Gilles',
                    firstname: 'Gilles',
                    lastname: 'Muyshondt',
                    password: 'password123',
                    role: 'admin',
                })
            ).rejects.toThrow('Username is already in use');
        });
    });


    //TODO: FAILS JWT token werkt niet.
    describe('userLogin', () => {
        it('should return a valid token for correct credentials', async () => {
            const mockAccount = {
                getId: jest.fn().mockReturnValue(1),
                getUsername: jest.fn().mockReturnValue('Gilles'),
                getPassword: jest.fn().mockReturnValue('hashedPassword'),
                getRole: jest.fn().mockReturnValue('admin'),
            };
            (userDb.getUserByUsername as jest.Mock).mockResolvedValue(mockAccount);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (jwtauth.generateSWTtoken as jest.Mock).mockReturnValue('token');

            const result = await userService.userLogin({ username: 'Gilles', password: 'password123' });

            expect(result).toEqual({
                token: 'token',
                id: 1,
                username: 'Gilles',
                role: 'admin',
            });
            expect(userDb.getUserByUsername).toHaveBeenCalledWith('Gilles');
            expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
            expect(jwtauth.generateSWTtoken).toHaveBeenCalledWith('Gilles', 'admin');
        });

        it('should throw an error for incorrect password', async () => {
            const mockAccount = {
                getPassword: jest.fn().mockReturnValue('hashedPassword'),
            };

            (userDb.getUserByUsername as jest.Mock).mockResolvedValue(mockAccount);
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            await expect(
                userService.userLogin({ username: 'Gilles', password: 'wrongPassword' })
            ).rejects.toThrow('Password or username is incorrect.');
        });

        
    });
});

