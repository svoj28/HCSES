import Product from "../models/product.model.js";
import mongoose from "mongoose";

//Fetch
export const getProduct = async (req, res) =>{
    try {
        const products = await Product.find({});
        if (products.length === 0) {
            return res.status(204).json({ success: true, data: [] });
        }
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error in fetching products: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

//Create
export const createProduct = async (req, res) => {
    const { name, price, image, quantity, description } = req.body;

    if (!name || !price || !image || !quantity ) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newProduct = new Product({ 
        name, 
        price, 
        image, 
        quantity, 
        description });

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in Create product: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

//Update
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatedProductData = req.body;
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, updatedProductData, { new: true });
      
      if (!updatedProduct) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      
      res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
      console.error("Error updating product:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  
//Delete
export const deleteProduct = async (req, res) => {
    const {id} = req.params
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product Deleted"});
    } catch (error) {
        res.status(404).json({success: false, message: "Product not Found"})
    }
}