import { Router } from "express";
import { getTransactions, addTransaction, editTransaction, deleteTransaction } from "../controllers/transactionController.js";

const router = Router();

router.get("/", getTransactions);
router.post("/", addTransaction);
router.put("/:id", editTransaction);
router.delete("/:id", deleteTransaction);

export default router;
