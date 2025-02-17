import React from "react";
import DownloadButton from "@/pdfCertificate/CertificadoDonacion";

const MisDonaciones = () => {
  // Datos de ejemplo (reemplazar con datos reales desde una API)
  const donaciones = [
    { id: 1, monto: 100, fecha: "2024-02-10", camper: "Juan Pérez" },
    { id: 2, monto: 50, fecha: "2024-01-15", camper: "María Gómez" },
    { id: 3, monto: 75, fecha: "2023-12-20", camper: "Carlos Ramírez" },
  ];

  // Simulación de descarga de certificado
  const obtenerCertificado = (id) => {
    alert(`Descargando certificado para la donación #${id}`);
  };

  const donacionData = {
    nombreDonante: "Juan Pérez",
    fechaDonacion: "2023-10-01",
    montoDescripcion: "$1,000",
    numeroCertificado: "CERT-12345",
};

  return (
    <div className="max-w-4xl mx-auto p-6 py-10 my-10 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Mis Donaciones</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-800  text-left">
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
                    <DownloadButton donacionData={donacionData} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MisDonaciones;
