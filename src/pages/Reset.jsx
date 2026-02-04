import { useState } from 'react'
import { useEffect } from 'react'
import {useFetch} from '../hooks/useFetch';
import { ToastContainer } from 'react-toastify'
import { useNavigate, useParams } from 'react-router'
import { useForm } from 'react-hook-form'


const Reset = () => {

    const navigate = useNavigate()
    const { token } = useParams()
    const  fetchDataBackend  = useFetch()
    const [tokenback, setTokenBack] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()

    const changePassword = async (dataForm) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/nuevopassword/${token}`
        await fetchDataBackend(url, dataForm,'POST')
        setTimeout(() => {
            if (dataForm.password === dataForm.confirmpassword) {
                navigate('/login')
            }
        }, 2000)
    }


    useEffect(() => {
        const verifyToken = async()=>{
            const url = `${import.meta.env.VITE_BACKEND_URL}/recuperarpassword/${token}`
            await fetchDataBackend(url,'GET')
            setTokenBack(true)
        }
        verifyToken()
    }, [])
    

    return (
        <div
            className="
                flex flex-col items-center justify-center min-h-screen 
                bg-gradient-to-br from-gray-900 via-gray-800 to-black
                text-white px-5 py-10 relative overflow-hidden select-none"
        >
            <div className="absolute top-0 left-0 w-80 h-80 bg-blue-600/10 blur-3xl rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/10 blur-3xl rounded-full"></div>

            <ToastContainer />

            {/* TÍTULO */}
            <h1 className="text-3xl md:text-4xl font-bold mb-1 text-center text-gray-200 drop-shadow-lg">
                Bienvenido nuevamente
            </h1>

            <small className="text-gray-400 block my-3 text-sm text-center tracking-wide">
                Por favor ingresa los siguientes datos para continuar
            </small>

            {/* Imagen */}
            <img
                className="
                    object-cover h-56 w-56 md:h-64 md:w-64 rounded-full 
                    border-4 border-gray-700 shadow-[0_0_20px_rgba(0,0,0,0.7)]
                    hover:scale-105 transition duration-300"
                src="https://t3.ftcdn.net/jpg/06/33/36/82/360_F_633368225_LwDAmhPhhsEwCLN8JT1cADEne6r848sr.jpg"
                alt="Logo"
            />

            {/* FORMULARIO */}
            {tokenback && (
                <form
                    className="
                        w-full max-w-sm mt-10 bg-gray-800/40 p-6 rounded-2xl 
                        border border-gray-700 shadow-xl backdrop-blur-xl
                        relative"
                    onSubmit={handleSubmit(changePassword)}
                >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600/60 to-purple-700/60 rounded-t-2xl"></div>

                    {/* NUEVA CONTRASEÑA */}
                    <label className="block text-gray-300 text-sm font-semibold mb-1">
                        Nueva contraseña
                    </label>

                    <input
                        type="password"
                        placeholder="Ingresa tu nueva contraseña"
                        className="
                            w-full rounded-lg bg-gray-900/80 text-gray-200
                            border border-gray-700 px-3 py-2 mt-1
                            focus:outline-none focus:ring-2 focus:ring-blue-500/60
                            transition"
                        {...register("password", { required: "La contraseña es obligatoria" })}
                    />
                    {errors.password && (
                        <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                    )}

                    {/* CONFIRMAR CONTRASEÑA */}
                    <label className="block text-gray-300 text-sm font-semibold mt-4 mb-1">
                        Confirmar contraseña
                    </label>

                    <input
                        type="password"
                        placeholder="Repite tu contraseña"
                        className="
                            w-full rounded-lg bg-gray-900/80 text-gray-200 
                            border border-gray-700 px-3 py-2 mt-1
                            focus:outline-none focus:ring-2 focus:ring-blue-500/60
                            transition"
                        {...register("confirmpassword", { required: "La contraseña es obligatoria" })}
                    />
                    {errors.confirmpassword && (
                        <p className="text-red-400 text-sm mt-1">{errors.confirmpassword.message}</p>
                    )}

                    {/* BOTÓN */}
                    <button
                        className="
                            bg-gradient-to-r from-blue-600/90 to-blue-800/90 
                            text-white w-full py-2 mt-6 rounded-xl font-semibold
                            shadow-lg shadow-blue-900/40
                            hover:scale-105 hover:shadow-blue-900/60
                            transition-all duration-300"
                    >
                        Enviar
                    </button>
                </form>
            )}
        </div>
    )
}

export default Reset
