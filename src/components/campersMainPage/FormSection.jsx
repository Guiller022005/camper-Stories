import React from "react";
import { motion } from "framer-motion"; // Importa motion desde framer-motion
import { Rocket, Star, Sparkles, Clock, Video, BookOpen, Sticker, Users, Check, Crown } from "lucide-react"
import DonationForm from "./DonationForm";

const FormSection = () => {
    return (
        <section className="form-section flex flex-col items-center pt-[130px] w-full min-h-screen bg-gradient-to-b from-[#0a0a29] via-[#03033D] to-[#0C0C74] pb-[100px] relative z-0">
            <div className="content mx-auto w-2/3 flex flex-col">

                {/* Formulario */}
                <div className="form-container">
                    <DonationForm />
                </div>

                {/* Reemplazo del div sponsro */}
                <motion.div
                    id="sponsro"
                    className="bot-text mt-20 text-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center justify-center gap-2 mb-4">
                        <Crown className="w-6 h-6 text-[#66E7F3]" />
                        <h2 className="text-2xl font-bold">¿Por qué ser patrocinador?</h2>
                    </div>
                    <p className="text-white/60 max-w-2xl mx-auto font-bold">
                        Como patrocinador, no solo contribuyes al desarrollo de nuevo talento tech, también obtienes acceso
                        exclusivo a una comunidad vibrante y beneficios únicos que mejoran tu experiencia en nuestra plataforma.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default FormSection;
