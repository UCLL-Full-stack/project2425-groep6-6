import { Item } from "@types";

const confirmOrder = async (order: { items: Array<{ item: Item; quantity: number }>; userId: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    });

    if (!response.ok) {
        throw new Error('Failed to confirm order');
    }

    return response.json(); 
};

const OrderService = {
    confirmOrder,
};

export default OrderService;
