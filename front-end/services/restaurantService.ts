const getAllRestaurants = async () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/restaurants", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
};

const getRestaurantById = async (id: string) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurants/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
};

const RestaurantService = {
  getAllRestaurants,
  getRestaurantById
};

export default RestaurantService;
