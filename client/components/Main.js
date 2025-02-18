import React, { useEffect, useState } from 'react'
import { getTransactions } from "@/lib/api";
import BarChart from "./BarChart";

const Main = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const data = await getTransactions();
                setTransactions(data.slice(0, 5)); // Get only the last 5 transactions
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        }

        fetchTransactions();
    }, []);

    return (
        <div className="flex-1 p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

            <div className="grid grid-cols-3 gap-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-2">Pending Tasks</h2>
                    <ul className="space-y-1">
                        <li className="flex justify-between">
                            <span>Pending Approvals</span> <span>5</span>
                        </li>
                        <li className="flex justify-between">
                            <span>New Trips Registered</span> <span>1</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Unreported Expenses</span> <span>4</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg col-span-2">
                    <h2 className="text-lg font-semibold mb-2">Recent Expenses</h2>
                    <table className="w-full text-left">
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
                                    <td className="p-2">€{transaction.amount.toFixed(2)}</td>
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

            <div className="mt-6 bg-gray-800 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Monthly Report</h2>
                <div className="flex gap-4">
                    <div className="bg-gray-900 p-6 rounded-lg"><BarChart /></div>
                </div>
            </div>
        </div>
    )
}

export default Main