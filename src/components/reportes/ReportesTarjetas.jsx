import "../../styles/reportes/ReportesTarjetas.css";

export default function ReportesTarjetas({ resumen }) {
    return (
        <div className="reportes-tarjetas-grid">

            <Tarjeta
                icono="🎟️"
                label="Total tickets"
                valor={resumen?.total_tickets}
                variant="indigo"
            />

            <Tarjeta
                icono="📂"
                label="Abiertos"
                valor={resumen?.abiertos}
                variant="blue"
            />

            <Tarjeta
                icono="✅"
                label="Cerrados"
                valor={resumen?.cerrados}
                variant="green"
            />

            <Tarjeta
                icono="🚨"
                label="Alta prioridad"
                valor={resumen?.alta_prioridad}
                variant="red"
            />

        </div>
    );
}

function Tarjeta({
    icono,
    label,
    valor,
    variant = "indigo",
}) {
    return (
        <div className={`reporte-card reporte-card--${variant}`}>

            <div className="reporte-card-top">
                <span className="reporte-card-icon">
                    {icono}
                </span>

                <span className="reporte-card-label">
                    {label}
                </span>
            </div>

            <div className="reporte-card-value">
                {valor ?? "—"}
            </div>

        </div>
    );
}