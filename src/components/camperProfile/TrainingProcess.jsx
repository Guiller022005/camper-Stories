import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Virtual } from "swiper/modules";
import TikTokEmbed from "./TiktokEmbed";
import TikTokAddModal from "../camperProfileEdit/modals/TikTokAddModal";
import AddItemButton from "../camperProfileEdit/ui/AddItemButton";
import { Dialog } from "@/components/ui/dialog";
import styles from "./styles/TrainingProcess.module.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/virtual";

const TrainingProcess = ({ videos = [], isEditable }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoList, setVideoList] = useState(videos || []);
  const swiperRef = useRef(null);

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
          <TikTokEmbed videoUrl={video.video_url} title={video.title} />
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