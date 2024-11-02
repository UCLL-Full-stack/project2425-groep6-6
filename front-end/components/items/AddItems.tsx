import Header from "@components/header"; 
import Head from "next/head";
import { useState } from "react";
import MenuService from "@services/menuService";
import { useRouter } from "next/router";
import { Item } from "@types";

type AddItemProps = {
    type: 'food' | 'drinks';
};

const AddItem: React.FC<AddItemProps> = ({ type }) => {
    const [newItem, setNewItem] = useState<Item>({
        id: undefined,
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
        <>
            <Head>
                <title>Add {type.charAt(0).toUpperCase() + type.slice(1)} Item</title>
                <meta name="description" content={`Add a new ${type} item to the menu`} />
            </Head>

            <Header />

            <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                <h1>Add New {type.charAt(0).toUpperCase() + type.slice(1)} Item</h1>
                <form onSubmit={handleAddItem} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label htmlFor="itemName">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="itemName"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        required
                        style={{ marginBottom: '1rem' }}
                    />
                    
                    <label htmlFor="itemPrice">
                        Price:
                    </label>
                    <input
                        type="number"
                        id="itemPrice"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                        required
                        style={{ marginBottom: '1rem' }}
                    />

                    <button type="submit" style={{ marginTop: '1rem' }}>Add Item</button>
                </form>
            </main>
        </>
    );
};

export default AddItem;
