import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router";
import { useFetch } from "../hooks/useFetch";
import { useState } from "react";
import { CreditCard, ShieldCheck, Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

// ✅ Configuración de Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_51SrO4FQf6i5MrVWWBL87yUcbJD85fMH3TTixBA7NM1E9jx97rpWMQ5hPDEv9J3XHhBldWmZbCL9zhoqA5famYmYA006O3Mb4sZ");

const CheckoutForm = ({ amount, planName }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const fetchDataBackend = useFetch();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    // ✅ Estilos corregidos para modo oscuro (Texto Blanco)
    const cardElementOptions = {
        style: {
            base: {
                fontSize: '18px',
                color: '#ffffff', // Texto blanco para que se vea
                fontFamily: 'Inter, sans-serif',
                '::placeholder': { color: '#52525b' },
                iconColor: '#10b981',
            },
            invalid: {
                color: '#ef4444',
                iconColor: '#ef4444',
            },
        },
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setErrorMsg(null);

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setErrorMsg(error.message);
            setLoading(false);
            return;
        }

        try {
            const baseURL = import.meta.env.VITE_BACKEND_URL;
            const storage = JSON.parse(localStorage.getItem("auth-token"));
            const token = storage?.state?.token || storage?.token;

            if (!token) throw new Error("Sesión expirada.");

            const payload = {
                paymentMethodId: paymentMethod.id,
                amount: amount,
                mensaje: `Suscripción Activa: Plan ${planName}` 
            };

            const response = await fetchDataBackend(`${baseURL}/donation/donate`, payload, "POST", {
                Authorization: `Bearer ${token}`
            });

            if (response) {
                navigate("/dashboard/list");
            } else {
                setErrorMsg("El pago fue rechazado por el servidor.");
            }
        } catch (err) {
            setErrorMsg(err.message || "Error al procesar el pago.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6">
            <div className="bg-zinc-900/80 p-8 rounded-[2.5rem] border border-zinc-800 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em]">
                        <CreditCard size={14} className="text-emerald-500" /> 
                        Método de Pago
                    </div>
                    <span className="text-[10px] font-black text-zinc-600 tracking-widest uppercase">Stripe Secure</span>
                </div>
                
                <div className="py-4 px-2 border-b border-zinc-800 mb-2 transition-all focus-within:border-emerald-500">
                    <CardElement options={cardElementOptions} />
                </div>

                {errorMsg && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[10px] font-bold uppercase mt-4">
                        ⚠️ {errorMsg}
                    </motion.p>
                )}
            </div>

            <button 
                disabled={loading || !stripe}
                className="w-full py-6 bg-emerald-600 text-white rounded-[1.5rem] font-black uppercase text-[11px] tracking-[0.3em] hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-emerald-500/10 active:scale-95"
            >
                {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck size={18} />}
                {loading ? "PROCESANDO..." : `CONFIRMAR Y PAGAR $${amount}.00`}
            </button>
        </form>
    );
};

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { amount, planName } = location.state || { amount: 0, planName: "No seleccionado" };

    if (amount === 0) {
        return (
            <div className="h-screen flex items-center justify-center flex-col gap-4">
                <p className="text-white font-bold uppercase tracking-widest text-xs">No hay plan seleccionado</p>
                <button onClick={() => navigate("/dashboard/plans")} className="text-emerald-500 underline uppercase text-[10px] font-black">Volver a Planes</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-start pt-2 px-6 bg-transparent">
            {/* Botón Volver alineado a la izquierda */}
            <div className="w-full max-w-4xl self-center mb-4">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                    Volver
                </button>
            </div>

            {/* Título más arriba y compacto */}
            <div className="text-center mb-8">
                <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">Secure Checkout</span>
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">
                    Pagar Plan <span className="text-emerald-500">{planName}</span>
                </h1>
                <p className="text-zinc-500 font-bold text-lg mt-2 tracking-tight uppercase">
                    Total a facturar: <span className="text-white">${amount}.00 USD</span>
                </p>
            </div>

            {/* Formulario de Pago */}
            <div className="w-full max-w-xl">
                <Elements stripe={stripePromise}>
                    <CheckoutForm amount={amount} planName={planName} />
                </Elements>
            </div>
        </div>
    );
};

export default Checkout;