// SignupForm.tsx
import React, { useState } from "react";
import LoginService from "@services/loginService";
import styles from "/styles/userLoginForm.module.css"; 

interface SignupFormProps {
  role: 'admin' | 'chef' | 'bartender' | 'customer';
}

const SignupForm: React.FC<SignupFormProps> = ({ role }) => {
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    role: role,  // Stel de role in die we doorgeven
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
      setStatusMessage(result);
      setIsSuccess(true);
    } catch (error: any) {
      setStatusMessage(error.message);
      setIsSuccess(false);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Sign Up as {role}</h3>
      {statusMessage && (
        <p className={`${styles.statusMessage} ${isSuccess ? styles.success : styles.error}`}>
          {statusMessage}
        </p>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="username" className="block mb-2 text-sm font-medium">
            Username
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
            First Name
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
            Last Name
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
            Password
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
