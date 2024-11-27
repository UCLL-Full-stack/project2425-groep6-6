import { StatusMessage } from "@types";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "/styles/userLoginForm.module.css";
import LoginService from "@services/loginService";

const UserLoginForm: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const clearErrors = () => {
    setNameError("");
  };

  const validate = async (): Promise<boolean> => {
    try {
      const response = await LoginService.login(name, password);

      sessionStorage.setItem("username", response.username);
      sessionStorage.setItem("role", response.role);

      return true;
    } catch (error: any) {
      setNameError(error.message || "An unknown error occurred.");
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();

    const isValid = await validate();

    if (!isValid) {
      return;
    }
    setStatusMessages([
      {
        message: "Login successful. Redirecting to homepage...",
        type: "success",
      },
    ]);

    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  const navigateToSignup = () => {
    router.push("/signup");
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Login</h3>

      {statusMessages.length > 0 && (
        <div>
          {statusMessages.map(({ message, type }, index) => (
            <div
              key={index}
              className={`${styles.statusMessage} ${
                type === "error" ? styles.error : styles.success
              }`}
            >
              {message}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
            Username:
          </label>
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={styles.inputField}
          />
        </div>

        <div>
          <label
            htmlFor="passwordInput"
            className="block mb-2 text-sm font-medium"
          >
            Password:
          </label>
          <input
            id="passwordInput"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={styles.inputField}
          />
        </div>

        {nameError && <p className={styles.errorText}>{nameError}</p>}

        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>

      <div className="mt-4 flex justify-center">
        <button
          onClick={navigateToSignup}
          className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 transition"
        >
          Don't have an account? Sign up
        </button>
      </div>
    </div>
  );
};

export default UserLoginForm;
