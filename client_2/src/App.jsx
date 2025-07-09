import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddClient from "./pages/AddClient";
import ClientList from "./pages/ClientList";
import UpdateProfile from "./pages/UpdateProfile";

export default function App() {
  const location = useLocation();
  const user = useSelector((state) => state.user.user);

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-client"
          element={user ? <AddClient /> : <Navigate to="/login" />}
        />
        <Route
          path="/clients"
          element={user ? <ClientList /> : <Navigate to="/login" />}
        />

        <Route
          path="/update-profile"
          element={user ? <UpdateProfile /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}
