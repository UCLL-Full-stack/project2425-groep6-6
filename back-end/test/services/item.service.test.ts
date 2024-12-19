import itemDb from "../../repository/item.db";
import itemService from "../../service/item.service";

jest.mock('../../repository/item.db', () => ({
    getItemById: jest.fn(),
    
    getAllItems: jest.fn(),
    getFood: jest.fn(),
    getDrinks: jest.fn(),
    createItem: jest.fn(),
    deleteItemById: jest.fn(),
    updateItem: jest.fn(),
    
}));

describe('getItemById', () => {
    const mockedGetItemById = itemDb.getItemById as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    it('should return the item when it exists', async () => {
        const mockItem = { id: 1, name: 'Mock Item', price: 10.0 };
        mockedGetItemById.mockResolvedValue(mockItem);
        const result = await itemService.getItemById(1);

        expect(result).toEqual(mockItem);
        expect(mockedGetItemById).toHaveBeenCalledWith(1);
    });
});

describe('getAllItems', () => {

    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    it('should return all items', async () => {
        const mockItems = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
        (itemDb.getAllItems as jest.Mock).mockResolvedValue(mockItems);

        const result = await itemService.getAllItems();

        expect(result).toEqual(mockItems);
        expect(itemDb.getAllItems).toHaveBeenCalled();
    });

    
});


describe('getFood', () => {

    beforeEach(() => {
        jest.clearAllMocks(); 
    });
    it('should return food items', async () => {
        const mockFood = [{ id: 1, name: 'Pizza', category: 'food' }];
        (itemDb.getFood as jest.Mock).mockResolvedValue(mockFood);

        const result = await itemService.getFood();

        expect(result).toEqual(mockFood);
        expect(itemDb.getFood).toHaveBeenCalled();
    });

    
});

describe('getDrinks', () => {

    beforeEach(() => {
        jest.clearAllMocks(); 
    });
    it('should return drink items', async () => {
        const mockDrinks = [{ id: 1, name: 'Cola', category: 'drinks' }];
        (itemDb.getDrinks as jest.Mock).mockResolvedValue(mockDrinks);

        const result = await itemService.getDrinks();

        expect(result).toEqual(mockDrinks);
        expect(itemDb.getDrinks).toHaveBeenCalled();
    });

    
});

describe('createItem', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    });
    it('should create an item ', async () => {
        const mockItem = { id: 1, name: 'New Item', category: 'food', price: 10.0 };
        (itemDb.createItem as jest.Mock).mockResolvedValue(mockItem);
        const result = await itemService.createItem({ category: 'food', name: 'New Item', price: 10.0 }, 'admin');
        expect(result).toEqual(mockItem);

        expect(itemDb.createItem).toHaveBeenCalledWith({ category: 'food', name: 'New Item', price: 10.0 });
    });

    

    
});

describe('deleteItemById', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    });
    it('should delete an item ', async () => {
        const mockItem = { id: 1, name: 'Deleted Item' };

        (itemDb.deleteItemById as jest.Mock).mockResolvedValue(mockItem);
        const result = await itemService.deleteItemById(1, 'admin');

        expect(result).toEqual(mockItem);
        expect(itemDb.deleteItemById).toHaveBeenCalledWith(1);
    });

    
});

describe('updateItem', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    });
    it('should update an item ', async () => {
        const mockItem = { id: 1, name: 'Updated Item', category: 'food', price: 20.0 };

        (itemDb.updateItem as jest.Mock).mockResolvedValue(mockItem);

        const result = await itemService.updateItem({ id: 1, category: 'food', name: 'Updated Item', price: 20.0 }, 'admin');

        expect(result).toEqual(mockItem);
        expect(itemDb.updateItem).toHaveBeenCalledWith({ id: 1, category: 'food', name: 'Updated Item', price: 20.0 });
    });

    
});


