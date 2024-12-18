import { Box, useColorModeValue, Flex } from "@chakra-ui/react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ClientStore from "./client/pages/ClientStore";
import CreatePage from "./admin/pages/CreatePage";
import Navbar from "./components/Navbar";
import AdminStore from "./admin/pages/AdminStore";
import HomePage from "./client/pages/HomePage";
import LoginPage from "./client/pages/LoginPage";
import RegisterPage from "./client/pages/RegisterPage";
import { useState, useEffect } from "react";
import Dashboard from "./admin/pages/Dashboard";
import CreateCustomItemsPage from "./admin/pages/CreateCustomItems";

import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import AdminSignup from "./Auth/Admin/SignupAdmin";
import AdminLogin from "./Auth/Admin/LoginAdmin";
import MenuPage from "./client/pages/MenuPage";
import OffersPage from "./client/pages/OffersPage";
import PackagePage from "./client/pages/PackagePage";

import { useAuthContext } from "./hooks/useAuthContext";
import ContactUsForm from "./client/pages/ContactsPage";
import GalleryPage from "./client/pages/GalleryPage";
import OrderForm from "./client/pages/AddEvent";
import AdminNav from "./admin/pages/dashboard_pages/AdminNav";

// Import ScreenContainer
import ScreenContainer from "./admin/pages/dashboard_pages/ScreenContainer";

function App() {
  const { user, setUser } = useAuthContext(); // Assuming user context is set up
  const [role, setRole] = useState(null);
  const [adminScreen, setAdminScreen] = useState("home"); // State to manage admin screens

  const location = useLocation(); // Get the current route

  useEffect(() => {
    // You can handle authentication and role-based logic here.
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setRole(storedUser.admin?.role || null);
    }
  }, []);

  const checkAdminRoute = () => {
    return location.pathname === "/admin/dashboard";
  };

  return (
    <Flex>
      {checkAdminRoute() && (
        <Box

        >
          <AdminNav onNavChange={setAdminScreen} />
        </Box>
      )}

      {/* Main content */}
      <Box
        ml={checkAdminRoute() ? "10%" : "0"} // Adjust layout when admin nav is shown
        width="100%"

      >
        {/* Existing Navbar for general client pages */}
        <Navbar role={role} />

        {/* Routes for dynamic content */}
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/store" element={<ClientStore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/packages" element={<PackagePage />} />
          <Route path="/contactus" element={<ContactUsForm />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/addevent" element={<OrderForm />} />

          {/* Admin routes */}
          <Route
            path="/admin/login"
            element={role !== "admin" ? <AdminLogin setRole={setRole} /> : <Navigate to="/admin/dashboard" />}
          />
          <Route
            path="/admin/signup"
            element={role !== "admin" ? <AdminSignup /> : <Navigate to="/admin/dashboard" />}
          />
          <Route
            path="/admin/create"
            element={role === "admin" ? <CreatePage /> : <Navigate to="/admin/login" />}
          />
          <Route
            path="/adminstore"
            element={role === "admin" ? <AdminStore /> : <Navigate to="/admin/login" />}
          />
          <Route
            path="/admin/dashboard"
            element={role === "admin" ? <ScreenContainer /> : <Navigate to="/admin/login" />}
          />
          <Route
            path="/admin/createcustom"
            element={role === "admin" ? <CreateCustomItemsPage /> : <Navigate to="/admin/login" />}
          />
        </Routes>

        {/* Dynamic Admin Screens */}
        {checkAdminRoute() && (
          <Box p={4}>
            <ScreenContainer adminScreen={adminScreen} />
          </Box>
        )}
      </Box>
    </Flex>
  );
}

export default App;
