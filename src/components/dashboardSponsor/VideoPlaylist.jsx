import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

const getYouTubeVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

const VideoPlayer = ({ videoUrl, title, autoplay = false }) => {
  const videoId = getYouTubeVideoId(videoUrl)

  if (!videoId) {
    return (
      <div className="w-full h-full bg-[#07072a] flex items-center justify-center text-white">
        URL de video inválida
      </div>
    )
  }

  return (
    <iframe
      className="w-full aspect-video rounded-lg"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=${autoplay ? 1 : 0}`}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  )
}

const VideoPlaylist = ({ videos }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(4)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setSlidesPerView(2)
      } else if (width < 1024) {
        setSlidesPerView(3)
      } else {
        setSlidesPerView(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="w-full bg-gradient-to-b from-[#1e1b4b] to-[#07072a] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Sección de título */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Videos Destacados</h2>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#80caff] to-[#4f46e5] text-lg md:text-xl">
            Explora nuestra colección de contenido educativo
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Principal */}
          <div className="lg:col-span-2">
            <div className="bg-[#0e0e4d]/50 rounded-xl p-4 shadow-xl backdrop-blur-sm">
              <VideoPlayer videoUrl={videos[activeIndex].url} title={videos[activeIndex].title} autoplay={true} />
              <div className="mt-4">
                <h3 className="text-white text-xl font-semibold mb-2">{videos[activeIndex].title}</h3>
                <p className="text-gray-300 text-sm">{videos[activeIndex].description}</p>
              </div>
            </div>
          </div>

          {/* Lista de Videos */}
          <div className="lg:col-span-1">
            <div className="bg-[#0e0e4d]/50 rounded-xl p-4 h-full shadow-xl backdrop-blur-sm">
              <h3 className="text-white text-lg font-semibold mb-4">Lista de Reproducción</h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
                {videos.map((video, index) => (
                  <div
                    key={index}
                    className={`group cursor-pointer rounded-lg transition-all duration-300 ${
                      index === activeIndex ? "bg-[#4f46e5]/20 ring-2 ring-[#4f46e5]" : "hover:bg-[#4f46e5]/10"
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className="flex gap-3 p-2">
                      <div className="relative w-32 h-20 flex-shrink-0">
                        <img
                          src={`https://img.youtube.com/vi/${getYouTubeVideoId(video.url)}/mqdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover rounded-md"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors rounded-md" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-medium line-clamp-2 group-hover:text-[#80caff] transition-colors">
                          {video.title}
                        </h4>
                        <p className="text-gray-400 text-xs mt-1">{video.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vista móvil de la playlist */}
        <div className="lg:hidden mt-6">
          <Swiper
            modules={[Pagination]}
            spaceBetween={12}
            slidesPerView={slidesPerView}
            pagination={{ clickable: true }}
            className="pb-10"
          >
            {videos.map((video, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`cursor-pointer rounded-lg overflow-hidden ${
                    index === activeIndex ? "ring-2 ring-[#4f46e5]" : "opacity-80"
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${getYouTubeVideoId(video.url)}/mqdefault.jpg`}
                    alt={video.title}
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                  <p className="text-white text-sm mt-2 line-clamp-2">{video.title}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5) !important;
        }
        .swiper-pagination-bullet-active {
          background: #4f46e5 !important;
        }
      `}</style>
    </div>
  )
}

export default VideoPlaylist

