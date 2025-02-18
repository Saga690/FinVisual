import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: "PJ", amount: 50000 },
  { name: "SJ", amount: 30000 },
  { name: "MB", amount: 70000 },
];

export default function FinanceChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#00C49F" />
      </BarChart>
    </ResponsiveContainer>
  );
}
