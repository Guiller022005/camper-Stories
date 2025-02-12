import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import campusLogo from "../../assets/campus.svg";
import campusLogoCompleto from "../../assets/CampusLogo.png";
import { toast } from "react-toastify";
import { useCampus } from "../campersMainPage/context/CampusContext";
import { ChevronDown, ChevronUp } from "lucide-react";

const Navbar = ({ viewType, links, onLinkClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const camperIdFromStorage = parseInt(localStorage.getItem("camper_id"));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { currentCampusId, updateCampus } = useCampus();

  window.CampusState = currentCampusId;

  const campus = [
    { id: 1, name: "Bucaramanga" },
    { id: 2, name: "Bogotá" },
    { id: 3, name: "Tibú" },
  ];

  const handleCampusClick = (campusId) => {
    console.log("🔄 Cambiando campus a:", campusId);
    updateCampus(campusId);
    if (currentCampusId === campusId) return;
    const selectedCampus = campus.find((c) => c.id === campusId);
    const campusName = selectedCampus ? selectedCampus.name : "Campus desconocido";
    toast.info(`Campus seleccionado: ${campusName}`);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    return () => {
      // Limpieza: restablece el scroll al desmontar el componente
      document.body.style.overflow = "";
    };
  }, [location.pathname]);

  const handleToggleProfile = () => {
    navigate(
      location.pathname === "/" || location.pathname.includes("/edit")
        ? `/campers/profile/${camperIdFromStorage}`
        : `/campers/profile/${camperIdFromStorage}/edit`
    );
    setIsMenuOpen(false);
    document.body.style.overflow = ""; // Restablece el scroll
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "" : "hidden"; // Controla el scroll
  };

  const handleLinkClick = (link) => {
    if (onLinkClick && link.href.startsWith("#")) {
      onLinkClick(link.href.substring(1));
    } else {
      navigate(link.href);
    }
    setIsMenuOpen(false);
    document.body.style.overflow = ""; // Restablece el scroll
  };

  const handleLogout = () => {
    const logoutUrl = `${import.meta.env.VITE_API_BASE_URL}users/logout`;
    fetch(logoutUrl, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          toast.error("Error. Por favor, inténtalo de nuevo.");
          throw new Error("Logout failed");
        }
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("camper_id");
        setIsLoggedIn(false);
        toast.success("¡Hasta pronto! Has cerrado sesión exitosamente.");
        navigate("/campers/login");
      })
      .catch((error) => {
        toast.error("Error. Por favor, inténtalo de nuevo.");
        console.error("Error durante el logout:", error);
      });
  };

  const navbarStyles = `text-white p-3 fixed top-0 left-0 right-0 z-[1000] w-full font-inter ${isMenuOpen ? "bg-[#070727]" : "bg-[#070727]/20 backdrop-blur-md"
    } shadow-lg transition-colors duration-300 ease-in-out`;

  const NavLinks = ({ links }) =>
    links.map((link) => (
      <button
        key={link.href || link.id}
        onClick={() => handleLinkClick(link)}
        className="text-white text-lg py-3 hover:text-blue-400 transition"
      >
        {link.label}
      </button>
    ));

  return (
    <nav className={navbarStyles}>
      {/* Navbar Escritorio */}
      <div className="hidden lg:flex max-w-[70vw] mx-auto justify-between items-center">
        <div className="flex items-center gap-10">
          <Link to="/">
            <img src={campusLogo} alt="Campus Logo" className="h-[85px] w-auto" />
          </Link>
          <nav className="flex gap-10 text-[18px]">
            <NavLinks links={links} />
          </nav>
        </div>
        <div className="flex items-center gap-5">
          {isLoggedIn ? (
            <>
              {location.pathname.startsWith(`/campers/profile/${camperIdFromStorage}/edit`) ? (
                <Button
                  onClick={() => navigate(`/campers/profile/${camperIdFromStorage}`)}
                  size="lg"
                  className="text-lg bg-transparent hover:bg-[#4c47b4]"
                >
                  Ver Perfil
                </Button>
              ) : (
                <Button
                  onClick={() => navigate(`/campers/profile/${camperIdFromStorage}/edit`)}
                  size="lg"
                  className="text-lg bg-transparent hover:bg-[#4c47b4]"
                >
                  Editar Perfil
                </Button>
              )}
              <Button
                onClick={handleLogout}
                size="lg"
                className="text-lg bg-[#4c47b4] hover:bg-[#615cc2]"
              >
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate("/register")}
                size="lg"
                className="text-lg bg-transparent hover:bg-[#4c47b4]"
              >
                Regístrate
              </Button>
              <Button
                onClick={() => navigate("/login")}
                size="lg"
                className="text-lg bg-[#4c47b4] hover:bg-[#615cc2]"
              >
                Inicia Sesión
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Navbar Móvil & Tablet */}
      <div className="flex lg:hidden justify-between items-center px-5">
        <Link to="/">
          <img src={campusLogoCompleto} alt="Campus Logo Completo" className="h-[55px] w-auto" />
        </Link>
        <button
          className="relative z-[1001] w-8 h-8 flex flex-col justify-center items-center focus:outline-none"
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-white transform transition ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`w-full h-0.5 bg-white transition ${isMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`w-full h-0.5 bg-white transform transition ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </div>
        </button>
      </div>

      {/* Menú Móvil Expandido */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#0C0C74] flex flex-col justify-center items-center z-[999]">
          <NavLinks links={links} />
          {!isLoggedIn ? (
            <div className="flex flex-col gap-4">
              <Button size="lg" className="text-lg bg-transparent hover:bg-[#4c47b4]" onClick={() => navigate("/register")}>
                Regístrate
              </Button>
              <Button size="lg" className="text-lg bg-[#4c47b4] hover:bg-[#615cc2]" onClick={() => navigate("/login")}>
                Inicia Sesión
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {location.pathname.startsWith(`/campers/profile/${camperIdFromStorage}/edit`) ? (
                <Button
                  onClick={() => navigate(`/campers/profile/${camperIdFromStorage}`)}
                  size="lg"
                  className="text-lg bg-transparent hover:bg-[#4c47b4]"
                >
                  Ver Perfil
                </Button>
              ) : (
                <Button
                  onClick={() => navigate(`/campers/profile/${camperIdFromStorage}/edit`)}
                  size="lg"
                  className="text-lg bg-transparent hover:bg-[#4c47b4]"
                >
                  Editar Perfil
                </Button>
              )}
              <Button size="lg" className="text-lg bg-red-500 hover:bg-red-600" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

