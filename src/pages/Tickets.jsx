import api from "../api/axios.js";
import { useEffect, useState } from "react";
import Table from "../components/Table.jsx";
import PageHeader from "../components/PageHeader";
import ModalNuevoTicket from "../components/modals/ModalNuevoTicket.jsx";
import "../styles/Tickets.css";

export default function Tickets() {
    const [tabla, setTabla] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    async function obtenerDatos(page = 1) {
        try {
            const response = await api.get(`/tickets?page=${page}&limit=10`);
            const { data, total, page: currentPage, limit } = response.data.body;
            setTabla(data);
            setTotal(total);
            setPage(currentPage);
            setTotalPages(Math.ceil(total / limit));
        } catch (error) {
            console.error("Error al obtener tickets:", error);
            // Opcional: mostrar un mensaje de error
        }
    }

    useEffect(() => {
        obtenerDatos();
    }, []);

    return (
        <div className="tickets-page">
            <PageHeader
                titulo="🎟️ Gestión de Tickets"
                descripcion="Dale click a la fila del ticket y gestionalo."
                acciones={
                    <button onClick={() => setModalAbierto(true)}>
                        + Nuevo ticket
                    </button>
                }
            />
            
            <div className="paginacion">
                <button
                    onClick={() => obtenerDatos(page - 1)}
                    disabled={page <= 1}
                >
                    ← Anterior
                </button>

                <span className="paginacion-info">
                    Página {page} de {totalPages || 1}
                </span>

                <button
                    onClick={() => obtenerDatos(page + 1)}
                    disabled={page >= totalPages}
                >
                    Siguiente →
                </button>
            </div>
            
            <Table tabla={tabla} setTabla={setTabla} />

            {modalAbierto && (
                <ModalNuevoTicket
                    onClose={() => setModalAbierto(false)}
                    onSuccess={() => obtenerDatos(1)}
                />
            )}
        </div>
    );
}