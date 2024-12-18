import { create } from "zustand";

export const usePromoStore = create((set) => ({
    promo: [],
    setPromo: (promo) => set({ promo }),
    createPromo: async (newPromo) => {
        // Validate if required fields are provided
        if (!newPromo.name || !newPromo.price || !newPromo.image) {
            return { success: false, message: "Please fill in all the fields." };
        }

        console.log("Sending promo data:", newPromo);

        // Send POST request to create a new promo
        const res = await fetch("/api/products/promo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPromo),
        });

        const data = await res.json();
        console.log("Response data:", data);

        if (!res.ok) {
            // If response is not successful, return the message from the server
            return { success: false, message: data.message || "Failed to add promo." };
        }

        // Add the new promo to the existing list of promos
        set((state) => ({ promo: [...state.promo, data.data] }));

        return { success: true, message: "Product successfully added" };
    },

    fetchPromo: async () => {
        const res = await fetch("/api/products/promo");
        const data = await res.json();
        set({ promo: data.data });
    },

    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({ promo: state.promo.filter((product) => product._id !== pid) }));
        return { success: true, message: data.message };
    },

    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };
        set((state) => ({
            promo: state.promo.map((product) => (product._id === pid ? data.data : product)),
        }));
        return { success: true, message: data.message };
    },

    createCustomItem: async (newCustomItem) => {
        if (!newCustomItem.name || !newCustomItem.price || !newCustomItem.image || !newCustomItem.description || !newCustomItem.quantity) {
            return { success: false, message: "Please fill in all the fields." };
        }
        const res = await fetch("/api/customitems", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCustomItem),
        });
        const data = await res.json();
        if (!res.ok) {
            return { success: false, message: data.message || "Failed to add custom item." };
        }
        return { success: true, message: "Custom item successfully added" };
    },
}));
