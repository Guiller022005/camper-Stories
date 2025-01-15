// src/data/whiteList.js

export const allowedDocuments = [
  {
    documentType: "1", // Cédula de Ciudadanía
    documentNumber: "1005184796"
  },
  {
    documentType: "1",
    documentNumber: "1005184797"
  },
  {
    documentType: "1",
    documentNumber: "1234567890"
  },
  {
    documentType: "1",
    documentNumber: "1234567890"
  },
  {
    documentType: "2", // Cédula de Extranjería
    documentNumber: "E584621"
  },
  {
    documentType: "3", // Tarjeta de Identidad
    documentNumber: "1007845963"
  }
  // Agregar más documentos según sea necesario
];

// Función auxiliar para verificar si un documento está en la whitelist
export const isDocumentAllowed = (documentType, documentNumber) => {
  return allowedDocuments.some(
    doc => 
      doc.documentType === documentType && 
      doc.documentNumber === documentNumber
  );
};