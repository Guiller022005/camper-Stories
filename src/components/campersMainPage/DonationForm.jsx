import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Rocket, Star, Sparkles, Heart, ArrowRight, DivideSquareIcon } from "lucide-react";
import WompiWidget from "../../components/campersMainPage/WompiWidget";
import DownloadButton from "@/pdfCertificate/CertificadoDonacion";

const plans = [
    {
        name: "Apollo",
        icon: <Rocket className="w-6 h-6" />,
        price: { monthly: 5, yearly: 50 },
        color: "from-[#6366F1] to-[#6366F1]",
        features: [
            "Acceso básico a cursos cortos",
            "2 horas de hubox al mes",
            "Fee de contratación del  5%",
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
            "Fee de contratación del 15%",
            "Videos exclusivos y personalizados",
            "Pack legendario de stickers",
            "Soporte 24/7",
            "Eventos exclusivos",
        ],
        popular: false,
    },
];

const donacionData = {
    nombreDonante: "Juan Pérez",
    fechaDonacion: "2023-10-01",
    montoDescripcion: "$1,000",
    numeroCertificado: "CERT-12345",
};

const DonationForm = () => {
    const [customAmount, setCustomAmount] = useState("");
    const isValidAmount = customAmount && parseFloat(customAmount.replace(/\./g, "")) >= 5000;
    const [documentNumber, setDocumentNumber] = useState("");
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({ name: "", documentNumber: "" });
    const [generateCertificate, setGenerateCertificate] = useState(null);
    const [formData, setFormData] = useState(null);
    const [triggerPayment, setTriggerPayment] = useState(false);

    const formatCurrency = (value) => {
        const numericValue = value.replace(/\D/g, "");
        return new Intl.NumberFormat("es-CO").format(numericValue);
    };

    const handleCustomAmount = (value) => {
        setCustomAmount(formatCurrency(value));
    };

    const validateName = (value) => {
        if (!/^[a-zA-Z\s]{3,}$/.test(value)) {
            setErrors((prev) => ({ ...prev, name: "El nombre debe tener al menos 3 caracteres y solo letras." }));
        } else {
            setErrors((prev) => ({ ...prev, name: "" }));
        }
    };

    const validateDocumentNumber = (value) => {
        if (!/^[a-zA-Z0-9]{6,20}$/.test(value)) {
            setErrors((prev) => ({ ...prev, documentNumber: "El número de documento debe tener entre 6 y 20 caracteres." }));
        } else {
            setErrors((prev) => ({ ...prev, documentNumber: "" }));
        }
    };

    const generateUniqueReference = (isCertificate = false) => {
        const timestamp = Date.now().toString(36);
        const randomStr = Math.random().toString(36).substring(2, 8);
        const prefix = isCertificate ? "don" : "anon_don";
        return `${prefix}_${timestamp}_${randomStr}`;
    };

    const handleSubmit = () => {
        const data = new FormData();
        data.append("monto", customAmount.replace(/\./g, ""));

        if (generateCertificate) {
            data.append("nombre", name);
            data.append("documento", documentNumber);
        }

        console.log("Datos enviados:", Object.fromEntries(data));
        setFormData(data); // 🔹 Guardamos formData en el estado para que WompiWidget lo reciba solo al pagar
    };

    const handlePaymentClick = () => {
        handleSubmit();
        setTriggerPayment(false);  // Lo ponemos en false primero
        setTimeout(() => {
            setTriggerPayment(true); // Luego lo volvemos a activar
        }, 100);
    };

    const handleWidgetClose = () => {
        setTriggerPayment(false);
    };

    return (
        <div className="donation-form-section space-y-12">
            <div className="flex items-center justify-center">
                <Card className="w-full max-w-md bg-[#0d1033] border border-gray-600 rounded-xl text-white shadow-lg p-8">
                    <div className="space-y-6 text-center mb-6">
                        <h2 className="text-4xl md:text-5xl pt-2 font-poppins font-extrabold leading-tight">
                            ¿Cómo <span className="text-[#5b62f1]">APORTAR</span>?
                        </h2>
                        <p className="text-gray-400 text-lg font-poppins">Tu apoyo hace la diferencia en la educación</p>
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="amount" className="text-sm text-gray-400 font-poppins">
                                Ingresa el monto a aportar
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-poppins">$</span>
                                <Input
                                    id="amount"
                                    type="text"
                                    value={customAmount}
                                    onChange={(e) => handleCustomAmount(e.target.value)}
                                    className="pl-8 bg-[#1A1D2E] border border-gray-600 focus:border-[#7C3AED] h-12 rounded-md text-lg text-white placeholder-gray-500"
                                    placeholder="5.000"
                                />
                            </div>
                            {customAmount && !isValidAmount && (
                                <p className="text-[#5e14d6] text-sm">El monto mínimo es de $5.000 COP.</p>
                            )}
                        </div>
                        {/* Certificado de donacion */}
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">¿Desea generar un certificado de donación?</label>
                            <div className="flex justify-center gap-4 items-center">
                                {["Sí", "No"].map((option, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setGenerateCertificate(option === "Sí")}
                                        className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${generateCertificate === (option === "Sí")
                                            ? "border-[#5b62f1] bg-[#5b62f1] text-white"
                                            : "border-gray-500 bg-transparent text-gray-300"
                                            } flex items-center justify-center`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Campos de Nombre y Documento */}
                        {generateCertificate === true && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Nombre</label>
                                    <Input
                                        type="text"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            validateName(e.target.value);
                                        }}
                                        className="bg-[#1A1D2E] border border-gray-600 focus:border-[#7C3AED] h-12 rounded-md text-lg text-white"
                                        placeholder="Nombre completo"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Número de documento</label>
                                    <Input
                                        type="text"
                                        value={documentNumber}
                                        onChange={(e) => {
                                            setDocumentNumber(e.target.value);
                                            validateDocumentNumber(e.target.value);
                                        }}
                                        className="bg-[#1A1D2E] border border-gray-600 focus:border-[#7C3AED] h-12 rounded-md text-lg text-white"
                                        placeholder="Número de documento"
                                    />
                                    {errors.documentNumber && <p className="text-red-500 text-sm">{errors.documentNumber}</p>}
                                </div>
                            </motion.div>
                        )}
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
                        <button
                            className={`w-full p-3 rounded-md font-bold text-white text-lg ${isValidAmount &&
                                generateCertificate !== null &&
                                (
                                    !generateCertificate ||
                                    (generateCertificate && name && documentNumber && !errors.name && !errors.documentNumber)
                                )
                                ? "bg-[#5b62f1] hover:bg-[#382394]"
                                : "bg-[#382394] cursor-not-allowed"
                                }`}
                            onClick={handlePaymentClick}
                            disabled={
                                !isValidAmount ||
                                generateCertificate === null ||
                                (generateCertificate && (!name || !documentNumber || errors.name || errors.documentNumber))
                            }
                        >
                            Paga Ahora con Wompi <ArrowRight className="h-5 w-5 inline pb-[2px]" />
                        </button>
                        {triggerPayment && (
                            <WompiWidget
                                amountInCents={parseFloat(customAmount.replace(/\./g, "")) * 100}
                                reference={generateUniqueReference(generateCertificate === true)}
                                formData={formData}
                                openWidget={triggerPayment} // Se mantiene el control desde el formulario
                                onClose={handleWidgetClose}
                            />
                        )}
                    </div>
                </Card>
            </div>
            {/* Pricing Cards (OCULTO TEMPORALMENTE) */}
            {/* 
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center text-[#FFFF] py-5 mb-12">Planes de Suscripción</h2>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-12">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        >
                            <Card
                                className={`relative p-6 bg-[#6366F1]/10 border-[#6366F1]/20 backdrop-blur-xl hover:bg-[#6366F1]/20 transition-all duration-300 w-full ${plan.popular ? "ring-2 ring-[#5737e6]" : ""
                                    }`}
                                style={{ maxWidth: "350px", margin: "0 auto" }}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[--color4] text-[#f0f0ff] px-4 py-1 rounded-full font-bold flex items-center justify-center">
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
            */}
        </div>
    );
};

export default DonationForm;
