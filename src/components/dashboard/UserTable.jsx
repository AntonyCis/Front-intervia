import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Loader2, Mail } from 'lucide-react';
import axios from 'axios';
import storeAuth from '../../context/storeAuth';

const UserTable = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = storeAuth();

  // Usamos tu variable de entorno
  const URL_BACK = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const getDashData = async () => {
      try {
        // Concatenamos con el endpoint de admin/dashboard que ya tienes
        const response = await axios.get(`${URL_BACK}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(response.data);
      } catch (error) {
        console.error("Error al obtener datos del dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    getDashData();
  }, [token, URL_BACK]);

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Cargando base de datos...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Tarjetas de Estadísticas Reales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Total Usuarios</p>
              <h3 className="text-4xl font-black text-white mt-1">{data?.stats?.usuarios || 0}</h3>
            </div>
            <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500"><Users size={24}/></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Staff Admin</p>
              <h3 className="text-4xl font-black text-white mt-1">{data?.stats?.administradores || 0}</h3>
            </div>
            <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-500"><Shield size={24}/></div>
          </div>
        </motion.div>
      </div>

      {/* Tabla de Usuarios Recientes */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-2xl"
      >
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black italic uppercase tracking-tight text-white">Últimos Registros</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/60">Datos obtenidos de {URL_BACK}</p>
          </div>
          <button className="text-[10px] font-black bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/5 transition-all">
            VER TODOS
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-widest text-white/40 border-b border-white/5">
                <th className="px-8 py-6">Usuario</th>
                <th className="px-6 py-6">Contacto</th>
                <th className="px-6 py-6 text-right">Rol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data?.dataReciente?.ultimosRegistros?.length > 0 ? (
                data.dataReciente.ultimosRegistros.map((u) => (
                  <tr key={u._id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-[10px] font-black text-white border border-white/10">
                          {u.nombre?.substring(0,2).toUpperCase()}
                        </div>
                        <span className="text-sm font-bold text-white tracking-tight">{u.nombre} {u.apellido}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-xs text-white/60 flex items-center gap-1.5"><Mail size={12}/> {u.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="text-[9px] font-black bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
                        {u.rol || 'USUARIO'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-8 py-10 text-center text-zinc-500 italic text-sm">No se encontraron registros recientes</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default UserTable;