import { useState, useRef, useEffect } from "react"
import { useParams, useNavigate } from "react-router" // Importante para el ID
import { motion, AnimatePresence } from "framer-motion"
import { Send, Sparkles, Smile, ChevronDown, Loader2 } from "lucide-react"
import { useFetch } from "../hooks/useFetch" 
import { toast } from "react-toastify"

const ChatGeminiStyle = () => {
    const { id } = useParams() // Obtenemos el ID de la entrevista de la URL
    const navigate = useNavigate()
    const fetchDataBackend = useFetch()
    
    const [interviewData, setInterviewData] = useState(null)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [messages, setMessages] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const scrollRef = useRef(null)

    // 1. CARGAR DETALLES DE LA ENTREVISTA AL INICIAR
    useEffect(() => {
        const loadInterview = async () => {
            try {
                const baseURL = import.meta.env.VITE_BACKEND_URL;
                const storage = JSON.parse(localStorage.getItem("auth-token"))
                const token = storage?.state?.token || storage?.token;

                // Usamos tu endpoint de detalle
                const data = await fetchDataBackend(`${baseURL}/interview/detail/${id}`, null, "GET", {
                    Authorization: `Bearer ${token}`
                })

                if (data) {
                    setInterviewData(data)
                    // Iniciamos el chat con la primera pregunta de la IA
                    const firstQuestion = data.questions[0].questionText;
                    setMessages([
                        { id: 'system-1', user: "IntervIAl", text: `¡Bienvenido! Vamos a comenzar tu entrevista de tipo ${data.type}.`, type: "other" },
                        { id: Date.now(), user: "IntervIAl", text: firstQuestion, type: "other" }
                    ])
                }
            } catch (error) {
                toast.error("No se pudo cargar la entrevista")
                navigate("/dashboard/list")
            }
        }
        loadInterview()
    }, [id])

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (inputValue.trim() === "" || isTyping) return;

        // 1. Mostrar mensaje del usuario
        const userMessage = { id: Date.now(), user: "Tu", text: inputValue, type: "me" };
        setMessages(prev => [...prev, userMessage]);
        
        // Guardamos la respuesta localmente (en una app real la enviarías al final)
        const currentAnswer = inputValue;
        setInputValue("");
        setIsTyping(true);

        // Simulación de "IA pensando" para pasar a la siguiente pregunta
        setTimeout(() => {
            const nextIndex = currentQuestionIndex + 1;
            
            if (nextIndex < interviewData.questions.length) {
                // Hay más preguntas
                const nextQuestion = interviewData.questions[nextIndex].questionText;
                setMessages(prev => [...prev, { 
                    id: Date.now() + 1, 
                    user: "IntervIAl", 
                    text: nextQuestion, 
                    type: "other" 
                }]);
                setCurrentQuestionIndex(nextIndex);
            } else {
                // Se terminaron las preguntas
                setMessages(prev => [...prev, { 
                    id: Date.now() + 1, 
                    user: "IntervIAl", 
                    text: "Has completado todas las preguntas. Estamos procesando tu feedback... un momento.", 
                    type: "other" 
                }]);
                
                // Aquí podrías redirigir automáticamente a la página de resultados/detalles
                setTimeout(() => navigate(`/dashboard/details/${id}`), 3000);
            }
            setIsTyping(false);
        }, 1500);
    };

    if (!interviewData) return (
        <div className="h-screen w-full flex items-center justify-center">
            <Loader2 className="animate-spin text-emerald-500" size={48} />
        </div>
    )

    return (
        <div className="w-full h-screen flex flex-col bg-white dark:bg-[#0e0e0e] text-zinc-800 dark:text-zinc-200">
            {/* ... (Tu Header se mantiene igual) ... */}
            <header className="px-6 py-4 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-500">ENTREVISTA EN CURSO</span>
                    <span className="text-zinc-400 text-sm">|</span>
                    <span className="text-sm font-medium">{interviewData.type.toUpperCase()}</span>
                </div>
                <div className="text-xs font-black bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                    PREGUNTA {currentQuestionIndex + 1} DE {interviewData.questions.length}
                </div>
            </header>

            <main ref={scrollRef} className="flex-1 overflow-y-auto w-full max-w-3xl mx-auto px-4 py-8 space-y-10">
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div 
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex gap-4 md:gap-6"
                        >
                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                                msg.type === 'me' ? 'bg-zinc-200 dark:bg-zinc-800' : 'bg-emerald-500/10 text-emerald-500'
                            }`}>
                                {msg.type === 'me' ? <span className="text-[10px] font-bold">Tú</span> : <Sparkles size={16} />}
                            </div>
                            <div className="flex-1 pt-1">
                                <p className="text-lg leading-relaxed whitespace-pre-wrap font-medium">
                                    {msg.text}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                    {isTyping && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 px-14">
                            <span className="text-xs text-emerald-500 animate-pulse font-bold">IntervIAl está analizando...</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <footer className="w-full max-w-4xl mx-auto p-4 md:p-6">
                <form onSubmit={handleSendMessage} className="relative bg-zinc-100 dark:bg-[#1e1e1e] rounded-[2.5rem] p-2 border border-transparent focus-within:border-emerald-500/50 transition-all">
                    <div className="flex items-center gap-3 px-6 py-2">
                        <textarea 
                            rows={1}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Responde a la pregunta..." 
                            className="flex-1 bg-transparent py-3 text-lg outline-none resize-none placeholder-zinc-500 dark:text-white"
                        />
                        <button 
                            type="submit"
                            disabled={!inputValue.trim() || isTyping}
                            className={`p-3.5 rounded-full transition-all ${
                                inputValue.trim() ? 'bg-emerald-500 text-white' : 'text-zinc-400 opacity-50'
                            }`}
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </form>
            </footer>
        </div>
    )
}

export default ChatGeminiStyle