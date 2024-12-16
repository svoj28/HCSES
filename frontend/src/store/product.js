import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return {success:false, message:"Please fill in all the fields."}
        }
        const res = await fetch("/api/products", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newProduct)
        })
        const data = await res.json();
        set((state) => ({products:[...state.products, data.data]}))
        return {success:true, message:"Product successfully added"}
    },
    
    fetchProducts: async() => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({ products: data.data });
    },

    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) return { success: false, message: data.message };

        set(state => ({ products: state.products.filter(product => product._id !== pid) }));
        return { success: true, message: data.message }
    },

    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if(!data.success) return { success: false, message: data.message };
        set(state => ({
            products: state.products.map(product => (product._id === pid ? data.data : product)),
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
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCustomItem)
        });
        const data = await res.json();
        if (!res.ok) {
            return { success: false, message: data.message || "Failed to add custom item." };
        }
        return { success: true, message: "Custom item successfully added" };
    },
    
}))