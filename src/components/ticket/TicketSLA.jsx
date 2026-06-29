import "../../styles/ticket/TicketSLA.css";

function FilaSLA({ label, valor }) {
    return (
        <div className="fila-sla">
        <span className="fila-sla-label">{label}</span>
        <span className="fila-sla-valor">{valor}</span>
        </div>
    );
}

export default function TicketSLA({ sla }) {
    if (!sla || sla.length === 0) {
        return (
        <div className="ticket-sla">
            <h3>SLA</h3>
            <p className="text-sm text-gray-400">Sin SLA definido</p>
        </div>
        );
    }

    return (
        <div className="ticket-sla space-y-3">
        <h3>SLA</h3>
        {sla.map((s) => (
            <div key={s.tiempo_respuesta_horas} className="ticket-sla-item">
                <p className="ticket-sla-nombre">{s.sla_nombre}</p>

                <div className="sla-metricas">
                    <div className="metrica">
                        <span className="valor">{s.tiempo_respuesta_horas} horas</span>
                        <span className="label">Respuesta</span>
                    </div>

                    <div className="metrica">
                        <span className="valor">{s.tiempo_resolucion_horas} horas</span>
                        <span className="label">Resolución</span>
                    </div>
                </div>
            </div>
        ))}
        </div>
    );
}