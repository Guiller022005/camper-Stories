import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import { fetchCampersEgresados, fetchMeritsCamperById } from "../../services/camperService";
import styles from "./styles/Campers.module.css";
import Loader from '@/components/common/Loader';

const Campers = () => {
  const [slidesPerView, setSlidesPerView] = useState(6);
  const [campersData, setCampersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meritsData, setMeritsData] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campers = await fetchCampersEgresados();
        setCampersData(campers);

        const meritsPromises = campers.map(async (camper) => {
          const merits = await fetchMeritsCamperById(camper.camper_id);
          return { camperId: camper.camper_id, merits };
        });

        const meritsResults = await Promise.all(meritsPromises);
        setMeritsData(meritsResults);
        setIsLoading(false);
      } catch (err) {
        setError("Error al cargar los datos de los campers.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <Loader/>;
  if (error) return <div className={styles.error}>{error}</div>;

  const getRandomMerit = (camperId) => {
    const camperMerits = meritsData.find((merit) => merit.camperId === camperId);
    if (camperMerits?.merits.length) {
      const randomIndex = Math.floor(Math.random() * camperMerits.merits.length);
      return camperMerits.merits[randomIndex];
    }
    return null;
  };

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
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          className={styles.swiper}
        >
          {campersData.map((camper, index) => {
            const randomMerit = getRandomMerit(camper.camper_id);
            return (
              <SwiperSlide key={`${index}-${camper.full_name}`} className={styles.swiperSlide}>
                <div className={styles.card} onClick={() => navigate(`/campers/profile/${camper.camper_id}`)}>
                  <div className={styles.perfil}>
                    <LazyLoadImage
                      src={camper.profile_picture}
                      alt={camper.full_name}
                      effect="blur"
                      className={styles.cardImage}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h3>{camper.full_name}</h3>
                    <p>{camper.about}</p>
                    {randomMerit ? (
                      <div className={styles.merit}>
                        <h4>
                          <span className={styles.meritIcon}>{randomMerit.icon}</span>
                          {randomMerit.name}
                          <span className={styles.meritIcon}>{randomMerit.icon}</span>
                        </h4>
                      </div>
                    ) : (
                      <p>Merito no Disponible.</p>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Campers;