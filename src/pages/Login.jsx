import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useFetch } from "../hooks/useFetch";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import * as THREE from "three";
import GLOBE from "vanta/dist/vanta.globe.min";
import storeAuth from "../context/storeAuth";
import storeTheme from "../context/storeTheme";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const fetchDataBackend = useFetch();
  const { setToken, setRol } = storeAuth();
  const { isDark } = storeTheme();

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
          color: isDark ? 0x44ddc1 : 0x8ab4ff,
          backgroundColor: isDark ? 0x1a1a2e : 0xf7f9fe,
          size: 1.2,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect, isDark]);

  const handleGoogleLogin = () => {
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
      console.error("Error en el login:", error.message);
    }
  };

  return (
    <div
      ref={vantaRef}
      className={`${isDark ? "dark" : ""} min-h-screen w-full flex flex-col bg-surface dark:bg-slate-900 font-body text-on-surface relative overflow-hidden`}
    >
      <ToastContainer />

      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 w-full max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold text-primary-container dark:text-white font-headline tracking-tight hover:opacity-80 transition-opacity">
          InterviAI
        </Link>
        <div className="hidden md:flex gap-4">
          <span className="text-on-surface-variant text-sm font-label tracking-tight self-center">¿No tienes cuenta?</span>
          <Link to="/register" className="text-secondary dark:text-cyan-400 font-bold font-label text-sm hover:opacity-80 transition-opacity">Regístrate</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-6 py-12 relative">
        {/* Background Pattern */}
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-secondary-container/20 dark:bg-tertiary-fixed/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-5%] left-[-2%] w-72 h-72 bg-primary-fixed/30 dark:bg-tertiary-fixed/30 rounded-full blur-[100px] pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md z-10"
        >
          {/* Header Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-headline font-bold text-primary-container dark:text-white tracking-tighter leading-none mb-4">
              Inicia sesión en tu<br/>entorno de práctica.
            </h1>
            <p className="text-on-surface-variant font-body text-md leading-relaxed max-w-[320px]">
              Accede a tus simulaciones de entrevistas y herramientas de preparación.
            </p>
          </div>

          {/* Login Form */}
          <section className="space-y-6">
            <form onSubmit={handleSubmit(loginUser)} className="space-y-4">
              {/* Email Field */}
              <div className="group">
                <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant dark:text-slate-400 font-label mb-2 px-1">Correo Electrónico</label>
                <div className="relative flex items-center bg-surface-container-low dark:bg-slate-800 transition-all duration-200 overflow-hidden rounded-lg border border-outline-variant/30 dark:border-slate-700">
                  <span className="material-symbols-outlined ml-4 text-on-surface-variant dark:text-slate-400 text-xl">mail</span>
                  <input
                    type="email"
                    className="w-full bg-transparent border-none focus:ring-0 py-4 px-4 text-on-surface dark:text-white placeholder:text-outline/50 dark:placeholder:text-slate-500 font-body"
                    placeholder="nombre@empresa.com"
                    {...register("email", { required: "El correo es obligatorio" })}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="group">
                <div className="flex justify-between items-end mb-2 px-1">
                  <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant dark:text-slate-400 font-label">Contraseña</label>
                  <Link to="/forgot/id" className="text-[10px] uppercase tracking-widest text-secondary dark:text-cyan-400 font-bold hover:underline">¿Olvidaste tu contraseña?</Link>
                </div>
                <div className="relative flex items-center bg-surface-container-low dark:bg-slate-800 transition-all duration-200 overflow-hidden rounded-lg border border-outline-variant/30 dark:border-slate-700">
                  <span className="material-symbols-outlined ml-4 text-on-surface-variant dark:text-slate-400 text-xl">lock</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-transparent border-none focus:ring-0 py-4 px-4 text-on-surface dark:text-white placeholder:text-outline/50 dark:placeholder:text-slate-500 font-body"
                    placeholder="••••••••"
                    {...register("password", { required: "La contraseña es obligatoria" })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="material-symbols-outlined mr-4 text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white"
                  >
                    {showPassword ? "visibility_off" : "visibility"}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-primary-container to-on-primary-fixed-variant dark:from-slate-700 dark:to-slate-600 text-white font-headline font-bold rounded-lg shadow-xl shadow-primary-container/10 dark:shadow-slate-700/20 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 hover:shadow-lg"
              >
                Ingresar al Workspace
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 py-4">
              <div className="h-[1px] flex-grow bg-surface-container-highest/50 dark:bg-slate-700/50"></div>
              <span className="text-[10px] uppercase tracking-tighter text-outline dark:text-slate-500 font-label">o continuar con</span>
              <div className="h-[1px] flex-grow bg-surface-container-highest/50 dark:bg-slate-700/50"></div>
            </div>

            {/* SSO Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-surface-container-lowest dark:bg-slate-800 border border-outline-variant/15 dark:border-slate-700 rounded-lg hover:bg-surface-container-low dark:hover:bg-slate-700 transition-colors duration-200 font-label text-sm font-medium text-on-surface dark:text-white"
            >
              <img
                alt="Google company logo"
                className="w-5 h-5 grayscale opacity-80 dark:invert"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD13ckQ8fdkAesr2c9FP3hP2SBdxR_bFkj3AtLgY44SysPUCfuAXBnyCSDFBKPTQ2VQxNnvkPHKn9R0F2Odx35ZzuLuhoBeulQijskjG5S7XndVl_1RIKH163vXsZOdNXADkCSwke5ZR3OLjJRMbe_LpzW7CEUeMXP6FxYT7Cydkrnxm_V7ChScCGA5dHxLuNTzav9qRtL-Vi_DbILH6rUmNvT8aw22kGLdG-BkIltzl8C9OOoNapKMcYH8t3wpg8CwSGxMLCyhNdQ"
              />
              Google
            </button>
          </section>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-center px-12 py-12 w-full border-t border-black/5 dark:border-white/10 bg-surface-container-low dark:bg-slate-800">
        <Link to="/" className="text-lg font-black text-primary-container dark:text-white font-headline tracking-tighter mb-4 md:mb-0 hover:opacity-80 transition-opacity">
          InterviAI
        </Link>
        <div className="flex flex-wrap justify-center gap-6">
          <a href="#" className="font-body text-xs tracking-widest uppercase text-on-surface-variant dark:text-slate-400 opacity-60 hover:text-secondary dark:hover:text-cyan-400 transition-colors">Documentación</a>
          <a href="#" className="font-body text-xs tracking-widest uppercase text-on-surface-variant dark:text-slate-400 opacity-60 hover:text-secondary dark:hover:text-cyan-400 transition-colors">Privacidad</a>
          <a href="#" className="font-body text-xs tracking-widest uppercase text-on-surface-variant dark:text-slate-400 opacity-60 hover:text-secondary dark:hover:text-cyan-400 transition-colors">Términos</a>
          <a href="#" className="font-body text-xs tracking-widest uppercase text-on-surface-variant dark:text-slate-400 opacity-60 hover:text-secondary dark:hover:text-cyan-400 transition-colors">Soporte</a>
        </div>
        <div className="mt-8 md:mt-0 font-body text-[10px] tracking-widest uppercase text-on-surface-variant dark:text-slate-500 opacity-40">
          © 2026 InterviAI. Technical Excellence Defined.
        </div>
      </footer>
    </div>
  );
};

export default Login;
