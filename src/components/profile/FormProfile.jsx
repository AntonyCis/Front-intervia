import { useEffect } from "react"
import storeProfile from "../../context/storeProfile"
import { useForm } from "react-hook-form"
import { ToastContainer } from 'react-toastify'
import { motion } from "framer-motion"
import { User, Mail, MapPin, Phone, Save } from "lucide-react"

const FormularioPerfil = () => {
    const { user, updateProfile } = storeProfile()
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()

    const updateUser = (dataForm) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/actualizarperfil/${user._id}`
        updateProfile(url, dataForm)
    }

    useEffect(() => {
        if (user) reset({
            nombre: user?.nombre,
            apellido: user?.apellido,
            direccion: user?.direccion,
            celular: user?.celular,
            email: user?.email,
        })
    }, [user, reset])

    // --- SISTEMA DE ESTILOS UNIFICADO (COMO EN TU OTRO FORMULARIO) ---

    // Fondo: Beige (#f3eee0) en Light / Negro (#000000) en Dark
    const containerBase = "bg-[#edebe0] dark:bg-[#000000] border-2 border-black dark:border-[#3f3f46] p-8 rounded-[3rem] shadow-2xl flex-1 flex flex-col justify-between transition-colors duration-300";
    
    // Inputs: Fondo igual al contenedor para evitar parches
    const inputBase = "w-full bg-[#edebe0] dark:bg-[#000000] text-sm text-black dark:text-white border-2 border-black dark:border-[#71717a] rounded-2xl py-3 px-4 outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-500";
    
    // Etiquetas: Negro en Light / Blanco en Dark
    const labelBase = "text-[10px] font-black uppercase tracking-widest ml-1 flex items-center gap-2 text-black dark:text-white";

    return ( 
        <div className="w-full h-full flex flex-col bg-transparent">
            <ToastContainer theme="dark" />
            
            <form onSubmit={handleSubmit(updateUser)} className={containerBase}>
                <div className="space-y-6">
                    {/* FILA: NOMBRE Y APELLIDO */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className={labelBase}> <User size={12} /> NOMBRE </label> 
                            <input {...register("nombre")} className={inputBase} placeholder="Tu nombre" />
                        </div>
                        <div className="space-y-2">
                            <label className={labelBase}> <User size={12} /> APELLIDO </label> 
                            <input {...register("apellido")} className={inputBase} placeholder="Tu apellido" />
                        </div>
                    </div>

                    {/* DIRECCIÓN */}
                    <div className="space-y-2">
                        <label className={labelBase}> <MapPin size={12} /> DIRECCIÓN </label> 
                        <input {...register("direccion")} className={inputBase} placeholder="Tu dirección" />
                    </div>

                    {/* CELULAR */}
                    <div className="space-y-2">
                        <label className={labelBase}> <Phone size={12} /> CELULAR </label> 
                        <input {...register("celular")} className={inputBase} placeholder="Tu número" />
                    </div>

                    {/* EMAIL */}
                    <div className="space-y-2">
                        <label className={labelBase}> <Mail size={12} /> EMAIL </label> 
                        <input {...register("email")} className={inputBase} placeholder="tu@email.com" />
                    </div>
                </div> 

                {/* BOTÓN DE ACCIÓN */}
                <div className="mt-8">
                    <motion.button 
                        type="submit" 
                        disabled={isSubmitting}
                        // Botón camaleón: Negro en claro / Esmeralda en oscuro
                        className="w-full py-4 rounded-2xl bg-black dark:bg-[#10b981] text-white font-black uppercase text-[11px] tracking-[0.2em] border-2 border-black dark:border-[#3f3f46] transition-all flex items-center justify-center gap-2 shadow-lg hover:opacity-90"
                        whileTap={{ scale: 0.98 }}
                    >
                        <Save size={16} />
                        {isSubmitting ? '...' : 'ACTUALIZAR PERFIL'}
                    </motion.button>
                </div> 
            </form> 
        </div> 
    ) 
} 

export default FormularioPerfil