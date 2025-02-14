import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // ✅ Importar useParams
import { motion } from "framer-motion";
import { Share2, Mail, MapPin, Cake, Trophy, Clock, Users, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"
import { DEFAULT_SPONSOR_DATA } from "@/data/dataDefault";
import { fetchSponsorrById } from "@/services/sponsorService"; 

const SponsorProfile = ({ externalData }) => {
  const { sponsorId } = useParams(); // ✅ Obtener ID de la URL
  const sponsorIdNumber = Number(sponsorId); // ✅ Convertir a número

  const [state, setState] = useState({
    data: externalData || DEFAULT_SPONSOR_DATA,
    loading: !externalData,
    error: null,
  });

  useEffect(() => {
    console.log("Valor de sponsorId:", sponsorId);
    if (!externalData && sponsorIdNumber) {
      const fetchData = async () => {
        try {
          setState({ data: null, loading: true, error: null });
          const sponsorData = await fetchSponsorrById(sponsorIdNumber);
          setState({ data: sponsorData, loading: false, error: null });
        } catch (err) {
          console.error("Error al obtener sponsor:", err);
          setState({ data: null, loading: false, error: err.message });
        }
      };

      fetchData();
    }
  }, [sponsorIdNumber, externalData]);

  const calculateAge = (birthDate) => {
    if (!birthDate) return "N/A";
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const { data, loading, error } = state;

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
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-b from-[#07073b] to-[#1d1a4b] rounded-2xl">
        <div className="text-white text-xl">Error: {error}</div>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </button>
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

  const fullName = `${data.first_name || "Desconocido"} ${data.last_name || ""}`;

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
          <div className="relative group">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/30 ring-2 ring-blue-500/20">
              <img
                src={data.image_url || DEFAULT_SPONSOR_DATA.image_url}
                alt={`Perfil de ${fullName}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center md:text-left">
              {fullName}
            </h1>
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-3 text-gray-200">
                <MapPin className="w-5 h-5" />
                <p>{data.city_name || "Ubicación desconocida"}</p>
              </div>
              <div className="flex items-center gap-3 text-gray-200">
                <Cake className="w-5 h-5" />
                <p>{`${calculateAge(data.birth_date)} Años`}</p>
              </div>
              <div className="flex items-center gap-3 text-gray-200">
                <Mail className="w-5 h-5" />
                <p>{data.email || "Correo no disponible"}</p>
              </div>
            </div>

            <div className="mt-4 text-gray-200">
              <p>{`${data.document_type || "Documento"}: ${data.document_number || "No disponible"}`}</p>
            </div>
          </div>
        </div>

        <Card className="mt-8 md:mt-0 w-full md:max-w-lg bg-gray-800/60 text-white backdrop-blur-lg border border-blue-500/20 rounded-2xl p-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              Patrocinio
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col text-center items-center p-4 bg-[#232450] border border-blue-500/20 rounded-lg">
                <Users className="w-8 h-8 text-purple-400 mb-2" />
                <span className="text-2xl font-bold text-purple-400">5</span>
                <span className="text-sm text-gray-300">Campers Apoyados</span>
              </div>

              <div className="flex flex-col text-center items-center p-4 bg-[#232450] border border-blue-500/20 rounded-lg">
                <Clock className="w-8 h-8 text-blue-400 mb-2" />
                <span className="text-2xl font-bold text-blue-400">12</span>
                <span className="text-sm text-gray-300">Meses Patrocinando</span>
              </div>

              <div className="flex flex-col items-center p-4 bg-[#232450] border border-blue-500/20 rounded-lg">
                <DollarSign className="w-8 h-8 text-green-400 mb-2" />
                <span className="text-2xl font-bold text-green-400">$2,400</span>
                <span className="text-sm text-gray-300">Total Aportado</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default SponsorProfile;
