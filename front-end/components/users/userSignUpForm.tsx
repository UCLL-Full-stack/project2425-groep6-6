import React, { useState } from "react";
import { useTranslation } from "next-i18next"; 
import LoginService from "@services/loginService";
import styles from "/styles/userLoginForm.module.css";

interface SignupFormProps {
  role: 'admin' | 'chef' | 'bartender' | 'customer';
}

const SignupForm: React.FC<SignupFormProps> = ({ role }) => {
  const { t } = useTranslation(); 
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    role: role,
  });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(null);

    try {
      const result = await LoginService.signup(formData);

      setStatusMessage(t("signup.userCreatedSuccess"));
      setIsSuccess(true);
    } catch (error: any) {
      if (error.message === "User already exists") {
        setStatusMessage(t("signup.usernameExists"));
      } else {
        setStatusMessage(error.message);
      }
      setIsSuccess(false);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>{t("signup.header", { role })}</h3> 

      {statusMessage && (
        <p className={`${styles.statusMessage} ${isSuccess ? styles.success : styles.error}`}>
          {statusMessage}
        </p>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="username" className="block mb-2 text-sm font-medium">
            {t("signup.username")}
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
        </div>

        <div>
          <label htmlFor="firstname" className="block mb-2 text-sm font-medium">
            {t("signup.firstname")} 
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
        </div>

        <div>
          <label htmlFor="lastname" className="block mb-2 text-sm font-medium">
            {t("signup.lastname")} 
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            {t("signup.password")} 
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
        </div>

        <button type="submit" className={styles.button}>
          {t("signup.signupButton")} 
        </button>
      </form>
    </div>
  );
};

export default SignupForm;