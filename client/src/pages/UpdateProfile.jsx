import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Building2, ImageIcon, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

const UpdateProfile = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    logoUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        companyName: user.companyName || "",
        logoUrl: user.logoUrl || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({});

    try {
      const res = await axios.patch(
        "http://localhost:4000/api/auth/user/update",
        formData,
        { withCredentials: true }
      );

      dispatch(setUser(res.data.data));

      setMsg({ type: "success", text: "Profile updated successfully!" });
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setMsg({
        type: "error",
        text: err.response?.data?.error || "Update failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Update Profile
      </h2>

      {msg.text && (
        <p
          className={`mb-4 text-center ${
            msg.type === "success" ? "text-green-600" : "text-red-500"
          }`}
        >
          {msg.text}
        </p>
      )}

      <form
        onSubmit={handleUpdate}
        className="space-y-5 bg-white p-6 rounded-xl shadow-md"
      >
        {/* Name */}
        <div className="relative">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="input pl-10"
          />
          <User size={18} className="absolute top-3.5 left-3 text-gray-400" />
        </div>

        {/* Company Name */}
        <div className="relative">
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Company Name"
            className="input pl-10"
          />
          <Building2
            size={18}
            className="absolute top-3.5 left-3 text-gray-400"
          />
        </div>

        {/* Logo URL */}
        <div className="relative">
          <input
            type="url"
            name="logoUrl"
            value={formData.logoUrl}
            onChange={handleChange}
            placeholder="Logo URL"
            className="input pl-10"
          />
          <ImageIcon
            size={18}
            className="absolute top-3.5 left-3 text-gray-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full flex justify-center"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
