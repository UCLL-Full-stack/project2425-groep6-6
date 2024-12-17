import React, { useState } from "react";
import { useRouter } from "next/router";
import RestaurantService from "@services/restaurantService";
import styles from "/styles/userLoginForm.module.css";

interface AddRestaurantProps {
  onRestaurantAdded: () => void;
}

const AddRestaurant: React.FC<AddRestaurantProps> = ({ onRestaurantAdded }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await RestaurantService.addRestaurant(name, address);

      setSuccess("Restaurant added successfully!");
      setName("");
      setAddress("");

      setTimeout(() => {
        router.push("/restaurants");
      }, 2000);

      onRestaurantAdded();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Add a New Restaurant</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="form-group">
        <label>Restaurant Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Restaurant Address</label>
        <input
          type="text"
          className="form-control"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Add Restaurant
      </button>
    </form>
  );
};

export default AddRestaurant;
