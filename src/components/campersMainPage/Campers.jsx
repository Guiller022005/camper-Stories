import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { fetchCampersEgresados, fetchMeritsCamperById } from "../../services/camperService";
import styles from "./styles/Campers.module.css";

const Campers = () => {
  const [slidesPerView, setSlidesPerView] = useState(6);
  const [campersData, setCampersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meritsData, setMeritsData] = useState([]);

  // Handle window resizing for responsive slides
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

  // Fetch campers and merits data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const campers = await fetchCampersEgresados();
        setCampersData(campers);

        // Fetch merits for each camper
        const meritsPromises = campers.map(async (camper) => {
          const merits = await fetchMeritsCamperById(camper.camper_id);  // assuming camper_id is used for fetching merits
          return {
            camperId: camper.camper_id,
            merits,
          };
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

  if (isLoading) {
    return <div className={styles.loading}>Cargando...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  // Select a random merit for each camper and store it
  const getRandomMerit = (camperId) => {
    const camperMerits = meritsData.find((merit) => merit.camperId === camperId);
    if (camperMerits && camperMerits.merits.length > 0) {
      const randomIndex = Math.floor(Math.random() * camperMerits.merits.length);  // Select random merit
      return camperMerits.merits[randomIndex];
    }
    return null; // Return null if no merits found
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
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
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
          {campersData.map((camper, index) => {
            // Get the random merit for this camper
            const randomMerit = getRandomMerit(camper.camper_id);

            return (
              <SwiperSlide key={`${index}-${camper.full_name}`} className={styles.swiperSlide}>
                <div className={styles.card}>
                  <div className={styles.perfil}>
                    <LazyLoadImage
                      src={camper.profile_picture} // Use profile_picture from API
                      alt={camper.full_name}
                      effect="blur"
                      className={styles.cardImage}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h3>{camper.full_name}</h3>
                    <p>{camper.about}</p>

                    {/* Display the random merit with icon before and after the name */}
                    {randomMerit ? (
                      <div className={styles.merit}>
                        <h4>
                          {/* Show the icon before and after the merit name */}
                          <span className={styles.meritIcon}>
                            {randomMerit.icon}
                          </span>
                          {randomMerit.name}
                          <span className={styles.meritIcon}>
                            {randomMerit.icon}
                          </span>
                        </h4>
                        <p>{camper.history}</p>
                      </div>
                    ) : (
                      <p>No merit available</p>
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
