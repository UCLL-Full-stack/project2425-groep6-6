import React, { useState } from "react";
import { useTranslation } from "next-i18next"; 
import LoginService from "@services/loginService";
import styles from "/styles/userLoginForm.module.css";
import { useRouter } from "next/router";

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = (): boolean => {
    let valid = true;
    let newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) {
      valid = false;
      newErrors.username = "username is Required";
    }
    if (!formData.firstname.trim()) {
      valid = false;
      newErrors.firstname = "Firstname is Required";
    }
    if (!formData.lastname.trim()) {
      valid = false;
      newErrors.lastname = "Lastname is Required";
    }
    if (!formData.password.trim()) {
      valid = false;
      newErrors.password = "password is Required";
    } else if (formData.password.length < 6) {
      valid = false;
      newErrors.password = "password needs to be at least 6 characters";
    }

    setErrors(newErrors);
    return valid;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(null);
    setIsSuccess(null);
  
    if (!validate()) {
      return;
    }
  
    try {
      const result = await LoginService.signup(formData);
      setStatusMessage(t("signup.userCreatedSuccess"));
      setIsSuccess(true);
  
      if (formData.role === 'admin'||formData.role === 'chef'||formData.role === 'bartender') {
         router.push('/admin');

      } 
      else {
        router.push('/login'); 
      }
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
          {errors.username && <p className={styles.errorText}>{errors.username}</p>}
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
          {errors.firstname && <p className={styles.errorText}>{errors.firstname}</p>}
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
          {errors.lastname && <p className={styles.errorText}>{errors.lastname}</p>}
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
          {errors.password && <p className={styles.errorText}>{errors.password}</p>}
        </div>

        <button type="submit" className={styles.button}>
          {t("signup.signupButton")} 
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
