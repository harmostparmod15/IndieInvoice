import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
      </Routes>
    </>
  );
}
