import { useState, useRef } from "react";
import api from "../../api/axios.js";
import Modal from "./Modal.jsx";
import "../../styles/modals/ModalAdjunto.css";

function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ModalAdjunto({ ticketId, comentarioId = null, onClose, onSuccess }) {
    const [archivo, setArchivo] = useState(null);
    const [dragOver, setDragOver] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const inputRef = useRef(null);

    function seleccionarArchivo(file) {
        if (file) setArchivo(file);
    }

    function onDrop(e) {
        e.preventDefault();
        setDragOver(false);
        seleccionarArchivo(e.dataTransfer.files[0]);
    }

    async function handleSubir() {
        if (!archivo) {
            setError("Selecciona un archivo.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const form = new FormData();
            form.append("archivo", archivo);
            form.append("ticket_id", ticketId);
            if (comentarioId) form.append("comentario_id", comentarioId);

            await api.post("/adjuntos", form, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            onSuccess?.();
            onClose();
        } catch (err) {
            setError(err.response?.data?.mensaje ?? "Error al subir el archivo.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal titulo="Adjuntar archivo" onClose={onClose}>
            <div className="modal-adjunto">

                <div
                    className={`dropzone ${dragOver ? "dropzone-active" : ""}`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={onDrop}
                    onClick={() => inputRef.current?.click()}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        className="input-hidden"
                        accept=".pdf,.png,.jpg,.jpeg,.gif,.txt,.zip"
                        onChange={(e) => seleccionarArchivo(e.target.files[0] ?? null)}
                    />

                    {archivo ? (
                        <div className="archivo-info">
                            <div className="archivo-icono">📎</div>
                            <p className="archivo-nombre">{archivo.name}</p>
                            <p className="archivo-size">{formatBytes(archivo.size)}</p>
                        </div>
                    ) : (
                        <div className="dropzone-empty">
                            <div className="dropzone-icon">☁️</div>
                            <p className="dropzone-title">Arrastra tu archivo aquí</p>
                            <p className="dropzone-separator">o</p>
                            <span className="dropzone-link">Seleccionar archivo</span>
                            <p className="dropzone-hint">PDF, PNG, JPG, TXT, ZIP · máx 10 MB</p>
                        </div>
                    )}
                </div>

                {archivo && (
                    <button className="btn-remove-file" onClick={() => setArchivo(null)}>
                        ✕ Quitar archivo
                    </button>
                )}

                {error && <div className="error-message">{error}</div>}

                <div className="modal-actions">
                    <button className="btn-secondary" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="btn-primary" disabled={loading || !archivo} onClick={handleSubir}>
                        {loading ? "Subiendo..." : "Subir"}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
