import PageHeader from "../components/PageHeader";

import ConfigPerfil from "../components/configuracion/ConfigPerfil.jsx";
import ConfigSeguridad from "../components/configuracion/ConfigSeguridad.jsx";
import ConfigSesion from "../components/configuracion/ConfigSesion.jsx";

import "../styles/Configuracion.css";

export default function Configuracion() {

    const usuario =
        JSON.parse(localStorage.getItem("usuario") ?? "null") ?? {};

    return (
        <div className="configuracion-page">

            <PageHeader
                titulo="⚙️ Configuración"
                descripcion="Gestiona tu cuenta, seguridad y preferencias personales"
            />

            <div className="configuracion-layout">

                <div className="configuracion-columna-principal">
                    <ConfigPerfil usuario={usuario} />
                </div>

                <div className="configuracion-columna-secundaria">
                    <ConfigSeguridad usuarioId={usuario.id} />
                    <ConfigSesion ultimoAcceso={usuario.ultimo_acceso} />
                </div>

            </div>

        </div>
    );
}