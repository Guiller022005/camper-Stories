import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // ✅ Importar useParams
import DownloadButton from "@/pdfCertificate/CertificadoDonacion";
import { fetchSponsorShipsBySponsorId } from "@/services/sponsorService"; // Importar la función del servicio

const MisDonaciones = () => {
  const { sponsorId } = useParams();
  const [donaciones, setDonaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDonaciones = async () => {
      try {
        setLoading(true);
        const data = await fetchSponsorShipsBySponsorId(sponsorId);
        setDonaciones(data);
      } catch (err) {
        setError("Error al cargar las donaciones.");
      } finally {
        setLoading(false);
      }
    };

    if (sponsorId) {
      cargarDonaciones();
    }
  }, [sponsorId]);

  return (
    <div className="max-w-4xl mx-auto p-6 py-10 my-10 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Mis Donaciones</h2>

      {loading && <p className="text-gray-600">Cargando donaciones...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && donaciones.length === 0 && (
        <p className="text-gray-600">No hay donaciones registradas.</p>
      )}

      {!loading && donaciones.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-800 text-left">
                <th className="p-3 border">Monto (USD)</th>
                <th className="p-3 border">Fecha</th>
                <th className="p-3 border">Camper</th>
                <th className="p-3 border">Acción</th>
              </tr>
            </thead>
            <tbody>
              {donaciones.map((donacion) => (
                <tr key={donacion.id} className="text-gray-700">
                  <td className="p-3 border">${donacion.monto}</td>
                  <td className="p-3 border">{donacion.fecha}</td>
                  <td className="p-3 border">{donacion.camper}</td>
                  <td className="p-3 border">
                    <DownloadButton donacionData={{ 
                      nombreDonante: "Nombre del Sponsor", // Puedes obtenerlo de otro endpoint
                      fechaDonacion: donacion.fecha,
                      montoDescripcion: `$${donacion.monto}`,
                      numeroCertificado: `CERT-${donacion.id}`,
                    }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MisDonaciones;

