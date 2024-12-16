import { create } from "zustand";

export const useCartsStore = create((set) => ({
    carts: [],
    setCarts: (carts) => set({ carts }),

    createWalkinOrder: async (newCart) => {
        // Check for required fields
        if (!newCart.name || !newCart.price || !newCart.customer_name || !newCart.delivery_date || !newCart.address || !newCart.contact_number) {
            return { success: false, message: "Please fill in all the fields." };
        }

        // Generate orderID
        const generateRandomOrderID = () => Math.random().toString(36).substr(2, 10).toUpperCase();
        const orderID = generateRandomOrderID();

        // Include orderID in the new cart object
        const cartWithOrderID = { ...newCart, orderID };

        try {
            const res = await fetch("http://localhost:5000/api/cart/walkin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cartWithOrderID),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("Error from server:", data.message || "Failed to create cart.");
                return { success: false, message: data.message || "Failed to create cart." };
            }

            set((state) => ({ carts: [...state.carts, data.data] }));
            return { success: true, message: "Cart successfully added" };
        } catch (error) {
            console.error("Error making the request:", error);
            return { success: false, message: "An error occurred while creating the cart." };
        }
    },

    fetchCarts: async () => {
        try {
            const res = await fetch("http://localhost:5000/api/cart/walkin");
            const data = await res.json();

            if (!res.ok) {
                console.error("Failed to fetch carts:", data.message || "Unknown error");
                return;
            }

            set({ carts: data.data });
        } catch (error) {
            console.error("Error fetching carts:", error);
        }
    },

    deleteCarts: async (pid) => {
        try {
            const res = await fetch(`http://localhost:5000/api/cart/walkin/${pid}`, { method: "DELETE" });
            const data = await res.json();

            if (!res.ok) {
                return { success: false, message: data.message || "Failed to delete cart." };
            }

            set((state) => ({ carts: state.carts.filter((product) => product._id !== pid) }));
            return { success: true, message: "Cart successfully deleted" };
        } catch (error) {
            console.error("Error deleting cart:", error);
            return { success: false, message: "An error occurred while deleting the cart." };
        }
    },

    updateCarts: async (pid, updatedCart) => {
        try {
            const res = await fetch(`http://localhost:5000/api/cart/walkin/${pid}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedCart),
            });

            const data = await res.json();

            if (!res.ok) {
                return { success: false, message: data.message || "Failed to update cart." };
            }

            set((state) => ({
                carts: state.carts.map((product) => (product._id === pid ? data.data : product)),
            }));
            return { success: true, message: "Cart successfully updated" };
        } catch (error) {
            console.error("Error updating cart:", error);
            return { success: false, message: "An error occurred while updating the cart." };
        }
    },
}));