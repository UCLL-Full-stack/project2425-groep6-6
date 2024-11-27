const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;


const login = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("User does not exist or credentials are incorrect");
    }
    if (response.status === 400) {
      throw new Error("Invalid input data");
    }
    throw new Error("Login failed");
  }

  const data = await response.json();
  return {
    username: data.username,
    role: data.role,
  };
};

const signup = async (userData: {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  role: string;
}) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("Invalid input data");
    }
    throw new Error("Failed to create user");
  }

  const data = await response.json();
  return data;
};

const LoginService = {
  login,signup,
};







export default LoginService;

