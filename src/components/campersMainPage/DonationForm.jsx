import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Rocket, Star, Sparkles, Heart, ArrowRight, DivideSquareIcon } from "lucide-react";

const plans = [
    {
        name: "Apollo",
        icon: <Rocket className="w-6 h-6" />,
        price: { monthly: 5, yearly: 50 },
        color: "from-[#6366F1] to-[#6366F1]",
        features: [
            "Acceso básico a cursos cortos",
            "2 horas de hubox al mes",
            "Fee de contratación del 15%",
            "Videos de agradecimiento",
            "Pack básico de stickers",
        ],
        popular: false,
    },
    {
        name: "Hubble",
        icon: <Star className="w-6 h-6" />,
        price: { monthly: 10, yearly: 100 },
        color: "from-[#6366F1] to-[#845EF7]",
        features: [
            "Acceso completo a cursos cortos",
            "4 horas de hubox al mes",
            "Fee de contratación del 10%",
            "Videos de agradecimiento personalizados",
            "Pack premium de stickers",
            "Soporte prioritario",
        ],
        popular: true,
    },
    {
        name: "Starship",
        icon: <Sparkles className="w-6 h-6" />,
        price: { monthly: 20, yearly: 200 },
        color: "from-[#845EF7] to-[#BE4BDB]",
        features: [
            "Acceso VIP a todos los cursos",
            "6 horas de hubox al mes",
            "Fee de contratación del 5%",
            "Videos exclusivos y personalizados",
            "Pack legendario de stickers",
            "Soporte 24/7",
            "Eventos exclusivos",
        ],
        popular: false,
    },
];

const DonationForm = () => {
    const [customAmount, setCustomAmount] = useState("");

    const handleCustomAmount = (value) => {
        const amount = parseFloat(value);
        if (!isNaN(amount) && amount >= 0) {
            setCustomAmount(amount);
        } else {
            setCustomAmount("");
        }
    };

    return (
        <div className="donation-form-section space-y-12">
            {/* Formulario */}
            <div className="flex items-center justify-center">
                <Card className="w-full max-w-md bg-[#12142B] border border-gray-600 rounded-xl text-white shadow-lg p-8">
                    <div className="space-y-6 text-center mb-6">
                        <h2 className="text-4xl md:text-5xl font-poppins font-bold leading-tight">
                            ¿Cómo <span className="text-[#7C3AED]">APORTAR</span>?
                        </h2>
                        <p className="text-gray-400 text-lg font-poppins">Tu apoyo hace la diferencia en la educación</p>
                    </div>
                    <div className="space-y-6">
                        {/* Input para monto */}
                        <div className="space-y-2">
                            <label htmlFor="amount" className="text-sm text-gray-400 font-poppins">
                                Ingresa el monto a aportar
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-poppins">$</span>
                                <Input
                                    id="amount"
                                    type="number"
                                    value={customAmount}
                                    onChange={(e) => handleCustomAmount(e.target.value)}
                                    className="pl-8 bg-[#1A1D2E] border border-gray-600 focus:border-[#7C3AED] h-12 rounded-md text-lg text-white placeholder-gray-500"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                        {/* Mensaje */}
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm text-gray-400 font-poppins">
                                Mensaje para los campers (opcional)
                            </label>
                            <Textarea
                                id="message"
                                className="bg-[#1A1D2E] border border-gray-600 focus:border-[#7C3AED] min-h-[100px] rounded-md text-white placeholder-gray-500"
                                placeholder="¡Comparte un mensaje de apoyo!"
                            />
                        </div>
                        {/* Botón */}
                        <div
                            className="w-full h-12 text-lg bg-[#7C3AED] hover:bg-[#6D31D5] flex items-center justify-center gap-2 text-white font-bold rounded-md shadow-lg"
                            disabled={!customAmount}
                        >
                            <Heart className="h-5 w-5" />
                            Aportar ahora
                            <ArrowRight className="h-5 w-5" />
                        </div>
                        <p className="text-center text-sm text-gray-400 mt-4 font-poppins">
                            🔒 Tu donación está protegida por un pago seguro
                        </p>
                    </div>
                </Card>
            </div>

            {/* Pricing Cards */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center text-[#FFFF] pb-7">Planes de Suscripción</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        >
                            <Card
                                className={`relative p-6 bg-[#6366F1]/10 border-[#6366F1]/20 backdrop-blur-xl hover:bg-[#6366F1]/20 transition-all duration-300 w-full ${
                                    plan.popular ? "ring-2 ring-[--color2]" : ""
                                }`}
                                style={{ maxWidth: "350px", margin: "0 auto" }}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[--color2] text-[#18174F] px-4 py-1 rounded-full font-bold flex items-center justify-center">
                                        Más Popular
                                    </div>
                                )}
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2 text-[#FFFF]">{plan.name}</h3>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-bold text-[#FFFF]">${plan.price.monthly}</span>
                                            <span className="text-white/60 font-poppins">/mes</span>
                                        </div>
                                        <div className="text-sm text-white/60 font-poppins">o ${plan.price.yearly}/año</div>
                                    </div>
                                    <div className={`bg-gradient-to-r ${plan.color} p-3 rounded-xl text-white`}>{plan.icon}</div>
                                </div>
                                <div className="space-y-4 mb-6">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <span className="text-[#66E7F3]">✓</span>
                                            <span className="text-white/80 font-poppins">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 transition-opacity font-bold`}
                                >
                                    Suscríbete ahora
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DonationForm;
