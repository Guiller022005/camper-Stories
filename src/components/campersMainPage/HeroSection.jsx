import { motion } from "framer-motion";
import { GraduationCap, Users, Building2, ArrowRight, Rocket, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import VideoPlayer from "../camperProfile/VIdeoPlayer";
import { useCampus } from '../../components/campersMainPage/context/CampusContext'; 
import { useEffect, useState } from "react";

const stats = [
    { label: "Campers Graduados", value: "500+", icon: GraduationCap },
    { label: "Empresas Aliadas", value: "50+", icon: Building2 },
    { label: "Comunidad Activa", value: "1000+", icon: Users }
];

const campus = [{
    id: 1,
    name: 'Bucaramanga'
}, {
    id: 2,
    name: 'Bogota'
}, {
    id: 3,
    name: 'Tibu'
}];

export default function HeroSection() {
    const navigate = useNavigate();
    const { currentCampusId, updateCampus } = useCampus();
    
    window.CampusState = currentCampusId;   

    const handleCampusClick = (campusId) => {
        console.log("🔄 Cambiando campus a:", campusId);
        updateCampus(campusId); // Usa el método del contexto en lugar de `setState`
    };

    useEffect(() => {
        console.log("🚀 Estado actual de currentCampusId en HeroSection:", currentCampusId);
    }, [currentCampusId]);    

    useEffect(() => {
        const handleCampusChange = (event) => {
            console.log("Evento campusChanged detectado:", event.detail);
            setCurrentCampusId(event.detail);
        };

        window.addEventListener('campusChanged', handleCampusChange);

        return () => {
            window.removeEventListener('campusChanged', handleCampusChange);
        };
    }, []);

    return (
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-[#27247a] to-indigo-950 min-h-[80vh] flex flex-col items-center">
            {/* Background decoration */}
            <div
                className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
                aria-hidden="true"
            >
                <div
                    className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
                    style={{
                        clipPath:
                            "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
                    }}
                />
            </div>

            {/* Main content */}
            <div className="flex flex-col px-4 py-8 md:px-6 md:py-16 lg:py-24">
                <div className="mx-auto max-w-[90vw] md:max-w-[85vw] lg:max-w-[70vw]">
                    {/* Hero content */}
                    <div className="flex flex-col lg:flex-row items-center lg:gap-[20px]">
                        {/* Left column */}
                        <div className="flex-shrink-0 lg:w-1/2 lg:pr-8 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="relative hidden lg:block"
                            >
                                <div className="absolute -top-4 -left-4 bg-blue-500/10 w-16 h-16 rounded-full blur-xl" />
                                <div className="relative">
                                    <div className="flex justify-start gap-2">
                                        {campus.map((campusItem) => (
                                            <button
                                                key={campusItem.id}
                                                onClick={() => handleCampusClick(campusItem.id)}
                                                className={`rounded-full px-3 py-1 text-sm font-semibold leading-6 transition-colors duration-200 ${currentCampusId === campusItem.id
                                                    ? 'bg-indigo-500 text-white'
                                                    : 'bg-indigo-500/10 text-indigo-400 ring-1 ring-inset ring-indigo-500/20 hover:bg-indigo-500/20'
                                                    }`}
                                            >
                                                {campusItem.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <h1 className="mt-10 text-2xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white lg:mr-[7rem]">
                                    Descubre el Impacto de la{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                                        Formación Tecnológica
                                    </span>
                                </h1>
                                <p className="mt-3 md:mt-4 lg:mt-6 text-sm md:text-lg leading-6 md:leading-7 lg:leading-8 text-gray-300">
                                    {/* Responsive text content */}
                                    <span className="hidden lg:inline">
                                        CamperStories reúne las historias más inspiradoras de estudiantes que han transformado sus vidas a través
                                        de la programación y la tecnología.
                                    </span>
                                    <span className="md:hidden">
                                        Inspírate con historias reales de transformación a través de la tecnología.
                                    </span>
                                    <span className="hidden md:inline lg:hidden">
                                        Historias reales de estudiantes que transformaron sus vidas con tecnología.
                                    </span>
                                </p>
                            </motion.div>

                            {/* Desktop CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="mt-10 hidden lg:flex items-center gap-x-6"
                            >
                                <Button
                                    onClick={() => navigate('/historias')}
                                    size="lg"
                                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                                >
                                    Explorar Historias
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                                <Dialog>
                                    <DialogContent className="sm:max-w-[850px]">
                                        <VideoPlayer videoUrl={"https://www.youtube.com/embed/OKMsheDmK8Q"} title="Historia Camper" />
                                    </DialogContent>
                                </Dialog>
                            </motion.div>
                        </div>

                        {/* Right column / Video section */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="mt-6 md:mt-8 lg:mt-0 lg:w-1/2 w-full"
                        >
                            <div className="w-full space-y-8">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    className="relative aspect-video w-full rounded-2xl overflow-hidden"
                                >
                                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                                    <VideoPlayer videoUrl={"https://www.youtube.com/embed/OKMsheDmK8Q"} title="Historia Camper" />
                                </motion.div>

                                {/* Stats cards - Only visible on tablet and desktop */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.7 }}
                                    className="hidden md:grid grid-cols-2 gap-4 sm:gap-6"
                                >
                                    <div className="rounded-lg bg-white/5 p-6 ring-1 ring-inset ring-white/10">
                                        <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                            <Rocket className="h-5 w-5 text-indigo-400" />
                                            Crecimiento Profesional
                                        </h3>
                                        <p className="mt-2">
                                            <span className="text-4xl font-bold tracking-tight text-white">85%</span>
                                            <span className="text-sm text-gray-300 ml-2">ascensos en 2 años</span>
                                        </p>
                                    </div>
                                    <div className="rounded-lg bg-white/5 p-6 ring-1 ring-inset ring-white/10">
                                        <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                            <Target className="h-5 w-5 text-indigo-400" />
                                            Proyectos Exitosos
                                        </h3>
                                        <p className="mt-2">
                                            <span className="text-4xl font-bold tracking-tight text-white">1000+</span>
                                            <span className="text-sm text-gray-300 ml-2">completados</span>
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom stats section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-14 md:mt-16 lg:mt-20 grid grid-cols-3 gap-8 justify-center items-center text-center"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                className="flex flex-col gap-2 justify-center items-center text-center"
                            >
                                <dt className="text-base leading-7 text-gray-300 flex items-center gap-2">
                                    <stat.icon className="h-7 w-7 md:h-5 md:w-5 text-indigo-400" />
                                    <p className="text-[12px] md:text-base">{stat.label}</p>
                                </dt>
                                <dd className="text-2xl md:text-3xl font-bold leading-9 tracking-tight text-white">
                                    {stat.value}
                                </dd>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
