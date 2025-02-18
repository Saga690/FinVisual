import { useEffect, useState } from "react";
import { addTransaction, getTransactions, deleteTransaction, editTransaction } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Expenses() {
    const [expensesData, setExpensesData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [editingExpense, setEditingExpense] = useState(null);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const transactions = await getTransactions();
            const formattedData = transactions.map((tx) => {
                const amount = tx.amount;
                let status = "Low";
                let statusColor = "bg-green-600";

                if (amount > 1500) {
                    status = "High";
                    statusColor = "bg-red-600";
                } else if (amount > 750) {
                    status = "Medium";
                    statusColor = "bg-orange-500";
                }

                return {
                    _id: tx._id,
                    date: new Date(tx.date).toLocaleDateString(),
                    title: tx.description,
                    merchant: "Unknown",
                    amount: `$${amount.toFixed(2)}`,
                    report: "Category",
                    status,
                    statusColor,
                };
            });

            setExpensesData(formattedData);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const handleEdit = (id) => {
        const expenseToEdit = expensesData.find((expense) => expense._id === id);
        setEditingExpense(expenseToEdit);
        setAmount(expenseToEdit.amount.replace("$", ""));
        setCategory(expenseToEdit.report);
        setDescription(expenseToEdit.title);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteTransaction(id);
            fetchExpenses();
            alert("Expense deleted successfully!");
        } catch (error) {
            console.error("Error deleting transaction:", error);
            alert("Failed to delete the expense.");
        }
    };

    const handleSaveExpense = async () => {
        if (!amount || !category || !description) {
            alert("Please fill in all fields!");
            return;
        }

        const newExpense = {
            amount: parseFloat(amount),
            category,
            description,
            date: new Date().toISOString(),
        };

        try {
            if (editingExpense) {
                await editTransaction(editingExpense._id, newExpense);
                alert("Expense updated successfully!");
            } else {
                await addTransaction(newExpense);
                alert("Expense added successfully!");
            }
            setIsModalOpen(false);
            fetchExpenses();
        } catch (error) {
            console.error("Error saving transaction:", error);
            alert("Failed to save the expense.");
        } finally {
            setEditingExpense(null);
        }
    };

    return (
        <div className="p-6 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
                <h1 className="text-3xl font-bold">Expenses</h1>
                <div className="flex space-x-2">
                    <Button onClick={() => setIsModalOpen(true)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
                        + New Expense
                    </Button>
                    <Button className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-md">🔍</Button>
                    <Button className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-md">⋮</Button>
                </div>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="bg-gray-900 text-white">
                    <DialogHeader>
                        <DialogTitle>{editingExpense ? "Edit Expense" : "Add New Expense"}</DialogTitle>
                    </DialogHeader>
                    <Card className="bg-gray-800 text-white">
                        <CardHeader>
                            <h2 className="text-lg font-semibold">{editingExpense ? "Edit Expense Details" : "Expense Details"}</h2>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-gray-400">Amount</Label>
                                    <Input
                                        type="number"
                                        placeholder="Enter amount"
                                        className="bg-gray-700 text-white"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label className="text-gray-400">Category</Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter category"
                                        className="bg-gray-700 text-white"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label className="text-gray-400">Description</Label>
                                    <Textarea
                                        placeholder="Enter description"
                                        className="bg-gray-700 text-white"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                                <Button onClick={() => setIsModalOpen(false)} className="bg-gray-600 hover:bg-gray-500">
                                    Cancel
                                </Button>
                                <Button onClick={handleSaveExpense} className="bg-green-500 hover:bg-green-600">
                                    {editingExpense ? "Save Changes" : "Save Expense"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </DialogContent>
            </Dialog>

            <div className="bg-black rounded-lg p-4 shadow-md overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-700">
                            <th className="py-3 px-4 text-gray-400">DETAILS</th>
                            <th className="py-3 px-4 text-gray-400">ACTIONS</th>
                            <th className="py-3 px-4 text-gray-400">AMOUNT</th>
                            <th className="py-3 px-4 text-gray-400">CATEGORY</th>
                            <th className="py-3 px-4 text-gray-400">STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expensesData.length > 0 ? (
                            expensesData.map((expense, index) => (
                                <tr key={index} className="border-b border-gray-800">
                                    <td className="py-3 px-4 flex items-center space-x-3">
                                        <input type="checkbox" className="mr-2" />
                                        <div>
                                            <p className="text-sm text-gray-400">{expense.date}</p>
                                            <p className="font-medium">{expense.title}</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 gap-4">
                                        <button onClick={() => handleEdit(expense._id)} className="hover:scale-105 transition-transform">
                                            ✏️
                                        </button>
                                        <button onClick={() => handleDelete(expense._id)} className="hover:scale-105 transition-transform">
                                            ❌
                                        </button>
                                    </td>
                                    <td className="py-3 px-4">{expense.amount}</td>
                                    <td className="py-3 px-4">{expense.report}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${expense.statusColor}`}>
                                            {expense.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    No expenses found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    );
}
