import storeProfile from "../../context/storeProfile";
import { motion } from "framer-motion";
import { Camera, User, Mail, Phone, MapPin, BadgeCheck } from "lucide-react";

export const CardProfile = () => {
  const { user } = storeProfile();

  const infoFields = [
    { label: "NOMBRE", value: user?.nombre, icon: User },
    { label: "DIRECCIÓN", value: user?.direccion, icon: MapPin },
    { label: "TELÉFONO", value: user?.celular, icon: Phone },
    { label: "CORREO", value: user?.email, icon: Mail },
  ];

  // REGLA: Si es claro -> Todo Beige. Si es oscuro -> Todo Negro.
  const cardBg = "bg-[#edebe0] dark:bg-[#000000]";
  const itemBg = "bg-[#edebe0] dark:bg-[#000000]"; // Mismo color que la card para que no haya parches
  const borderStyle = "border-2 border-black dark:border-[#71717a]";
  const textPrimary = "text-black dark:text-white";
  const textSecondary = "text-black dark:text-[#71717a]";

  return (
    <motion.div 
      className={`${cardBg} ${borderStyle} rounded-[2.5rem] p-8 w-full h-full relative overflow-hidden flex flex-col shadow-none`}
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
    >
      <div className="relative flex flex-col items-center mb-8">
        <div className="relative group/avatar">
          <img  
            src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png"  
            alt="img-client"  
            className={`w-28 h-28 rounded-full ${borderStyle} p-1 bg-white dark:bg-[#0a0a0a] object-cover`} 
          />
          <label className={`absolute bottom-1 right-1 bg-emerald-500 text-black rounded-full p-2 cursor-pointer border-[3px] border-[#edebe0] dark:border-[#000000]`}>
            <Camera size={16} strokeWidth={3} />
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </div>

        <div className="mt-4 text-center">
          <div className="flex items-center justify-center gap-1.5">
            <h2 className={`text-xl font-black tracking-tight ${textPrimary}`}>
              {user?.nombre || "Antony"}
            </h2>
            <BadgeCheck size={18} className="text-emerald-500" />
          </div>
          <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 tracking-[0.2em] uppercase mt-0.5">
            {user?.rol || "ADMINISTRADOR"}
          </p>
        </div>
      </div>

      {/* Lista de información: Sin fondos negros, todo beige o negro según modo */}
      <div className="space-y-3 flex-1">
        {infoFields.map((field) => ( 
          <div 
            key={field.label} 
            className={`flex flex-col ${itemBg} ${borderStyle} p-3.5 rounded-2xl`}
          >
            <span className={`text-[9px] font-black uppercase tracking-widest mb-1 flex items-center gap-2 ${textSecondary}`}>
               {field.label}
            </span>
            <span className={`text-sm font-bold truncate ${textPrimary}`}>
                {field.value || "---"}
            </span>
          </div>
        ))}
      </div>
    </motion.div> 
  )
}