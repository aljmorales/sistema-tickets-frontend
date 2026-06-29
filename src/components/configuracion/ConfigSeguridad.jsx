import { useState } from "react";
import { Campo, Seccion, Alerta } from "./configuracionHelpers.jsx";
import "../../styles/configuracion/ConfigSeguridad.css";

export default function ConfigSeguridad() {
    const [pass, setPass] = useState({
        actual: "",
        nueva: "",
        confirmar: "",
    });

    const [msg, setMsg] = useState(null);
    const [mostrarPass, setMostrarPass] = useState(false);

    const tipoInput = mostrarPass ? "text" : "password";

    function handleChange(e) {
        const { name, value } = e.target;

        setPass((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function actualizar() {
        setMsg({
            tipo: "info",
            texto: "Esta funcionalidad se encuentra deshabilitada en la versión demo.",
        });
    }

    return (
        <Seccion
            titulo="Seguridad"
            descripcion="Configuración relacionada con el acceso a la cuenta"
        >
            <div className="seguridad-demo-banner">
                <span>🔒</span>

                <div>
                    <p className="seguridad-demo-title">
                        Cambio de contraseña deshabilitado
                    </p>

                    <p className="seguridad-demo-text">
                        Esta funcionalidad está disponible únicamente en la versión completa del sistema.
                    </p>
                </div>
            </div>

            <div className="seguridad-card">
                <div className="seguridad-header">
                    <h4>Actualizar contraseña</h4>

                    <button
                        type="button"
                        onClick={() => setMostrarPass((v) => !v)}
                        className="toggle-password"
                    >
                        {mostrarPass ? "🙈 Ocultar" : "👁 Mostrar"}
                    </button>
                </div>

                <Campo label="Contraseña actual">
                    <input
                        name="actual"
                        type={tipoInput}
                        value={pass.actual}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="seguridad-input"
                    />
                </Campo>

                <div className="seguridad-grid">
                    <Campo label="Nueva contraseña">
                        <input
                            name="nueva"
                            type={tipoInput}
                            value={pass.nueva}
                            onChange={handleChange}
                            placeholder="Mínimo 6 caracteres"
                            className="seguridad-input"
                        />
                    </Campo>

                    <Campo label="Confirmar contraseña">
                        <input
                            name="confirmar"
                            type={tipoInput}
                            value={pass.confirmar}
                            onChange={handleChange}
                            placeholder="Repetir contraseña"
                            className="seguridad-input"
                        />
                    </Campo>
                </div>

                {pass.confirmar && (
                    <div
                        className={`password-status ${
                            pass.nueva === pass.confirmar
                                ? "success"
                                : "error"
                        }`}
                    >
                        {pass.nueva === pass.confirmar
                            ? "✓ Las contraseñas coinciden"
                            : "✗ Las contraseñas no coinciden"}
                    </div>
                )}

                <div className="password-rules">
                    <p>Recomendaciones:</p>

                    <ul>
                        <li>Mínimo 6 caracteres.</li>
                        <li>Combinar letras y números.</li>
                        <li>No reutilizar contraseñas anteriores.</li>
                    </ul>
                </div>
            </div>

            <Alerta tipo={msg?.tipo} mensaje={msg?.texto} />

            <div className="seguridad-actions">
                <button
                    onClick={actualizar}
                    className="seguridad-btn"
                >
                    Actualizar contraseña
                </button>

                <span className="seguridad-demo-badge">
                    Demo
                </span>
            </div>
        </Seccion>
    );
}