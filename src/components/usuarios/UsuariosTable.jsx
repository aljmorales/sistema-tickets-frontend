import { useState } from "react";
import ModalEditarUsuario   from "../../components/modals/ModalEditarUsuario";
import ModalEliminarUsuario from "../../components/modals/ModalEliminarUsuario";
import "../../styles/usuarios/UsuariosTable.css";

export default function UsuariosTable({ tabla, onActualizar }) {
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [modal, setModal] = useState(null); // "editar" | "eliminar"

    function abrirEditar(usuario) {
        setUsuarioSeleccionado(usuario);
        setModal("editar");
    }

    function abrirEliminar(usuario) {
        setUsuarioSeleccionado(usuario);
        setModal("eliminar");
    }

    function cerrarModal() {
        setModal(null);
        setUsuarioSeleccionado(null);
    }

    function actualizarUsuario(usuarioActualizado) {
        setTabla((prev) =>
            prev.map((u) =>
                u.id === usuarioActualizado.id
                    ? usuarioActualizado
                    : u
            )
        );

        setTablaOriginal((prev) =>
            prev.map((u) =>
                u.id === usuarioActualizado.id
                    ? usuarioActualizado
                    : u
            )
        );
    }

    return (
        <>
            <div className="usuarios-table-wrapper">
                <table className="usuarios-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Correo</th>
                            <th>Fecha</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tabla.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="usuarios-empty">
                                    No se encontraron usuarios.
                                </td>
                            </tr>
                        ) : (
                            tabla.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>

                                    <td>
                                        <div className="usuario-info">
                                            <div className="usuario-avatar">
                                                {item.nombres?.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="usuario-nombre">
                                                    {item.nombres} {item.apellidos}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td>{item.correo}</td>

                                    <td>
                                        {new Date(item.fecha_creacion).toLocaleDateString("es-PE")}
                                    </td>

                                    <td>
                                        <span className={`rol-badge rol-${item.rol?.toLowerCase().replace(" ", "-")}`}>
                                            {item.rol}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="acciones">
                                            <button
                                                className="btn-icon editar"
                                                title="Editar"
                                                onClick={() => abrirEditar(item)}
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                className="btn-icon eliminar"
                                                title="Eliminar"
                                                onClick={() => abrirEliminar(item)}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modales */}
            {modal === "editar" && usuarioSeleccionado && (
                <ModalEditarUsuario
                    usuario={usuarioSeleccionado}
                    onClose={cerrarModal}
                    onSuccess={onActualizar}
                />
            )}
            {modal === "eliminar" && usuarioSeleccionado && (
                <ModalEliminarUsuario
                    usuario={usuarioSeleccionado}
                    onClose={cerrarModal}
                    onSuccess={onActualizar}
                />
            )}
        </>
    );
}