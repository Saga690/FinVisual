import React, { useEffect, useState } from 'react'
import { getTransactions } from "@/lib/api";
import BarChart from "./BarChart";

const Main = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const data = await getTransactions();
                setTransactions(data.slice(0, 5));
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        }
        fetchTransactions();
    }, []);

    const totalExpenses = transactions.reduce((total, transaction) => total + transaction.amount, 0).toFixed(2);

    return (
        <div className="flex-1 p-4 sm:p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-purple-800 to-cyan-700 p-6 rounded-lg shadow-lg flex items-center justify-center col-span-1">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-white mb-4">Total Expenses</h2>
                        <div className="text-4xl font-bold text-white">
                            ₹ {totalExpenses}
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg col-span-1 md:col-span-2 overflow-x-auto">
                    <h2 className="text-lg font-semibold mb-2">Recent Expenses</h2>
                    <table className="w-full text-left min-w-[600px]">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="p-2">Description</th>
                                <th className="p-2">Amount</th>
                                <th className="p-2">Category</th>
                                <th className="p-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={index} className="border-b border-gray-700">
                                    <td className="p-2">{transaction.description}</td>
                                    <td className="p-2">${transaction.amount.toFixed(2)}</td>
                                    <td className="p-2">
                                        <span className="bg-purple-600 px-2 py-1 rounded">
                                            {transaction.category || "None"}
                                        </span>
                                    </td>
                                    <td className="p-2">{new Date(transaction.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Monthly Report Section */}
            <div className="mt-6 bg-gray-800 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Monthly Report</h2>
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <div className="bg-gray-900 p-6 rounded-lg w-full">
                        <BarChart />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
