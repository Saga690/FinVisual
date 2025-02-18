import { useEffect, useState } from "react";
import { getTransactions } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function Expenses() {
    const [expensesData, setExpensesData] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const transactions = await getTransactions();

                const formattedData = transactions.map((tx) => {
                    const amount = tx.amount;
                    let status = "Low";
                    let statusColor = "bg-green-600"; // Default to Green (Low)

                    if (amount > 1500) {
                        status = "High";
                        statusColor = "bg-red-600"; // High = Red
                    } else if (amount > 750) {
                        status = "Medium";
                        statusColor = "bg-orange-500"; // Medium = Orange
                    }

                    return {
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

        fetchExpenses();
    }, []);

    return (
        <div className="p-6 text-white">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Expenses</h1>
                <div className="flex space-x-2">
                    <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">+ New Expense</Button>
                    <Button className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-md">🔍</Button>
                    <Button className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-md">⋮</Button>
                </div>
            </div>

            <div className="bg-black rounded-lg p-4 shadow-md">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-700">
                            <th className="py-3 px-4 text-gray-400">DETAILS</th>
                            <th className="py-3 px-4 text-gray-400">MERCHANT</th>
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
                                    <td className="py-3 px-4">{expense.merchant}</td>
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
