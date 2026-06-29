import "../../styles/ticket/TicketAdjuntos.css";

const ICONO_POR_TIPO = {
    "application/pdf": "📄",
    "image/png": "🖼️",
    "image/jpeg": "🖼️",
    "image/gif": "🖼️",
    "text/plain": "📝",
    "application/zip": "🗜️",
};

function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function TicketAdjuntos({ adjuntos }) {
    return (
        <div className="ticket-adjuntos">
        <h3>
            Adjuntos{" "}
            <span className="text-gray-400 font-normal text-sm">
            ({adjuntos.length})
            </span>
        </h3>

        {adjuntos.length === 0 ? (
            <p className="ticket-adjuntos-empty">Sin archivos adjuntos</p>
        ) : (
            <div className="space-y-2">
            {adjuntos.map((a) => {
                const icono = ICONO_POR_TIPO[a.tipo_archivo] ?? "📎";
                return (
                <div key={a.id} className="adjunto-item">
                    <span className={`adjunto-icono tipo-${a.tipo_archivo}`}>{icono}</span>

                    <div className="adjunto-info">
                        <a
                        href={`${a.ruta}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="adjunto-nombre"
                        >
                            {a.nombre_archivo}
                        </a>

                        <p className="adjunto-meta">
                            {a.tipo_archivo} · {formatBytes(a.tamaño)}
                        </p>
                    </div>

                    <span className="adjunto-descarga">
                        ⬇
                    </span>
                </div>
                );
            })}
            </div>
        )}
        </div>
    );
}
