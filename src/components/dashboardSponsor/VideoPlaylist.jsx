import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import "swiper/css"
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

const VideoPlaylist = ({ videos }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="min-h-screen bg-[#07072a] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg mb-6">
          <VideoPlayer videoUrl={videos[activeIndex].url} title={videos[activeIndex].title} />
          <div className="p-4">
            <h2 className="text-white text-xl font-semibold">{videos[activeIndex].title}</h2>
          </div>
        </div>
        <Swiper
          modules={[Pagination]}
          spaceBetween={10}
          slidesPerView={4}
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="rounded-xl overflow-hidden"
        >
          {videos.map((video, index) => (
            <SwiperSlide key={index}>
              <div
                className={`cursor-pointer transition-all duration-300 ${
                  index === activeIndex ? "scale-105 border-2 border-blue-500" : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <img
                  src={`https://img.youtube.com/vi/${getYouTubeVideoId(video.url)}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full rounded-lg"
                />
                <p className="text-white text-sm mt-2 truncate">{video.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default VideoPlaylist

