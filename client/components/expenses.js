import { useState } from "react";
import { Button } from "@/components/ui/button"; 

const expensesData = [
  { date: "09/11/2022", title: "Food Catering", merchant: "McFood", amount: "€250.00", report: "November_2022", status: "Not Submitted" },
  { date: "10/11/2022", title: "Office Supplies", merchant: "Officio", amount: "€150.00", report: "November_2022", status: "Not Submitted" },
  { date: "11/11/2022", title: "Business Lunch", merchant: "Restaurant", amount: "€75.50", report: "November_2022", status: "Not Submitted" },
  { date: "11/11/2022", title: "Travel Expenses", merchant: "Airlines", amount: "€450.25", report: "November_2022", status: "Submitted" },
  { date: "12/11/2022", title: "Client Dinner", merchant: "Bistro", amount: "€120.00", report: "November_2022", status: "Not Submitted" },
  { date: "16/11/2022", title: "Accommodation", merchant: "Hotel ***", amount: "€275.75", report: "November_2022", status: "Submitted" },
  { date: "20/11/2022", title: "News Subscription", merchant: "NewsTimes", amount: "€30.00", report: "November_2022", status: "Not Submitted" },
];

export default function Expenses() {
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
              <th className="py-3 px-4 text-gray-400">REPORT</th>
              <th className="py-3 px-4 text-gray-400">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {expensesData.map((expense, index) => (
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
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      expense.status === "Submitted"
                        ? "bg-purple-600 text-white"
                        : "bg-pink-600 text-white"
                    }`}
                  >
                    {expense.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
