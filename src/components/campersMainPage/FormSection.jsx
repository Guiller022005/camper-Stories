import React from "react";
import "./styles/FormSection.css";
import DonationForm from "./DonationForm";

const FormSection = () => {
    return (
        <section className="form-section">
            <div className="content">
                <div className="section-titles">
                    <h3 className="como">como</h3>
                    <h2 className="aportar">APORTAR?</h2>
                </div>
                <div className="form-container">
                    <DonationForm />
                </div>
                <div className="bot-text">
                    <p>Tu donación nos permite seguir <span>transformando vidas</span> y fortaleciendo el talento en tecnología.</p>
                    <p><span>¡Gracias por contribuir a un futuro más prometedor!</span></p>
                </div>
            </div>
        </section>
    );
}

export default FormSection;