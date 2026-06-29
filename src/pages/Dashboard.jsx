import { useEffect, useState } from "react";
import api from "../api/axios";

import TicketsPorEstado from "../components/TicketsPorEstado";
import { TicketsPorTecnico, TicketsPorUsuario } from "../components/TicketsBar";
import { TicketsRadar } from "../components/TicketsRadar";
import PageHeader from "../components/PageHeader";

import "../styles/Dashboard.css";

export default function Dashboard() {
    const [estados, setEstados] = useState([]);
    const [tecnicos, setTecnicos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [prioridades, setPrioridades] = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const [
                estadosRes,
                tecnicosRes,
                usuariosRes,
                prioridadesRes,
                categoriasRes,
            ] = await Promise.allSettled([
                api.get("/dashboard/estados"),
                api.get("/dashboard/tecnicos"),
                api.get("/dashboard/usuarios"),
                api.get("/dashboard/prioridades"),
                api.get("/dashboard/categorias"),
            ]);

            if (estadosRes.status === "fulfilled")
                setEstados(estadosRes.value.data.body ?? []);

            if (tecnicosRes.status === "fulfilled")
                setTecnicos(tecnicosRes.value.data.body ?? []);

            if (usuariosRes.status === "fulfilled")
                setUsuarios(usuariosRes.value.data.body ?? []);

            if (prioridadesRes.status === "fulfilled")
                setPrioridades(prioridadesRes.value.data.body ?? []);

            if (categoriasRes.status === "fulfilled")
                setCategorias(categoriasRes.value.data.body ?? []);
                    };

        fetchData();
    }, []);

    return (
        <div className="dashboard-container">
            <PageHeader
                            titulo="📶 Dashboard"
                            descripcion="Resumen general de tickets, técnicos, prioridades y categorías."

            />
            <section className="dashboard-section">
                <div className="card">

                    <TicketsPorEstado data={estados} />
                </div>
            </section>

            <section className="dashboard-grid">

                <div className="card">

                    <TicketsPorTecnico data={tecnicos} />
                </div>

                <div className="card">

                    <TicketsPorUsuario data={usuarios} />
                </div>

            </section>

            <section className="dashboard-grid">

                <div className="card">

                    <TicketsRadar
                        data={prioridades}
                        dataKeyName="prioridad"
                        title="Tickets por Prioridad"
                    />
                </div>

                <div className="card">

                    <TicketsRadar
                        data={categorias}
                        dataKeyName="nombre"
                        title="Tickets por Categoría"
                    />
                </div>

            </section>

        </div>
    );
}