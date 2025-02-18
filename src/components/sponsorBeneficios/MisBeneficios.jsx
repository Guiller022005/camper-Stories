"use client"
import { motion } from "framer-motion"
import { Sparkles, Video, Clock, DollarSign, Sticker, HeadphonesIcon, CalendarDays } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const benefits = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    name: "Acceso VIP",
    description: "Disfruta de acceso exclusivo a todos nuestros cursos premium.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    name: "6 horas de hubox",
    description: "Aprovecha 6 horas mensuales en nuestro espacio de coworking virtual.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    name: "Fee reducido",
    description: "Benefíciate de un fee de contratación del 15% en nuestras ofertas laborales.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <Video className="w-6 h-6" />,
    name: "Videos exclusivos",
    description: "Accede a contenido personalizado y exclusivo para sponsors.",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: <Sticker className="w-6 h-6" />,
    name: "Pack de stickers",
    description: "Recibe nuestro pack legendario de stickers para personalizar tu equipo.",
    color: "from-yellow-500 to-amber-500",
  },
  {
    icon: <HeadphonesIcon className="w-6 h-6" />,
    name: "Soporte 24/7",
    description: "Cuenta con nuestro equipo de soporte las 24 horas, los 7 días de la semana.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: <CalendarDays className="w-6 h-6" />,
    name: "Eventos exclusivos",
    description: "Participa en eventos y webinars exclusivos para nuestra comunidad de sponsors.",
    color: "from-teal-500 to-cyan-500",
  },
]

export default function SponsorBenefits() {
  return (
    <div
      className="space-y-6 py-12 px-4 sm:px-6 lg:px-8"
      style={{ background: "linear-gradient(180deg, #1e1b4b 0%, #07073b 100%)" }}
    >
      <h2 className="text-2xl md:text-5xl font-bold text-center text-[#FFFF] py-5 mb-12">Tus Beneficios como Sponsor Starship</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            className="flex"
          >
            <Card
              className="relative p-6 bg-[#6366F1]/10 border-[#6366F1]/20 backdrop-blur-xl hover:bg-[#6366F1]/20 transition-all duration-300 w-full flex flex-col"
            >
              <div className="flex items-start justify-between mb-6 h-24">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-[#FFFF]">{benefit.name}</h3>
                  <p className="text-white/60 font-poppins text-sm">{benefit.description}</p>
                </div>
                <div className={`bg-gradient-to-r ${benefit.color} p-3 rounded-xl text-white shrink-0 ml-4`}>{benefit.icon}</div>
              </div>
              <div className="space-y-4 mb-6 flex-grow">
                <div className="flex items-center gap-3">
                  <span className="text-[#66E7F3]">✓</span>
                  <span className="text-white/80 font-poppins">Beneficio activo</span>
                </div>
              </div>
              <Button
                className={`w-full bg-gradient-to-r ${benefit.color} hover:opacity-90 transition-opacity font-bold`}
              >
                Más información
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}