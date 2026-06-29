import "../styles/Navbar.css";
import logo from "../resources/menu__logo.png";

export default function Navbar() {
  const usuario = "Alfredo"; // CAMBIAR DINÁMICAMENTE

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login"; // redirige al login
    };

    return (
        <header className="navbar-principal">
        {/* Bloque izquierdo: logo + título */}
        <div className="navbar-left">
            <img src={logo} alt="logo" className="navbar-logo" />
            <h1 className="navbar-title">Sistema de Tickets</h1>
        </div>

        {/* Bloque derecho */}
        <div className="navbar-right">
            {/* Notificación */}
            <span className="material-symbols-outlined notif-icon">
            notifications
            </span>

            {/* Usuario */}
            <div className="user-info">
            <div className="user-avatar">{usuario.charAt(0)}</div>
            <span className="user-name">{usuario}</span>
            </div>

            {/* Botón salir */}
            <button className="logout-btn" onClick={handleLogout}>
            Salir
            </button>
        </div>
        </header>
    );
}
