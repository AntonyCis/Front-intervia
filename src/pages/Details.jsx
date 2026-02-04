/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { motion } from "framer-motion"
import { 
    ArrowLeft, 
    BrainCircuit, 
    Target, 
    Award, 
    MessageSquare, 
    Info, 
    Zap, 
    FileText, 
    ChevronRight ,
    Trash2
} from "lucide-react"
import { useFetch } from "../hooks/useFetch"


const Details = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const fetchDataBackend = useFetch()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getDetails = async () => {
            try {
                const baseURL = import.meta.env.VITE_BACKEND_URL;
                const storage = JSON.parse(localStorage.getItem("auth-token"))
                const token = storage?.state?.token || storage?.token;

                const res = await fetchDataBackend(`${baseURL}/interview/detail/${id}`, null, "GET", {
                    Authorization: `Bearer ${token}`
                })
                if (res) setData(res)
            } catch (error) {
                console.error("Error al obtener detalles:", error)
            } finally {
                setLoading(false)
            }
        }
        getDetails()
    }, [id])

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F3F2EE] dark:bg-[#0e0e0e] space-y-4">
             <Zap className="text-emerald-500 animate-pulse" size={48} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Analizando Reporte...</span>
        </div>
    )

    if (!data) return <div className="p-20 text-center">No se encontró la entrevista.</div>

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen w-full bg-[#F3F2EE] dark:bg-[#0e0e0e] p-6 md:p-16 transition-colors duration-500"
        >
            <div className="max-w-7xl mx-auto space-y-16">
                
                {/* HEADER SUPERIOR */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    <div>
                        <button 
                            onClick={() => navigate('/dashboard/list')}
                            className="flex items-center gap-2 text-zinc-400 hover:text-emerald-600 transition-colors mb-6 group"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Volver al historial</span>
                        </button>
                        <h1 className="text-7xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-none">
                            Detalle <br /> <span className="text-emerald-600">General</span>
                        </h1>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="bg-white dark:bg-zinc-900 px-8 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 block mb-1">Referencia</span>
                            <span className="text-lg font-bold text-zinc-900 dark:text-white font-mono">
                                #IV-{data._id.slice(-6).toUpperCase()}
                            </span>
                        </div>
                        {!data.isCompleted && (
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                onClick={() => navigate(`/dashboard/chat/${data._id}`)}
                                className="p-5 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-500/20"
                            >
                                <Zap size={24} fill="currentColor" />
                            </motion.button>
                        )}
                    </div>
                </div>

                {/* CONTENIDO PRINCIPAL: GRID 12 COLUMNAS */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* COLUMNA IZQUIERDA: DATOS (8 COL) */}
                    <div className="lg:col-span-8 space-y-16">
                        
                        {/* SECCIÓN 01: PERFIL */}
                        <section>
                            <div className="flex items-center gap-3 mb-8 opacity-50 text-zinc-900 dark:text-white">
                                <Target size={18} />
                                <h2 className="text-xs font-black uppercase tracking-[0.3em]">Perfil de la Vacante</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <DataField label="Título del Puesto" value={data.title || "No especificado"} />
                                <DataField label="Tipo de Evaluación" value={data.type} color="text-emerald-600 uppercase" />
                                <DataField label="Fecha de Sesión" value={new Date(data.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })} />
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Estado de Evaluación</span>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2.5 h-2.5 rounded-full ${data.isCompleted ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                                        <p className="text-xl font-bold uppercase tracking-tighter text-zinc-900 dark:text-white">
                                            {data.isCompleted ? 'Completada' : 'Sesión Activa'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <hr className="border-zinc-300 dark:border-zinc-800" />

                        {/* SECCIÓN 02: SCORE */}
                        <section>
                            <div className="flex items-center gap-3 mb-8 opacity-50 text-zinc-900 dark:text-white">
                                <Award size={18} />
                                <h2 className="text-xs font-black uppercase tracking-[0.3em]">Rendimiento General</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-1.5">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Puntuación Final</span>
                                    <p className="text-6xl font-black tracking-tighter text-emerald-600">
                                        {data.isCompleted ? data.averageScore : "--"}<span className="text-zinc-300 text-3xl">/10</span>
                                    </p>
                                </div>
                                <DataField 
                                    label="Nivel de Candidato" 
                                    value={!data.isCompleted ? "Pendiente" : (data.averageScore >= 8 ? "Senior / Expert" : "Mid-Level")} 
                                />
                            </div>
                        </section>

                        {/* SECCIÓN 03: FEEDBACK (BANNER) */}
                        <section className="bg-emerald-50 dark:bg-emerald-950/20 p-8 rounded-[2rem] border border-emerald-100 dark:border-emerald-900/30">
                            <div className="flex gap-4">
                                <MessageSquare className="text-emerald-600 shrink-0" size={24} />
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700/60 block mb-2">Feedback del Asistente IA</span>
                                    <p className="text-lg font-medium text-emerald-900 dark:text-emerald-100 italic leading-relaxed">
                                        "{data.overallFeedback || "La entrevista aún no ha finalizado. Completa la conversación para que la IA genere un análisis de tus respuestas y áreas de mejora."}"
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* COLUMNA DERECHA: ACCIONES (4 COL) */}
                    <div className="lg:col-span-4 flex flex-col gap-8">
                        {/* CARD DE SCORE VISUAL */}
                        <div className="aspect-square bg-white dark:bg-zinc-900 rounded-[3.5rem] p-12 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center relative overflow-hidden group">
                            <BrainCircuit className="w-full h-auto text-zinc-100 dark:text-zinc-800 absolute transition-transform group-hover:scale-110 duration-700" size={200} />
                            <div className="relative z-10 text-center">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600 block mb-2">Success Rate</span>
                                <span className="text-7xl font-black text-zinc-900 dark:text-white italic">
                                    {data.isCompleted ? `${data.averageScore * 10}%` : "---"}
                                </span>
                            </div>
                        </div>

                        {/* BOTÓN PRINCIPAL DINÁMICO */}
                        {!data.isCompleted ? (
                            <button 
                                onClick={() => navigate(`/dashboard/chat/${data._id}`)}
                                className="w-full py-6 bg-emerald-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-zinc-900 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 group"
                            >
                                <Zap size={18} className="group-hover:animate-bounce" />
                                Reanudar Entrevista
                            </button>
                        ) : (
                            <button className="w-full py-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] hover:bg-emerald-600 dark:hover:bg-emerald-500 dark:hover:text-white transition-all shadow-xl shadow-black/5 flex items-center justify-center gap-3">
                                <FileText size={18} />
                                Generar Reporte PDF
                            </button>
                        )}

                        {/* BOTÓN SECUNDARIO (Si ya terminó, permite ver el historial) */}
                        {data.isCompleted && (
                            <button 
                                onClick={() => navigate(`/dashboard/chat/${data._id}`)}
                                className="w-full py-4 border-2 border-dashed border-zinc-300 dark:border-zinc-800 text-zinc-400 rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] hover:border-emerald-500 hover:text-emerald-500 transition-all flex items-center justify-center gap-2"
                            >
                                Ver Transcripción <ChevronRight size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {/* SECCIÓN INFERIOR: SEGUIMIENTO / INFO EXTRA */}
                <div className="pt-16 border-t border-zinc-300 dark:border-zinc-800 space-y-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div>
                            <h2 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">Análisis Técnico</h2>
                            <p className="text-zinc-500 font-medium mt-1">Desglose de competencias y respuestas analizadas por el motor de IA.</p>
                        </div>
                    </div>

                    <div className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-[3rem] border border-zinc-200 dark:border-zinc-800 p-12 shadow-sm text-center">
                         <Info className="mx-auto text-zinc-300 mb-4" size={40} />
                         <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 max-w-md mx-auto leading-loose">
                            La transcripción detallada y el análisis por pregunta se habilitarán al finalizar la sesión actual.
                         </p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

/* COMPONENTE REUTILIZABLE PARA CAMPOS DE DATOS */
const DataField = ({ label, value, color = "text-zinc-900 dark:text-zinc-100" }) => (
    <div className="space-y-1.5">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
            {label}
        </span>
        <p className={`text-2xl font-bold tracking-tighter ${color}`}>
            {value || "---"}
        </p>
    </div>
)

export default Details;