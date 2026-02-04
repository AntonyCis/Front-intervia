import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useFetch } from "../hooks/useFetch"
import { motion } from "framer-motion"
import { Calendar, Award, ChevronRight, BrainCircuit } from "lucide-react"

const List = () => {
    const [interviews, setInterviews] = useState([])
    const [loading, setLoading] = useState(true)
    const fetchDataBackend = useFetch()
    const navigate = useNavigate()

    useEffect(() => {
        const getHistory = async () => {
            try {
                const baseURL = import.meta.env.VITE_BACKEND_URL;
                const storage = JSON.parse(localStorage.getItem("auth-token"))
                const token = storage?.state?.token || storage?.token;

                // Llamamos a tu ruta: router.get('/history', ...)
                const data = await fetchDataBackend(`${baseURL}/interview/history`, null, "GET", {
                    Authorization: `Bearer ${token}`
                })

                if (data) setInterviews(data)
            } catch (error) {
                console.error("Error al cargar historial")
            } finally {
                setLoading(false)
            }
        }
        getHistory()
    }, [])

    if (loading) return <div className="p-10 text-center">Cargando tu progreso...</div>

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <header className="mb-10">
                <h1 className="text-3xl font-black flex items-center gap-3">
                    <BrainCircuit className="text-emerald-500" size={32} />
                    Mi Historial de Entrevistas
                </h1>
                <p className="text-zinc-500">Revisa tus puntuaciones y sigue practicando.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interviews.length > 0 ? (
                    interviews.map((item) => (
                        <motion.div 
                            key={item._id}
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
                            onClick={() => navigate(`/dashboard/details/${item._id}`)}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-2xl ${item.isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                    <Award size={24} />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
                                    {item.type}
                                </span>
                            </div>

                            <h3 className="font-bold text-xl mb-1 group-hover:text-emerald-500 transition-colors">
                                {item.title}
                            </h3>
                            
                            <div className="flex items-center gap-2 text-zinc-400 text-xs mb-6">
                                <Calendar size={14} />
                                {new Date(item.createdAt).toLocaleDateString()}
                            </div>

                            {/* Barra de Progreso / Score */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-bold">
                                    <span>{item.isCompleted ? "Puntuación IA" : "En progreso"}</span>
                                    <span>{item.averageScore}/10</span>
                                </div>
                                <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.progressPercentage}%` }}
                                        className={`h-full ${item.averageScore >= 7 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-sm font-bold text-zinc-500">
                                <span>Ver detalles</span>
                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-zinc-50 dark:bg-zinc-900/50 rounded-[3rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                        <p className="text-zinc-500 font-medium">Aún no has realizado ninguna entrevista.</p>
                        <button 
                            onClick={() => navigate("/dashboard/create")}
                            className="mt-4 text-emerald-500 font-bold hover:underline"
                        >
                            ¡Empieza la primera ahora!
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default List