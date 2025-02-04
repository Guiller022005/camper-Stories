import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase } from 'lucide-react';
import { toast } from "react-toastify";

const generateStars = (count) => {
    return Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 5 + 5,
        size: Math.random() * 2 + 1,
    }));
};

const stars = generateStars(50);

function RegisterRoleSelection() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#1a1b2b] to-[#1e203a] flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Stars Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {stars.map((star) => (
                    <motion.div
                        key={star.id}
                        className="absolute bg-white rounded-full opacity-75"
                        style={{
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            left: `${star.x}%`,
                            top: `-${star.size}px`,
                        }}
                        animate={{
                            y: ['-10vh', '110vh'],
                            opacity: [0, 1, 0.5, 1, 0],
                        }}
                        transition={{
                            duration: star.duration,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: Math.random() * 3,
                        }}
                    />
                ))}
            </div>
            
            {/* Logo and Title Section */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 z-10">
                <div className="w-36 sm:w-36 md:w-48 pb-5 mx-auto">
                    <img
                        src="https://khc-sistema-v2.s3.amazonaws.com/centros/332e040d-c015-4d6f-9dfc-855ec2144fe3.png"
                        alt="Campus"
                        className="w-full h-auto"
                    />
                </div>
                <h1 className="text-white text-3xl font-bold mb-2">¡Bienvenido a Camper Stories!</h1>
                <p className="text-gray-400 text-lg">¿Eres Camper o Patrocinador? Selecciona tu rol y registrate!</p>
            </motion.div>

            {/* Cards Container */}
            <motion.div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl z-10">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group cursor-pointer"
                    onClick={() => navigate("/register/camper")}
                >
                    <div className="relative bg-[#2a2b3d] rounded-xl p-8 border border-indigo-500/20 shadow-lg hover:shadow-indigo-500/10 transition-all duration-300">
                        <GraduationCap className="w-12 h-12 text-indigo-400 mb-4" />
                        <h2 className="text-xl font-bold text-white mb-2">Soy Camper</h2>
                        <p className="text-gray-400">Únete a la comunidad y comparte tu historia con el mundo!</p>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group cursor-pointer"
                    onClick={() => toast.info("Esta pagina se encuenta en desarrollo. Vuelve Pronto!")}
                >
                    <div className="relative bg-[#2a2b3d] rounded-xl p-8 border border-indigo-500/20 shadow-lg hover:shadow-indigo-500/10 transition-all duration-300">
                        <Briefcase className="w-12 h-12 text-purple-400 mb-4" />
                        <h2 className="text-xl font-bold text-white mb-2">Soy Patrocinador</h2>
                        <p className="text-gray-400">Conecta con talento tecnológico y apoya el crecimiento!</p>
                    </div>
                </motion.div>
            </motion.div>

            {/* Footer Links */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8 text-center z-10">
                <p className="text-gray-500 text-sm">
                    Al Registrarte, aceptas nuestros{' '}
                    <a href="/terminos-y-condiciones" className="text-indigo-400 hover:text-indigo-300">Términos y Condiciones</a>{' '}
                    y{' '}
                    <a href="/politica-de-privacidad" className="text-indigo-400 hover:text-indigo-300">Políticas de Privacidad</a>
                </p>
            </motion.div>
        </div>
    );
}

export default RegisterRoleSelection;