import { useState } from "react";
import api from "../../api/axios.js";
import Modal from "../modals/Modal.jsx";
import "../../styles/modals/ModalEditarUsuario.css";

const ROLES = [
    { id: 1, nombre: "Administrador" },
    { id: 2, nombre: "Técnico" },
    { id: 3, nombre: "Usuario" },
];

const ESTADOS = ["activo", "inactivo"];

export default function ModalEditarUsuario({
    usuario,
    onClose,
    onSuccess,
}) {
    const [form, setForm] = useState({
        nombres: usuario.nombres ?? "",
        apellidos: usuario.apellidos ?? "",
        correo: usuario.correo ?? "",
        rol_id: usuario.rol_id ?? 3,
        estado: usuario.estado ?? "activo",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleGuardar() {
        if (
            !form.nombres.trim() ||
            !form.apellidos.trim() ||
            !form.correo.trim()
        ) {
            setError(
                "Nombre, apellido y correo son obligatorios."
            );
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await api.put(
                `/usuarios/${usuario.id}`,
                form
            );

            onSuccess?.();
            onClose();
        } catch (err) {
            setError(
                err.response?.data?.mensaje ??
                "Error al actualizar el usuario."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            titulo="Editar usuario"
            onClose={onClose}
        >
            <div className="modal-editar-usuario">

                <div className="usuario-card">
                    <div className="usuario-avatar">
                        {usuario.nombres?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h3>
                            {usuario.nombres} {usuario.apellidos}
                        </h3>

                        <p>
                            Usuario #{usuario.id}
                        </p>
                    </div>
                </div>

                <div className="form-grid">
                    <Campo
                        label="Nombres"
                        required
                    >
                        <input
                            className="input-control"
                            name="nombres"
                            value={form.nombres}
                            onChange={handleChange}
                        />
                    </Campo>

                    <Campo
                        label="Apellidos"
                        required
                    >
                        <input
                            className="input-control"
                            name="apellidos"
                            value={form.apellidos}
                            onChange={handleChange}
                        />
                    </Campo>
                </div>

                <Campo
                    label="Correo electrónico"
                    required
                >
                    <input
                        type="email"
                        name="correo"
                        value={form.correo}
                        onChange={handleChange}
                        className="input-control"
                    />
                </Campo>

                <div className="form-grid">
                    <Campo label="Rol">
                        <select
                            name="rol_id"
                            value={form.rol_id}
                            onChange={handleChange}
                            className="input-control"
                        >
                            {ROLES.map((rol) => (
                                <option
                                    key={rol.id}
                                    value={rol.id}
                                >
                                    {rol.nombre}
                                </option>
                            ))}
                        </select>
                    </Campo>

                    <Campo label="Estado">
                        <select
                            name="estado"
                            value={form.estado}
                            onChange={handleChange}
                            className="input-control"
                        >
                            {ESTADOS.map((estado) => (
                                <option
                                    key={estado}
                                    value={estado}
                                >
                                    {estado.charAt(0).toUpperCase() +
                                        estado.slice(1)}
                                </option>
                            ))}
                        </select>
                    </Campo>
                </div>

                {error && (
                    <div className="modal-error">
                        {error}
                    </div>
                )}

                <div className="modal-actions">
                    <button
                        className="btn-secundario"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                    <button
                        className="btn-primario"
                        onClick={handleGuardar}
                        disabled={loading}
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

function Campo({
    label,
    required,
    children,
}) {
    return (
        <div className="campo">
            <label className="campo-label">
                {label}

                {required && (
                    <span>*</span>
                )}
            </label>

            {children}
        </div>
    );
}