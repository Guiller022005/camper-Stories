import React, { lazy, Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchCamperById } from "../../services/camperService";
import LazySection from "../../components/common/LazySection";
import Loader from "@/components/common/Loader";

const NavbarProfile = lazy(() => import("../../components/navbar/Navbar"));
const Footer = lazy(() => import("../../components/footer/Footer"));
const SponsorProfileHeader = lazy(() => import("../../components/dashboardSponsor/SponsorProfile"));
const MisDonaciones = lazy(() => import("../../components/sponsorMisDonaciones/MisDonaciones"));
const DashboardView = lazy(() => import("../../components/dashboardView/dashboardView"));

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
  const [view, setView] = useState("dashboard");

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

        {/* Selector de pestañas */}
        <div className="flex items-center justify-center my-6">
          <div className="relative w-full max-w-2xl bg-gray-900 p-2 rounded-xl shadow-md">
            <div className="relative flex">
              <TabButton
                isActive={view === "dashboard"}
                onClick={() => setView("dashboard")}
                gradient="from-purple-600 via-indigo-600 to-blue-500"
              >
                Mi Dashboard
              </TabButton>
              <TabButton
                isActive={view === "donaciones"}
                onClick={() => setView("donaciones")}
                gradient="from-teal-400 via-cyan-500 to-blue-500"
              >
                Ver Mis Donaciones
              </TabButton>
            </div>
          </div>
        </div>

        {/* Mantener ambos componentes montados y ocultar el que no se usa */}
        <div className="relative">
          <div className={view === "dashboard" ? "block" : "hidden"}>
            <DashboardView />
          </div>
          <div className={view === "donaciones" ? "block" : "hidden"}>
            <MisDonaciones />
          </div>
        </div>
      </div>

      <LazySection>
        <Footer />
      </LazySection>
    </div>
  );
};

// 🔹 Componente TabButton corregido
function TabButton({ children, isActive, onClick, gradient, index }) {
  return (
    <motion.button
      type="button"
      className={`relative flex-1 py-3 text-lg font-bold transition-colors duration-300 ${
        isActive ? "text-white" : "text-gray-400"
      }`}
      onClick={() => {
        if (!isActive) {
          onClick();
        }
      }}
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
    >
      {isActive && (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-xl`}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          initial={{ x: index === 0 ? -15 : 15, opacity: 0.8, scale: 0.98 }}
          transition={{ type: "tween", duration: 0.6, ease: "anticipate" }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

export default SponsorDashboard;
