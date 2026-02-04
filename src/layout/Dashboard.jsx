import { useState, useRef, useEffect } from 'react' 
import { Link, Outlet, useLocation, useNavigate } from 'react-router'
import storeAuth from '../context/storeAuth'
import storeProfile from '../context/storeProfile'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutGrid, User, Layers, Plus, Crown, LogOut, Settings,
  ChevronRight, ImageIcon, Sun, Languages, Trash2, Sparkles,
  ShieldCheck, BarChart3, Users // Iconos para el Admin
} from 'lucide-react'
import logo from '../assets/logo.png'

const Dashboard = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { clearToken } = storeAuth()
  const { user } = storeProfile()
  
  const [showSettings, setShowSettings] = useState(false)
  const [language, setLanguage] = useState('ES')
  const [theme, setTheme] = useState('dark') 
  const [bgImage, setBgImage] = useState(null)
  const [isCompact, setIsCompact] = useState(false)
  const fileInputRef = useRef(null)

  // Verificación de rol (Admin vs Usuario)
  const isAdmin = user?.rol?.toLowerCase() === 'administrador' || user?.rol?.toLowerCase() === 'admin';

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const isDark = theme === 'dark'

  const suggestedBackgrounds = isDark 
    ? [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1772&auto=format&fit=crop",
        "https://wallpapers.com/images/hd/best-computer-background-jb3n2ujvvau7j7wo.jpg"
      ]
    : [
        "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1767&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1770&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=2070&auto=format&fit=crop"
      ];

  const text = {
    ES: { 
      dash: 'Dashboard', profile: 'Mi Perfil', jobs: 'Entrevistas', interview: 'Entrevista', plans: 'Planes Pro',
      exit: 'Desconectarse', set: 'CONFIGURACIÓN', bg: 'SUBIR IMAGEN', 
      theme: 'TEMA', reset: 'RESTABLECER TODO', online: 'SISTEMA ONLINE', role: 'ADMINISTRADOR', 
      gallery: 'FONDOS SUGERIDOS', lang: 'IDIOMA', view: 'VISTA SIDEBAR', clean: 'QUITAR FONDO',
      adminPanel: 'Gestión Usuarios', stats: 'Métricas Globales'
    },
    EN: { 
      dash: 'Dashboard', profile: 'My Profile', jobs: 'Jobs', interview: 'Interview', plans: 'Pricing Plans',
      exit: 'Sign Out', set: 'SETTINGS', bg: 'UPLOAD IMAGE', 
      theme: 'THEME', reset: 'RESET THEME', online: 'SYSTEM ONLINE', role: 'ADMINISTRATOR', 
      gallery: 'SUGGESTED BG', lang: 'LANGUAGE', view: 'SIDEBAR VIEW', clean: 'REMOVE BG',
      adminPanel: 'Manage Users', stats: 'Global Stats'
    }
  }[language]

  const handleLogout = () => { clearToken(); navigate('/') }

  // Filtro de links dinámico según el rol
  const menuLinks = [
    { path: '/dashboard', name: text.dash, icon: LayoutGrid },
    { path: '/dashboard/profile', name: text.profile, icon: User },
    ...(!isAdmin ? [
      { path: '/dashboard/list', name: text.jobs, icon: Layers },
      { path: '/dashboard/create', name: text.interview, icon: Plus },
    ] : [
      { path: '/dashboard/users', name: text.adminPanel, icon: Users },
      { path: '/dashboard/stats', name: text.stats, icon: BarChart3 },
    ]),
    { path: '/dashboard/plans', name: text.plans, icon: Crown },
  ]

  return (
    <div 
      className={`flex h-screen font-sans transition-all duration-700 overflow-hidden ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}
      style={{ 
        backgroundColor: isDark ? '#09090b' : '#f3eee0',
        backgroundImage: bgImage 
          ? `linear-gradient(${isDark ? 'rgba(0,0,0,0.5)' : 'rgba(243,238,224,0.3)'}, ${isDark ? 'rgba(0,0,0,0.5)' : 'rgba(243,238,224,0.3)'}), url(${bgImage})` 
          : 'none',
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <input type="file" ref={fileInputRef} onChange={(e) => setBgImage(URL.createObjectURL(e.target.files[0]))} className="hidden" accept="image/*" />
      
      <aside className={`
        ${isCompact ? 'w-20' : 'w-20 lg:w-64'} 
        ${isDark ? 'bg-black/20 border-white/5' : 'bg-white/30 border-black/5'} 
        backdrop-blur-2xl border-r flex flex-col z-50 transition-all duration-300
      `}>
        <div className="h-20 flex items-center px-6 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${isAdmin ? 'bg-amber-500 shadow-amber-500/20' : 'bg-emerald-500 shadow-emerald-500/20'}`}>
              <img src={logo} alt="L" className="w-6 h-6 brightness-0 invert" />
            </div>
            {!isCompact && <span className={`hidden lg:block font-black tracking-tight text-xl ${isDark ? 'text-white' : 'text-zinc-900'}`}>InterviAI</span>}
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {menuLinks.map((item) => (
            <Link key={item.path} to={item.path}>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${location.pathname === item.path ? (isDark ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 shadow-lg' : 'bg-white text-emerald-700 shadow-sm border border-black/5') : (isDark ? 'hover:bg-white/5 hover:text-zinc-200' : 'hover:bg-black/5 hover:text-zinc-900')}`}>
                <item.icon size={20} strokeWidth={2.5} />
                {!isCompact && <span className="hidden lg:block text-sm font-bold">{item.name}</span>}
              </div>
            </Link>
          ))}
        </nav>

        <div className={`p-4 border-t ${isDark ? 'border-white/5' : 'border-black/5'} space-y-4`}>
          <div className="flex items-center gap-3 px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-black shadow-md border-2 ${isDark ? 'bg-zinc-900 text-white border-zinc-700' : 'bg-white text-zinc-900 border-[#d8d0b5]'} ${isAdmin ? 'border-amber-500/50' : ''}`}>
              {user?.nombre?.substring(0,2).toUpperCase() || 'AI'}
            </div>
            {!isCompact && (
              <div className="hidden lg:block">
                <p className={`text-[14px] font-black leading-tight ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>{user?.nombre || 'Antony'}</p>
                <p className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-1 ${isAdmin ? 'text-amber-500' : 'text-emerald-500'}`}>
                  {isAdmin && <ShieldCheck size={10} />} {user?.rol || text.role}
                </p>
              </div>
            )}
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all duration-300 group">
             <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
             {!isCompact && <span>{text.exit}</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className={`h-20 flex items-center justify-between px-8 border-b backdrop-blur-md z-40 ${isDark ? 'bg-black/10 border-white/5' : 'bg-white/10 border-black/5'}`}>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className={isAdmin ? "text-amber-500" : "text-emerald-500"} />
            <ChevronRight size={14} className="text-zinc-400/30" />
            <span className={`text-sm font-black uppercase tracking-tight ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>{location.pathname.split('/').pop() || 'Resumen'}</span>
          </div>

          <div className="flex items-center gap-6 relative">
            <div className={`hidden sm:flex items-center gap-2 text-[10px] font-black px-5 py-2 rounded-full border shadow-sm ${isDark ? 'bg-zinc-900/40 border-white/5 text-emerald-400' : 'bg-white/60 border-black/5 text-emerald-600'}`}>
              <span className={`w-2 h-2 rounded-full animate-ping ${isAdmin ? 'bg-amber-500' : 'bg-emerald-500'}`} />
              {text.online}
            </div>

            <button onClick={() => setShowSettings(!showSettings)} className={`p-2.5 rounded-2xl transition-all z-50 shadow-sm border ${isDark ? 'bg-zinc-900 border-white/5 hover:bg-zinc-800 text-zinc-400' : 'bg-white border-black/5 hover:bg-zinc-50 text-zinc-600'}`}>
              <Settings size={20} className={`${showSettings ? 'rotate-180 text-emerald-500' : ''} transition-transform duration-500`} />
            </button>

            <AnimatePresence>
              {showSettings && (
                <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className={`absolute right-0 top-16 w-85 border rounded-[2.5rem] shadow-2xl p-7 z-[60] backdrop-blur-3xl ${isDark ? 'bg-[#0c0c0e]/95 border-white/10 text-zinc-400' : 'bg-white/95 border-black/10 text-zinc-600'}`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-emerald-500">{text.set}</h3>
                    {bgImage && (
                      <button onClick={() => setBgImage(null)} className="flex items-center gap-1.5 text-[10px] font-black text-red-500 hover:scale-105 transition-all">
                        <Trash2 size={14}/> {text.clean}
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    {/* TEMA */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-zinc-500 flex items-center gap-2"><Sun size={14}/> {text.theme}</label>
                      <div className={`flex p-1.5 rounded-2xl ${isDark ? 'bg-zinc-900' : 'bg-[#f3eee0]'}`}>
                        <button onClick={() => setTheme('light')} className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[10px] font-black rounded-xl transition-all ${!isDark ? 'bg-white text-emerald-600 shadow-md' : 'text-zinc-500'}`}>LIGHT</button>
                        <button onClick={() => setTheme('dark')} className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[10px] font-black rounded-xl transition-all ${isDark ? 'bg-zinc-800 text-emerald-400 shadow-md' : 'text-zinc-500'}`}>DARK</button>
                      </div>
                    </div>

                    {/* IDIOMA */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-zinc-500 flex items-center gap-2"><Languages size={14}/> {text.lang}</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['ES', 'EN'].map((lang) => (
                          <button key={lang} onClick={() => setLanguage(lang)} className={`py-2.5 text-[10px] font-black rounded-xl border transition-all ${language === lang ? 'border-emerald-500 bg-emerald-500/5 text-emerald-500' : (isDark ? 'border-white/5' : 'border-black/5')}`}>
                            {lang === 'ES' ? 'ESPAÑOL' : 'ENGLISH'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* FONDOS SUGERIDOS */}
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-zinc-500 flex items-center gap-2"><ImageIcon size={14}/> {text.gallery}</label>
                      <div className="grid grid-cols-3 gap-3">
                        {suggestedBackgrounds.map((img, i) => (
                          <button key={i} onClick={() => setBgImage(img)} className={`relative h-14 rounded-xl border-2 overflow-hidden transition-all hover:scale-105 ${bgImage === img ? 'border-emerald-500 ring-4 ring-emerald-500/10' : 'border-transparent'}`}>
                            <img src={img} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                      <button onClick={() => fileInputRef.current.click()} className={`w-full py-3 text-[10px] font-black rounded-2xl border-2 border-dashed transition-all ${isDark ? 'border-white/10 text-zinc-500 hover:border-emerald-400' : 'border-[#d8d0b5] text-zinc-500 hover:border-emerald-600'}`}>
                        + {text.bg}
                      </button>
                    </div>

                    {/* RESET */}
                    <button onClick={() => {setBgImage(null); setTheme('dark'); setIsCompact(false); setLanguage('ES')}} className="w-full mt-2 py-4 bg-red-500/10 text-red-500 text-[10px] font-black rounded-[1.5rem] hover:bg-red-500 hover:text-white transition-all tracking-widest border border-red-500/20">
                      {text.reset}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-10 bg-transparent transition-colors duration-500">
          <div className="max-w-[1600px] mx-auto">
            <Outlet context={{ isAdmin }} />
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard