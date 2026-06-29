import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4", "#a855f7", "#ec4899"];

export default function TicketsPorEstado({ data }) {
    return (
        <div className="bg-white rounded-2xl shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Tickets por Estado</h3>
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
            <Pie
                data={data}
                dataKey="total"
                nameKey="estado"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ estado, total }) => `${estado}: ${total}`}
            >
                {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
            </PieChart>
        </ResponsiveContainer>
        </div>
    );
}