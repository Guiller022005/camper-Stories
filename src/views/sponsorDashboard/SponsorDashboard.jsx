import React, { lazy, Suspense } from 'react';

const NavbarProfile = lazy(() => import("../../components/navbar/NavbarProfile"));
const Footer = lazy(() => import('../../components/footer/Footer'));

const SponsorDashboard = () => {
    // Aquí puedes definir el estado y la lógica que necesites

    return (
        <div className="sponsorDashboardView flex flex-col relative">
            <Suspense fallback={<div>Cargando...</div>}>
                <NavbarProfile />
            </Suspense>
            <div className="mainContent flex flex-col gap-4">
                <p>hola , soy paco , como estas?</p>
            </div>
            <Suspense fallback={<div>Cargando...</div>}>
                <Footer />
            </Suspense>
        </div>
    );
};

export default SponsorDashboard;