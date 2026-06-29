import "../../styles/ticket/TicketTecnico.css";

export default function TicketTecnico({ tecnico }) {
    if (!tecnico) {
        return (
        <div className="ticket-tecnico">
            <h3>Técnico asignado</h3>
            <div className="sin-tecnico">
            <span className="avatar-placeholder">?</span>
            Sin técnico asignado
            </div>
        </div>
        );
    }

    const inicial = tecnico.nombre?.charAt(0).toUpperCase() ?? "T";
    const desde = new Date(tecnico.fecha_asignacion).toLocaleString("es-PE", {
        dateStyle: "medium",
        timeStyle: "short",
    });

    return (
        <div className="ticket-tecnico">
        <h3>Técnico asignado</h3>
        <div className="flex items-center gap-3">
            <span className="avatar">{inicial}</span>
            <div className="info">
            <p className="nombre">{tecnico.nombre}</p>
            <p className="correo">{tecnico.correo}</p>
            </div>
        </div>
        <p className="fecha">Asignado desde: {desde}</p>
        </div>
    );
}
