import { useState, useEffect, useRef } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { useFetch } from "../hooks/useFetch";
import { ToastContainer} from "react-toastify";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import * as THREE from "three";
import GLOBE from "vanta/dist/vanta.globe.min";
import storeAuth from "../context/storeAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const fetchDataBackend = useFetch();
  const { setToken, setRol } = storeAuth();

  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        GLOBE({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          color: 0x8ab4ff,
          backgroundColor: 0x0e0f1a,
          size: 1.2,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  // 1. Añade esta función para manejar la redirección
  const handleGoogleLogin = () => {
    // Redirige directamente a la ruta de tu backend que inicia Passport
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  const loginUser = async (dataForm) => {
    try {
      const url = dataForm.password.includes("VET")
        ? `${import.meta.env.VITE_BACKEND_URL}/user/login`
        : `${import.meta.env.VITE_BACKEND_URL}/admin/login`;
      
      const response = await fetchDataBackend(url, dataForm, 'POST');
      
      if (response) {
        setToken(response.token);
        setRol(response.rol);
        navigate('/dashboard');
      }
    } catch (error) {
      // Al capturar el error aquí, Vitest ya no lanzará "Unhandled Rejection"
      console.error("Error en el login:", error.message);
    }
  };

  return (
    <div
      ref={vantaRef}
      className="flex items-center justify-center h-screen w-full font-poppins relative overflow-hidden"
    >
      <ToastContainer />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="backdrop-blur-xl bg-white/10 p-10 rounded-[28px] shadow-[0_0_30px_rgba(150,150,255,0.25)] border border-white/20 w-[380px] sm:w-[420px] relative"
      >
        {/* Glow detrás */}
        <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-purple-600/20 blur-2xl -z-10"></div>

        <h1 className="text-4xl font-extrabold text-center text-white mb-2 drop-shadow-lg tracking-wide">
          ¡Hola de nuevo!
        </h1>

        <p className="text-gray-300 text-center mb-8 text-sm">
          Entra para continuar con tu simulador de entrevistas
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit(loginUser)}>
          {/* CORREO */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1 text-gray-200">Correo electrónico</label>
            <input
              type="email"
              placeholder="example@mail.com"
              className="w-full rounded-xl border border-gray-700 bg-black/30 text-gray-200 px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none shadow-lg"
              {...register("email", { required: "El correo es obligatorio" })}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="mb-7">
            <label className="block text-sm font-semibold mb-1 text-gray-200">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-gray-700 bg-black/30 text-gray-200 px-4 py-2 pr-12 focus:ring-2 focus:ring-indigo-400 outline-none shadow-lg"
                {...register("password", { required: "La contraseña es obligatoria" })}
              />
              <span
                className="absolute right-4 top-2.5 text-gray-300 cursor-pointer hover:text-indigo-300 transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <MdVisibilityOff size={22} /> : <MdVisibility size={22} />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* BUTTON */}
          <button
            className="w-full bg-indigo-600/90 py-2.5 rounded-xl text-white font-semibold shadow-xl hover:bg-indigo-700 hover:scale-[1.03] transition-all duration-300"
          >
            Iniciar sesión
          </button>
        </form>

        {/* DIVISOR */}
        <div className="mt-6 flex items-center text-gray-400">
          <hr className="flex-1 border-gray-700" />
          <span className="px-2 text-sm">o</span>
          <hr className="flex-1 border-gray-700" />
        </div>

        {/* GOOGLE */}
        <button 
          type="button" 
          onClick={handleGoogleLogin}
          className="w-full mt-6 flex items-center justify-center border border-gray-700 py-2 rounded-xl text-sm bg-black/20 hover:bg-black/30 text-gray-300 transition shadow-lg"
        >
          <img className="w-5 mr-2" src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Google icon" />
          Continuar con Google
        </button>

        {/* LINKS */}
        <div className="mt-6 text-center text-sm text-gray-300">
          <Link to="/forgot/id" className="underline hover:text-indigo-300">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <div className="mt-6 flex justify-between text-sm text-gray-300">
          <Link to="/" className="underline hover:text-indigo-300">Regresar</Link>
          <Link to="/register" className="py-2 px-5 bg-indigo-600/80 text-white rounded-xl hover:bg-indigo-700 transition shadow-lg">
            Registrarse
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
