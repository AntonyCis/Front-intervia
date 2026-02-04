import { useState, useEffect } from 'react';
import axios from 'axios'; // O usa fetch si prefieres
import {Zap, Loader2 } from 'lucide-react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

export default function Panel() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const cardStyle = "bg-[#edebe0] dark:bg-black/20 border-2 border-black dark:border-[#3f3f46] rounded-[2.5rem] p-7 shadow-xl hover:border-emerald-500 transition-all duration-300";
  
  // 1. Cargar datos reales de tu API
  useEffect(() => {
    const getStats = async () => {
      try {
        // Asegúrate de enviar el Token si usas middleware de auth
        const token = localStorage.getItem('token'); 
        const { data } = await axios.get('http://localhost:3000/api/interview/history', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Filtramos solo las completadas para las gráficas
        setInterviews(data.filter(i => i.isCompleted).reverse()); 
      } catch (error) {
        console.error("Error al obtener historial:", error);
      } finally {
        setLoading(false);
      }
    };
    getStats();
  }, []);

  // 2. Configuración de datos para Chart.js basada en tu backend
  const lineData = {
    labels: interviews.map(i => new Date(i.createdAt).toLocaleDateString()),
    datasets: [{
      fill: true,
      label: 'Score de IA',
      data: interviews.map(i => i.progressPercentage), // Usamos el % que ya calculas
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { min: 0, max: 100, ticks: { color: '#71717a' }, grid: { color: 'rgba(113, 113, 122, 0.05)' } },
      x: { ticks: { color: '#71717a' }, grid: { display: false } }
    },
    plugins: { legend: { display: false } }
  };

  // 3. Métricas calculadas en tiempo real
  const avgPerformance = interviews.length > 0 
    ? (interviews.reduce((acc, curr) => acc + curr.progressPercentage, 0) / interviews.length).toFixed(0) 
    : 0;

  return (
    <div className="min-h-screen p-6 space-y-10">
      
      {/* Header Dinámico */}
      <div className="flex justify-between items-center">
        <h1 className='font-black text-4xl tracking-tighter uppercase italic text-black dark:text-white'>
          InterviAI <span className="text-emerald-500">Stats</span>
        </h1>
        <div className="bg-emerald-500 text-black px-4 py-1 rounded-full font-black text-xs uppercase italic">
          {interviews.length} Sesiones Realizadas
        </div>
      </div>

      {/* Grid de Métricas Reales */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={cardStyle}>
          <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Puntaje Promedio</p>
          <p className="text-4xl font-black">{avgPerformance}%</p>
        </div>
        <div className={cardStyle}>
          <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Última Sesión</p>
          <p className="text-2xl font-black truncate">{interviews[interviews.length - 1]?.title || 'Sin datos'}</p>
        </div>
        <div className={cardStyle}>
          <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Estado de Entrenamiento</p>
          <p className="text-2xl font-black">{avgPerformance > 70 ? 'LISTO PARA INTERVIEW' : 'SIGUE PRACTICANDO'}</p>
        </div>
      </section>

      {/* Gráfico Evolutivo */}
      <section className={cardStyle}>
        <div className="flex justify-between items-center mb-6">
            <h2 className="font-black uppercase italic text-zinc-500 text-sm">Evolución de Rendimiento por Sesión</h2>
            <Zap size={18} className="text-emerald-500" />
        </div>
        <div className="h-[300px]">
          {loading ? (
            <div className="flex items-center justify-center h-full gap-2 text-emerald-500 font-bold italic">
              <Loader2 className="animate-spin" /> SINCRONIZANDO DATA...
            </div>
          ) : (
            <Line options={chartOptions} data={lineData} />
          )}
        </div>
      </section>

    </div>
  );
}