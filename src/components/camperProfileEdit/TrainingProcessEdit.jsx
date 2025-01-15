import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from "@/components/ui/dialog";
import TikTokEmbedEdit from './TiktokEmbedEdit';
import TikTokAddModal from './modals/TikTokAddModal';
import AddItemButton from './ui/AddItemButton';
import styles from './styles/TrainingProcessEdit.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Virtual } from 'swiper/modules'; // Cambiamos Lazy por Virtual
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/virtual'; // Cambiamos lazy por virtual

const TrainingProcessEdit = ({ videos: initialVideos }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videos, setVideos] = useState(initialVideos || []);
  const swiperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.update();
    }
  }, [isMobile]);

  // Actualizado para manejar la respuesta del servidor
  const handleAddTiktok = async (newTiktokData) => {
    try {
      // La lógica de la petición está en el modal, aquí solo actualizamos el estado
      setVideos(prevVideos => [...prevVideos, {
        video_url: newTiktokData.url,
        title: newTiktokData.title,
        description: newTiktokData.description
      }]);

      // Actualizar el Swiper después de añadir el nuevo video
      if (swiperRef.current && swiperRef.current.swiper) {
        setTimeout(() => {
          swiperRef.current.swiper.update();
        }, 100);
      }

      setIsModalOpen(false);
    } catch (error) {
      toast.error('Error al actualizar la lista de videos');
      console.error('Error updating videos list:', error);
    }
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
        addSlidesBefore: slidesPerView === 1 ? 1 : 2
      }}
      preloadImages={false}
      watchSlidesProgress={true}
      pagination={{
        clickable: true,
        dynamicBullets: slidesPerView === 1,
      }}
      className={`${styles.profileSwiper} ${slidesPerView === 1 ? styles.mobileSwiper : ''}`}
    >
      <SwiperSlide className={slidesPerView === 1 ? styles.swiperSlide : styles.videoItem}>
        <AddItemButton
          type="tiktok"
          onClick={() => setIsModalOpen(true)}
        />
      </SwiperSlide>

      {videos.map((video, index) => (
        <SwiperSlide
          key={video.id || index}
          className={slidesPerView === 1 ? styles.swiperSlide : styles.videoItem}
        >
          <TikTokEmbedEdit
            videoUrl={video.video_url}
            title={video.title}
          />
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <TikTokAddModal
          onAddTiktok={handleAddTiktok}
          onClose={() => setIsModalOpen(false)}
        />
      </Dialog>
    </section>
  );
};

export default TrainingProcessEdit;