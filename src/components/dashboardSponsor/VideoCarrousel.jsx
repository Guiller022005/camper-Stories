import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Función auxiliar para extraer el ID de YouTube de diferentes formatos de URL
const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const VideoPlayer = ({ videoUrl, title }) => {
    const videoId = getYouTubeVideoId(videoUrl);
    
    if (!videoId) {
        return <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
            URL de video inválida
        </div>;
    }

    return (
        <iframe
            className="w-full h-full absolute top-0 left-0"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    );
};

const VideoCarousel = ({ videos }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextVideo = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    const prevVideo = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
    };

    return (
        <div className="min-h-screen bg-[#07072a] flex items-center justify-center p-4">
            <div className="w-full max-w-4xl mx-auto relative">
                {/* Contenedor principal del carrusel */}
                <div className="relative bg-gray-900 rounded-xl shadow-xl overflow-hidden">
                    {/* Video actual */}
                    <div className="aspect-video relative">
                        <VideoPlayer 
                            videoUrl={videos[currentIndex].url} 
                            title={videos[currentIndex].title} 
                        />
                    </div>

                    {/* Botones de navegación */}
                    <div className="absolute inset-0 flex items-center justify-between p-4">
                        <button 
                            onClick={prevVideo}
                            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200 z-10"
                            aria-label="Video anterior"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button 
                            onClick={nextVideo}
                            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200 z-10"
                            aria-label="Siguiente video"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    {/* Título del video */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 z-10">
                        <h2 className="text-lg font-semibold">
                            {videos[currentIndex].title}
                        </h2>
                    </div>
                </div>

                {/* Indicadores de posición */}
                <div className="flex justify-center mt-4 gap-2">
                    {videos.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                                index === currentIndex 
                                    ? 'bg-white' 
                                    : 'bg-white/30 hover:bg-white/50'
                            }`}
                            aria-label={`Ir al video ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );

};

export default VideoCarousel;