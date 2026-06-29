import { useState } from "react";
import api from "../../api/axios.js";
import Modal from "../modals/Modal.jsx";
import "../../styles/modals/ModalEliminarUsuario.css";

export default function ModalEliminarUsuario({
    usuario,
    onClose,
    onSuccess,
}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleEliminar() {
        setError(
            "Esta funcionalidad no está disponible en la versión demo del sistema."
        );
    }

    return (
        <Modal
            titulo="Eliminar usuario"
            onClose={onClose}
        >
            <div className="modal-eliminar-usuario">

                <div className="eliminar-icono">
                    🗑️
                </div>

                <div className="eliminar-mensaje">
                    <h3>
                        ¿Eliminar este usuario?
                    </h3>

                    <p>
                        El usuario{" "}
                        <strong>
                            {usuario.nombres} {usuario.apellidos}
                        </strong>{" "}
                        será eliminado permanentemente.
                    </p>
                </div>

                <div className="usuario-resumen">
                    <div className="usuario-resumen-item">
                        <span>Correo</span>
                        <strong>{usuario.correo}</strong>
                    </div>

                    <div className="usuario-resumen-item">
                        <span>Rol</span>
                        <strong>{usuario.rol}</strong>
                    </div>
                </div>

                <div className="eliminar-alerta">
                    ⚠️ Esta acción no se puede deshacer.
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
                        className="btn-danger"
                        onClick={handleEliminar}
                        disabled={loading}
                    >
                        {loading
                            ? "Eliminando..."
                            : "Eliminar usuario"}
                    </button>
                </div>

            </div>
        </Modal>
    );
}