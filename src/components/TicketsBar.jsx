import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export function TicketsPorTecnico({ data }) {
    return (
        <div className="bg-white rounded-2xl shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Tickets por Técnico</h3>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="total" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
        </div>
    );
}

export function TicketsPorUsuario({ data }) {
    return (
        <div className="bg-white rounded-2xl shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Tickets por Usuario</h3>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="total" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
        </div>
    );
}