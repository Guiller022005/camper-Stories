import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import CampersMainPage from '../views/campersMainPage/CampersMainPage';
import CamperProfile from '../views/camperProfile/CamperProfile';
import CamperProfileEdit from '../views/camperProfileEdit/CamperProfileEdit';
import Sponsors from '../views/sponsorDashboard/SponsorDashboard';
import LoginPage from '@/views/LoginPage/LoginPage';
import Unauthorized from '@/views/Unauthorized/Unauthorized';
import DynamicTitle from './DynamicTitle';
import RegisterPage from '@/views/RegisterPage/RegisterPage';
import ForgetPassword from '@/views/ForgetPasswordPage/forgetPasswordPage';
import NewPassword from '@/views/NewPasswordPage/newPasswordPage';
import PrivacyPolicies from '@/views/PrivacyPolicies/PrivacyPoliciesPage';
import TermsAndConditions from '@/views/termsConditions/termsAndCondicions';
import SponsorLogin from '@/views/loginSponsor/LoginSponsor';

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
        <Route path="/campers/login" element={<LoginPage />} />
        <Route path="/campers/forgetPassword" element={<ForgetPassword />} />
        <Route path="/campers/newPassword/:token" element={<NewPassword />} />
        <Route path="/campers/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/campers/profile/:id/" element={<CamperProfile />} />
        <Route path='/politica-de-privacidad'element={<PrivacyPolicies/>}/>
        <Route path='/terms-Conditions' element={<TermsAndConditions/>}/>
        <Route path="/sponsors/login" element={<SponsorLogin />} />
        <Route 
          path="/sponsors/" 
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
              <CamperProfileEdit />
            </ProtectedRoute> 
          }
        />
      </Routes>
    </>
  );
};

export default AppRouter;
