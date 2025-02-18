import { Schema, model } from "mongoose";

const transactionSchema = new Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
});

const Transaction = model("Transaction", transactionSchema);
export default Transaction;