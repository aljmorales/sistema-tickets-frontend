import "../../styles/ticket/TicketDetalles.css";

function Campo({ label, value }) {
  return (
    <div className="campo">
      <div className="campo-label">{label}:</div>
      <div className="campo-value">{value || "—"}</div>
    </div>
  );
}

export default function TicketDetalles({ ticket }) {
    const fechaCreacion = new Date(ticket.fecha_creacion).toLocaleString("es-PE", {
        dateStyle: "medium",
        timeStyle: "short",
    });

    const fechaActualizacion = new Date(ticket.fecha_actualizacion).toLocaleString("es-PE", {
        dateStyle: "medium",
        timeStyle: "short",
    });

    return (
        <div className="ticket-detalles">
        <h3>Detalles</h3>
        <Campo label="📂 Categoría" value={ticket.categoria} />
        <Campo label="💻 Activo" value={ticket.activo} />
        <Campo label="👤 Solicitante" value={ticket.solicitante} />
        <Campo label="✉️ Correo" value={ticket.solicitante_correo} />
        <Campo label="🕒 Creado" value={fechaCreacion} />
        <Campo label="🔄 Actualizado" value={fechaActualizacion} />
        {ticket.fecha_cierre && (
            <Campo
            label="Cerrado"
            value={new Date(ticket.fecha_cierre).toLocaleString("es-PE", {
                dateStyle: "medium",
                timeStyle: "short",
            })}
            />
        )}
        </div>
    );
}
