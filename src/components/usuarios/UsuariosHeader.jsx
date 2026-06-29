import "../../styles/usuarios/UsuariosHeader.css";

export default function UsuariosHeader({
    acciones
}) {
    return (
        <div className="usuarios-header">
            <div>
                <h1>👥 Gestión de Usuarios</h1>
                <p>
                    Administra usuarios, roles y permisos
                </p>
            </div>

            <div className="usuarios-header-actions">
                {acciones}
            </div>
        </div>
    );
}