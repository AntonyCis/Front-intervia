import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [handStatus, setHandStatus] = useState("Cargando IA...");
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const targetsRef = useRef(null);
  const pointsRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const opacity3D = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  const lineLength = 1800;
  const lineDraw = useTransform(
    scrollYProgress,
    [0.25, 0.85],
    [lineLength, 0]
  );

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    const loadExternalScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.crossOrigin = "anonymous";
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (containerRef.current) containerRef.current.appendChild(renderer.domElement);

    const particleCount = 20000;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(particleCount * 3);
    targetsRef.current = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 12;
      targetsRef.current[i] = pos[i];
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.012, color: 0x00f2ff, transparent: true, blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geo, mat);
    pointsRef.current = points;
    scene.add(points);
    camera.position.z = 6;

    const initAll = async () => {
      if (!window.Hands || !window.Camera) {
        await loadExternalScript("https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js");
        await loadExternalScript("https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js");
      }
      if (window.Hands && window.Camera) {
        const hands = new window.Hands({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}` });
        hands.setOptions({ maxNumHands: 1, modelComplexity: 1, minDetectionConfidence: 0.5 });
        hands.onResults((results) => {
          if (results.multiHandLandmarks && results.multiHandLandmarks[0]) {
            setHandStatus("SENSOR ACTIVO");
            const h = results.multiHandLandmarks[0];
            const dist = Math.hypot(h[4].x - h[8].x, h[4].y - h[8].y);
            points.scale.set(0.6 + dist * 3.5, 0.6 + dist * 3.5, 0.6 + dist * 3.5);
            points.position.x = (h[9].x - 0.5) * -12;
            points.position.y = (h[9].y - 0.5) * -10;
          } else { setHandStatus("BUSCANDO MANO..."); }
        });
        const cam = new window.Camera(videoRef.current, {
          onFrame: async () => { await hands.send({ image: videoRef.current }); },
          width: 640, height: 480,
        });
        cam.start();
      }
    };
    initAll();
    const animate = () => {
      requestAnimationFrame(animate);
      const pArr = points.geometry.attributes.position.array;
      for (let i = 0; i < particleCount * 3; i++) { pArr[i] += (targetsRef.current[i] - pArr[i]) * 0.08; }
      points.geometry.attributes.position.needsUpdate = true;
      points.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, []);

  const morph = (shape) => {
    const targets = targetsRef.current;
    for (let i = 0; i < 20000; i++) {
      const i3 = i * 3;
      let x, y, z;
      if (shape === "ia") {
        const r = 2.5; const t = Math.random() * Math.PI * 2; const p = Math.acos(2 * Math.random() - 1);
        x = r * Math.sin(p) * Math.cos(t); y = r * Math.sin(p) * Math.sin(t); z = r * Math.cos(p);
      } else if (shape === "laptop") {
        if (i < 12000) { x = (Math.random() - 0.5) * 4.5; y = Math.random() * 3; z = -0.1; }
        else { x = (Math.random() - 0.5) * 4.5; y = 0; z = Math.random() * 2.5; }
      } else if (shape === "saturno") {
        if (i < 8000) {
          const r = 1.6; const t = Math.random() * Math.PI * 2; const p = Math.acos(2 * Math.random() - 1);
          x = r * Math.sin(p) * Math.cos(t); y = r * Math.sin(p) * Math.sin(t); z = r * Math.cos(p);
        } else {
          const r = 3 + Math.random() * 0.8; const a = Math.random() * Math.PI * 2;
          x = Math.cos(a) * r; y = (Math.random() - 0.5) * 0.15; z = Math.sin(a) * r;
        }
      } else { x = (Math.random() - 0.5) * 6 * Math.sin(i); y = (Math.random() - 0.5) * 3 * Math.cos(i); z = (Math.random() - 0.5) * 4; }
      targets[i3] = x; targets[i3 + 1] = y; targets[i3 + 2] = z;
    }
  };

  const steps = [
    { num: "01", title: "Generación", desc: "La IA crea preguntas de entrevistas según el perfil y el puesto del usuario." },
    { num: "02", title: "Registro", desc: "El usuario responde las preguntas simulando una entrevista real." },
    { num: "03", title: "Evaluación", desc: "El sistema analiza las respuestas y mide su claridad y relevancia." },
    { num: "04", title: "Feedback", desc: "La plataforma entrega recomendaciones para mejorar el desempeño." }
  ];

  const servicios = [
    { title: "Simulación Realista", desc: "Entrevistas IA que imitan procesos reales." },
    { title: "Análisis Inteligente", desc: "Evaluación automática de lenguaje y coherencia." },
    { title: "Feedback Personalizado", desc: "Recomendaciones claras para mejorar." },
    { title: "Entrenamiento Continuo", desc: "Práctica ilimitada con seguimiento." },
  ];

  const planesLanding = [
    { nombre: "Basic", precio: 5, color: "from-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", features: ["5 Entrevistas IA", "Feedback Básico"] },
    { nombre: "Pro", precio: 15, color: "from-cyan-500/10", border: "border-cyan-500/50", text: "text-cyan-400", popular: true, features: ["20 Entrevistas IA", "Feedback Detallado", "Descarga PDF"] },
    { nombre: "Unlimited", precio: 30, color: "from-amber-500/10", border: "border-amber-500/20", text: "text-amber-400", features: ["Ilimitado", "IA Premium", "Coach IA"] }
  ];

  const testimonios = [
    { text: "Me ayudó a mejorar la forma en que respondo en una entrevista.", user: "Andrea González", date: "03/01/2026", avatar: "https://i.pravatar.cc/100?u=1" },
    { text: "La simulación es clara y fácil de usar, muy útil para practicar.", user: "Daniel Castillo", date: "02/01/2026", avatar: "https://i.pravatar.cc/100?u=2" },
    { text: "Recibí recomendaciones que realmente me sirvieron para corregir errores.", user: "Paola Ramírez", date: "01/01/2026", avatar: "https://i.pravatar.cc/100?u=3" }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/50 border-b border-white/10 flex justify-between items-center px-10 py-4 font-mono">
        <h1 className="text-lg font-black uppercase tracking-widest">InterviAI</h1>
        <nav className="flex gap-6">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="nav-btn">Inicio</button>
          <button onClick={() => document.getElementById("mision")?.scrollIntoView({ behavior: "smooth" })} className="nav-btn">Misión</button>
          <button onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })} className="nav-btn">Servicios</button>
          <button onClick={() => document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" })} className="nav-btn">Cómo Funciona</button>
          <button onClick={() => document.getElementById("planes")?.scrollIntoView({ behavior: "smooth" })} className="nav-btn text-cyan-400 border-cyan-500/30">Planes</button>
          <button onClick={() => document.getElementById("testimonios")?.scrollIntoView({ behavior: "smooth" })} className="nav-btn">Testimonios</button>
          <button onClick={() => window.location.href="/login"} className="nav-btn">Login</button>
        </nav>
      </header>

      <video ref={videoRef} className="hidden" />
      <motion.div ref={containerRef} style={{ opacity: opacity3D }} className="fixed inset-0 z-0 pointer-events-none" />

      <div className="relative z-10 px-10 pt-50 max-w-6xl mx-auto">
        {/* HERO */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-none tracking-tighter mb-4">
            Simulación de <br /> <span className="text-cyan-400">Entrevistas Laborales</span>
          </h1>
          <p className="font-mono text-xs tracking-[0.3em] opacity-40 uppercase mb-10">Análisis Biométrico y Gestual mediante Visión Artificial</p>
          <div className="flex flex-wrap gap-3 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl w-fit mb-20 font-mono">
            <button onClick={() => morph("ia")} className="nav-btn">IA CORE</button>
            <button onClick={() => morph("laptop")} className="nav-btn">WORKSTATION</button>
            <button onClick={() => morph("saturno")} className="nav-btn">GLOBAL NETWORK</button>
            <input type="color" onChange={(e) => pointsRef.current.material.color.set(e.target.value)} className="w-8 h-8 cursor-pointer bg-transparent border-none" />
            <span className="text-[10px] text-cyan-400 self-center ml-4 tracking-widest uppercase">{handStatus}</span>
          </div>
        </motion.div>

        {/* MISION / VISION */}
        <div className="bg-white rounded-[40px] p-12 flex flex-col gap-16 mt-65 relative z-20 shadow-2xl text-black">
          <div id="mision" className="flex flex-col md:flex-row items-center gap-10">
            <motion.div className="md:w-1/2" style={{ y: scrollY * 0.05 }} whileHover={{ scale: 1.05 }}>
              <img src="https://ehlatam.com/wp-content/uploads/2025/07/entrevistas-hibridas-IA.jpg" className="w-full rounded-3xl shadow-xl" />
            </motion.div>
            <div className="md:w-1/2">
              <h2 className="text-4xl font-black italic uppercase mb-2">Nuestra Misión</h2>
              <p className="text-black/70 text-lg leading-relaxed">Brindar una plataforma inteligente de simulación de entrevistas laborales que, mediante inteligencia artificial y análisis del comportamiento, ayude a las personas a mejorar sus habilidades de comunicación, seguridad y desempeño profesional.</p>
            </div>
          </div>
          <div id="vision" className="flex flex-col md:flex-row-reverse items-center gap-10">
            <motion.div className="md:w-1/2" style={{ y: scrollY * 0.05 }} whileHover={{ scale: 1.05 }}>
              <img src="https://comunicagenia.com/wp-content/uploads/2025/04/inteligencia-artificial-ayudarme-entrevista-trabajo.jpg" className="w-full rounded-3xl shadow-xl" />
            </motion.div>
            <div className="md:w-1/2 text-right">
              <h2 className="text-4xl font-black italic uppercase mb-4">Nuestra Visión</h2>
              <p className="text-black/70 text-lg leading-relaxed">Ser una plataforma innovadora y confiable que transforme la preparación de entrevistas laborales, ofreciendo entrenamiento personalizado y accesible apoyado en tecnología de inteligencia artificial.</p>
            </div>
          </div>
        </div>

        {/* SERVICIOS */}
        <section id="servicios" className="relative mt-30 mb-40">
          <h2 className="text-4xl font-black italic uppercase text-center mb-24">Servicios</h2>
          <svg viewBox="0 0 600 1400" className="absolute left-1/2 top-20 -translate-x-1/2 h-full" fill="none">
            <motion.path d="M300 0 C 520 240, 80 480, 300 720 C 520 960, 80 1200, 300 1440" stroke="rgba(0,242,255,0.6)" strokeWidth="3" fill="none" strokeDasharray={lineLength} style={{ strokeDashoffset: lineDraw }} />
          </svg>
          <div className="relative flex flex-col gap-24 -mt-32">
            {servicios.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 120 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
                <div className="w-[320px] bg-white/90 text-black rounded-3xl p-6 shadow-2xl">
                  <div className="text-cyan-500 font-black text-4xl mb-2">0{i + 1}</div>
                  <h3 className="text-xl font-bold mb-2 uppercase">{s.title}</h3>
                  <p className="text-black/70 text-sm">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section id="como-funciona" className="py-16 mt-4 relative z-20 font-sans">
            <div className="text-center mb-12">
               <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight text-white">
                 Cómo Funciona
               </h2>
               <div className="w-16 h-1 bg-cyan-500 mx-auto mt-3 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {steps.map((step, idx) => (
                 <motion.div key={idx} whileHover={{ y: -8, scale: 1.02 }} className="relative p-8 rounded-[35px] bg-white/[0.05] border border-white/20 backdrop-blur-md flex flex-col items-center text-center group transition-all hover:border-cyan-500/50">
                   <div className="w-12 h-12 rounded-full border-2 border-cyan-500 flex items-center justify-center text-cyan-400 font-black text-lg mb-6 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                     {step.num}
                   </div>
                   <h3 className="text-xl font-black uppercase mb-4 tracking-tight text-white">{step.title}</h3>
                   <p className="text-white/80 text-base leading-relaxed font-medium">{step.desc}</p>
                 </motion.div>
               ))}
            </div>
        </section>

        {/* SECCIÓN PLANES - NUEVA INTEGRACIÓN */}
        <section id="planes" className="py-24 relative z-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black italic uppercase tracking-tight text-white">Planes</h2>
            <div className="w-16 h-1 bg-cyan-500 mx-auto mt-3 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {planesLanding.map((plan, idx) => (
              <motion.div key={idx} whileHover={{ y: -10 }} className={`relative p-8 rounded-[40px] bg-gradient-to-b ${plan.color} to-transparent border-2 ${plan.border} backdrop-blur-md flex flex-col overflow-hidden group`}>
                {plan.popular && <span className="absolute -top-1 right-[-30px] rotate-45 bg-cyan-500 text-black font-black text-[10px] py-4 w-[120px] text-center tracking-widest uppercase shadow-xl">Best</span>}
                <h3 className="text-2xl font-black uppercase mb-2 tracking-tighter">{plan.nombre}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className={`text-5xl font-black ${plan.text}`}>${plan.precio}</span>
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">/ Único</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-white/80">
                      <div className={`w-1.5 h-1.5 rounded-full ${plan.text.replace('text', 'bg')}`} /> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => window.location.href="/login"} className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all ${plan.popular ? 'bg-cyan-500 text-black hover:bg-white shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'bg-white/10 text-white hover:bg-white hover:text-black border border-white/20'}`}>
                  Seleccionar
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TESTIMONIOS */}
        <section id="testimonios" className="mt-10 mb-32 relative z-20"> 
          <h2 className="text-3xl md:text-4xl font-black italic uppercase text-center mb-12 text-white">Testimonios</h2>
          <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            {testimonios.map((t, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} className={`flex items-start gap-4 ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                <img src={t.avatar} className="w-14 h-14 rounded-full border-2 border-cyan-400 p-1" alt="user" />
                <div className={`p-6 rounded-[25px] bg-white/5 border border-white/10 max-w-md ${idx % 2 === 0 ? "rounded-tl-none" : "rounded-tr-none"}`}>
                  <p className="text-lg italic mb-4 opacity-90 leading-relaxed font-sans">"{t.text}"</p>
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
                    <span>{t.user}</span>
                    <span className="opacity-40">{t.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative z-20 bg-transparent border-t border-white/10 pt-20 pb-10 mt-20 font-sans">
          <div className="max-w-6xl mx-auto px-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
              <div className="flex flex-col gap-5">
                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">Intervi <span className="text-cyan-400">AI</span></h2>
                <p className="text-white/60 text-base leading-relaxed font-medium">Transformando el futuro profesional con análisis biométrico y visión artificial avanzada.</p>
              </div>
              <div className="flex flex-col gap-6">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-cyan-500">Explorar</h3>
                <nav className="flex flex-col gap-3">
                  <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-white hover:text-cyan-400 text-lg font-bold text-left transition-all italic tracking-tight">Inicio</button>
                  <button onClick={() => document.getElementById("mision")?.scrollIntoView({ behavior: "smooth" })} className="text-white hover:text-cyan-400 text-lg font-bold text-left transition-all italic tracking-tight">Misión</button>
                  <button onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })} className="text-white hover:text-cyan-400 text-lg font-bold text-left transition-all italic tracking-tight">Servicios</button>
                </nav>
              </div>
              <div className="flex flex-col gap-6">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-cyan-500">Contacto Directo</h3>
                <div className="flex flex-col gap-4">
                  <a href="https://wa.me/593989205590" className="flex items-center gap-3 text-white hover:text-green-400 transition-all font-bold text-lg"><span>📱</span> +593 98 920 5590</a>
                  <a href="https://www.instagram.com/x.x_anabel/" className="flex items-center gap-3 text-white hover:text-pink-400 transition-all font-bold text-lg"><span>📸</span> @InterviAI</a>
                  <a href="mailto:anabelayo2017@gmail.com" className="flex items-center gap-3 text-white hover:text-cyan-400 transition-all font-bold text-lg"><span>📩</span> info@interviai.com</a>
                </div>
              </div>
            </div>
            <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-[10px] font-black tracking-[0.2em] text-white/30 uppercase">© 2026 InterviAI — Todos los derechos reservados</p>
              <p className="text-[10px] font-black tracking-[0.2em] text-white/50 uppercase">Quito, Ecuador</p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .nav-btn {
          padding: 8px 18px; border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 999px;
          font-family: monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;
          transition: all 0.4s; color: rgba(255, 255, 255, 0.7);
        }
        .nav-btn:hover { background: white; color: black; box-shadow: 0 4px 20px rgba(0, 242, 255, 0.3); }
      `}</style>
    </div>
  );
}