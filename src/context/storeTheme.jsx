import { create } from "zustand"
import { persist } from "zustand/middleware"

// Aplicar el tema antes de que React renderice
const initTheme = () => {
  try {
    const stored = localStorage.getItem('theme-preference')
    if (stored) {
      const { state } = JSON.parse(stored)
      if (state?.isDark) {
        document.documentElement.classList.add('dark')
      }
    }
  } catch (e) {
    console.error('Error loading theme:', e)
  }
}

// Ejecutar inmediatamente
initTheme()

const storeTheme = create(
  persist(
    (set) => ({
      isDark: false,
      toggleTheme: () => {
        set((state) => {
          const newState = !state.isDark
          if (newState) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          return { isDark: newState }
        })
      },
      setTheme: (isDark) => {
        if (isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        set({ isDark })
      },
    }),
    { name: "theme-preference" }
  )
)

export default storeTheme

