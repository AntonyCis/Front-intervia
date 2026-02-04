import { useState, useEffect, useRef } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { useFetch } from "../hooks/useFetch";
import { motion } from "framer-motion";
import * as THREE from "three";
import GLOBE from "vanta/dist/vanta.globe.min";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const fetchDataBackend = useFetch();
  const { register, handleSubmit, formState: { errors } } = useForm();

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
          color: 0x4f46e5, // Azul/Indigo
          backgroundColor: 0x0e0f1a,
          size: 1.2,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const registerUser = async (dataForm) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/admin/registro`;
    await fetchDataBackend(url, dataForm, "POST");
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
        className="backdrop-blur-xl bg-white/10 p-10 rounded-[28px] shadow-[0_0_30px_rgba(79,70,229,0.25)] border border-white/20 w-[500px] sm:w-[650px] relative"
      >
        {/* Glow detrás */}
        <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-indigo-500/20 via-blue-500/10 to-cyan-600/20 blur-2xl -z-10"></div>

        <h1 className="text-4xl font-extrabold text-center text-white mb-2 drop-shadow-lg tracking-wide">
          ¡Crea tu cuenta!
        </h1>
        <p className="text-gray-300 text-center mb-8 text-sm">
          Completa tus datos para registrarte
        </p>

        <form onSubmit={handleSubmit(registerUser)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-200">Nombre</label>
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              className="w-full rounded-xl border border-gray-700 bg-black/30 text-gray-200 px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none shadow-lg"
              {...register("nombre", { required: "El nombre es obligatorio" })}
            />
            {errors.nombre && <p className="text-red-400 text-sm mt-1">{errors.nombre.message}</p>}
          </div>

          {/* Apellido */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-200">Apellido</label>
            <input
              type="text"
              placeholder="Ingresa tu apellido"
              className="w-full rounded-xl border border-gray-700 bg-black/30 text-gray-200 px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none shadow-lg"
              {...register("apellido", { required: "El apellido es obligatorio" })}
            />
            {errors.apellido && <p className="text-red-400 text-sm mt-1">{errors.apellido.message}</p>}
          </div>

          {/* Fecha de nacimiento */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-200">Fecha de nacimiento</label>
            <input
              type="date"
              className="w-full rounded-xl border border-gray-700 bg-black/30 text-gray-200 px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none shadow-lg"
              {...register("fechaNacimiento", { required: "La fecha de nacimiento es obligatoria" })}
            />
            {errors.fechaNacimiento && <p className="text-red-400 text-sm mt-1">{errors.fechaNacimiento.message}</p>}
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-200">Teléfono</label>
            <input
              type="text"
              inputMode="tel"
              placeholder="Ingresa tu teléfono"
              className="w-full rounded-xl border border-gray-700 bg-black/30 text-gray-200 px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none shadow-lg"
              {...register("celular", { required: "El teléfono es obligatorio" })}
            />
            {errors.celular && <p className="text-red-400 text-sm mt-1">{errors.celular.message}</p>}
          </div>

          {/* Dirección */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold mb-1 text-gray-200">Dirección</label>
            <input
              type="text"
              placeholder="Ingresa tu dirección"
              className="w-full rounded-xl border border-gray-700 bg-black/30 text-gray-200 px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none shadow-lg"
              {...register("direccion", { required: "La dirección es obligatoria" })}
            />
            {errors.direccion && <p className="text-red-400 text-sm mt-1">{errors.direccion.message}</p>}
          </div>

          {/* Email */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold mb-1 text-gray-200">Correo electrónico</label>
            <input
              type="email"
              placeholder="example@mail.com"
              className="w-full rounded-xl border border-gray-700 bg-black/30 text-gray-200 px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none shadow-lg"
              {...register("email", { required: "El correo es obligatorio" })}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Contraseña */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold mb-1 text-gray-200">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
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
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Botón */}
          <div className="sm:col-span-2">
            <button
              className="w-full bg-indigo-600/90 py-2.5 rounded-xl text-white font-semibold shadow-xl hover:bg-indigo-700 hover:scale-[1.03] transition-all duration-300"
            >
              Registrarse
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-gray-300 text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="underline hover:text-indigo-300">Inicia sesión</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;