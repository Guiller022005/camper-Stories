import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import CampersMainPage from '../views/campersMainPage/CampersMainPage';
import CamperProfile from '../views/camperProfile/CamperProfile';
import CamperProfileEdit from '../views/camperProfileEdit/CamperProfileEdit';
import Sponsors from '../views/sponsorDashboard/SponsorDashboard';
import LoginPage from '@/views/LoginPage/LoginPage';
import Unauthorized from '@/views/Unauthorized/Unauthorized';
import DynamicTitle from './DynamicTitle'; // Importa el componente
import RegisterPage from '@/views/RegisterPage/RegisterPage';
import ForgetPassword from '@/views/ForgetPasswordPage/forgetPasswordPage';
import NewPassword from '@/views/NewPasswordPage/newPasswordPage';
import PrivacyPolicies from '@/views/PrivacyPolicies/PrivacyPoliciesPage';
import TermsAndConditions from '@/views/termsConditions/termsAndCondicions';

const AppRouter = () => {
  return (
    <>
      <DynamicTitle />
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<CampersMainPage />} />
        <Route path="/campers/login" element={<LoginPage />} />
        <Route path="/campers/forgetPassword" element={<ForgetPassword />} />
        <Route path="/campers/newPassword/:token" element={<NewPassword />} />
        <Route path="/campers/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/campers/profile/:id/" element={<CamperProfile />} />
        <Route path="/sponsors/" element={<Sponsors />} />
        <Route path='/politica-de-privacidad'element={<PrivacyPolicies/>}/>
        <Route path='/terms-Conditions' element={<TermsAndConditions/>}/>

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