import React from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: "Helvetica",
    },
    header: {
        textAlign: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    label: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 5,
    },
    text: {
        fontSize: 12,
        marginBottom: 10,
    },
    footer: {
        marginTop: 30,
        textAlign: "center",
        fontSize: 10,
    },
});

function CertificadoDonacionPDF({ donacionData }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text>Campuslands (Logo aquí)</Text>
                </View>
                <Text style={styles.title}>Certificado de Donación</Text>
                <View style={styles.section}>
                    <Text style={styles.label}>Nombre del Donante:</Text>
                    <Text style={styles.text}>{donacionData.nombreDonante}</Text>
                    <Text style={styles.label}>Fecha de la Donación:</Text>
                    <Text style={styles.text}>{donacionData.fechaDonacion}</Text>
                    <Text style={styles.label}>Monto o Descripción de la Donación:</Text>
                    <Text style={styles.text}>{donacionData.montoDescripcion}</Text>
                    <Text style={styles.label}>Número de Certificado:</Text>
                    <Text style={styles.text}>{donacionData.numeroCertificado}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>
                        En nombre de Campuslands, queremos expresar nuestro más sincero agradecimiento por su generosa
                        donación. Su contribución nos ayudará a continuar con nuestra misión.
                    </Text>
                </View>
                <View style={styles.footer}>
                    <Text>Campuslands - [Año]</Text>
                </View>
            </Page>
        </Document>
    );
}

function DownloadButton({ donacionData }) {
    return (
        <PDFDownloadLink
            className="dlpdfbutton"
            document={<CertificadoDonacionPDF donacionData={donacionData} />}
            fileName={`Certificado_${donacionData.numeroCertificado}.pdf`}
        >
            {({ loading }) => (loading ? "Generando PDF..." : "Descargar Certificado")}
        </PDFDownloadLink>
    );
}

export default DownloadButton;
