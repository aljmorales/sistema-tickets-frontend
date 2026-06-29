import { useState, useEffect } from "react";
import api from "../../api/axios.js";
import Modal from "./Modal.jsx";
import "../../styles/modals/ModalNuevoTicket.css";

export default function ModalNuevoTicket({ onClose, onSuccess }) {
    const [form, setForm] = useState({
        titulo: "",
        descripcion: "",
        prioridad_id: "",
        categoria_id: "",
        activo_id: "",
    });

    const [categorias, setCategorias] = useState([]);
    const [prioridades, setPrioridades] = useState([]);
    const [activos, setActivos] = useState([]);

    const [loading, setLoading] = useState(false);
    const [loadingCats, setLoadingCats] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        Promise.allSettled([
            api.get("/categorias"),
            api.get("/prioridad"),
            api.get("/activos"),
        ])
            .then(([catsRes, priRes, actRes]) => {
            console.log("categorias:", catsRes.value?.data);
            console.log("prioridades:", priRes.value?.data);
            console.log("activos:", actRes.value?.data);
                if (catsRes.status === "fulfilled")
                    setCategorias(catsRes.value.data.body ?? []);

                if (priRes.status === "fulfilled")
                    setPrioridades(priRes.value.data.body ?? []);

                if (actRes.status === "fulfilled")
                    setActivos(actRes.value.data.body ?? []);
            })
            .finally(() => setLoadingCats(false));
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleCrear() {
        if (!form.titulo.trim()) {
            setError("El título es obligatorio.");
            return;
        }

        if (!form.prioridad_id || !form.categoria_id) {
            setError("Selecciona prioridad y categoría.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await api.post("/tickets", {
                titulo: form.titulo.trim(),
                descripcion: form.descripcion.trim(),
                prioridad_id: Number(form.prioridad_id),
                categoria_id: Number(form.categoria_id),
                activo_id: form.activo_id
                    ? Number(form.activo_id)
                    : null,
            });

            onSuccess?.();
            onClose();
        } catch (err) {
            setError(
                err.response?.data?.mensaje ??
                "Error al crear el ticket."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal titulo="Nuevo Ticket" onClose={onClose}>
            <div className="nuevo-ticket-modal">

                <div className="nuevo-ticket-info">
                    <span className="nuevo-ticket-icon">
                        🎟️
                    </span>

                    <div>
                        <p className="nuevo-ticket-info-title">
                            Registrar incidencia
                        </p>

                        <p className="nuevo-ticket-info-text">
                            Completa la información para crear
                            un nuevo ticket de soporte.
                        </p>
                    </div>
                </div>

                <Campo label="Título" required>
                    <input
                        type="text"
                        name="titulo"
                        value={form.titulo}
                        onChange={handleChange}
                        placeholder="Ej: No enciende la laptop"
                        className="modal-input"
                    />
                </Campo>

                <Campo label="Descripción">
                    <textarea
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Describe el problema..."
                        className="modal-input modal-textarea"
                    />
                </Campo>

                <div className="nuevo-ticket-grid">

                    <Campo label="Prioridad" required>
                        {loadingCats ? (
                            <span className="loading-text">
                                Cargando...
                            </span>
                        ) : (
                            <select
                                name="prioridad_id"
                                value={form.prioridad_id}
                                onChange={handleChange}
                                className="modal-input"
                            >
                                <option value="">
                                    Seleccionar
                                </option>

                                {prioridades.map((p) => (
                                    <option
                                        key={p.id}
                                        value={p.id}
                                    >
                                        {p.nombre}
                                    </option>
                                ))}
                            </select>
                        )}
                    </Campo>

                    <Campo label="Categoría" required>
                        {loadingCats ? (
                            <span className="loading-text">
                                Cargando...
                            </span>
                        ) : (
                            <select
                                name="categoria_id"
                                value={form.categoria_id}
                                onChange={handleChange}
                                className="modal-input"
                            >
                                <option value="">
                                    Seleccionar
                                </option>

                                {categorias.map((c) => (
                                    <option
                                        key={c.id}
                                        value={c.id}
                                    >
                                        {c.nombre}
                                    </option>
                                ))}
                            </select>
                        )}
                    </Campo>

                </div>

                {activos.length > 0 && (
                    <Campo label="Activo afectado">
                        <select
                            name="activo_id"
                            value={form.activo_id}
                            onChange={handleChange}
                            className="modal-input"
                        >
                            <option value="">
                                Ninguno
                            </option>

                            {activos.map((a) => (
                                <option
                                    key={a.id}
                                    value={a.id}
                                >
                                    {a.nombre}
                                </option>
                            ))}
                        </select>
                    </Campo>
                )}

                {error && (
                    <div className="modal-error">
                        ⚠️ {error}
                    </div>
                )}

                <div className="modal-actions">
                    <button
                        className="btn-secondary"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                    <button
                        className="btn-primary"
                        onClick={handleCrear}
                        disabled={loading || loadingCats}
                    >
                        {loading
                            ? "Creando..."
                            : "Crear ticket"}
                    </button>
                </div>

            </div>
        </Modal>
    );
}

function Campo({ label, required, children }) {
    return (
        <div className="campo-modal">
            <label>
                {label}

                {required && (
                    <span className="required">
                        *
                    </span>
                )}
            </label>

            {children}
        </div>
    );
}