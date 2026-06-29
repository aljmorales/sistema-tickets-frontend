import "../../styles/reportes/ReportesTabla.css";

function exportarCSV(datos, nombre) {
    if (!datos.length) return;
    
    // Obtener encabezados
    const headers = Object.keys(datos[0]).join(",");
    
    // Mapear filas asegurando que si un texto tiene comas, se envuelva en comillas para no romper el CSV
    const filas = datos.map((d) => 
        Object.values(d)
            .map(val => typeof val === "string" ? `"${val.replace(/"/g, '""')}"` : val)
            .join(",")
    ).join("\n");
    
    const blob = new Blob([`${headers}\n${filas}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${nombre}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

const COLUMNAS = ["Código", "Título", "Estado", "Prioridad", "Categoría", "Solicitante", "Fecha"];

export default function ReportesTabla({ tickets }) {
    function handleExportar() {
        const filas = tickets.map((t) => ({
            codigo:         t.codigo_ticket,
            titulo:         t.titulo,
            estado:         t.estado,
            prioridad:      t.prioridad,
            categoria:      t.categoria,
            solicitante:    `${t.solicitante_nombres} ${t.solicitante_apellidos}`,
            fecha_creacion: new Date(t.fecha_creacion).toLocaleDateString("es-PE"),
        }));
        exportarCSV(filas, "reporte_tickets");
    }

    // Función auxiliar para aplicar colores dinámicos a los badges según el texto
    const getBadgeClass = (tipo, valor) => {
        const val = String(valor).toLowerCase();
        if (tipo === "estado") {
            if (val.includes("abierto") || val.includes("pendiente")) return "badge-pendiente";
            if (val.includes("proceso") || val.includes("atendiendo")) return "badge-proceso";
            return "badge-completado"; // cerrado / resuelto
        }
        if (tipo === "prioridad") {
            if (val.includes("alta") || val.includes("critica")) return "badge-alta";
            if (val.includes("media")) return "badge-media";
            return "badge-baja";
        }
        return "";
    };

    return (
        <div className="reportes-tabla-card">
            <div className="reportes-tabla-header">
                <div>
                    <h3 className="reportes-tabla-title">Resultados de Reportes</h3>
                    <p className="reportes-tabla-subtitle">
                        Mostrando <span className="tabla-conteo">{tickets.length} tickets</span> en total
                    </p>
                </div>
                <button onClick={handleExportar} className="btn-exportar">
                    📥 Exportar CSV
                </button>
            </div>

            <div className="reportes-tabla-wrapper">
                <table className="reportes-tabla">
                    <thead>
                        <tr>
                            {COLUMNAS.map((h) => (
                                <th key={h}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="tabla-vacia">
                                    No hay tickets con los filtros seleccionados
                                </td>
                            </tr>
                        ) : (
                            tickets.map((t) => (
                                <tr key={t.id} className="tabla-row">
                                    <td>
                                        <span className="codigo-ticket">{t.codigo_ticket}</span>
                                    </td>
                                    <td className="titulo-ticket">{t.titulo}</td>
                                    <td>
                                        <span className={`badge ${getBadgeClass("estado", t.estado)}`}>
                                            {t.estado}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${getBadgeClass("prioridad", t.prioridad)}`}>
                                            {t.prioridad}
                                        </span>
                                    </td>
                                    <td className="texto-secundario">{t.categoria}</td>
                                    <td className="texto-principal">
                                        {t.solicitante_nombres} {t.solicitante_apellidos}
                                    </td>
                                    <td className="texto-secundario">
                                        {new Date(t.fecha_creacion).toLocaleDateString("es-PE")}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}