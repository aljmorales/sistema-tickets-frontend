import "../../styles/configuracion/configuracionHelpers.css";

export function Campo({ label, children }) {
    return (
        <div className="config-campo">
            <label className="config-campo-label">
                {label}
            </label>

            {children}
        </div>
    );
}

export function InputReadOnly({ value }) {
    return (
        <div className="config-readonly">
            {value || "No disponible"}
        </div>
    );
}

export function Seccion({
    titulo,
    descripcion,
    icono = "⚙️",
    children
}) {
    return (
        <section className="config-seccion">

            <div className="config-seccion-header">

                <div>
                    <h2 className="config-seccion-titulo">
                        {titulo}
                    </h2>

                    {descripcion && (
                        <p className="config-seccion-descripcion">
                            {descripcion}
                        </p>
                    )}
                </div>

            </div>

            <div className="config-seccion-content">
                {children}
            </div>

        </section>
    );
}

export function Alerta({ tipo, mensaje }) {
    if (!mensaje) return null;

    const clases = {
        ok: "config-alert success",
        error: "config-alert error",
        info: "config-alert info",
    };

    const iconos = {
        ok: "✅",
        error: "⚠️",
        info: "ℹ️",
    };

    return (
        <div className={clases[tipo] || clases.info}>
            <span>{iconos[tipo]}</span>
            <span>{mensaje}</span>
        </div>
    );
}