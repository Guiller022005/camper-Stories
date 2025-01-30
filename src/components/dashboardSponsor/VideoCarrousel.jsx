import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Importa los estilos de Swiper
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

// Función auxiliar para extraer el ID de YouTube de diferentes formatos de URL
const getYouTubeVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

const VideoPlayer = ({ videoUrl, title }) => {
  const videoId = getYouTubeVideoId(videoUrl)

  if (!videoId) {
    return (
      <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">URL de video inválida</div>
    )
  }

  return (
    <iframe
      className="w-full aspect-video"
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  )
}

const VideoCarousel = ({ videos }) => {
  return (
    <div className="min-h-screen bg-[#07072a] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          loop={true}
          className="rounded-xl overflow-hidden"
        >
          {videos.map((video, index) => (
            <SwiperSlide key={index}>
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <VideoPlayer videoUrl={video.url} title={video.title} />
                <div className="p-4">
                  <h2 className="text-white text-lg font-semibold truncate">{video.title}</h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex justify-center mt-6 gap-4">
          <button className="swiper-button-prev p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200">
            <ChevronLeft size={24} />
          </button>
          <button className="swiper-button-next p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoCarousel

