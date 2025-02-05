import React from 'react';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from './VIdeoPlayer';
import AboutMeModal from '../camperProfileEdit/modals/AboutMeModal';

const AboutMe = ({ isEditable, videoUrl, about, camperInfoInitialData, onUpdate }) => {
  const navigate = useNavigate();

  const handleSponsorClick = () => {
    if (location.pathname === '/') {
      // Si ya estás en la página de inicio, realiza el desplazamiento
      const section = document.getElementById('sponsro');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Si no estás en la página de inicio, navega y luego desplázate
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById('sponsro');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Tiempo para asegurar que la página cargue
    }
  };

  return (
    <section className="py-8 w-full">
      <div className="grid xl:grid-cols-1 gap-8 w-full max-w-[1400px] mx-auto xl:grid-cols-[minmax(300px,_60%)_minmax(250px,_40%)]">
        <div className="w-full min-w-[300px] max-w-[800px]">
          <VideoPlayer videoUrl={videoUrl} title="Historia Camper" />
        </div>
        <div className="flex flex-col gap-4 p-4 min-w-[250px] max-w-full flex-1 xl:p-0 xl:max-w-full xl:max-h-none">
          <h2 className="font-poppins font-bold text-white text-[1.5rem] mb-4">
            Acerca de
            {isEditable && (
              <AboutMeModal
                initialData={camperInfoInitialData}
                onUpdate={onUpdate}
              />
            )}
          </h2>
          {/* Trae la informacion SI tiene de About Me */}
          <p className="text-white m-0">{about}</p>
          {/* Si no es editable carga el boton de patrocinar */}
          {!isEditable && (
            <button
              className="self-start bg-[#f7b500] text-black font-poppins font-semibold uppercase rounded-[20px] px-8 py-3 border-none cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#f0a500]"
              onClick={handleSponsorClick}
            >
              Patrocinar
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;