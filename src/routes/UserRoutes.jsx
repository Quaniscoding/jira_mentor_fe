/*
Routes
*/

import { Routes, Route } from "react-router-dom";
import DefaultLayout from './../layout/DefaultLayout.jsx';
// import RegisterPage from './../pages/register_page/RegisterPage';
import HomePage from '../pages/home_page/HomePage.jsx';
import NotFoundPage from '../pages/not_found_page/NotFoundPage.jsx';
import SignInSide from '../pages/sign-in-side/SignInSide.jsx';
import Dashboard from './../components/Dashboard/Dashboard.jsx';
import ProjectDetails from './../components/Project Details/ProjectDetails';
import SignUpSide from "../pages/sign-up-side/SignUpSide.jsx";
const UserRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route element={<DefaultLayout />}>
      <Route path="/signin" element={<SignInSide />} />
      <Route path="/signup" element={<SignUpSide />} />
      <Route path="/" element={<HomePage />}>
        {/* Nested routes */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projectDetails/:id" element={<ProjectDetails />} />
      </Route>
    </Route>
    {/* Fallback route */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default UserRoutes;
