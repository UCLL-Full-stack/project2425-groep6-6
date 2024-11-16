import { StatusMessage } from "@types";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";

const UserLoginForm: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const clearErrors = () => {
    setNameError("");
  };

  const validate = (): boolean => {
    if (!name || !password) {
      setNameError("Username and password are required.");
      return false;
    }

    if (
      (name === "barman" && password === "barman123") ||
      (name === "cook" && password === "cook123") ||
      (name === "user" && password === "user123")
    ) {
      return true;
    }

    setNameError("Invalid username or password.");
    return false;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();

    if (!validate()) {
      return;
    }

    // Map roles based on username
    const roles: { [key: string]: string } = {
      barman: "barman",
      cook: "cook",
      user: "user",
    };

    sessionStorage.setItem("username", name);
    sessionStorage.setItem("role", roles[name]);

    setStatusMessages([{
      message: "Login successful. Redirecting to homepage...",
      type: "success"
    }]);

    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <nav className="nav justify-content-center flex-grow-1">

      {/* Status message - display above the form */}
      {statusMessages.length > 0 && (
        <div className="flex justify-center mb-4">
          <ul className="list-none">
            {statusMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={classNames({
                  "text-red-800": type === "error",
                  "text-green-800": type === "success",
                })}
              >
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Login form */}
      <form onSubmit={handleSubmit} className="w-full max-w-xs mx-auto">
        <div className="mb-4">
          <label htmlFor="nameInput" className="block text-sm font-semibold">
            Username:
          </label>
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="passwordInput" className="block text-sm font-semibold">
            Password:
          </label>
          <input
            id="passwordInput"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        
        {nameError && <p className="text-red-800 mt-2">{nameError}</p>}

        <button type="submit" className="w-full py-2 mt-4 bg-blue-600 text-black rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </nav>
  );
};

export default UserLoginForm;
