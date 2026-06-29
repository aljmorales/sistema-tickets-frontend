import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

const menu = [
    {
        to: "/",
        icon: "local_activity",
        label: "Dashboard",
    },
    {
        to: "/tickets",
        icon: "space_dashboard",
        label: "Tickets",
    },
    {
        to: "/usuarios",
        icon: "account_circle",
        label: "Usuarios",
    },
    {
        to: "/reportes",
        icon: "analytics",
        label: "Reportes",
    },
    {
        to: "/configuracion",
        icon: "settings",
        label: "Configuración",
    },
];

export default function Sidebar() {
    return (
        <aside className="sidebar-principal">

            <h2 className="sidebar-title">
                Ticket Management
            </h2>

            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
                rel="stylesheet"
            />

            <nav className="sidebar-menu">

                {menu.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === "/"}
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-link active"
                                : "sidebar-link"
                        }
                    >
                        <span className="material-symbols-outlined">
                            {item.icon}
                        </span>

                        {item.label}
                    </NavLink>
                ))}

            </nav>

        </aside>
    );
}