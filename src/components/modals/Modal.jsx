import { useEffect } from "react";
import "../../styles/modals/Modal.css";

export default function Modal({
    titulo,
    onClose,
    children
}) {

    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handler);

        return () =>
            document.removeEventListener("keydown", handler);

    }, [onClose]);

    return (
        <div
            className="modal-overlay"
            onClick={onClose}
        >
            <div
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">

                    <h2 className="modal-title">
                        {titulo}
                    </h2>

                    <button
                        onClick={onClose}
                        className="modal-close"
                    >
                        ×
                    </button>

                </div>

                <div className="modal-body">
                    {children}
                </div>

            </div>
        </div>
    );
}