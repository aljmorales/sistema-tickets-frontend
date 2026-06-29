import { useState } from "react";
import api from "../../api/axios.js";
import Modal from "./Modal.jsx";
import "../../styles/modals/ModalComentario.css"

export default function ModalComentario({ ticketId, onClose, onSuccess }) {
    const [comentario, setComentario]   = useState("");
    const [esInterno, setEsInterno]     = useState(false);
    const [archivo, setArchivo]         = useState(null);
    const [loading, setLoading]         = useState(false);
    const [error, setError]             = useState(null);

    async function handleSubmit() {
        if (!comentario.trim()) {
            setError("El comentario no puede estar vacío.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
        const resComentario = await api.post(`/tickets/comentarios/${ticketId}`, {
                comentario: comentario.trim(),
                es_interno: esInterno ? 1 : 0,
            });

            // body ahora es el objeto mysql: { insertId: 5, affectedRows: 1, ... }
            const comentarioId = resComentario.data.body?.insertId;

            if (archivo && comentarioId) {
                const form = new FormData();
                form.append("archivo",      archivo);
                form.append("ticket_id",    ticketId);
                form.append("comentario_id", comentarioId);

                await api.post("/adjuntos", form, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            onSuccess?.();
            onClose();
        } catch (err) {
            setError(err.response?.data?.mensaje ?? "Error al enviar el comentario.");
        } finally {
            setLoading(false);
        }
    }

    function leerArchivoBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload  = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    return (
        <Modal titulo="Nuevo comentario" onClose={onClose}>
            <div className="modal-comentario">

                <div className="form-group">
                    <label className="form-label">
                        Comentario
                        <span className="form-required"> *</span>
                    </label>

                    <textarea
                        rows={4}
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        placeholder="Escribe tu comentario aquí..."
                        className="form-textarea"
                    />
                </div>

                <label className="checkbox-container">
                    <input
                        type="checkbox"
                        checked={esInterno}
                        onChange={(e) => setEsInterno(e.target.checked)}
                    />

                    Comentario interno (solo visible para el equipo)
                </label>

                <div className="form-group">
                    <label className="form-label">
                        Adjunto
                        <span className="form-optional">
                            {" "} (opcional)
                        </span>
                    </label>

                    <div className="upload-box">

                        {archivo ? (
                            <div className="upload-file">

                                <span className="upload-file-name">
                                    📎 {archivo.name}
                                </span>

                                <button
                                    type="button"
                                    className="upload-remove"
                                    onClick={() => setArchivo(null)}
                                >
                                    ✕
                                </button>

                            </div>
                        ) : (
                            <div className="upload-empty">

                                <p className="upload-text">
                                    Arrastra un archivo o
                                </p>

                                <label className="upload-link">
                                    Seleccionar archivo

                                    <input
                                        type="file"
                                        className="hidden-input"
                                        onChange={(e) =>
                                            setArchivo(
                                                e.target.files[0] ?? null
                                            )
                                        }
                                    />
                                </label>

                            </div>
                        )}

                    </div>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
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
                        onClick={handleSubmit}
                        disabled={loading}
                        className="btn-primary"
                    >
                        {loading
                            ? "Enviando..."
                            : "Enviar comentario"}
                    </button>

                </div>
            </div>
        </Modal>
    );
}