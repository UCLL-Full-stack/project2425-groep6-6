import { useState } from "react";
import MenuService from "@services/menuService";
import { useRouter } from "next/router";
import { Item } from "@types";
import { useTranslation } from 'next-i18next';
import styles from "/styles/userLoginForm.module.css";

type AddItemProps = {
    type: 'food' | 'drinks';
};

const AddItem: React.FC<AddItemProps> = ({ type }) => {
    const [newItem, setNewItem] = useState<Item>({
        id: 0,  
        name: '',
        price: 0,
        category: type
    });
    
    const router = useRouter();
    const handleAddItem = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const addedItem = await MenuService.addItem(newItem, type);
            alert(`${type.charAt(0).toUpperCase() + type.slice(1)} item added successfully!`);
            router.push('/menu');
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Add New {type.charAt(0).toUpperCase() + type.slice(1)} Item</h1>
            <form onSubmit={handleAddItem} className={styles.form}>
                <div>
                    <label htmlFor="itemName" className="block mb-2 text-sm font-medium">
                        Name:
                    </label>
                    <input
                        id="itemName"
                        type="text"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        required
                        className={styles.inputField}
                    />
                </div>

                <div>
                    <label htmlFor="itemPrice" className="block mb-2 text-sm font-medium">
                        Price:
                    </label>
                    <input
                        id="itemPrice"
                        type="number"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                        required
                        className={styles.inputField}
                    />
                </div>

                <button type="submit" className={styles.button}>
                    Add Item
                </button>
            </form>
        </div>
    );
};

export default AddItem;
