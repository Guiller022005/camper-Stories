import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import campersData from "../../data/camperSucess";
import styles from "./styles/Campers.module.css";

const Campers = () => {
  const [slidesPerView, setSlidesPerView] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setSlidesPerView(1);
      } else if (width < 768) {
        setSlidesPerView(2);
      } else if (width < 1024) {
        setSlidesPerView(3);
      } else if (width < 1600) {
        setSlidesPerView(4);
      } else {
        setSlidesPerView(6);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.campersContainer}>
      <div className={styles.titleCampers}>
        <h3>Campers</h3>
        <h2>exitosos</h2>
      </div>
      <div className={styles.cardsContainerWrapper}>
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              const totalPages = Math.ceil(campersData.length / slidesPerView);

              // Logic to show only 3 bullets:
              const maxVisibleBullets = 3;
              const midpoint = Math.floor(maxVisibleBullets / 2);

              let visibleBullets = [];
              if (totalPages <= maxVisibleBullets) {
                visibleBullets = Array.from({ length: totalPages }, (_, i) => i);
              } else {
                if (index < midpoint) {
                  visibleBullets = Array.from({ length: maxVisibleBullets }, (_, i) => i);
                } else if (index > totalPages - midpoint - 1) {
                  visibleBullets = Array.from(
                    { length: maxVisibleBullets },
                    (_, i) => totalPages - maxVisibleBullets + i
                  );
                } else {
                  visibleBullets = Array.from(
                    { length: maxVisibleBullets },
                    (_, i) => index - midpoint + i
                  );
                }
              }

              if (visibleBullets.includes(index)) {
                return `<span class="${className}"></span>`;
              }
              return "";
            },
          }}
          modules={[Pagination, Autoplay]}
          className={`${styles.swiper} ${styles.customSwiper}`}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1600: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
        >
          {campersData.map((camper, index) => (
            <SwiperSlide key={`${index}-${camper.name}`} className={styles.swiperSlide}>
              <div className={styles.card}>
                <div className={styles.perfil}>
                  <LazyLoadImage
                    src={camper.image}
                    alt={camper.name}
                    effect="blur" // Aplica un efecto de desenfoque al cargar
                    className={styles.cardImage}
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3>{camper.name}</h3>
                  <h4>{camper.role}</h4>
                  <p>{camper.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Campers;
