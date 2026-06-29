import { useState } from "react";
import { Campo, InputReadOnly, Seccion, Alerta } from "./configuracionHelpers.jsx";
import "../../styles/configuracion/ConfigPerfil.css";

const ROL_LABEL = {
    1: "Administrador",
    2: "Técnico",
    3: "Usuario",
};

export default function ConfigPerfil({ usuario }) {
    const [perfil, setPerfil] = useState({
        nombres: usuario.nombres ?? "",
        apellidos: usuario.apellidos ?? "",
        correo: usuario.correo ?? "",
    });

    const [msg, setMsg] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setPerfil((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const guardar = () => {
        setMsg({
            tipo: "info",
            texto: "Esta funcionalidad está deshabilitada porque el sistema se encuentra en modo demostración.",
        });
    };

    return (
        <Seccion
            titulo="Perfil"
            descripcion="Información personal de la cuenta"
        >
            <div className="perfil-demo-banner">
                <span>🎭</span>

                <div>
                    <p className="perfil-demo-title">
                        Modo demostración activo
                    </p>

                    <p className="perfil-demo-text">
                        Los datos mostrados son referenciales y no pueden modificarse.
                    </p>
                </div>
            </div>

            <div className="perfil-avatar-card">
                <span className="perfil-avatar">
                    {perfil.nombres?.charAt(0).toUpperCase()}
                </span>

                <div>
                    <p className="perfil-nombre">
                        {perfil.nombres} {perfil.apellidos}
                    </p>

                    <p className="perfil-correo">
                        {perfil.correo}
                    </p>
                </div>
            </div>

            <div className="perfil-grid">
                <Campo label="Nombres">
                    <input
                        name="nombres"
                        value={perfil.nombres}
                        onChange={handleChange}
                        className="perfil-input"
                    />
                </Campo>

                <Campo label="Apellidos">
                    <input
                        name="apellidos"
                        value={perfil.apellidos}
                        onChange={handleChange}
                        className="perfil-input"
                    />
                </Campo>
            </div>

            <Campo label="Correo electrónico">
                <input
                    type="email"
                    name="correo"
                    value={perfil.correo}
                    onChange={handleChange}
                    className="perfil-input"
                />
            </Campo>

            <div className="perfil-grid">
                <Campo label="Departamento">
                    <InputReadOnly value={usuario.departamento} />
                </Campo>

                <Campo label="Rol">
                    <InputReadOnly value={ROL_LABEL[usuario.rol_id]} />
                </Campo>
            </div>

            <Alerta tipo={msg?.tipo} mensaje={msg?.texto} />

            <div className="perfil-actions">
                <button
                    onClick={guardar}
                    className="perfil-btn-demo"
                >
                    Guardar cambios
                </button>

                <span className="perfil-demo-badge">
                    Demo
                </span>
            </div>
        </Seccion>
    );
}