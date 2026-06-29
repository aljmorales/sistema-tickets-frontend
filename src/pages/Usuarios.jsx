import { useEffect, useState } from "react";
import api from "../api/axios.js";

import UsuariosTable from "../components/usuarios/UsuariosTable.jsx";
import PageHeader from "../components/PageHeader";
import ModalNuevoUsuario from "../components/modals/ModalNuevoUsuario.jsx";

import "../styles/Usuarios.css";

export default function Usuarios() {
    const [tablaOriginal, setTablaOriginal]   = useState([]);
    const [tabla, setTabla]                   = useState([]);
    const [busqueda, setBusqueda]             = useState("");
    const [rolSeleccionado, setRolSeleccionado] = useState("");
    const [modalAbierto, setModalAbierto]     = useState(false);

    async function obtenerDatos() {
        const response = await api.get("/usuarios");
        setTablaOriginal(response.data.body);
        setTabla(response.data.body);
    }

    useEffect(() => {
        obtenerDatos();
    }, []);

    useEffect(() => {
        const filtrados = tablaOriginal.filter((u) => {
            const coincideBusqueda = `${u.nombres} ${u.apellidos} ${u.correo}`
                .toLowerCase()
                .includes(busqueda.toLowerCase());

            const coincideRol = rolSeleccionado
                ? u.rol === rolSeleccionado
                : true;

            return coincideBusqueda && coincideRol;
        });
        setTabla(filtrados);
    }, [busqueda, rolSeleccionado, tablaOriginal]);

    return (
        <div className="usuarios-page">
            <PageHeader
                titulo="👥 Gestión de Usuarios"
                descripcion="Administra usuarios, roles y permisos"
                acciones={
                    <button onClick={() => setModalAbierto(true)}>
                        + Nuevo usuario
                    </button>
                }
            />

            <div className="usuarios-filtros-card">
                <div className="usuarios-filtro">
                    <label>Buscar usuario</label>
                    <input
                        type="text"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="Nombre o correo..."
                    />
                </div>
                <div className="usuarios-filtro">
                    <label>Rol</label>
                    <select value={rolSeleccionado} onChange={(e) => setRolSeleccionado(e.target.value)}>
                        <option value="">Todos los roles</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Técnico">Técnico</option>
                        <option value="Usuario">Usuario</option>
                    </select>
                </div>
            </div>

            <div className="usuarios-table-card">
                <UsuariosTable tabla={tabla} onActualizar={obtenerDatos} />
            </div>

            {modalAbierto && (
                <ModalNuevoUsuario
                    onClose={() => setModalAbierto(false)}
                    onSuccess={obtenerDatos}
                />
            )}
        </div>
    );
}
