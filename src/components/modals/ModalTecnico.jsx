import { useState, useEffect } from "react";
import api from "../../api/axios.js";
import Modal from "./Modal.jsx";
import "../../styles/modals/ModalTecnico.css";

export default function ModalTecnico({
    ticketId,
    tecnicoActual,
    usuario,
    onClose,
    onSuccess
}) {
    const [tecnicos, setTecnicos] = useState([]);
    const [seleccionado, setSeleccionado] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingTecnicos, setLoadingTecnicos] = useState(true);
    const [error, setError] = useState(null);

    const sinPermisos = usuario?.rol_id !== 1;

    useEffect(() => {
        if (sinPermisos) return;

        api.get("/tickets/tecnicos")
            .then((res) => setTecnicos(res.data.body ?? []))
            .catch(() => setError("No se pudieron cargar los técnicos."))
            .finally(() => setLoadingTecnicos(false));
    }, [sinPermisos]);

    async function handleAsignar() {
        if (!seleccionado) {
            setError("Selecciona un técnico.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await api.post(`/tickets/${ticketId}/asignar`, {
                tecnico_id: Number(seleccionado),
            });

            onSuccess?.();
            onClose();
        } catch (err) {
            setError(
                err.response?.data?.mensaje ??
                "Error al asignar técnico."
            );
        } finally {
            setLoading(false);
        }
    }

    if (sinPermisos) {
        return (
            <Modal titulo="Asignar técnico" onClose={onClose}>
                <div className="modal-tecnico-bloqueado">
                    <div className="modal-tecnico-lock">
                        🔒
                    </div>

                    <p className="modal-tecnico-bloqueado-texto">
                        No tienes permisos suficientes para asignar un técnico.
                        <br />
                        Esta acción requiere rol de <strong>Administrador</strong>.
                    </p>

                    <button
                        onClick={onClose}
                        className="modal-btn-secundario"
                    >
                        Cerrar
                    </button>
                </div>
            </Modal>
        );
    }

    return (
        <Modal titulo="Asignar técnico" onClose={onClose}>
            <div className="modal-tecnico">

                {tecnicoActual && (
                    <div className="modal-tecnico-actual">
                        <p className="modal-tecnico-label">
                            Técnico actual
                        </p>

                        <div className="modal-tecnico-info">
                            <span className="modal-tecnico-avatar">
                                {tecnicoActual.nombre?.charAt(0).toUpperCase()}
                            </span>

                            <span className="modal-tecnico-nombre">
                                {tecnicoActual.nombre}
                            </span>
                        </div>
                    </div>
                )}

                <div className="modal-campo">
                    <label className="modal-label">
                        Seleccionar técnico
                        <span className="modal-required">*</span>
                    </label>

                    {loadingTecnicos ? (
                        <div className="modal-loading">
                            Cargando técnicos...
                        </div>
                    ) : (
                        <select
                            value={seleccionado}
                            onChange={(e) =>
                                setSeleccionado(e.target.value)
                            }
                            className="modal-select"
                        >
                            <option value="">
                                — Elige un técnico —
                            </option>

                            {tecnicos.map((t) => (
                                <option
                                    key={t.id}
                                    value={t.id}
                                >
                                    {t.nombres} {t.apellidos}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {error && (
                    <div className="modal-error">
                        ⚠️ {error}
                    </div>
                )}

                <div className="modal-actions">
                    <button
                        onClick={onClose}
                        className="modal-btn-secundario"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={handleAsignar}
                        disabled={loading || loadingTecnicos}
                        className="modal-btn-primario"
                    >
                        {loading
                            ? "Asignando..."
                            : "Asignar técnico"}
                    </button>
                </div>
            </div>
        </Modal>
    );
}