import "../styles/PageHeader.css";

export default function PageHeader({
    titulo,
    descripcion,
    acciones
}) {
    return (
        <div className="page-header">
            <div className="page-header-info">
                <h1>{titulo}</h1>
                <p>{descripcion}</p>
            </div>

            <div className="page-header-actions">
                {acciones}
            </div>
        </div>
    );
}