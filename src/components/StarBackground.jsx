import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function StarBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Captura la posición del mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const movementFactor = 0.02; // paralaje
  const starCount = 150; // estrellas por lado
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Función para generar posición X de la estrella según lado
  const getStarX = (side) => {
    if (side === "left") return Math.random() * (screenWidth / 2 - 10);
    if (side === "right") return Math.random() * (screenWidth / 2 - 10) + screenWidth / 2 + 10;
  };

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-black">
      {/* Estrellas */}
      {[...Array(starCount * 2)].map((_, i) => {
        const side = i < starCount ? "left" : "right"; // mitades
        const baseX = getStarX(side);
        const baseY = Math.random() * screenHeight;
        const size = Math.random() * 2 + 1;
        const opacity = Math.random() * 0.8 + 0.2;
        const duration = Math.random() * 10 + 10;

        return (
          <motion.span
            key={i}
            className="absolute bg-white rounded-full"
            style={{ width: `${size}px`, height: `${size}px` }}
            initial={{ x: baseX, y: baseY, opacity }}
            animate={{
              x: baseX + (mousePos.x - screenWidth / 2) * movementFactor,
              y: baseY + (mousePos.y - screenHeight / 2) * movementFactor,
              opacity: [0.2, opacity, 0.2],
            }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
          />
        );
      })}

      {/* Línea curva central */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute left-1/2 top-0 h-full w-[2px]
        bg-gradient-to-b from-transparent via-white/60 to-transparent
        blur-sm"
      />
    </div>
  );
}
