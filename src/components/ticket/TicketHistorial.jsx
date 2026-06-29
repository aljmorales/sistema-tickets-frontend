import "../../styles/ticket/TicketHistorial.css";

export default function TicketHistorial({ historial }) {
    const COLOR_EVENTO = {
        "Creación": "#22c55e",
        "Asignación": "#3b82f6",
        "Cambio de estado": "#8b5cf6",
        "Comentario": "#f59e0b",
        "Cierre": "#ef4444"
    };
        
    return (
        <div className="ticket-historial">
        <h3>Historial</h3>

        {historial.length === 0 ? (
            <p className="ticket-historial-empty">Sin eventos registrados</p>
        ) : (
            <ol className="ticket-historial-list">
            {historial.map((h) => (
                <li key={h.id} className="ticket-historial-item">
                <span
                    className="ticket-historial-dot"
                    style={{
                        backgroundColor: COLOR_EVENTO[h.accion] || "#4f46e5"
                    }}
                />

                <p className="ticket-historial-accion">{h.accion}</p>

                {h.valor_nuevo && (
                <p className="ticket-historial-valor">
                    {h.valor_anterior && (
                        <span className="ticket-historial-valor-anterior">
                            {h.valor_anterior}
                        </span>
                    )}

                    →

                    <span className="ticket-historial-valor-nuevo">
                        {h.valor_nuevo}
                    </span>
                </p>
                )}

                <p className="ticket-historial-meta">
                    {h.usuario} ·{" "}
                    {new Date(h.fecha).toLocaleString("es-PE", {
                    dateStyle: "medium",
                    timeStyle: "short",
                    })}
                </p>
                </li>
            ))}
            </ol>
        )}
        </div>
    );
}
