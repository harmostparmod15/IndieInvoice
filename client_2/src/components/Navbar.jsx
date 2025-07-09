import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setUser } from "../store/userSlice"; // adjust path as needed
import UserAvatar from "./UserAvatar";
import axios from "axios";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/auth/user/logout",
        {},
        { withCredentials: true }
      );

      dispatch(setUser(null));
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <Link to="/dashboard" className="text-xl font-bold">
        IndieInvoice
      </Link>
      <UserAvatar />
      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/add-client" className="hover:underline">
          Add Client
        </Link>
        <Link to="/clients" className="hover:underline">
          Clients
        </Link>
        <button onClick={handleLogout} className="hover:underline">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
