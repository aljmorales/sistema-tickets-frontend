import "../../styles/ticket/TicketComentarios.css";

export default function TicketComentarios({ comentarios }) {
    return (
        <div className="ticket-comentarios">
        <h3>
            Comentarios{" "}
            <span className="text-gray-400 font-normal text-sm">
            ({comentarios.length})
            </span>
        </h3>

        {comentarios.length === 0 ? (
            <p className="ticket-comentarios-empty">Sin comentarios aún</p>
        ) : (
            <div className="space-y-3">
            {comentarios.map((c) => (
                <div
                key={c.id}
                className={`comentario-card ${c.es_interno ? "interno" : ""}`}
                >
                <div className="comentario-header">
                    <div className="comentario-user">
                    <span className="comentario-avatar">
                        {c.autor?.charAt(0).toUpperCase()}
                    </span>
                    <span className="comentario-nombre">{c.autor}</span>
                    {c.es_interno === 1 && (
                        <span className="comentario-interno-badge">
                            🔒 Interno
                        </span>
                    )}
                    </div>
                    <span className="comentario-fecha">
                    {new Date(c.fecha_creacion).toLocaleString("es-PE", {
                        dateStyle: "medium",
                        timeStyle: "short",
                    })}
                    </span>
                </div>
                <p className="comentario-texto">{c.comentario}</p>
                </div>
            ))}
            </div>
        )}
        </div>
    );
}
