import { useRef, useState, useEffect } from "react"
import { Play, Clock } from "lucide-react"

const VideoCarousel = () => {
  const scrollContainerRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Datos de ejemplo de videos
  const videos = [
    {
      id: 1,
      title: "Introducción a React",
      duration: "10:30",
      thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fZIlvv016i4FIbbGKFaRa4UHdBHZe5.png",
      instructor: "Nicolas Pedraza",
      views: "1.2k vistas",
    },
    {
      id: 2,
      title: "JavaScript Avanzado",
      duration: "15:45",
      thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fZIlvv016i4FIbbGKFaRa4UHdBHZe5.png",
      instructor: "Juan Diego",
      views: "980 vistas",
    },
    {
      id: 3,
      title: "Node.js Básico",
      duration: "12:20",
      thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fZIlvv016i4FIbbGKFaRa4UHdBHZe5.png",
      instructor: "Luis Miguel",
      views: "2.1k vistas",
    },
    {
      id: 4,
      title: "CSS Grid y Flexbox",
      duration: "08:55",
      thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fZIlvv016i4FIbbGKFaRa4UHdBHZe5.png",
      instructor: "Santiago L.",
      views: "1.5k vistas",
    },
    {
      id: 5,
      title: "TypeScript Fundamentos",
      duration: "14:15",
      thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fZIlvv016i4FIbbGKFaRa4UHdBHZe5.png",
      instructor: "José Guillermo",
      views: "750 vistas",
    },
  ]

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("mouseup", handleMouseUp)
      container.addEventListener("mouseleave", handleMouseUp)
    }
    return () => {
      if (container) {
        container.removeEventListener("mouseup", handleMouseUp)
        container.removeEventListener("mouseleave", handleMouseUp)
      }
    }
  }, [handleMouseUp]) // Added handleMouseUp to the dependency array

  return (
    <div className="w-full bg-gradient-to-b from-[#07073b] to-[#27247a] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-2">Videos Destacados</h2>
        <p className="text-blue-300 mb-8">Explora nuestros mejores contenidos y recursos de aprendizaje</p>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="flex gap-6 pb-4" style={{ width: "max-content" }}>
              {videos.map((video) => (
                <div key={video.id} className="flex-none w-[300px]">
                  <div className="bg-[#2a1f5d] rounded-xl overflow-hidden group cursor-pointer">
                    <div className="relative aspect-video">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-white font-semibold mb-1 line-clamp-2">{video.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>{video.instructor}</span>
                        <span>{video.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCarousel

