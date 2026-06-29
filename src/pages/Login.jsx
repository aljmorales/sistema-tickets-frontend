import { useRef } from "react";
import api from "../api/axios";
import "../styles/Login.css";

export default function Login() {
    const correoRef = useRef(null);
    const passwordRef = useRef(null);

async function handleSubmit(e) {
    e.preventDefault();

    try {
        const response = await api.post("/auth/login", {
            correo: correoRef.current.value,
            password: passwordRef.current.value,
        });

        // Tu backend devuelve { token, usuario } dentro de body
        const { token, usuario } = response.data.body;

        if (!token) {
            throw new Error("Token no recibido");
        }

        // Guarda token en localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(usuario)); // ← agrega esto

        // Redirige al dashboard
        window.location.href = "/";
        } catch (err) {
        console.error("Error en login:", err);
        alert("Credenciales inválidas");
        }
    }

    return (
        <div className="login-container">
            <div className="login-box">

                <h1 className="login-title">
                    Sistema de Tickets
                </h1>


                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="email"
                        className="login-input"
                        placeholder="Correo"
                        defaultValue="alfredo@example.com"
                        ref={correoRef}
                    />

                    <input
                        type="password"
                        className="login-input"
                        placeholder="Contraseña"
                        defaultValue="123456"
                        ref={passwordRef}
                    />

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Iniciar sesión
                    </button>

                </form>

                <p className="login-footer">
                    Versión Demo • Desarrollado por Alfredo Morales
                </p>

            </div>
        </div>
    );
}
