import { motion } from 'framer-motion'
import CardPassword from '../components/profile/CardPassword' 
import { CardProfile } from '../components/profile/CardProfile' 
import FormularioPerfil from '../components/profile/FormProfile' 
import { Settings2, LayoutDashboard, ShieldCheck, UserCog } from 'lucide-react'
import { useEffect } from 'react' // <--- Añadir esto
import storeProfile from '../context/storeProfile' // <--- Añadir esto

const Profile = () => { 
  // Estilo de texto ultra-limpio sin fondo
  const subTitleStyle = "text-[12px] font-black uppercase tracking-[0.3em] text-zinc-900 dark:text-zinc-100";
  const { profile, user } = storeProfile()
  useEffect(() => {
    // Si el usuario no está cargado en el estado global, lo pedimos al backend
    if (!user) {
      profile()
    }
  }, []) // Solo se ejecuta una vez al montar
  

  return ( 
    <motion.div 
      initial={{ opacity: 0, y: -10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-12 md:pt-4 min-h-screen" 
    > 
        
      {/* ENCABEZADO */}
      <header className="mb-16 relative max-w-6xl"> 
        <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-fit p-4 bg-emerald-600 text-white rounded-2xl shadow-xl shadow-emerald-500/20">
                <Settings2 className="w-7 h-7" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-950 dark:text-white leading-none"> 
                Configuración
              </h1> 
              <p className="text-zinc-800 dark:text-zinc-200 text-base md:text-lg font-bold mt-2 opacity-90">
                Personaliza tu identidad digital y seguridad
              </p>
            </div>
        </div>
      </header> 

      {/* GRID TOTALMENTE INTEGRADO SIN ETIQUETAS DE FONDO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 items-start max-w-7xl"> 
        
        {/* COLUMNA 1: VISTA PREVIA */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 ml-1">
            <LayoutDashboard size={18} className="text-emerald-500" strokeWidth={2.5} />
            <h2 className={subTitleStyle}>Vista Previa</h2>
          </div>
          {/* Divisor minimalista */}
          <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800 -mt-4 mb-2" />
          <div className="w-full">
            <CardProfile /> 
          </div>
        </div>

        {/* COLUMNA 2: DATOS PERSONALES */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 ml-1">
            <UserCog size={18} className="text-emerald-500" strokeWidth={2.5} />
            <h2 className={subTitleStyle}>Datos Personales</h2>
          </div>
          <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800 -mt-4 mb-2" />
          <div className="w-full">
            <FormularioPerfil /> 
          </div>
        </div> 

        {/* COLUMNA 3: SEGURIDAD */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 ml-1">
            <ShieldCheck size={18} className="text-emerald-500" strokeWidth={2.5} />
            <h2 className={subTitleStyle}>Acceso y Seguridad</h2>
          </div>
          <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800 -mt-4 mb-2" />
          <div className="w-full">
            <CardPassword /> 
          </div>
        </div>

      </div> 
    </motion.div> 
  ) 
} 

export default Profile