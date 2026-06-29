import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";

export function TicketsRadar({ data, dataKeyName = "nombre", title = "Tickets" }) {
    return (
        <div className="bg-white rounded-2xl shadow p-4">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey={dataKeyName} />
            <PolarRadiusAxis allowDecimals={false} />
            <Radar dataKey="total" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
            <Tooltip />
            </RadarChart>
        </ResponsiveContainer>
        </div>
    );
}