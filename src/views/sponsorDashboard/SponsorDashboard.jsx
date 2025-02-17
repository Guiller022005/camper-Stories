import React, { lazy, Suspense, useState, useEffect } from "react";
import { fetchCamperById } from "../../services/camperService";
import { fetchSponsorrById } from "@/services/sponsorService";
import LazySection from "../../components/common/LazySection";
import Loader from "@/components/common/Loader";

const NavbarProfile = lazy(() => import("../../components/navbar/Navbar"));
const Footer = lazy(() => import("../../components/footer/Footer"));
const SponsorProfileHeader = lazy(() => import("../../components/dashboardSponsor/SponsorProfile"));
const Campers = lazy(() => import("../../components/campersMainPage/Campers"));
const CarrouselVideo = lazy(() => import("../../components/dashboardSponsor/CarrouselVideo"));
const MisDonaciones = lazy(() => import("../../components/sponsorMisDonaciones/MisDonaciones"));

const SponsorDashboard = () => {
  const [camperData, setCamperData] = useState({
    main_video_url: "",
    about: "",
    profile_picture: "",
    full_name: "",
    city: "",
    age: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("default"); // Estado para cambiar entre "default" y "donaciones"

  const videos = [
    { url: "https://youtu.be/OKMsheDmK8Q?list=TLGGumSk0QQF7LcyOTAxMjAyNQ", title: "Video 1" },
    { url: "https://youtu.be/OKMsheDmK8Q?list=TLGGumSk0QQF7LcyOTAxMjAyNQ", title: "Video 2" },
    { url: "https://youtu.be/OKMsheDmK8Q?list=TLGGumSk0QQF7LcyOTAxMjAyNQ", title: "Video 3" },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCamperById(60);
        setCamperData(data);
      } catch (error) {
        console.error("Error loading camper data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col relative min-h-screen bg-[#07072b]">
      <LazySection>
        <NavbarProfile
          viewType="profile"
          links={[
            { id: "sobre-mi", label: "Sobre mí" },
            { id: "proceso-formacion", label: "Proceso" },
            { id: "sueños-grid", label: "Sueños" },
            { id: "projects", label: "Proyectos" },
          ]}
        />
      </LazySection>

      <div className="flex flex-col">
        <LazySection>
          <div id="sponsor-profile-header">
            <SponsorProfileHeader data={camperData} initialMerits={[]} />
          </div>
        </LazySection>

        {/* Selector de vista */}
        <div className="flex justify-center my-4">
          <button
            className={`px-6 py-2 mx-2 rounded ${view === "default" ? "bg-blue-600 text-white" : "bg-gray-300 text-black"}`}
            onClick={() => setView("default")}
          >
            Ver Campers & Videos
          </button>
          <button
            className={`px-6 py-2 mx-2 rounded ${view === "donaciones" ? "bg-blue-600 text-white" : "bg-gray-300 text-black"}`}
            onClick={() => setView("donaciones")}
          >
            Ver Mis Donaciones
          </button>
        </div>

        {/* Renderizado condicional */}
        {view === "default" ? (
          <>
            <LazySection>
              <div id="campers-section">
                <Campers title="Auspiciados!" subtitle="Gracias a ti ellos terminaron su formación" />
              </div>
            </LazySection>

            <LazySection>
              <div id="video-carousel">
                <CarrouselVideo videos={videos} />
              </div>
            </LazySection>
          </>
        ) : (
          <LazySection>
            <MisDonaciones />
          </LazySection>
        )}
      </div>

      <LazySection>
        <Footer />
      </LazySection>
    </div>
  );
};

export default SponsorDashboard;
