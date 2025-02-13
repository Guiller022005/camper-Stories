import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import CampersMainPage from '../views/campersMainPage/CampersMainPage';
import CamperProfile from '../views/camperProfile/CamperProfile';
import Sponsors from '../views/sponsorDashboard/SponsorDashboard';
import CamperLoginPage from '@/views/camperLoginPage/CamperLoginPage';
import Unauthorized from '@/views/Unauthorized/Unauthorized';
import DynamicTitle from './DynamicTitle';
import RegisterPage from '@/views/RegisterPage/RegisterPage';
import ForgetPassword from '@/views/ForgetPasswordPage/forgetPasswordPage';
import NewPassword from '@/views/NewPasswordPage/newPasswordPage';
import PrivacyPolicies from '@/views/PrivacyPolicies/PrivacyPoliciesPage';
import TermsAndConditions from '@/views/termsConditions/termsAndCondicions';
import SponsorLoginPage from '@/views/sponsorLoginPage/SponsorLoginPage';
import SponsorRegister from '@/views/sponsorRegisterPage/RegisterSponsor';
import LoginRoleSelection from '@/views/roleSelection/LoginRoleSelection';
import RegisterRoleSelection from '@/views/roleSelection/RegisterRoleSelection';

/**
 * Componente que resetea la vista y el scroll cuando cambia la ruta.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reinicia la vista asegurando que se renderiza desde el inicio
    document.body.style.display = "none"; 
    setTimeout(() => {
      document.body.style.display = "block";
      window.scrollTo(0, 0);
    }, 0);
  }, [pathname]);

  return null;
};

const AppRouter = () => {
  const location = useLocation();

  return (
    <>
      <DynamicTitle />
      <ScrollToTop /> {/* Se asegura de resetear la vista completamente */}
      <Routes key={location.pathname}>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<CampersMainPage />} />
        <Route path="/login" element={<LoginRoleSelection />} />
        <Route path="/login/camper" element={<CamperLoginPage />} />
        <Route path="/login/sponsor" element={<SponsorLoginPage />} />
        <Route path="/register" element={<RegisterRoleSelection />} />
        <Route path="/register/camper" element={<RegisterPage />} />
        <Route path="/register/sponsor" element={<SponsorRegister />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/campers/newPassword/:token" element={<NewPassword />} />
        <Route path="/campers/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/campers/profile/:id/" element={<CamperProfile isEditable={false} />} />
        <Route path='/politica-de-privacidad'element={<PrivacyPolicies/>}/>
        <Route path='/terminos-y-condiciones' element={<TermsAndConditions/>}/>

        <Route 
          path="/sponsor/:id" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'sponsor']}>
              <Sponsors />
            </ProtectedRoute> 
          } 
        />
        <Route
          path="/campers/profile/:id/edit"
          element={
            <ProtectedRoute allowedRoles={['camper', 'admin', 'sponsor']}>
              <CamperProfile isEditable={true}/>
            </ProtectedRoute> 
          }
        />
      </Routes>
    </>
  );
};

export default AppRouter;
