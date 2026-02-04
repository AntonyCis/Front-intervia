import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import storeAuth from "../context/storeAuth";

const LoginSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setToken, setRol } = storeAuth();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        const rol = params.get("rol");

        if (token && rol) {
            setToken(token);
            setRol(rol);
            // Si usas localStorage para persistencia, guárdalo aquí también
            localStorage.setItem('token', token); 
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    }, [location, navigate, setToken, setRol]);

    return (
        <div className="h-screen w-full flex items-center justify-center bg-[#0e0f1a] text-white">
            <p className="text-xl animate-pulse">Autenticando con Google...</p>
        </div>
    );
};

export default LoginSuccess;