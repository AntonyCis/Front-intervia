import { useState } from "react";

export default function Home() {
  return (
    <div className="bg-background text-on-background font-body selection:bg-secondary-container selection:text-on-secondary-container">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-sm dark:shadow-none">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white font-headline">
            InterviAI
          </div>
          <div className="hidden md:flex items-center space-gap-8 gap-x-8">
            <a className="text-secondary dark:text-cyan-400 border-b-2 border-secondary font-bold pb-1 font-headline tracking-tight" href="#mision">Misión</a>
            <a className="text-slate-600 dark:text-slate-400 font-medium hover:text-secondary transition-colors duration-200 font-headline tracking-tight" href="#servicios">Servicios</a>
            <a className="text-slate-600 dark:text-slate-400 font-medium hover:text-secondary transition-colors duration-200 font-headline tracking-tight" href="#como-funciona">Cómo funciona</a>
            <a className="text-slate-600 dark:text-slate-400 font-medium hover:text-secondary transition-colors duration-200 font-headline tracking-tight" href="#planes">Planes</a>
            <a className="text-slate-600 dark:text-slate-400 font-medium hover:text-secondary transition-colors duration-200 font-headline tracking-tight" href="#testimonios">Testimonios</a>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => window.location.href = "/login"} className="hidden lg:block text-slate-600 font-medium px-4 py-2 hover:text-secondary transition-all">Iniciar Sesión</button>
            <button onClick={() => window.location.href = "/register"} className="bg-primary-container text-white px-6 py-2 rounded-md font-bold transition-all active:opacity-80 active:scale-95">Empezar Gratis</button>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative px-8 py-20 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-widest mb-6">v2.4 Technical Simulation Engine</span>
            <h1 className="text-6xl md:text-7xl font-headline font-bold text-on-primary-fixed tracking-tighter leading-none mb-6">
              Domina el Arte de la Entrevista Técnica
            </h1>
            <p className="text-xl text-on-surface-variant max-w-lg mb-10 leading-relaxed">
              Simulaciones de alta fidelidad con arquitectos senior y feedback impulsado por IA para transformar tu carrera en ingeniería.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary-container hover:bg-on-primary-fixed-variant text-white px-8 py-4 rounded-md font-bold flex items-center gap-2 transition-all shadow-lg">
                Reservar Simulación <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
              </button>
              <button className="border-2 border-outline-variant hover:border-secondary text-on-surface font-bold px-8 py-4 rounded-md transition-all">
                Ver Demo
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 shadow-2xl overflow-hidden relative">
              {/* Editor UI Mockup */}
              <div className="bg-primary-container px-4 py-2 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-error"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary-fixed"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim"></div>
                </div>
                <div className="text-[10px] font-label text-on-primary-container tracking-widest uppercase">system_design_challenge.py</div>
                <div className="w-4"></div>
              </div>
              <div className="p-6 font-mono text-sm space-y-2 bg-primary-container text-on-primary-fixed-variant/80">
                <div className="flex gap-4 syntax-line px-2 py-1 transition-all"><span className="text-secondary-fixed-dim">01</span><span className="text-white">class LoadBalancer:</span></div>
                <div className="flex gap-4 syntax-line px-2 py-1"><span className="text-secondary-fixed-dim">02</span><span className="text-white">&nbsp;&nbsp;def __init__(self, strategy):</span></div>
                <div className="flex gap-4 syntax-line px-2 py-1"><span className="text-secondary-fixed-dim">03</span><span className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;self.nodes = []</span></div>
                <div className="flex gap-4 syntax-line px-2 py-1 bg-secondary/20 border-l-2 border-secondary"><span className="text-secondary-fixed-dim">04</span><span className="text-secondary-fixed"># TODO: Implement Consistent Hashing</span></div>
                <div className="flex gap-4 syntax-line px-2 py-1"><span className="text-secondary-fixed-dim">05</span><span className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;pass</span></div>
              </div>
              {/* Feedback Overlay */}
              <div className="absolute bottom-6 right-6 glass-panel p-4 rounded-xl border border-secondary/30 max-w-[240px] shadow-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-on-surface">IA Feedback</span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-tight">Tu explicación sobre el Sharding fue excelente, pero considera el "Single Point of Failure" en tu diagrama.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Misión y Visión Section */}
        <section className="bg-surface-container-low py-32 px-8" id="mision">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-6">
              <h2 className="text-4xl font-headline font-bold tracking-tight text-on-primary-fixed">Nuestra Misión</h2>
              <p className="text-lg leading-relaxed text-on-surface-variant">
                Empoderar a la próxima generación de ingenieros senior mediante la democratización del conocimiento táctico. Creemos que la preparación técnica no debe ser un secreto a voces, sino un camino estructurado de crecimiento continuo.
              </p>
              <div className="h-1 w-20 bg-secondary"></div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-headline font-bold tracking-tight text-on-primary-fixed">Nuestra Visión</h2>
              <p className="text-lg leading-relaxed text-on-surface-variant">
                Un mundo donde los procesos de contratación técnica sean justos, transparentes y centrados en el talento real. Visualizamos InterviAI como el estándar de facto para la validación de habilidades en la industria tech global.
              </p>
              <div className="h-1 w-20 bg-secondary"></div>
            </div>
          </div>
        </section>

        {/* Servicios Section */}
        <section className="py-32 px-8 max-w-7xl mx-auto" id="servicios">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-headline font-bold text-on-primary-fixed mb-4">Ingeniería del Éxito</h2>
            <p className="text-on-surface-variant text-lg">Módulos especializados diseñados por entrevistadores de FAANG.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-surface-container-lowest p-8 rounded-xl border border-transparent hover:border-secondary/20 transition-all shadow-sm hover:shadow-xl">
              <div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center mb-8 group-hover:bg-secondary-container transition-colors">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>code</span>
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">Simulaciones de Código</h3>
              <p className="text-on-surface-variant mb-6 text-sm leading-relaxed">Algoritmos, estructuras de datos y optimización en tiempo real con feedback de complejidad Big O.</p>
              <ul className="text-[12px] space-y-2 text-on-surface-variant font-label uppercase tracking-widest">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Python / Go / Java</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Live Coding Sessions</li>
              </ul>
            </div>
            {/* Card 2 */}
            <div className="group bg-surface-container-lowest p-8 rounded-xl border border-transparent hover:border-secondary/20 transition-all shadow-sm hover:shadow-xl">
              <div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center mb-8 group-hover:bg-secondary-container transition-colors">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">Diseño de Sistemas</h3>
              <p className="text-on-surface-variant mb-6 text-sm leading-relaxed">Arquitecturas distribuidas, escalabilidad, latencia y disponibilidad para niveles Senior y Staff.</p>
              <ul className="text-[12px] space-y-2 text-on-surface-variant font-label uppercase tracking-widest">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Microservices Arch</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Whiteboard Strategy</li>
              </ul>
            </div>
            {/* Card 3 */}
            <div className="group bg-surface-container-lowest p-8 rounded-xl border border-transparent hover:border-secondary/20 transition-all shadow-sm hover:shadow-xl">
              <div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center mb-8 group-hover:bg-secondary-container transition-colors">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">Feedback Conductual</h3>
              <p className="text-on-surface-variant mb-6 text-sm leading-relaxed">Método STAR, liderazgo y resolución de conflictos analizados por nuestra IA de lenguaje natural.</p>
              <ul className="text-[12px] space-y-2 text-on-surface-variant font-label uppercase tracking-widest">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Sentiment Analysis</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Soft Skills Score</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cómo funciona Section */}
        <section className="bg-primary-container text-white py-32 px-8 overflow-hidden" id="como-funciona">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <h2 className="text-5xl font-headline font-bold mb-4">El Pipeline</h2>
              <p className="text-on-primary-container text-lg">Tu proceso de CI/CD para el éxito profesional.</p>
            </div>
            <div className="grid md:grid-cols-4 gap-12 relative">
              {/* Step 1 */}
              <div className="relative group">
                <div className="text-[120px] font-headline font-bold text-on-primary-fixed-variant/20 absolute -top-16 -left-4 leading-none select-none">01</div>
                <div className="relative pt-12">
                  <h4 className="text-xl font-bold mb-4 text-secondary-fixed">Elige tu reto</h4>
                  <p className="text-on-primary-container text-sm leading-relaxed">Selecciona entre más de 500 escenarios reales basados en empresas como Netflix, Google y Uber.</p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="relative group">
                <div className="text-[120px] font-headline font-bold text-on-primary-fixed-variant/20 absolute -top-16 -left-4 leading-none select-none">02</div>
                <div className="relative pt-12">
                  <h4 className="text-xl font-bold mb-4 text-secondary-fixed">Entrena en vivo</h4>
                  <p className="text-on-primary-container text-sm leading-relaxed">Codifica o diseña en nuestro entorno IDE propietario con integración de video-conferencia.</p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="relative group">
                <div className="text-[120px] font-headline font-bold text-on-primary-fixed-variant/20 absolute -top-16 -left-4 leading-none select-none">03</div>
                <div className="relative pt-12">
                  <h4 className="text-xl font-bold mb-4 text-secondary-fixed">Recibe feedback</h4>
                  <p className="text-on-primary-container text-sm leading-relaxed">Análisis granular de cada decisión técnica y sugerencias automáticas de mejora.</p>
                </div>
              </div>
              {/* Step 4 */}
              <div className="relative group">
                <div className="text-[120px] font-headline font-bold text-on-primary-fixed-variant/20 absolute -top-16 -left-4 leading-none select-none">04</div>
                <div className="relative pt-12">
                  <h4 className="text-xl font-bold mb-4 text-secondary-fixed">Mejora tu ranking</h4>
                  <p className="text-on-primary-container text-sm leading-relaxed">Visualiza tu progreso comparado con la media de la industria y obtén insignias verificables.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Planes Section */}
        <section className="py-32 px-8 max-w-7xl mx-auto" id="planes">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-headline font-bold text-on-primary-fixed mb-4">Planes</h2>
            <p className="text-on-surface-variant text-lg">Sin costes ocultos. Solo excelencia técnica.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 items-end">
            {/* Básico */}
            <div className="bg-surface-container-low p-10 rounded-xl space-y-8">
              <div>
                <h4 className="text-xl font-bold mb-2">Básico</h4>
                <div className="text-4xl font-headline font-bold">Gratis</div>
                <p className="text-xs text-on-surface-variant uppercase tracking-widest mt-2">Para estudiantes</p>
              </div>
              <ul className="space-y-4 text-sm text-on-surface-variant">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-lg">check_circle</span> 5 Simulaciones / mes</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-lg">check_circle</span> Acceso a comunidad Discord</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-lg">check_circle</span> Roadmap básico</li>
              </ul>
              <button onClick={() => window.location.href = "/login"} className="w-full py-4 border border-outline-variant font-bold rounded-md hover:bg-surface-container-high transition-all">Empezar Ahora</button>
            </div>
            {/* Pro */}
            <div className="bg-primary-container text-white p-10 rounded-xl space-y-8 relative scale-105 shadow-2xl">
              <div className="absolute top-0 right-10 -translate-y-1/2 bg-secondary text-white px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">Más Popular</div>
              <div>
                <h4 className="text-xl font-bold mb-2">Pro</h4>
                <div className="text-4xl font-headline font-bold">$49<span className="text-lg font-normal text-on-primary-container">/mes</span></div>
                <p className="text-xs text-secondary-fixed uppercase tracking-widest mt-2">Para profesionales</p>
              </div>
              <ul className="space-y-4 text-sm text-on-primary-container">
                <li className="flex items-center gap-2 text-white"><span className="material-symbols-outlined text-secondary-fixed text-lg">check_circle</span> Simulaciones Ilimitadas</li>
                <li className="flex items-center gap-2 text-white"><span className="material-symbols-outlined text-secondary-fixed text-lg">check_circle</span> Feedback detallado por IA</li>
                <li className="flex items-center gap-2 text-white"><span className="material-symbols-outlined text-secondary-fixed text-lg">check_circle</span> Dashboard de rendimiento</li>
                <li className="flex items-center gap-2 text-white"><span className="material-symbols-outlined text-secondary-fixed text-lg">check_circle</span> Prioridad en soporte</li>
              </ul>
              <button onClick={() => window.location.href = "/login"} className="w-full py-4 bg-secondary-fixed text-on-secondary-fixed font-bold rounded-md hover:opacity-90 transition-all">Suscribirse al Pro</button>
            </div>
            {/* Enterprise */}
            <div className="bg-surface-container-low p-10 rounded-xl space-y-8">
              <div>
                <h4 className="text-xl font-bold mb-2">Enterprise</h4>
                <div className="text-4xl font-headline font-bold">Custom</div>
                <p className="text-xs text-on-surface-variant uppercase tracking-widest mt-2">Para equipos</p>
              </div>
              <ul className="space-y-4 text-sm text-on-surface-variant">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-lg">check_circle</span> SSO Integration</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-lg">check_circle</span> Evaluaciones a medida</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-lg">check_circle</span> Account Manager dedicado</li>
              </ul>
              <button onClick={() => window.location.href = "/login"} className="w-full py-4 border border-outline-variant font-bold rounded-md hover:bg-surface-container-high transition-all">Contactar Ventas</button>
            </div>
          </div>
        </section>

        {/* Testimonios Section */}
        <section className="bg-surface-container-low py-32 px-8" id="testimonios">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
              <div className="max-w-xxl">
                <h2 className="text-5xl font-headline font-bold text-on-primary-fixed mb-4">Lo que dicen los Usuarios</h2>
                <p className="text-on-surface-variant text-lg">Ingenieros que ya están en las empresas que tú sueñas.</p>
              </div>
              <div className="hidden md:block">
                <span className="material-symbols-outlined text-6xl text-secondary/20">format_quote</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/30 flex flex-col justify-between">
                <p className="text-on-surface mb-8 italic">"Gracias a InterviAI pude practicar escenarios de Distributed Systems que no se encuentran en ningún libro. Pasé la entrevista de Staff Engineer en AWS a la primera."</p>
                <div className="flex items-center gap-4">
                  <img className="w-12 h-12 rounded-full object-cover" alt="professional portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFVe5usGle5m3NI1RmCPs4t784IIZ7TX4zutvHPG35e8hoI08SGL9Ix0RnuNukFxHwUwB4BTr6lLz_SyjipD-cj4xlGz4V9NWMAeppnaRNrEdbU8eepyd3ipZMQv_-yvHnn_vwsOa935ZGMoQxrVHZs8bT2qiTB7rSm7wL1YKEt0NffYEqVNRRDXt0OEv-kXPDuOxhnCSSN5K1IGm1UFx4HxykLwbyQKuYkQMIAGQdUmfrytTBV3dWmUWuuKkxj0GgDv9w81AYUPU" />
                  <div>
                    <h5 className="font-bold text-sm">Marcos R.</h5>
                    <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-widest">L5 Engineer @ Amazon</p>
                  </div>
                </div>
              </div>
              {/* Testimonial 2 */}
              <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/30 flex flex-col justify-between lg:mt-8">
                <p className="text-on-surface mb-8 italic">"El feedback de IA es sorprendentemente preciso. Detectó muletillas en mi comunicación que ni mis mentores habían notado. Imprescindible para behavioral interview."</p>
                <div className="flex items-center gap-4">
                  <img className="w-12 h-12 rounded-full object-cover" alt="portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCKTiYSGMOxA8d1FstO-jAgFxjzeDhtXP5qrmD-lnvvFuqLjemzV8pI3Kr6mO3xRqyOKdFGHxDJeDPCbx7XNKny9GsnTYOcr-t_NsUO4ONVIapRfWvDAIfqH_EGfNJbD1ZNqJWpyzE_oEkLhycVlYlfIz2BK7bFOrkuCPbTSLRtwN7of4ZZPE3uztHCBuNk0mLGuk4LjUCsbNsNiBevnCJQ_QwpFmreJax_nVPlY9sfxtRu2IrY9Cb7FWWFAHnYCe9xAPexD63C1Q" />
                  <div>
                    <h5 className="font-bold text-sm">Elena G.</h5>
                    <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-widest">Senior Backend @ Stripe</p>
                  </div>
                </div>
              </div>
              {/* Testimonial 3 */}
              <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/30 flex flex-col justify-between">
                <p className="text-on-surface mb-8 italic">"Entrenar bajo presión en el simulador me quitó el miedo. InterviAI recrea perfectamente la tensión de una pizarra técnica real."</p>
                <div className="flex items-center gap-4">
                  <img className="w-12 h-12 rounded-full object-cover" alt="candid shot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXra5BjqDVkvs2GEZKuIo3oO-8heYJ36WQOutFfQtJKFgCRvQrida-SIjM17XkOtGChZsn-nysTRGVW6Lr8eCKFWNefE9yZvfkKGWfoqCvrBqadvdJJfjOxW92kGZIq90nJlX3xp12_Prjf3mN5Qj99i0V8pe2eUD2I2yZVIBMdFAtvERqKZoQqFF8j6tnjwGHpdca5Bew6Qxp2Y0bsdtWcrMHWj0cJBsjzicXO9fqEDMG0-nRvPcabSaw9Vj7svT9D0ss6Cfhqjc" />
                  <div>
                    <h5 className="font-bold text-sm">Javier L.</h5>
                    <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-widest">Fullstack Dev @ Meta</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 w-full py-12 px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold text-white font-headline">InterviAI</div>
          <div className="flex gap-8">
            <a className="text-slate-500 hover:text-cyan-400 transition-colors font-body text-sm tracking-wide" href="#">Privacidad</a>
            <a className="text-slate-500 hover:text-cyan-400 transition-colors font-body text-sm tracking-wide" href="#">Términos</a>
            <a className="text-slate-500 hover:text-cyan-400 transition-colors font-body text-sm tracking-wide" href="#">Soporte</a>
            <a className="text-slate-500 hover:text-cyan-400 transition-colors font-body text-sm tracking-wide" href="#">API</a>
          </div>
          <div className="text-slate-500 font-body text-sm tracking-wide text-center md:text-right">
            © 2026 InterviAI. Built for the modern engineer.
          </div>
        </div>
      </footer>
    </div>
  );
}