import { useNavigate } from "react-router-dom";
import "../../styles/ticket/TicketHeader.css";

const ESTADO_COLORS = {
    "Abierto": "bg-blue-50 text-blue-700 border-blue-200",
    "En revisión": "bg-purple-50 text-purple-700 border-purple-200",
    "Asignado": "bg-indigo-50 text-indigo-700 border-indigo-200",
    "En progreso": "bg-cyan-50 text-cyan-700 border-cyan-200",
    "Pendiente": "bg-yellow-50 text-yellow-700 border-yellow-200",
    "Resuelto": "bg-green-50 text-green-700 border-green-200",
    "Cerrado": "bg-gray-50 text-gray-700 border-gray-200",
    "Cancelado": "bg-red-50 text-red-700 border-red-200",
};

const PRIORIDAD_COLORS = {
    "Baja": "bg-gray-100 text-gray-500",
    "Media": "bg-amber-100 text-amber-600",
    "Alta": "bg-orange-100 text-orange-600",
    "Crítica": "bg-red-100 text-red-600",
};

export default function TicketHeader({ ticket, acciones }) {
    const navigate = useNavigate();

    const estadoClass =
        ESTADO_COLORS[ticket.estado] ??
        "bg-gray-100 text-gray-600";

    const prioridadClass =
        PRIORIDAD_COLORS[ticket.prioridad] ??
        "bg-gray-100 text-gray-600";

    return (
        <div className="ticket-header">

            <button
                className="btn-volver"
                onClick={() => navigate(-1)}
            >
                ← Volver
            </button>

            <p className="codigo">
                {ticket.codigo_ticket}
            </p>

            <h2>{ticket.titulo}</h2>

            <p className="descripcion">
                {ticket.descripcion}
            </p>

            <div className="badges">
                <span className={`badge ${estadoClass}`}>
                    📌 {ticket.estado}
                </span>

                <span className={`badge ${prioridadClass}`}>
                    🔥 {ticket.prioridad}
                </span>
            </div>

            {acciones && (
                <div className="ticket-header-actions">
                    {acciones}
                </div>
            )}

        </div>
    );
}