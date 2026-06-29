import "../styles/Table.css";
import { useNavigate } from "react-router-dom";

export default function Table({ tabla }) {
    const navigate = useNavigate();

    const getBadgeClass = (tipo, valor) => {
        const texto = String(valor).toLowerCase();

        if (tipo === "estado") {
            if (texto.includes("abierto") || texto.includes("pendiente"))
                return "badge-pendiente";

            if (
                texto.includes("progreso") ||
                texto.includes("revisión") ||
                texto.includes("asignado")
            )
                return "badge-proceso";

            if (
                texto.includes("cerrado") ||
                texto.includes("resuelto")
            )
                return "badge-completado";
        }

        if (tipo === "prioridad") {
            if (texto.includes("crítica") || texto.includes("alta"))
                return "badge-alta";

            if (texto.includes("media"))
                return "badge-media";

            return "badge-baja";
        }

        return "";
    };

    return (
        <div className="tickets-table-card">

            <div className="tickets-table-wrapper">

                <table className="tickets-table">

                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Título</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th>Prioridad</th>
                            <th>Solicitante</th>
                            <th>Categoría</th>
                        </tr>
                    </thead>

                    <tbody>

                        {tabla.map((item) => (

                            <tr
                                key={item.id}
                                className="tabla-row"
                                onClick={() => navigate(`/tickets/${item.id}`)}
                            >

                                <td>
                                    <span className="codigo-ticket">
                                        {item.codigo_ticket}
                                    </span>
                                </td>

                                <td className="titulo-ticket">
                                    {item.titulo}
                                </td>

                                <td className="texto-secundario">
                                    {new Date(item.fecha_creacion)
                                        .toLocaleDateString("es-PE")}
                                </td>

                                <td>
                                    <span className={`badge ${getBadgeClass("estado", item.estado)}`}>
                                        {item.estado}
                                    </span>
                                </td>

                                <td>
                                    <span className={`badge ${getBadgeClass("prioridad", item.prioridad)}`}>
                                        {item.prioridad}
                                    </span>
                                </td>

                                <td className="texto-principal">
                                    {item.solicitante_correo}
                                </td>

                                <td className="texto-secundario">
                                    {item.categoria}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}