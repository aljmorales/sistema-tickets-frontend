import "../../styles/reportes/ReportesFiltros.css";

export default function ReportesFiltros({
    filtros,
    onChange,
    onGenerar,
    loading,
}) {
    return (
        <div className="reportes-filtros-card">

            <div className="reportes-filtros-header">
                <div>
                    <p className="reportes-filtros-title">
                        Filtros del reporte
                    </p>

                    <p className="reportes-filtros-description">
                        Personaliza la información que deseas analizar.
                    </p>
                </div>
            </div>

            <div className="reportes-filtros-grid">

                <Filtro label="Estado">
                    <select
                        name="estado"
                        value={filtros.estado}
                        onChange={onChange}
                        className="filtro-control"
                    >
                        <option value="">Todos</option>
                        <option value="1">Abierto</option>
                        <option value="2">En revisión</option>
                        <option value="3">Asignado</option>
                        <option value="4">En progreso</option>
                        <option value="5">Pendiente</option>
                        <option value="6">Resuelto</option>
                        <option value="7">Cerrado</option>
                        <option value="8">Cancelado</option>
                    </select>
                </Filtro>

                <Filtro label="Prioridad">
                    <select
                        name="prioridad"
                        value={filtros.prioridad}
                        onChange={onChange}
                        className="filtro-control"
                    >
                        <option value="">Todas</option>
                        <option value="1">Baja</option>
                        <option value="2">Media</option>
                        <option value="3">Alta</option>
                        <option value="4">Crítica</option>
                    </select>
                </Filtro>

                <Filtro label="Desde">
                    <input
                        type="date"
                        name="desde"
                        value={filtros.desde}
                        onChange={onChange}
                        className="filtro-control"
                    />
                </Filtro>

                <Filtro label="Hasta">
                    <input
                        type="date"
                        name="hasta"
                        value={filtros.hasta}
                        onChange={onChange}
                        className="filtro-control"
                    />
                </Filtro>

            </div>

            <div className="reportes-filtros-actions">
                <button
                    onClick={onGenerar}
                    disabled={loading}
                    className="btn-generar-reporte"
                >
                    {loading
                        ? "Generando..."
                        : "📊 Generar reporte"}
                </button>
            </div>

        </div>
    );
}

function Filtro({ label, children }) {
    return (
        <div className="filtro-grupo">
            <label className="filtro-label">
                {label}
            </label>

            {children}
        </div>
    );
}