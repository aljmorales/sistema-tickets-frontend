import { Routes, Route, Navigate } from "react-router-dom";
import "./styles/App.css";
import "tailwindcss";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import TicketDetalle from "./pages/TicketDetalle"
import Usuarios from "./pages/Usuarios";
import Reportes from "./pages/Reportes";
import Configuracion from "./pages/Configuracion";

export default function App() {
  const token = localStorage.getItem("token");
  const tokenExp = localStorage.getItem("token_exp");

  // Si no hay token o ya venció → redirige a login
  if (!token || (tokenExp && Date.now() > Number(tokenExp) * 1000)) {
    localStorage.removeItem("token");
    localStorage.removeItem("token_exp");
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-area">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/tickets/:id" element={<TicketDetalle />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/configuracion" element={<Configuracion />} />
            {/* otras rutas */}
          </Routes>
        </main>
      </div>
    </div>
  );
}
