const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/users`;

const getUserByUsername = async (username: string) => {
  const response = await fetch(`${API_URL}/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  return response.json(); 
};

const login = async (username: string, password: string) => {
  const user = await getUserByUsername(username);

  if (!user) {
    throw new Error('Username does not exist');
  }

  if (user.password !== password) {
    throw new Error('Incorrect password');
  }

  return {
    username: user.username,
    role: user.role,
  };
};

const LoginService = {
  getUserByUsername,
  login,
};

export default LoginService;
