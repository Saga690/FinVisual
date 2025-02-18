import Transaction from "../models/Transaction.js";

export const getTransactions = async (req, res) => {

    try {

        const transactions = await Transaction.find().sort({ date: -1 });
        res.json(transactions);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

export const addTransaction = async (req, res) => {
    try {

        const { amount, description, date } = req.body;

        const newTransaction = new Transaction({ amount, description, date });
        await newTransaction.save();

        res.status(201).json(newTransaction);

    } catch (error) {
        res.status(400).json({ error: "Invalid transaction data" });
    }
};

export const editTransaction = async (req, res) => {
    try {

      const { amount, description, date } = req.body;
      
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        { amount, description, date },
        { new: true, runValidators: true }
      );
  
      if (!updatedTransaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }
  
      res.json(updatedTransaction);
    } catch (error) {
      res.status(400).json({ error: "Invalid update data" });
    }
  };

export const deleteTransaction = async (req, res) => {
    try {

        await Transaction.findByIdAndDelete(req.params.id);
        res.json({ message: "Transaction deleted" });

    } catch (error) {
        res.status(500).json({ error: "Error deleting transaction" });
    }
};