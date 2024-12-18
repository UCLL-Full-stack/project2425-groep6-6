import { StatusMessage } from "@types";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "/styles/userLoginForm.module.css";
import LoginService from "@services/loginService";
import { useTranslation } from "next-i18next"; 

const UserLoginForm: React.FC = () => {
  const { t } = useTranslation(); 
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const clearErrors = () => {
    setNameError("");
    setPasswordError("");
  };

  const validate = async (): Promise<boolean> => {
    clearErrors();

    if (!name.trim()) {
      setNameError(t("login.usernameRequired"));
      return false;
    }
    if (!password.trim()) {
      setPasswordError(t("login.passwordRequired"));
      return false;
    }
    if (password.length < 6) {
      setPasswordError(t("login.passwordStrength"));
      return false;
    }

    try {
      const response = await LoginService.login(name, password);
      console.log(response);  

      sessionStorage.setItem("username", response.username);
      sessionStorage.setItem("role", response.role);
      sessionStorage.setItem("token", response.token);

      if (response.id) {
        sessionStorage.setItem('userId', response.id.toString()); 
      } else {
        console.error("id not found in the response");
      }
      return true;
    } catch (error: any) {
      if (error.response?.status === 401) {
        setNameError(t("login.invalidCredentials")); 
      } else {
        setNameError(t("login.loginError"));
      }
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = await validate();

    if (!isValid) {
      return;
    }

    setStatusMessages([
      {
        message: t("login.loginSuccess"), 
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
      <h3 className={styles.header}>{t("login.title")}</h3> 

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
            {t("login.username")} 
          </label>
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={styles.inputField}
          />
          {nameError && <p className={styles.errorText}>{nameError}</p>}
        </div>

        <div>
          <label htmlFor="passwordInput" className="block mb-2 text-sm font-medium">
            {t("login.password")} 
          </label>
          <input
            id="passwordInput"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={styles.inputField}
          />
          {passwordError && <p className={styles.errorText}>{passwordError}</p>}
        </div>

        <button type="submit" className={styles.button}>
          {t("login.loginButton")} 
        </button>
      </form>

      <div className="mt-4 flex justify-center">
        <button
          onClick={navigateToSignup}
          className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 transition"
        >
          {t("login.signupButton")}
        </button>
      </div>
    </div>
  );
};

export default UserLoginForm;
