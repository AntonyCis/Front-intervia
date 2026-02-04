import { useState } from "react"
import { useFetch } from "../../hooks/useFetch" 
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { toast, ToastContainer } from "react-toastify"
import { Sparkles, User, UploadCloud, Loader2, BrainCircuit } from "lucide-react" 
import { motion } from "framer-motion"

export const Form = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()
    const fetchDataBackend = useFetch() // Asegúrate que esto devuelva la data de axios directamente

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            type: "cv", // Mismo valor que el enum de tu modelo Interview.js
        }
    })

    const selectedType = watch("type");

    const onSubmit = async (dataForm) => {
        setIsSubmitting(true)
        try {
            // 1. Obtención del Token
            const authStorage = JSON.parse(localStorage.getItem("auth-token"))
            const token = authStorage?.state?.token || authStorage?.token;

            if (!token) {
                toast.error("Debes iniciar sesión");
                return navigate("/login");
            }

            const headers = { Authorization: `Bearer ${token}` }
            const baseURL = import.meta.env.VITE_BACKEND_URL;

            // --- PASO 1: SUBIR CV (Endpoint: /interview/upload-cv) ---
            const cvFormData = new FormData()
            if (dataForm.cvFile && dataForm.cvFile[0]) {
                // 'cv' es el nombre exacto que espera upload.single('cv') en tus rutas
                cvFormData.append("cv", dataForm.cvFile[0]) 
            } else {
                toast.error("El archivo PDF es obligatorio");
                setIsSubmitting(false);
                return;
            }

            console.log("📤 Subiendo archivo...");
            const uploadRes = await fetchDataBackend(`${baseURL}/interview/upload-cv`, cvFormData, "POST", headers)
            
            // Tu back devuelve { msg: "...", cvId: "..." }
            if (!uploadRes?.cvId) {
                throw new Error(uploadRes?.msg || "Error al procesar el CV");
            }

            // --- PASO 2: INICIAR SIMULACIÓN (Endpoint: /interview/start) ---
            // El body debe coincidir con: const { type, data, cvId } = req.body
            const simulationBody = {
                type: dataForm.type, // 'cv', 'tech_stack', etc.
                cvId: uploadRes.cvId,
                data: dataForm.contextoExtra || "Sin detalles adicionales"
            }

            console.log("🤖 Iniciando IA...");
            const startRes = await fetchDataBackend(`${baseURL}/interview/start`, simulationBody, "POST", headers)

            if (startRes?.interviewId) {
                toast.success("¡Simulación preparada!");
                setTimeout(() => navigate(`/dashboard/chat/${startRes.interviewId}`), 1500)
            }

        } catch (error) {
            console.error("Error completo:", error);
            const msgError = error.response?.data?.msg || error.message || "Error en el servidor";
            toast.error(msgError);
        } finally {
            setIsSubmitting(false)
        }
    }

    // Estilos Visuales
    const inputStyle = "w-full py-3 px-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 outline-none focus:border-emerald-500 transition-all text-sm";
    const labelStyle = "text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block";

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto p-6">
            <ToastContainer theme="dark" />
            
            <div className="text-center mb-10">
                <h1 className="text-3xl font-black text-zinc-800 dark:text-white flex items-center justify-center gap-3">
                    <BrainCircuit className="text-emerald-500" size={32} />
                    Configura tu Entrevista con IA
                </h1>
                <p className="text-zinc-500 mt-2">Sube tu CV y deja que Gémini haga el resto</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-xl border border-zinc-100 dark:border-zinc-800">
                    
                    {/* TIPO DE ENTREVISTA */}
                    <div>
                        <label className={labelStyle}>Modalidad de Entrevista</label>
                        <select {...register("type")} className={inputStyle}>
                            <option value="cv">Basada solo en mi CV</option>
                            <option value="tech_stack">Enfoque Técnico (Stack)</option>
                            <option value="soft_skills">Habilidades Blandas</option>
                        </select>
                    </div>

                    {/* SUBIDA DE ARCHIVO */}
                    <div>
                        <label className={labelStyle}>Tu CV (PDF Obligatorio)</label>
                        <div className="relative">
                            <input 
                                type="file" 
                                accept=".pdf" 
                                {...register("cvFile", { required: true })}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="flex items-center gap-3 p-3 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                                <UploadCloud className="text-emerald-500" />
                                <span className="text-sm text-zinc-500">
                                    {watch("cvFile")?.[0]?.name || "Seleccionar archivo..."}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* CONTEXTO EXTRA */}
                    <div className="md:col-span-2">
                        <label className={labelStyle}>
                            {selectedType === 'tech_stack' ? '¿Qué tecnologías quieres practicar?' : 'Instrucciones adicionales (Opcional)'}
                        </label>
                        <textarea 
                            {...register("contextoExtra")}
                            placeholder="Ej: React, Node.js, Inglés avanzado..."
                            className={`${inputStyle} h-28 resize-none`}
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="group relative flex items-center gap-3 px-12 py-4 bg-emerald-600 text-white rounded-full font-bold text-lg hover:bg-emerald-700 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                    >
                        {isSubmitting ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <Sparkles className="group-hover:rotate-12 transition-transform" />
                        )}
                        {isSubmitting ? "Analizando Perfil..." : "Generar Entrevista"}
                    </button>
                </div>
            </form>
        </motion.div>
    )
}