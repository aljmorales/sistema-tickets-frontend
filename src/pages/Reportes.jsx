import { useEffect, useState } from "react";
import api from "../api/axios.js";

import PageHeader from "../components/PageHeader";

import ReportesFiltros from "../components/reportes/ReportesFiltros.jsx";
import ReportesTarjetas from "../components/reportes/ReportesTarjetas.jsx";
import ReportesGraficos from "../components/reportes/ReportesGraficos.jsx";
import ReportesTabla from "../components/reportes/ReportesTabla.jsx";

import "../styles/Reportes.css";

export default function Reportes() {
    const [filtros, setFiltros] = useState({
        estado: "",
        prioridad: "",
        desde: "",
        hasta: "",
    });

    const [resumen, setResumen] = useState(null);
    const [estados, setEstados] = useState([]);
    const [prioridades, setPrioridades] = useState([]);
    const [tecnicos, setTecnicos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [porMes, setPorMes] = useState([]);
    const [tickets, setTickets] = useState([]);

    const [loading, setLoading] = useState(false);
    const [generado, setGenerado] = useState(false);

    useEffect(() => {
        cargarDashboard();
    }, []);

    async function cargarDashboard() {
        try {
            const [
                resRes,
                estRes,
                priRes,
                tecRes,
                catRes,
                mesRes,
            ] = await Promise.allSettled([
                api.get("/dashboard"),
                api.get("/dashboard/estados"),
                api.get("/dashboard/prioridades"),
                api.get("/dashboard/tecnicos"),
                api.get("/dashboard/categorias"),
                api.get("/dashboard/ultimos-7-dias"),
            ]);

            if (resRes.status === "fulfilled")
                setResumen(resRes.value.data.body);

            if (estRes.status === "fulfilled")
                setEstados(estRes.value.data.body ?? []);

            if (priRes.status === "fulfilled")
                setPrioridades(priRes.value.data.body ?? []);

            if (tecRes.status === "fulfilled")
                setTecnicos(tecRes.value.data.body ?? []);

            if (catRes.status === "fulfilled")
                setCategorias(catRes.value.data.body ?? []);

            if (mesRes.status === "fulfilled") {
                console.log("ultimos 7 dias:", mesRes.value.data.body);
                setPorMes(mesRes.value.data.body ?? []);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function handleGenerar() {
        setLoading(true);

        try {
            const params = new URLSearchParams();

            if (filtros.estado)
                params.append("estado", filtros.estado);

            if (filtros.prioridad)
                params.append("prioridad", filtros.prioridad);

            if (filtros.desde)
                params.append("desde", filtros.desde);

            if (filtros.hasta)
                params.append("hasta", filtros.hasta);

            const response = await api.get(
                `/tickets?${params.toString()}`
            );

            setTickets(
                response.data.body?.data ??
                response.data.body ??
                []
            );

            setGenerado(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    function handleFiltro(e) {
        const { name, value } = e.target;

        setFiltros((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="reportes-page">

            <PageHeader
                titulo="📊 Reportes"
                descripcion="Analiza métricas, tendencias y rendimiento del sistema"
            />
            <ReportesFiltros
                filtros={filtros}
                onChange={handleFiltro}
                onGenerar={handleGenerar}
                loading={loading}
            />

            {loading && (
                <div className="reportes-loading" />
            )}

            {!loading && !generado && (
                <div className="reportes-empty">
                    <div className="reportes-empty-icon">
                        📈
                    </div>

                    <h3>
                        Genera un reporte
                    </h3>

                    <p>
                        Selecciona filtros y obtén estadísticas,
                        gráficos y exportaciones de tickets.
                    </p>
                </div>
            )}

            {!loading && generado && (
                <>
                    {/* Tabla justo después de los filtros */}
                    <div className="reportes-seccion">
                        <ReportesTabla tickets={tickets} />
                    </div>

                    {/* Tarjetas resumen */}
                    <div className="reportes-seccion">
                        <ReportesTarjetas resumen={resumen} />
                    </div>

                    {/* Gráficos */}
                    <div className="reportes-seccion">
                        <ReportesGraficos
                            estados={estados}
                            prioridades={prioridades}
                            categorias={categorias}
                            tecnicos={tecnicos}
                            porMes={porMes}
                        />
                    </div>
                </>
            )}


        </div>
    );
}