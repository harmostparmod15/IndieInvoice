import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { User, Mail, Lock, Building, ImageIcon } from "lucide-react";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    logoUrl: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/user/register",
        formData,
        { withCredentials: true }
      );

      if (res.status !== 201) {
        throw new Error(res.data.error || "Registration failed");
      }

      dispatch(setUser(res.data.data));
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.error || err.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-indigo-600">
            IndieInvoice
          </h1>
          <p className="text-gray-500 mt-1">Create your account</p>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <User className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <Mail className="w-4 h-4 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <Lock className="w-4 h-4 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <Building className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              name="companyName"
              placeholder="Company Name (optional)"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <ImageIcon className="w-4 h-4 text-gray-500" />
            <input
              type="url"
              name="logoUrl"
              placeholder="Logo URL (optional)"
              value={formData.logoUrl}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
