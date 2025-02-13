import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Rocket, Star, Sparkles, ArrowRight } from "lucide-react";
import WompiWidget from "../../components/campersMainPage/WompiWidget";
import DownloadButton from "@/pdfCertificate/CertificadoDonacion";

const donacionData = {
    nombreDonante: "Juan Pérez",
    fechaDonacion: "2023-10-01",
    montoDescripcion: "$1,000",
    numeroCertificado: "CERT-12345",
};

const DonationForm = () => {
    const [customAmount, setCustomAmount] = useState("");
    const isValidAmount = customAmount && parseFloat(customAmount.replace(/\./g, "")) >= 5000;

    const formatCurrency = (value) => {
        const numericValue = value.replace(/\D/g, "");
        return new Intl.NumberFormat("es-CO").format(numericValue);
    };

    const handleCustomAmount = (value) => {
        setCustomAmount(formatCurrency(value));
    };

    const generateUniqueReference = () => {
        const timestamp = Date.now().toString(36);
        const randomStr = Math.random().toString(36).substring(2, 8);
        return `don_${timestamp}_${randomStr}`;
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
                        {isValidAmount ? (
                            <WompiWidget
                                amountInCents={parseFloat(customAmount.replace(/\./g, "")) * 100}
                                reference={generateUniqueReference()}
                            />
                        ) : (
                            <button
                                className="w-full p-3 rounded-md font-bold text-white text-lg bg-[#382394] cursor-not-allowed"
                                disabled
                            >
                                Paga Ahora con Wompi <ArrowRight className="h-5 w-5 inline pb-[2px]" />
                            </button>
                        )}
                        <div className="text-center mt-4">
                        <legend className="text-gray-400">Al completar el pago, puede solicitar su certificado de donación</legend>
                            {/* <DownloadButton donacionData={donacionData} /> */}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default DonationForm;
