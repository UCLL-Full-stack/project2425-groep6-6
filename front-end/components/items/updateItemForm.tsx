import React, { useState } from 'react';
import { Item } from '@types';
import MenuService from '@services/menuService';
import styles from '/styles/userLoginForm.module.css'; 

type UpdateItemFormProps = {
  item: Item;
  onUpdate: (updatedItem: Item) => void;
};

const UpdateItemForm: React.FC<UpdateItemFormProps> = ({ item, onUpdate }) => {
  const [name, setName] = useState<string>(item.name);
  const [price, setPrice] = useState<number>(item.price);
  const [category, setCategory] = useState<string>(item.category);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedItem = { ...item, name, price, category };

    try {
      const response = await MenuService.updateItem(item.id.toString(), updatedItem);

      if (response) {
        onUpdate(updatedItem);
        alert('Item updated successfully!');
      }
    } catch (error: any) {
      setError('Failed to update item');
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Update Item</h3>

      {error && <p className={styles.errorText}>{error}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
            Name
          </label>
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.inputField}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="priceInput" className="block mb-2 text-sm font-medium">
            Price
          </label>
          <input
            id="priceInput"
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className={styles.inputField}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="categoryInput" className="block mb-2 text-sm font-medium">
            Category
          </label>
          <select
            id="categoryInput"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.inputField}
            required
          >
            <option value="food">Food</option>
            <option value="drinks">Drinks</option>
          </select>
        </div>

        <button type="submit" className={styles.button}>
          Update Item
        </button>
      </form>
    </div>
  );
};

export default UpdateItemForm;
