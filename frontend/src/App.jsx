import { Box, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
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

function App() {
  const { user, setUser } = useAuthContext(); // Assuming user context is set up
  const [role, setRole] = useState(null);

  // UseEffect to load role from localStorage once when the app loads
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setRole(storedUser.admin?.role || null);
    }
  }, []);

  // Check if the user is an admin
  const checkAdminRole = () => {
    return role === "admin";
  };

  return (
    <Box minH={"100vh"} bg={useColorModeValue("#FFDEA7", "gray.900")}  position="sticky">
      <Navbar role={role} />
      <Routes>
        {/* For Client */}
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/store" element={ <ClientStore /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/menu" element={ <MenuPage /> } />
        <Route path="/offers" element={ <OffersPage /> } />
        <Route path="/packages" element={ <PackagePage /> } />
        <Route path="/contactus" element={ <ContactUsForm /> } />
        <Route path="/gallery" element={ <GalleryPage /> } />


        
        {/* For Admin */}
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
          element={checkAdminRole() ? <CreatePage /> : <Navigate to="/admin/login" />} 
        />
        <Route 
          path="/adminstore" 
          element={checkAdminRole() ? <AdminStore /> : <Navigate to="/admin/login" />} 
        />
        <Route 
          path="/admin/dashboard" 
          element={checkAdminRole() ? <Dashboard /> : <Navigate to="/admin/login" />} 
        />
        <Route 
          path="/admin/createcustom" 
          element={checkAdminRole() ? <CreateCustomItemsPage /> : <Navigate to="/admin/login" />} 
        />
      </Routes>
    </Box>
  );
}

export default App;
