import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  FileCheck2 
} from "lucide-react";

export const CardProfileCandidate = ({ candidateData }) => {
  // Datos adaptados
  const data = candidateData || {
    nombre: "Alexander Pierce",
    puesto: "Senior Frontend Developer",
    email: "a.pierce@tech-solutions.com",
    celular: "+593 998 765 432",
    experiencia: "5+ años",
    estado: "En Proceso"
  };

  const details = [
    { label: "Candidato", value: data.nombre, icon: User },
    { label: "Cargo Postulado", value: data.puesto, icon: Briefcase },
    { label: "Email de Contacto", value: data.email, icon: Mail },
    { label: "Teléfono", value: data.celular, icon: Phone },
    { label: "Experiencia", value: data.experiencia, icon: GraduationCap },
  ];

  // LÓGICA DE COLORES PARA MODO CLARO (BEIGE) Y OSCURO (NEGRO)
  const containerStyle = "bg-[#edebe0] dark:bg-[#000000] border-2 border-black dark:border-[#71717a] p-7 rounded-[2.5rem] shadow-2xl max-w-sm w-full relative overflow-hidden group transition-colors duration-300";
  const textPrimary = "text-black dark:text-white";
  const textSecondary = "text-zinc-600 dark:text-zinc-400";
  const borderStyle = "border-black dark:border-[#71717a]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={containerStyle}
    >
      {/* INDICADOR DE ESTADO */}
      <div className="absolute top-5 right-5">
        <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-emerald-500/20 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          {data.estado}
        </span>
      </div>

      {/* HEADER: AVATAR Y TÍTULO */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
          <img 
            src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" 
            alt="Candidate" 
            className={`relative w-28 h-28 rounded-full border-2 ${borderStyle} bg-transparent p-1.5 object-cover shadow-2xl transition-transform duration-500 group-hover:scale-105`}
          />
        </div>
        <h3 className={`text-lg font-bold ${textPrimary} tracking-tight`}>{data.nombre}</h3>
        <p className={`text-xs ${textSecondary} font-black uppercase tracking-wider`}>{data.puesto}</p>
      </div>

      {/* INFO LIST */}
      <div className="space-y-5">
        {details.map((item, idx) => (
          <div key={idx} className="group/item">
            <div className={`flex items-center gap-3 ${textSecondary} mb-1`}>
              <item.icon size={15} className="group-hover/item:text-emerald-500 transition-colors" />
              <span className={`text-[10px] font-black uppercase tracking-[0.1em]`}>
                {item.label}
              </span>
            </div>
            <p className={`text-sm font-bold ${textPrimary} ml-7 truncate transition-colors`}>
              {item.value || "No especificado"}
            </p>
          </div>
        ))}
      </div>

      {/* ACCIONES PROFESIONALES */}
      <div className={`mt-8 pt-6 border-t ${borderStyle} flex gap-3`}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          // Botón principal: Negro en Light / Esmeralda en Dark
          className="flex-1 py-3 bg-black dark:bg-[#10b981] text-white font-black uppercase text-[11px] tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 border-2 border-black dark:border-transparent"
        >
          <FileCheck2 size={16} />
          Ver CV
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-3 bg-transparent border-2 ${borderStyle} ${textPrimary} hover:text-emerald-500 hover:border-emerald-500 rounded-xl transition-all`}
        >
          <Calendar size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
};