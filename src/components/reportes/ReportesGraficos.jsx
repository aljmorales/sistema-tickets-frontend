import "../../styles/reportes/ReportesGraficos.css";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

const COLORS_PIE = [
    "#6366f1",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
    "#a855f7",
    "#ec4899",
    "#84cc16",
];

function SeccionGrafico({ titulo, descripcion, children }) {
    return (
        <div className="grafico-card">

            <div className="grafico-header">
                <h3>{titulo}</h3>
                <p>{descripcion}</p>
            </div>

            <div className="grafico-body">
                {children}
            </div>

        </div>
    );
}

function GraficoEstados({ data }) {
    return (
        <SeccionGrafico
            titulo="Estados"
            descripcion="Distribución actual de tickets"
        >
            <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="total"
                        nameKey="estado"
                        outerRadius={90}
                        labelLine={false}
                    >
                        {data.map((_, i) => (
                            <Cell
                                key={i}
                                fill={COLORS_PIE[i % COLORS_PIE.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </SeccionGrafico>
    );
}

function GraficoPrioridad({ data }) {
    return (
        <SeccionGrafico
            titulo="Prioridades"
            descripcion="Tickets agrupados por prioridad"
        >
            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="prioridad" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />

                    <Bar
                        dataKey="total"
                        fill="#6366f1"
                        radius={[6, 6, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </SeccionGrafico>
    );
}

function GraficoCategoria({ data }) {
    return (
        <SeccionGrafico
            titulo="Categorías"
            descripcion="Tickets por categoría"
        >
            <ResponsiveContainer width="100%" height={260}>
                <BarChart
                    data={data}
                    layout="vertical"
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        type="number"
                        allowDecimals={false}
                    />

                    <YAxis
                        dataKey="nombre"
                        type="category"
                        width={120}
                    />

                    <Tooltip />

                    <Bar
                        dataKey="total"
                        fill="#22c55e"
                        radius={[0, 6, 6, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </SeccionGrafico>
    );
}

function GraficoTecnico({ data }) {
    return (
        <SeccionGrafico
            titulo="Técnicos"
            descripcion="Carga de tickets asignados"
        >
            <ResponsiveContainer width="100%" height={260}>
                <BarChart
                    data={data}
                    layout="vertical"
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        type="number"
                        allowDecimals={false}
                    />

                    <YAxis
                        dataKey="nombre"
                        type="category"
                        width={120}
                    />

                    <Tooltip />

                    <Bar
                        dataKey="total"
                        fill="#06b6d4"
                        radius={[0, 6, 6, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </SeccionGrafico>
    );
}

function GraficoActividad({ data }) {
    return (
        <SeccionGrafico
            titulo="Actividad reciente"
            descripcion="Tickets generados durante los últimos 7 días"
        >
            <ResponsiveContainer width="100%" height={260}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="fecha"
                        tickFormatter={(v) => {
                            // PostgreSQL puede devolver Date object o string ISO
                            const fecha = new Date(v);
                            if (isNaN(fecha)) return v; // si no parsea, muestra raw
                            return fecha.toLocaleDateString("es-PE", {
                                day: "2-digit",
                                month: "short",
                            });
                        }}
                    />

                    <YAxis allowDecimals={false} />

                    <Tooltip />

                    <Bar
                        dataKey="total"
                        fill="#a855f7"
                        radius={[6, 6, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </SeccionGrafico>
    );
}

export default function ReportesGraficos({
    estados,
    prioridades,
    categorias,
    tecnicos,
    porMes,
}) {
    return (
        <div className="reportes-graficos">

            <div className="graficos-grid">
                <GraficoEstados data={estados} />
                <GraficoPrioridad data={prioridades} />
            </div>

            <div className="graficos-grid">
                <GraficoCategoria data={categorias} />
                <GraficoTecnico data={tecnicos} />
            </div>

            <GraficoActividad data={porMes} />

        </div>
    );
}