import { useForm } from "react-hook-form"
import storeProfile from "../../context/storeProfile"
import storeAuth from "../../context/storeAuth"
import { motion } from "framer-motion"
import { Lock, KeyRound, ShieldCheck } from "lucide-react"

const CardPassword = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
    const { user, updatePasswordProfile } = storeProfile()
    const { clearToken } = storeAuth()

    const updatePassword = async (dataForm) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/actualizarpassword/${user._id}`
        if (await updatePasswordProfile(url, dataForm)) clearToken()
    }

    const labelBase = "text-[10px] font-black uppercase flex items-center gap-2 tracking-widest text-black dark:text-white";

    return (
        <motion.div 
            className="bg-[#edebe0] dark:bg-[#000000] border-2 border-black dark:border-[#71717a] p-10 rounded-[2.5rem] shadow-2xl w-full transition-all min-h-[500px] flex flex-col justify-center"
        >
            <div className="flex flex-col items-center mb-10">
                <div className="w-14 h-14 bg-white dark:bg-[#0a0a0a] border-2 border-black dark:border-[#71717a] rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-500 mb-4">
                    {user?.googleId ? <ShieldCheck size={24} /> : <Lock size={24} />}
                </div>
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-black dark:text-white">
                    Seguridad
                </h2>
            </div>

            {/* VALIDACIÓN DE GOOGLE */}
            {user?.googleId ? (
                <div className="text-center space-y-4 py-4">
                    <p className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 leading-relaxed uppercase tracking-widest">
                        Tu cuenta está vinculada a <span className="text-emerald-500">Google</span>
                    </p>
                    <div className="p-4 rounded-2xl border border-dashed border-zinc-400 dark:border-zinc-800">
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-500 font-medium">
                            La seguridad y contraseña son gestionadas directamente por Google. No es necesario realizar cambios aquí.
                        </p>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit(updatePassword)} className="space-y-8">
                    <div className="space-y-3">
                        <label className={labelBase}>
                            <KeyRound size={14} className="text-emerald-600 dark:text-emerald-500"/> Contraseña Actual
                        </label>
                        <input 
                            type="password" 
                            {...register("passwordactual", { required: true })} 
                            placeholder="••••••••"
                            className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-[#0a0a0a] border-2 border-black dark:border-[#71717a] text-sm text-black dark:text-white focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-800" 
                        />
                    </div>

                    <div className="space-y-3">
                        <label className={labelBase}>
                            <Lock size={14} className="text-emerald-600 dark:text-emerald-500"/> Nueva Contraseña
                        </label>
                        <input 
                            type="password" 
                            {...register("passwordnuevo", { required: true, minLength: 8 })} 
                            placeholder="Mínimo 8 caracteres"
                            className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-[#0a0a0a] border-2 border-black dark:border-[#71717a] text-sm text-black dark:text-white focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-800" 
                        />
                    </div>

                    <motion.button
                        type="submit"
                        className="w-full py-4 rounded-2xl bg-black dark:bg-[#10b981] text-white font-black uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-2 mt-6 border-2 border-black dark:border-[#71717a] shadow-lg hover:opacity-90 transition-all"
                        whileTap={{ scale: 0.97 }}
                    >
                        {isSubmitting ? (
                            <span className="flex gap-1">
                                <span className="animate-bounce">.</span>
                                <span className="animate-bounce [animation-delay:-0.15s]">.</span>
                                <span className="animate-bounce [animation-delay:-0.3s]">.</span>
                            </span>
                        ) : 'Actualizar Clave'}
                    </motion.button>
                </form>
            )}
        </motion.div>
    )
}

export default CardPassword