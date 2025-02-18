import { useEffect, useState } from "react";
import { getTransactions } from "@/lib/api"; 
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";

export default function FinanceChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactions = await getTransactions();
        
        const monthlyData = transactions.reduce((acc, transaction) => {
          const month = dayjs(transaction.date).format("MMM YYYY"); 
          
          if (!acc[month]) {
            acc[month] = { name: month, amount: 0 };
          }
          acc[month].amount += transaction.amount; 

          return acc;
        }, {});

        setChartData(Object.values(monthlyData)); 
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#00C49F" />
      </BarChart>
    </ResponsiveContainer>
  );
}
