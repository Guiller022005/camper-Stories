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
import { useCampus } from "../../components/campersMainPage/context/CampusContext"; // Importa el contexto
import NoRecords from "../common/NoRecords";
import styles from "./styles/Campers.module.css";
import Loader from '@/components/common/Loader';

const Campers = ({
  title = "Campers Exitosos",
  subtitle = "Conoce a algunos de nuestros campers más destacados y cómo han transformado sus carreras!"
}) => {
  const { currentCampusId } = useCampus(); // Obtener el estado del campus desde el contexto
  const [slidesPerView, setSlidesPerView] = useState(6);
  const [campersData, setCampersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meritsData, setMeritsData] = useState([]);
  const navigate = useNavigate();

  const CHAR_LIMIT = 100;

  console.log("🔄 Renderizando Campers: currentCampusId =", currentCampusId);

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
    if (!currentCampusId) return; // Evitar ejecución si es null/undefined

    const fetchData = async () => {
      try {
        console.log("📡 Fetching campers for campus:", currentCampusId);
        const campersResponse = await fetchCampersEgresados(currentCampusId);
        const campers = campersResponse.data;
        console.log("✅ Campers fetched successfully");
        setCampersData(campers);
      } catch (err) {
        console.error("❌ Error fetching campers:", err);
        setError("Error al cargar los datos de los campers.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentCampusId]);


  if (isLoading) return <Loader />;
  if (error) return <div className={`${styles.error} text-red-500`}>{error}</div>;

  const getRandomMerit = (camperId) => {
    const camperMerits = meritsData.find((merit) => merit.camperId === camperId);
    if (camperMerits?.merits.length) {
      const randomIndex = Math.floor(Math.random() * camperMerits.merits.length);
      return camperMerits.merits[randomIndex];
    }
    return null;
  };

  if (!campersData || campersData.length === 0) {
    return (
      <div className={styles.noregsContainer}>
        <div className={styles.titleCampers}>
          <h3 className="mt-10 mr-[7rem] text-4xl font-bold tracking-tight text-white sm:text-7xl6">
            {title}
          </h3>
          <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-[#80caff] to-[#4f46e5]">
            {subtitle}
          </h4>
        </div>
        <NoRecords showTitle={false} />
      </div>
    );
  }

  return (
    <div className={styles.campersContainer}>
      <div className={styles.titleCampers}>
        <h3 className="mt-10 mr-[7rem] text-4xl font-bold tracking-tight text-white sm:text-7xl6">
          {title}
        </h3>
        <h4 className="text-transparent bg-clip-text text-center bg-gradient-to-r from-[#80caff] to-[#4f46e5]">
          {subtitle}
        </h4>
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
            const isLongAbout = camper.about.length > CHAR_LIMIT;
            return (
              <SwiperSlide key={`${index}-${camper.full_name}`} className={styles.swiperSlide}>
                <div
                  className={styles.card}
                  onClick={() => navigate(`/campers/profile/${camper.camper_id}`)}
                >
                  <div className={styles.perfil}>
                    <LazyLoadImage
                      src={camper.profile_picture}
                      alt={camper.full_name}
                      effect="blur"
                      className={styles.cardImage}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className="font-semibold text-[clamp(1.3rem,2vw,1.2rem)] text-[var(--color1)] mb-[clamp(0.3rem,1vw,0.5rem)] text-center md:text-[clamp(1.2rem,2vw,1.1rem)]">
                      {camper.full_name}
                    </h3>
                    {randomMerit ? (
                      <div className={styles.merit}>
                        <h4 className="font-medium text-[clamp(0.9rem,1.5vw,0.7rem)] text-[var(--color2)] mb-[clamp(0.5rem,1.5vw,0.8rem)] text-center md:text-[clamp(0.9rem,1.5vw,0.8rem)]">
                          <span className="text-[var(--color2)]">{randomMerit.icon}</span>
                          {randomMerit.name}
                          <span className="text-[var(--color2)]">{randomMerit.icon}</span>
                        </h4>
                      </div>
                    ) : (
                      <p className="font-light text-[clamp(0.8rem,1.5vw,0.7rem)] text-[var(--color1)] leading-[1.3] text-center md:text-[clamp(0.8rem,1.5vw,0.75rem)]">
                        Mérito no Disponible.
                      </p>
                    )}
                    <p className="font-light text-[clamp(0.8rem,1.5vw,0.7rem)] text-[var(--color1)] leading-[1.3] text-center md:text-[clamp(0.8rem,1.5vw,0.75rem)]">
                      {isLongAbout ? (
                        <>
                          {camper.about.substring(0, CHAR_LIMIT)}...
                          <span
                            className="text-[var(--color4)] cursor-pointer hover:text-[var(--color1)]"
                            onClick={(e) => {
                              e.stopPropagation(); // Evita que el clic en "Ver más" dispare el clic en toda la tarjeta
                              navigate(`/campers/profile/${camper.camper_id}`);
                            }}
                          >
                            <br />Ver más
                          </span>
                        </>
                      ) : (
                        camper.about
                      )}
                    </p>
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
