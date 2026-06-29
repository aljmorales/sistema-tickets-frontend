import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios.js";

import "../styles/TicketDetalle.css";

// Componentes de detalle
import TicketHeader      from "../components/ticket/TicketHeader.jsx";
import TicketDetalles    from "../components/ticket/TicketDetalles.jsx";
import TicketTecnico     from "../components/ticket/TicketTecnico.jsx";
import TicketSLA         from "../components/ticket/TicketSLA.jsx";
import TicketHistorial   from "../components/ticket/TicketHistorial.jsx";
import TicketComentarios from "../components/ticket/TicketComentarios.jsx";
import TicketAdjuntos    from "../components/ticket/TicketAdjuntos.jsx";

// Modales
import ModalComentario from "../components/modals/ModalComentario.jsx";
import ModalTecnico    from "../components/modals/ModalTecnico.jsx";
import ModalEstado     from "../components/modals/ModalEstado.jsx";
import ModalAdjunto    from "../components/modals/ModalAdjunto.jsx";

export default function TicketDetalle() {
    const { id } = useParams();

    const [ticket, setTicket]   = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    // Obtener usuario actual del token en localStorage
    const usuario = JSON.parse(localStorage.getItem("usuario") ?? "null");
    console.log("usuario completo:", usuario);
    console.log("rol_id:", usuario?.rol_id);

    // Estado de modales: solo uno abierto a la vez
    const [modal, setModal] = useState(null); // "comentario" | "tecnico" | "estado" | "adjunto"

    function abrirModal(nombre) { setModal(nombre); }
    function cerrarModal()      { setModal(null);   }

    function cargarTicket() {
        setLoading(true);
        api.get(`/tickets/${id}`)
            .then((res) => setTicket(res.data.body))
            .catch(() => setError("No se pudo cargar el ticket."))
            .finally(() => setLoading(false));
    }

    useEffect(() => { cargarTicket(); }, [id]);

    if (loading) return <div className="p-6 text-sm text-gray-400">Cargando ticket...</div>;
    if (error)   return <div className="p-6 text-sm text-red-500">{error}</div>;
    if (!ticket) return null;

    const acciones = (
        <>
            <button onClick={() => abrirModal("comentario")}>💬 Comentario</button>
            <button onClick={() => abrirModal("estado")}>✏️ Estado</button>
            <button onClick={() => abrirModal("tecnico")}>👨‍💻 Técnico</button>
            <button onClick={() => abrirModal("adjunto")}>📎 Archivo</button>
        </>
    );

    return (
        <>
            <div className="p-6 max-w-4xl mx-auto space-y-4">

                <TicketHeader ticket={ticket} acciones={acciones} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TicketDetalles ticket={ticket} />
                    <div className="space-y-4">
                        <TicketTecnico tecnico={ticket.tecnico_asignado} />
                        <TicketSLA     sla={ticket.sla} />
                    </div>
                </div>

                <TicketHistorial   historial={ticket.historial} />
                <TicketComentarios comentarios={ticket.comentarios} />
                <TicketAdjuntos    adjuntos={ticket.adjuntos} />

            </div>

            {/* Modales */}
            {modal === "comentario" && (
                <ModalComentario
                    ticketId={id}
                    onClose={cerrarModal}
                    onSuccess={cargarTicket}
                />
            )}
            {modal === "tecnico" && (
                <ModalTecnico
                    ticketId={id}
                    tecnicoActual={ticket.tecnico_asignado}
                    usuario={usuario}
                    onClose={cerrarModal}
                    onSuccess={cargarTicket}
                />
            )}
            {modal === "estado" && (
                <ModalEstado
                    ticketId={id}
                    estadoActual={ticket.estado}
                    usuario={usuario}
                    onClose={cerrarModal}
                    onSuccess={cargarTicket}
                />
            )}
            {modal === "adjunto" && (
                <ModalAdjunto
                    ticketId={id}
                    onClose={cerrarModal}
                    onSuccess={cargarTicket}
                />
            )}
        </>
    );
}