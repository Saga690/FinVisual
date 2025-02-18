import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import transactionRoutes from "./routes/transactionRoutes.js";

const app = express();

dotenv.config();

connectDB();

app.use(cors({
    origin: "*", 
    credentials: true 
  }));
app.use(express.json());

app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));