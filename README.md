# IntervIA - Simulador de Entrevistas Laborales con IA 🤖💼

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

**IntervIA** es el componente Frontend de un sistema web innovador diseñado para la **Escuela Politécnica Nacional (EPN - ESFOT)**. Su objetivo es cerrar la brecha entre la formación técnica y las habilidades comunicativas de los estudiantes de Desarrollo de Software mediante simulaciones de entrevistas potenciadas por Inteligencia Artificial.
<img width="1910" height="6338" alt="screencapture-intervia-esfot-netlify-app-2026-02-04-14_04_15" src="https://github.com/user-attachments/assets/0a8d8b08-ca2c-4231-84cf-bf99804d21fb" />


## 🚀 Características Principales

- **Simulaciones Personalizadas:** Prácticas de entrevistas técnicas y conductuales adaptadas al perfil del usuario.
- **Retroalimentación con IA:** Análisis inmediato del desempeño para identificar áreas de mejora.
- **Experiencia Inmersiva:** Interfaz futurista con fondos dinámicos utilizando `Vanta.js` y `Three.js`.
- **Dashboard de Progreso:** Seguimiento detallado de resultados y evolución del estudiante.
- **Gestión Administrativa:** Panel para controlar bancos de preguntas, usuarios y métricas generales.
- **Seguridad:** Autenticación robusta con JWT y persistencia de sesión con `Zustand`.

## 🛠️ Stack Tecnológico

- **Framework:** [React.js](https://react.dev/) (Hooks y Arquitectura Funcional).
- **Herramienta de Build:** [Vite](https://vitejs.dev/) (Alta velocidad de desarrollo).
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/) (Animaciones).
- **Gestión de Estado:** [Zustand](https://zustand-demo.pmnd.rs/) (Estado global ligero).
- **Formularios:** [React Hook Form](https://react-hook-form.com/).
- **Calidad de Software:** [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/).

## 🏗️ Estructura del Proyecto

El código está organizado siguiendo principios de modularidad y limpieza:

```text
src/
├── assets/          # Recursos estáticos (Imágenes, SVG)
├── components/      # Componentes UI atómicos y moleculares
├── context/         # Stores globales (Auth, UI)
├── hooks/           # Lógica de negocio reutilizable (Custom Hooks)
├── layouts/         # Envoltorios de diseño (AuthLayout, DashLayout)
├── pages/           # Vistas principales de la aplicación
├── services/        # Configuración de API y peticiones asíncronas
└── tests/           # Pruebas unitarias y mocks

