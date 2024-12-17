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

const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("token");
  }
  return null; 
};

const token = getToken();
const deleteRestaurant = async (id: String) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurants/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete restaurant');
  }

  return await response.json();
};

const addRestaurant = async (name: string, address: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
    body: JSON.stringify({ name, address }),
  });

  if (!response.ok) {
    throw new Error("Failed to add restaurant");
  }

  return await response.json();
};


const RestaurantService = {
  getAllRestaurants,
  getRestaurantById,
  deleteRestaurant,
  addRestaurant
};

export default RestaurantService;
