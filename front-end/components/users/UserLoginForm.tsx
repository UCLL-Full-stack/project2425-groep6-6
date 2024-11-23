import { StatusMessage } from "@types";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "/styles/userLoginForm.module.css";

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
    <div className={styles.container}>
      <h3 className={styles.header}>Login</h3>

      {statusMessages.length > 0 && (
        <div>
          {statusMessages.map(({ message, type }, index) => (
            <div
              key={index}
              className={`${styles.statusMessage} ${type === "error" ? styles.error : styles.success}`}
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
          <label htmlFor="passwordInput" className="block mb-2 text-sm font-medium">
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

        {nameError && (
          <p className={styles.errorText}>{nameError}</p>
        )}

        <button
          type="submit"
          className={styles.button}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default UserLoginForm;
