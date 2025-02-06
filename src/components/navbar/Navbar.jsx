import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import campusLogo from "../../assets/campus.svg";
import { LogOut, Eye } from "lucide-react";
import { toast } from "react-toastify";

const Navbar = ({ viewType, links }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const camperIdFromStorage = parseInt(localStorage.getItem("camper_id"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const handleToggleProfile = () => {
    if (location.pathname === "/" || location.pathname.includes("/edit")) {
      navigate(`/campers/profile/${camperIdFromStorage}`);
    } else {
      navigate(`/campers/profile/${camperIdFromStorage}/edit`);
    }
    setIsMenuOpen(false);
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
        console.error("Error during logout:", error);
      });
  };

  const navbarStyles = `text-white p-3 fixed top-0 left-0 right-0 z-[1000] w-full font-inter ${
    isMenuOpen ? "bg-[#070727]" : "bg-[#070727]/20 backdrop-blur-md"
  } shadow-lg transition-colors duration-300 ease-in-out`;

  return (
    <nav className={navbarStyles}>
      <div className="max-w-[70vw] mx-auto flex justify-between items-center">
        <div className="flex items-center gap-10">
          <Link to="/">
            <img src={campusLogo} alt="Campus Logo" className="h-[85px] w-auto" />
          </Link>
          <nav className="flex gap-10 text-[18px]">
            {links.map((link) => (
              <Link
                key={link.href || link.id}
                to={link.href || `#${link.id}`}
                className="text-white text-lg py-3 hover:text-blue-400 transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-5">
          {isLoggedIn ? (
            <>
              <Button onClick={handleToggleProfile} size="lg" className="text-lg bg-transparent hover:bg-[#4c47b4] flex items-center gap-2">
                <Eye size={18} /> Ver Perfil
              </Button>
              <Button onClick={handleLogout} size="lg" className="text-lg bg-[#4c47b4] hover:bg-[#615cc2] flex items-center gap-2">
                <LogOut size={18} /> Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => navigate("/register")} size="lg" className="text-lg bg-transparent hover:bg-[#4c47b4]">
                Registrate
              </Button>
              <Button onClick={() => navigate("/login")} size="lg" className="text-lg bg-[#4c47b4] hover:bg-[#615cc2]">
                Inicia Sesión
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
