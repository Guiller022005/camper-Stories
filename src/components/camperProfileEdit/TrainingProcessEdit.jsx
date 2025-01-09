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

const TrainingProcessEdit = ({ videos }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleAddTiktok = (newTiktokData) => {
    // Aquí manejarías la lógica para añadir el nuevo TikTok
    console.log('Nuevo TikTok:', newTiktokData);
    setIsModalOpen(false);
  };

  return (
    <section className={styles.process}>
      <h2 className={styles.profileSubtitle}>
        <span className={styles.highlight}>&lt;/</span> Mi proceso de Formación
      </h2>
      <div className={styles.videos}>
        {isMobile ? (
          <Swiper
            ref={swiperRef}
            modules={[Pagination, Virtual]} // Cambiamos Lazy por Virtual
            spaceBetween={30}
            slidesPerView={1}
            virtual={{
              enabled: true,
              addSlidesAfter: 1,
              addSlidesBefore: 1
            }}
            preloadImages={false}
            watchSlidesProgress={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            className={`${styles.profileSwiper} ${styles.mobileSwiper}`}
          >
            {/* Botón de añadir como primera slide */}
            <SwiperSlide className={styles.swiperSlide}>
              <AddItemButton
                type="tiktok"
                onClick={() => setIsModalOpen(true)}
              />
            </SwiperSlide>
            {/* Mapeo de videos existentes */}
            {videos.map((video, index) => (
              <SwiperSlide key={index} className={styles.swiperSlide}>
                <TikTokEmbedEdit videoUrl={video.url} title={video.title} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Swiper
            modules={[Pagination, Virtual]}
            slidesPerView={3}
            spaceBetween={30}
            virtual={{
              enabled: true,
              addSlidesAfter: 2,
              addSlidesBefore: 2
            }}
            preloadImages={false}
            watchSlidesProgress={true}
            pagination={{
              clickable: true,
            }}
            className={styles.profileSwiper}
          >
            {/* Botón de añadir como primera slide */}
            <SwiperSlide className={styles.videoItem}>
              <AddItemButton
                type="tiktok"
                onClick={() => setIsModalOpen(true)}
              />
            </SwiperSlide>
            {/* Mapeo de videos existentes */}
            {videos.map((video, index) => (
              <SwiperSlide key={index} className={styles.videoItem}>
                <TikTokEmbedEdit videoUrl={video.url} title={video.title} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
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