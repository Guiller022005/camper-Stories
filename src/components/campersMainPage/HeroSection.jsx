import { motion } from "framer-motion";
import { GraduationCap, Users, Building2, ArrowRight, Play, Rocket, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const stats = [
    { label: "Campers Graduados", value: "500+", icon: GraduationCap },
    { label: "Empresas Aliadas", value: "50+", icon: Building2 },
    { label: "Comunidad Activa", value: "1000+", icon: Users }
];

export default function HeroSection() {
    const navigate = useNavigate();

    return (
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-[#27247a] to-indigo-950 min-h-[80vh] flex flex-col items-center">
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

            {/* HERO PARA ESCRITORIO (Sin modificaciones) */}
            <div className="hidden lg:block">
                <DesktopHero navigate={navigate} />
            </div>

            {/* HERO PARA TABLETAS (Con video más alto) */}
            <div className="hidden md:flex lg:hidden">
                <TabletHero navigate={navigate} />
            </div>

            {/* HERO PARA MÓVILES */}
            <div className="block md:hidden">
                <MobileHero navigate={navigate} />
            </div>
        </div>
    );
}

/* ===== HERO PARA ESCRITORIO (Versión Original Sin Modificaciones) ===== */
const DesktopHero = ({ navigate }) => (
    <div className="flex flex-col px-4 py-12 lg:py-24">
                <div className="mx-auto max-w-[90vw] gap-[20px] flex flex-col lg:flex-row items-center">
                    <div className="flex-shrink-0 lg:w-[55%] lg:pr-6">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <div className="relative">
                                <div className="absolute -top-4 -left-4 bg-blue-500/10 w-16 h-16 rounded-full blur-xl" />
                                <div className="relative">
                                    <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                                        Historias que Inspiran
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h1 className="mt-10 mr-[7rem] text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                Descubre el Impacto de la{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                                    Formación Tecnológica
                                </span>
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                                CamperStories reúne las historias más inspiradoras de estudiantes que han transformado sus vidas a través
                                de la programación y la tecnología.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-10 flex items-center gap-x-6"
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
                                    <div className="aspect-video">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src="https://www.youtube.com/embed/OKMsheDmK8Q"
                                            title="CamperStories Showcase"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="rounded-lg"
                                        />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-16 lg:mt-0 lg:w-1/2 flex h-full"
                    >
                        <div className="max-w-3xl w-full space-y-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="relative aspect-video w-full rounded-2xl overflow-hidden"
                            >
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/OKMsheDmK8Q"
                                    title="CamperStories Showcase"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="rounded-lg"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                                className="grid grid-cols-2 gap-4 sm:gap-6"
                            >
                                <div className="rounded-lg bg-white/5 p-6 ring-1 ring-inset ring-white/10">
                                    <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                        <Rocket className="h-5 w-5 text-indigo-400" />
                                        Crecimiento Profesional
                                    </h3>
                                    <p className="mt-2">
                                        <span className="text-2xl font-bold tracking-tight text-white">85%</span>
                                        <span className="text-sm text-gray-300 ml-2">ascensos en 2 años</span>
                                    </p>
                                </div>
                                <div className="rounded-lg bg-white/5 p-6 ring-1 ring-inset ring-white/10">
                                    <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                        <Target className="h-5 w-5 text-indigo-400" />
                                        Proyectos Exitosos
                                    </h3>
                                    <p className="mt-2">
                                        <span className="text-2xl font-bold tracking-tight text-white">1000+</span>
                                        <span className="text-sm text-gray-300 ml-2">completados</span>
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
                <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-3 sm:gap-6 justify-center items-center text-center"
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
                                    <stat.icon className="h-5 w-5 text-indigo-400" />
                                    {stat.label}
                                </dt>
                                <dd className="text-3xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
                            </motion.div>
                        ))}
                    </motion.div>
            </div>
);

/* ===== HERO PARA TABLETAS (Video más alto) ===== */
const TabletHero = ({ navigate }) => (
    <div className="flex flex-col px-6 py-10 md:py-16">
        <div className="mx-auto max-w-[85vw] flex flex-col md:flex-row items-center md:items-start md:gap-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="mt-10 text-3xl font-bold tracking-tight text-white md:text-5xl md:text-left">
                    Descubre el Impacto de la{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                        Formación Tecnológica
                    </span>
                </h1>
                <p className="mt-4 text-md leading-7 text-gray-300 md:text-lg md:text-left">
                    Historias reales de estudiantes que transformaron sus vidas con tecnología.
                </p>
                <div className="mt-8">
                    <iframe
                        width="100%"
                        height="350"  // Se aumentó la altura del video
                        src="https://www.youtube.com/embed/OKMsheDmK8Q"
                        title="CamperStories Showcase"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg w-full"
                    />
                </div>
            </motion.div>
        </div>

        {/* SECCIÓN DE ESTADÍSTICAS */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="grid grid-cols-2 gap-4 sm:gap-6 mt-10"
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

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-3 sm:gap-6 justify-center items-center text-center"
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
                        <stat.icon className="h-5 w-5 text-indigo-400" />
                        {stat.label}
                    </dt>
                    <dd className="text-3xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
                </motion.div>
            ))}
        </motion.div>
    </div>
);

/* ===== HERO PARA MÓVILES ===== */
const MobileHero = ({ navigate }) => (
    <div className="flex flex-col px-4 py-8">
        <div className="mx-auto max-w-[90vw] text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                    Descubre el Impacto de la{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                        Formación Tecnológica
                    </span>
                </h1>
                <p className="mt-3 text-sm leading-6 text-gray-300">
                    Inspírate con historias reales de transformación a través de la tecnología.
                </p>
                <div className="mt-6">
                    <iframe
                        width="100%"
                        height="200"
                        src="https://www.youtube.com/embed/OKMsheDmK8Q"
                        title="CamperStories Showcase"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg w-full"
                    />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-3 sm:gap-6 justify-center items-center text-center"
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
                            <stat.icon className="h-5 w-5 text-indigo-400" />
                            {stat.label}
                        </dt>
                        <dd className="text-3xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </div>
);
