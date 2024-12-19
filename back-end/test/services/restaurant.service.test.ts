import restaurantDb from "../../repository/restaurant.db";
import restaurantService from "../../service/restaurant.service";

jest.mock('../../repository/restaurant.db', () => ({
    getRestaurantById: jest.fn(),
    getAllRestaurants: jest.fn(),
    createRestaurant: jest.fn(),
    deleteRestaurantById: jest.fn(),
}));

describe('Restaurant Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getRestaurantById', () => {
        it('should return a restaurant when foudn', async () => {
            const mockRestaurant = { id: 1, name: 'Mock Restaurant', address: 'Hoegaarden' };
            (restaurantDb.getRestaurantById as jest.Mock).mockResolvedValue(mockRestaurant);

            const result = await restaurantService.getRestaurantById(1);

            expect(result).toEqual(mockRestaurant);
            expect(restaurantDb.getRestaurantById).toHaveBeenCalledWith(1);
        });

    });

    describe('getAllRestaurants', () => {
        it('should return all restaurannts', async () => {
            const mockRestaurants = [
                { id: 1, name: 'Restaurant 1', address: 'Hoegaarden'  },
                { id: 2, name: 'Restaurant 2', address: 'Hoegaarden' },
            ];
            (restaurantDb.getAllRestaurants as jest.Mock).mockResolvedValue(mockRestaurants);

            const result = await restaurantService.getAllRestaurants();
            expect(result).toEqual(mockRestaurants);

            expect(restaurantDb.getAllRestaurants).toHaveBeenCalled();
        });
    });

    describe('createRestaurant', () => {
        it('should create a restaurant', async () => {
            const mockRestaurantInput = { name: 'New Restaurant', address: 'Hoegaarden' };
            const mockRestaurant = { id: 1, ...mockRestaurantInput };
            (restaurantDb.createRestaurant as jest.Mock).mockResolvedValue(mockRestaurant);
            const result = await restaurantService.createRestaurant(mockRestaurantInput);

            expect(result).toEqual(mockRestaurant);
            expect(restaurantDb.createRestaurant).toHaveBeenCalledWith(mockRestaurantInput);
        });

    });

    describe('deleteRestaurantById', () => {
        it('should delete a restaurant successfully', async () => {
            const mockRestaurant = { id: 1, name: 'Restaurant', address: 'Hoegaarden' };
            (restaurantDb.deleteRestaurantById as jest.Mock).mockResolvedValue(mockRestaurant);
            const result = await restaurantService.deleteRestaurantById(1);

            
            expect(result).toEqual(mockRestaurant);
            expect(restaurantDb.deleteRestaurantById).toHaveBeenCalledWith(1);
        });

    });
});