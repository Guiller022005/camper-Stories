import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Share2, Mail, MapPin, Cake, Trophy } from "lucide-react";

const ProfileHeader = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/sponsors/:id');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const medals = [
    { color: "gold", title: "Patrocinador Gold" },
    { color: "silver", title: "1 Año de Apoyo" },
    { color: "bronze", title: "5 Campers Apoyados" }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-b from-[#07073b] to-[#1d1a4b] rounded-2xl">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-b from-[#07073b] to-[#1d1a4b] rounded-2xl">
        <div className="text-white text-xl">Error: {error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-b from-[#07073b] to-[#1d1a4b] rounded-2xl">
        <div className="text-white text-xl">No se encontraron datos</div>
      </div>
    );
  }

  const fullName = `${data.first_name} ${data.last_name}`;

  return (
    <motion.div
      className="py-32 pb-10 bg-gradient-to-b from-[#07073b] to-[#1d1a4b] rounded-2xl overflow-hidden"
      initial={false}
      animate={{ height: "auto" }}
      transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
      layout
    >
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-4 md:px-8 h-full">
        <div className="flex flex-col md:flex-row items-center gap-8 md:pr-8 h-full">
          {/* Profile Image */}
          <div className="relative group">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/30 ring-2 ring-blue-500/20">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src="/api/placeholder/192/192"
                  alt={`Perfil de ${fullName}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center md:text-left">
              {fullName}
            </h1>
            
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-3 text-gray-200">
                <MapPin className="w-5 h-5" />
                <p>{data.city}</p>
              </div>
              <div className="flex items-center gap-3 text-gray-200">
                <Cake className="w-5 h-5" />
                <p>{`${calculateAge(data.birth_date)} Años`}</p>
              </div>
              <div className="flex items-center gap-3 text-gray-200">
                <Mail className="w-5 h-5" />
                <p>{data.email}</p>
              </div>
            </div>

            {/* Document Info */}
            <div className="mt-4 text-gray-200">
              <p>{`${data.document_type}: ${data.document_number}`}</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button className="flex items-center justify-center gap-3 px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-xl text-white transition-all duration-300 hover:-translate-y-0.5">
                <Mail className="w-5 h-5 opacity-90" />
                Contactar
              </button>
              <button className="flex items-center justify-center gap-3 px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-xl text-white transition-all duration-300 hover:-translate-y-0.5">
                <Share2 className="w-5 h-5 opacity-90" />
                Compartir
              </button>
            </div>
          </div>
        </div>

        {/* Medals Section */}
        <motion.div
          className="mt-8 md:mt-0 w-full md:max-w-lg bg-gray-800/60 backdrop-blur-lg border border-blue-500/20 rounded-2xl p-6"
          layout
        >
          <div className="flex items-center gap-3 text-white mb-4">
            <Trophy className="w-5 h-5" />
            <p className="text-lg font-semibold">Medallas</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {medals.map((medal, index) => (
              <div
                key={index}
                className="group relative flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-xl px-4 py-2 text-white text-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                <Trophy 
                  className="w-4 h-4" 
                  style={{ 
                    color: medal.color === 'gold' ? '#FFD700' : 
                           medal.color === 'silver' ? '#C0C0C0' : 
                           '#CD7F32' 
                  }} 
                />
                <span>{medal.title}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;