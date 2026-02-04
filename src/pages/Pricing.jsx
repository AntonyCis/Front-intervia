import { motion } from "framer-motion";
import { Check, Zap, Rocket, Crown, Star, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router";
import storeAuth from "../context/storeAuth"; // Importamos el store para saber el rol

const Pricing = () => {
    const navigate = useNavigate();
    const { rol } = storeAuth(); // Obtenemos el rol (admin o usuario)
    const isAdmin = rol === 'administrador';

    const planes = [
        { 
            nombre: "Basic", 
            precio: 5, 
            icon: <Zap size={32} />, 
            features: ["5 Entrevistas IA", "Feedback Estándar", "Soporte Comunidad"],
            color: "text-emerald-500",
            bg: "from-emerald-500/10 to-transparent",
            popular: false
        },
        { 
            nombre: "Pro", 
            precio: 15, 
            icon: <Rocket size={32} />, 
            features: ["20 Entrevistas IA", "Feedback Detallado", "Descarga PDF", "Análisis de Tono"],
            color: "text-blue-500",
            bg: "from-blue-500/10 to-transparent",
            popular: true 
        },
        { 
            nombre: "Unlimited", 
            precio: 30, 
            icon: <Crown size={32} />, 
            features: ["Entrevistas Ilimitadas", "IA Premium (GPT-4o)", "Coach Personalizado", "Acceso Early Bird"],
            color: "text-amber-500",
            bg: "from-amber-500/10 to-transparent",
            popular: false
        }
    ];

    return (
        <div className="min-h-screen pt-4 pb-20 px-6 overflow-hidden">
            {/* Header Animado */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h2 className="text-emerald-500 font-black tracking-[0.4em] text-xs mb-4 uppercase">
                    {isAdmin ? "Panel de Control" : "Suscripciones"}
                </h2>
                <h1 className="text-6xl md:text-7xl font-black dark:text-white tracking-tighter leading-none uppercase">
                    {isAdmin ? (
                        <>Gestión de <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-200">Tarifas y Planes</span></>
                    ) : (
                        <>Lleva tu carrera <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-200">al siguiente nivel</span></>
                    )}
                </h1>
                {isAdmin && (
                    <p className="mt-4 text-zinc-500 font-bold uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2">
                        <ShieldAlert size={14} className="text-amber-500" /> Modo Administrador: Solo Lectura
                    </p>
                )}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto relative">
                {planes.map((plan, index) => (
                    <motion.div 
                        key={plan.nombre}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={!isAdmin ? { y: -15, transition: { duration: 0.2 } } : {}}
                        className={`relative group flex flex-col p-10 rounded-[3.5rem] border-2 transition-all duration-500 
                            ${plan.popular 
                                ? 'bg-zinc-900/40 border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.1)]' 
                                : 'bg-white/5 border-zinc-200 dark:border-zinc-800'
                            } ${isAdmin ? 'grayscale-[0.3] opacity-90' : ''}`}
                    >
                        {/* Indicador de Popularidad */}
                        {plan.popular && (
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-emerald-500 text-black font-black text-[10px] px-6 py-2 rounded-full tracking-widest flex items-center gap-2">
                                <Star size={12} fill="black" /> EL MÁS ELEGIDO
                            </div>
                        )}

                        {/* Contenido Card */}
                        <div className="flex-1">
                            <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-8 bg-gradient-to-br ${plan.bg} ${plan.color}`}>
                                {plan.icon}
                            </div>
                            
                            <h3 className="text-3xl font-black uppercase tracking-tighter dark:text-white mb-2">{plan.nombre}</h3>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-6xl font-black dark:text-white tracking-tighter">${plan.precio}</span>
                                <span className="text-zinc-500 font-bold uppercase text-xs tracking-widest">/ único</span>
                            </div>

                            <div className="h-[2px] w-full bg-gradient-to-r from-zinc-800 to-transparent mb-8" />

                            <ul className="space-y-5 mb-10">
                                {plan.features.map(f => (
                                    <li key={f} className="flex items-center gap-4 text-zinc-400 font-bold text-sm group-hover:text-zinc-200 transition-colors">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                            <Check size={12} className="text-emerald-500" strokeWidth={4} />
                                        </div>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Botón condicional Admin / Usuario */}
                        <button 
                            disabled={isAdmin}
                            onClick={() => !isAdmin && navigate("/dashboard/checkout", { state: { amount: plan.precio, planName: plan.nombre } })}
                            className={`w-full py-5 rounded-2xl font-black uppercase text-xs tracking-[0.3em] transition-all duration-300 relative overflow-hidden group/btn
                                ${isAdmin 
                                    ? 'bg-zinc-800 text-zinc-500 cursor-default border border-zinc-700' 
                                    : plan.popular 
                                        ? 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_10px_20px_rgba(16,185,129,0.2)]' 
                                        : 'bg-white dark:bg-zinc-800 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700'
                                }`}
                        >
                            <span className="relative z-10">
                                {isAdmin ? "Vista Informativa" : "Seleccionar"}
                            </span>
                            
                            {!isAdmin && (
                                <motion.div 
                                    whileHover={{ x: 100 }} 
                                    className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full transition-transform duration-1000 group-hover/btn:translate-x-full" 
                                />
                            )}
                        </button>
                    </motion.div>
                ))}
            </div>
            
            {/* Elemento Decorativo de Fondo */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[120px] rounded-full -z-10 ${isAdmin ? 'bg-amber-500/5' : 'bg-emerald-500/5'}`} />
        </div>
    );
}

export default Pricing;