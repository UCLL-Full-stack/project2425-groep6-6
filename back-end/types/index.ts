type Role = 'admin' | 'chef' | 'bartender' | 'customer';
export { Role };

type Category = 'drinks' | 'food';
export {Category};

type ItemDTO = {
    id?: number;
    name?: string;
    //rest toevoegen maar DTOS komen hier
}