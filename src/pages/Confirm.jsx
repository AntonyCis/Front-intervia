
import {Link} from 'react-router'
import {useParams} from 'react-router'
import { useEffect } from 'react'
import { ToastContainer} from 'react-toastify'
import { useFetch } from '../hooks/useFetch'

export const Confirm = () => {

    const fetchDataBackend = useFetch()
    const { token } = useParams()
    
    const verifyToken = async()=>{
        const url = `${import.meta.env.VITE_BACKEND_URL}/admin/confirmar/${token}`
        await fetchDataBackend(url)
    }

    useEffect(() => {
        verifyToken()
    },[])


     return (
        <div className="
            flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0a0f1f] via-[#0c1b33] to-black 
            text-white px-6 select-none">
            <ToastContainer />

            {/* Imagen */}
            <img
                src="https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUydWVsYng1bXZkbnN2a3NyNWpyZzgzcTI2czdvcDhvbDJ1Zng4cGxpNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5k5vZwRFZR5aZeniqb/source.gif"
                alt="AI Interview Logo"
                className="
                    h-64 w-64 md:h-72 md:w-72 rounded-full object-cover border-4 border-[#1e2a45] shadow-2xl 
                    animate-[pulse_3s_ease-in-out_infinite]"
            />

            {/* Card */}
            <div
                className="
                    mt-10 w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10 
                    backdrop-blur-xl shadow-2xl text-center"
            >
                {/* Título */}
                <h1 className="
                    text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 
                    bg-clip-text text-transparent drop-shadow-lg">
                    ¡Cuenta Confirmada!
                </h1>

                <p className="text-gray-300 mt-4 leading-relaxed">
                    Tu acceso al sistema de entrevistas ha sido activado exitosamente.
                </p>

                <p className="text-gray-400 mt-2">
                    Ya puedes iniciar sesión para comenzar tu proceso inteligente.
                </p>

                {/* Botón */}
                <Link
                    to="/Login"
                    className="
                        block w-full mt-8 py-3 bg-gradient-to-r from-blue-700 to-blue-900
                        rounded-xl text-gray-200 font-semibold tracking-wide shadow-lg
                        hover:shadow-blue-800/50 hover:scale-105 transition-all duration-300"
                >
                    Iniciar Sesión
                </Link>
            </div>
        </div>
    )
}