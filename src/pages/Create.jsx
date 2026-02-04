import { Form } from '../components/create/Form'
import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'

const Create = () => {
    return (
        <div className="p-6 md:p-12 md:pt-4 animate-in fade-in duration-700 min-h-screen">
            
            <header className="mb-8 max-w-5xl relative">
                {/* MÁSCARA DE LEGIBILIDAD: Un resplandor sutil que asegura el contraste en cualquier fondo */}
                <div className="absolute -inset-4 bg-gradient-to-r from-white/20 via-transparent to-transparent dark:from-black/20 blur-3xl -z-10" />

                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    {/* Icono con contraste forzado */}
                    <div className="w-fit p-3.5 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl shadow-2xl">
                        <Briefcase size={26} strokeWidth={2.5} />
                    </div>
                    
                    <div className="flex flex-col">
                        {/* Texto con contraste puro */}
                        <h1 className='font-black text-3xl md:text-4xl text-zinc-950 dark:text-white tracking-tight leading-none'>
                            Nueva Entrevista
                        </h1>
                        
                        <div className="flex items-center gap-2 mt-2">
                            <span className="h-1 w-6 rounded-full bg-emerald-500" />
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-600 dark:text-emerald-400">
                                Sesión de IA
                            </span>
                        </div>
                    </div>
                </div>

                <div className="max-w-2xl mt-6">
                    {/* EL CAMBIO CLAVE: Usamos text-zinc-950/80 para luz y text-white para oscuro con un peso extra */}
                    <p className='text-zinc-900 dark:text-zinc-50 text-base md:text-lg font-extrabold leading-relaxed antialiased'>
                        Configura y lanza una nueva sesión de entrevistas técnicas optimizadas.
                    </p>
                </div>
            </header>

            {/* Separador más marcado */}
            <div className="w-full h-[2px] bg-zinc-900/10 dark:bg-white/10 mb-10" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-5xl"
            >
                <Form />
            </motion.div>
        </div>
    )
}

export default Create