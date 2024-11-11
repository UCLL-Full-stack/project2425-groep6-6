const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/users`;

const checkUsernameExists = async (username: string) => {
  const response = await fetch(`${API_URL}/check-username/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to check username');
  }

  return response.json();
};

const checkPassword = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/check-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error('Invalid username or password');
  }

  return response.json();
};

const getUserRole = async (username: string) => {
  const response = await fetch(`${API_URL}/role/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get user role');
  }

  return response.json();
};

const login = async (username: string, password: string) => {
  const userExists = await checkUsernameExists(username);

  if (!userExists.exists) {
    throw new Error('Username does not exist');
  }

  const passwordMatch = await checkPassword(username, password);

  if (!passwordMatch.valid) {
    throw new Error('Incorrect password');
  }

  const role = await getUserRole(username);

  return {
    username,
    role: role.role,
  };
};

const LoginService = {
  checkUsernameExists,
  checkPassword,
  getUserRole,
  login,
};

export default LoginService;
