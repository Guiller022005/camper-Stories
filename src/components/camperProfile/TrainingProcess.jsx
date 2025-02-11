import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Virtual } from "swiper/modules";
import TikTokEmbed from "./TiktokEmbed";
import TikTokAddModal from "./modals/TikTokAddModal";
import AddItemButton from "./ui/AddItemButton";
import { Dialog } from "@/components/ui/dialog";
import styles from "./styles/TrainingProcess.module.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/virtual";
import { deleteTikTok } from "@/services/tiktokService";
import { toast } from "react-toastify";

const TrainingProcess = ({ videos = [], isEditable }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoList, setVideoList] = useState(videos || []);
  const [isLoading, setIsLoading] = useState(false);
  const swiperRef = useRef(null);
  const { id } = useParams();

  const handleDeleteTiktok = async (tiktokId) => {
    try {
      setIsLoading(true);
      await deleteTikTok(id, tiktokId); // Llama al servicio de eliminación
      
      // Actualiza la lista de videos eliminando el TikTok correspondiente
      setVideoList((prevVideos) =>
        prevVideos.filter((video) => video.id !== tiktokId)
      );
      
      // Muestra un toast de éxito
      toast.success("TikTok eliminado con éxito");
    } catch (error) {
      console.error("Error eliminando el video de TikTok:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.update();
    }
  }, [isMobile, videoList]);

  // Maneja la adición de nuevos videos
  const handleAddTiktok = (newTiktokData) => {
    setVideoList((prevVideos) => [
      ...prevVideos,
      {
        video_url: newTiktokData.url,
        title: newTiktokData.title,
        description: newTiktokData.description,
      },
    ]);

    if (swiperRef.current && swiperRef.current.swiper) {
      setTimeout(() => {
        swiperRef.current.swiper.update();
      }, 100);
    }

    setIsModalOpen(false);
  };

  const renderSwiper = (slidesPerView) => (
    <Swiper
      ref={swiperRef}
      modules={[Pagination, Virtual]}
      spaceBetween={30}
      slidesPerView={slidesPerView}
      virtual={{
        enabled: true,
        addSlidesAfter: slidesPerView === 1 ? 1 : 2,
        addSlidesBefore: slidesPerView === 1 ? 1 : 2,
      }}
      pagination={{
        clickable: true,
        dynamicBullets: slidesPerView === 1,
      }}
      className={`${styles.profileSwiper} ${slidesPerView === 1 ? styles.mobileSwiper : ""
        }`}
    >
      {isEditable && (
        <SwiperSlide
          className={slidesPerView === 1 ? styles.swiperSlide : styles.videoItem}
        >
          <AddItemButton type="tiktok" onClick={() => setIsModalOpen(true)} />
        </SwiperSlide>
      )}

      {videoList.map((video, index) => (
        <SwiperSlide
          key={video.id || index}
          className={slidesPerView === 1 ? styles.swiperSlide : styles.videoItem}
        >
          <div className="relative">
            <TikTokEmbed videoUrl={video.video_url} title={video.title} />

            {isEditable && (
              <button
                onClick={() => handleDeleteTiktok(video.id)}
                disabled={isLoading}
                className="absolute z-[2] top-2 right-2 font-bold text-white bg-red-500 hover:bg-red-600 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer transition-colors duration-300"
              >
                x
              </button>   
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return (
    <section className={styles.process}>
      <h2 className={styles.profileSubtitle}>
        <span className={styles.highlight}>&lt;/</span> Mi proceso de Formación
      </h2>
      <div className={styles.videos}>
        {isMobile ? renderSwiper(1) : renderSwiper(3)}
      </div>

      {isEditable && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <TikTokAddModal
            onAddTiktok={handleAddTiktok}
            onClose={() => setIsModalOpen(false)}
          />
        </Dialog>
      )}
    </section>
  );
};

export default TrainingProcess;