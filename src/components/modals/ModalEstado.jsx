import { useState } from "react";
import api from "../../api/axios.js";
import Modal from "./Modal.jsx";
import "../../styles/modals/ModalEstado.css";

const ESTADOS = [
    { id: 1, nombre: "Abierto" },
    { id: 2, nombre: "En revisión" },
    { id: 3, nombre: "Asignado" },
    { id: 4, nombre: "En progreso" },
    { id: 5, nombre: "Pendiente" },
    { id: 6, nombre: "Resuelto" },
    { id: 7, nombre: "Cerrado" },
    { id: 8, nombre: "Cancelado" },
];

export default function ModalEstado({ ticketId, estadoActual, usuario, onClose, onSuccess }) {
    const [nuevoEstado, setNuevoEstado] = useState("");
    const [loading, setLoading]         = useState(false);
    const [error, setError]             = useState(null);

    // Verificar permisos (rol_id 1 = admin, 2 = técnico)
    const sinPermisos = ![1, 2].includes(usuario?.rol_id);

    async function handleGuardar() {
        if (!nuevoEstado) {
            setError("Selecciona un estado.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            await api.put(`/tickets/${ticketId}/estado`, {
                estado_id: Number(nuevoEstado),
            });
            onSuccess?.();
            onClose();
        } catch (err) {
            setError(err.response?.data?.mensaje ?? "Error al cambiar el estado.");
        } finally {
            setLoading(false);
        }
    }

    // Sin permisos
    if (sinPermisos) {
        return (
            <Modal titulo="Cambiar estado" onClose={onClose}>
                            <div className="modal-lock">
                <span className="modal-lock-icon">
                    🔒
                </span>

                <p className="modal-lock-text">
                    No tienes permisos para cambiar el estado del ticket.
                    <br />
                    Esta acción requiere rol de <strong>Administrador</strong> o <strong>Técnico</strong>.
                </p>

                <button
                    onClick={onClose}
                    className="btn-secondary"
                >
                    Cerrar
                </button>
            </div>
            </Modal>
        );
    }

    return (
        <Modal titulo="Cambiar estado" onClose={onClose}>
            <div className="modal-estado">

        <div className="estado-actual-card">
            <div className="estado-actual-label">
                Estado actual
            </div>

            <div className="estado-actual-valor">
                {estadoActual}
            </div>
        </div>

        <div className="form-group">

            <label className="form-label">
                Nuevo estado
                <span className="form-required"> *</span>
            </label>

            <select
                value={nuevoEstado}
                onChange={(e) => setNuevoEstado(e.target.value)}
                className="form-select"
            >
                <option value="">
                    — Elige un estado —
                </option>

                {ESTADOS
                    .filter((e) => e.nombre !== estadoActual)
                    .map((e) => (
                        <option
                            key={e.id}
                            value={e.id}
                        >
                            {e.nombre}
                        </option>
                    ))}
            </select>

        </div>

        {nuevoEstado === "7" && (
            <div className="warning-box">
                ⚠️ Al cerrar el ticket se registrará
                automáticamente la fecha de cierre.
            </div>
        )}

        {error && (
            <div className="error-message">
                {error}
            </div>
        )}

        <div className="modal-actions">

            <button
                onClick={onClose}
                className="btn-secondary"
            >
                Cancelar
            </button>

            <button
                onClick={handleGuardar}
                disabled={loading}
                className="btn-primary"
            >
                {loading
                    ? "Guardando..."
                    : "Guardar cambios"}
            </button>

        </div>

    </div>
        </Modal>
    );
}