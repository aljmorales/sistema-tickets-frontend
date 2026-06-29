import { useState, useEffect } from "react";
import api from "../../api/axios.js";
import Modal from "./Modal.jsx";
import "../../styles/modals/ModalNuevoUsuario.css";

const ROLES = [
    { id: 1, nombre: "Administrador" },
    { id: 2, nombre: "Técnico" },
    { id: 3, nombre: "Usuario" },
];

export default function ModalNuevoUsuario({ onClose, onSuccess }) {
    const [form, setForm] = useState({
        nombres: "",
        apellidos: "",
        correo: "",
        contraseña: "",
        confirmar: "",
        rol_id: 3,
        departamento_id: "",
    });

    const [departamentos, setDepartamentos] = useState([]);
    const [loadingDepts, setLoadingDepts] = useState(true);
    const [mostrarPass, setMostrarPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get("/departamentos")
            .then((res) => setDepartamentos(res.data.body ?? []))
            .catch(() => {})
            .finally(() => setLoadingDepts(false));
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleCrear() {
        if (
            !form.nombres.trim() ||
            !form.apellidos.trim() ||
            !form.correo.trim()
        ) {
            setError("Nombre, apellido y correo son obligatorios.");
            return;
        }

        if (!form.contraseña) {
            setError("La contraseña es obligatoria.");
            return;
        }

        if (form.contraseña !== form.confirmar) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        if (form.contraseña.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await api.post("/usuarios", {
                nombres: form.nombres.trim(),
                apellidos: form.apellidos.trim(),
                correo: form.correo.trim(),
                contraseña: form.contraseña,
                rol_id: Number(form.rol_id),
                departamento_id: form.departamento_id
                    ? Number(form.departamento_id)
                    : null,
            });

            onSuccess?.();
            onClose();
        } catch (err) {
            setError(
                err.response?.data?.mensaje ??
                "Error al crear el usuario."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal titulo="Nuevo usuario" onClose={onClose}>
            <div className="nuevo-usuario-modal">

                <div className="nuevo-usuario-info">
                    <span className="nuevo-usuario-icon">
                        👤
                    </span>

                    <div>
                        <p className="nuevo-usuario-info-title">
                            Registrar usuario
                        </p>

                        <p className="nuevo-usuario-info-text">
                            Crea una nueva cuenta y asigna su rol dentro del sistema.
                        </p>
                    </div>
                </div>

                {/* Nombres / Apellidos */}
                <div className="nuevo-usuario-grid">
                    <Campo label="Nombres" required>
                        <input
                            type="text"
                            name="nombres"
                            value={form.nombres}
                            onChange={handleChange}
                            placeholder="Ingrese nombres"
                            className="input"
                        />
                    </Campo>

                    <Campo label="Apellidos" required>
                        <input
                            type="text"
                            name="apellidos"
                            value={form.apellidos}
                            onChange={handleChange}
                            placeholder="Ingrese apellidos"
                            className="input"
                        />
                    </Campo>
                </div>

                {/* Correo */}
                <Campo label="Correo electrónico" required>
                    <input
                        type="email"
                        name="correo"
                        value={form.correo}
                        onChange={handleChange}
                        placeholder="correo@ejemplo.com"
                        className="input"
                    />
                </Campo>

                {/* Contraseñas */}
                <div className="nuevo-usuario-grid">
                    <Campo label="Contraseña" required>
                        <div className="password-wrapper">
                            <input
                                type={mostrarPass ? "text" : "password"}
                                name="contraseña"
                                value={form.contraseña}
                                onChange={handleChange}
                                placeholder="Mínimo 6 caracteres"
                                className="input"
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setMostrarPass((prev) => !prev)
                                }
                            >
                                {mostrarPass ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </Campo>

                    <Campo label="Confirmar contraseña" required>
                        <input
                            type={mostrarPass ? "text" : "password"}
                            name="confirmar"
                            value={form.confirmar}
                            onChange={handleChange}
                            placeholder="Repita la contraseña"
                            className="input"
                        />
                    </Campo>
                </div>

                {form.confirmar && (
                    <p
                        className={`password-match ${
                            form.contraseña === form.confirmar
                                ? "success"
                                : "error"
                        }`}
                    >
                        {form.contraseña === form.confirmar
                            ? "✓ Las contraseñas coinciden"
                            : "✗ Las contraseñas no coinciden"}
                    </p>
                )}

                {/* Rol / Departamento */}
                <div className="nuevo-usuario-grid">
                    <Campo label="Rol">
                        <select
                            name="rol_id"
                            value={form.rol_id}
                            onChange={handleChange}
                            className="input"
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

                    <Campo label="Departamento">
                        {loadingDepts ? (
                            <div className="input">
                                Cargando...
                            </div>
                        ) : (
                            <select
                                name="departamento_id"
                                value={form.departamento_id}
                                onChange={handleChange}
                                className="input"
                            >
                                <option value="">
                                    — Ninguno —
                                </option>

                                {departamentos.map((d) => (
                                    <option
                                        key={d.id}
                                        value={d.id}
                                    >
                                        {d.nombre}
                                    </option>
                                ))}
                            </select>
                        )}
                    </Campo>
                </div>

                {error && (
                    <div className="modal-error">
                        ⚠️ {error}
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
                        onClick={handleCrear}
                        disabled={loading}
                        className="btn-primary"
                    >
                        {loading
                            ? "Creando..."
                            : "Crear usuario"}
                    </button>
                </div>
            </div>
        </Modal>
    );
}

function Campo({ label, required, children }) {
    return (
        <div className="form-group">
            <label className="form-label">
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