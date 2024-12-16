import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import cartRoutes from './routes/cart.route.js';
import historyRoutes from './routes/transaction.route.js';
import customitemsRoutes from './routes/customizeditems.route.js';
import cartcustomitemsRoutes from './routes/cartCustom.route.js';
import userRoutes from './routes/user.route.js'; 
import adminRoutes from './routes/admin.route.js';
import adminAccApprRoutes from './routes/adminAccAppr.route.js';
import cors from 'cors';

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/transactionHistory", historyRoutes);
app.use("/api/customitems", customitemsRoutes);
app.use("/api/cartcustomitems", cartcustomitemsRoutes);
app.use("/api/users", userRoutes); 
app.use('/api/admin', adminRoutes);
app.use('/api/adminAppr', adminAccApprRoutes);

// Connect to DB
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
