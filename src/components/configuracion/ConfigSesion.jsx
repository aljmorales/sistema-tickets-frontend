import { useNavigate } from "react-router-dom";
import { Seccion } from "./configuracionHelpers.jsx";
import "../../styles/configuracion/ConfigSesion.css";

export default function ConfigSesion({ ultimoAcceso }) {
    const navigate = useNavigate();

    function cerrarSesion() {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        navigate("/login");
    }

    const fechaFormateada = ultimoAcceso
            ? new Date(ultimoAcceso).toLocaleString("es-PE", {
                dateStyle: "medium",
                timeStyle: "short",
            })
            : new Date().toLocaleString("es-PE", {
                dateStyle: "medium",
                timeStyle: "short",
            });

    return (
        <Seccion
            titulo="Sesión"
            descripcion="Información relacionada con tu acceso actual"
        >
            <div className="sesion-banner">
                <span>🛡️</span>

                <div>
                    <p className="sesion-banner-title">
                        Sesión activa
                    </p>

                    <p className="sesion-banner-text">
                        Tu cuenta se encuentra autenticada correctamente.
                    </p>
                </div>
            </div>

            <div className="sesion-card">
                <div className="sesion-item">
                    <span className="sesion-icon">
                        🕒
                    </span>

                    <div>
                        <p className="sesion-label">
                            Último acceso
                        </p>

                        <p className="sesion-value">
                            {fechaFormateada}
                        </p>
                    </div>
                </div>

                <div className="sesion-divider"></div>

                <div className="sesion-item">
                    <span className="sesion-icon">
                        🔐
                    </span>

                    <div>
                        <p className="sesion-label">
                            Estado de sesión
                        </p>

                        <p className="sesion-status">
                            Activa
                        </p>
                    </div>
                </div>
            </div>

            <div className="sesion-actions">
                <button
                    onClick={cerrarSesion}
                    className="btn-cerrar-sesion"
                >
                    Cerrar sesión
                </button>
            </div>
        </Seccion>
    );
}