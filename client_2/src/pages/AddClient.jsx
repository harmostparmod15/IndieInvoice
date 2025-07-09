// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AddClient = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     companyName: "",
//     address: "",
//     gstNumber: "",
//     notes: ""
//   });

//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     try {
//       const { data } = await axios.post(
//         "http://localhost:4000/api/auth/client/register",

//         formData,
//         {
//           withCredentials: true, // for cookies (JWT)
//         }
//       );

//       setSuccess("Client added successfully!");
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         companyName: "",
//         address: "",
//         gstNumber: "",
//         notes: ""
//       });

//       setTimeout(() => navigate("/dashboard"), 1500);

//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 border shadow rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Add New Client</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       {success && <p className="text-green-600">{success}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Client Name" required className="input" />
//         <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Client Email" className="input" />
//         <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="input" />
//         <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" className="input" />
//         <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="input" />
//         <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} placeholder="GST Number" className="input" />
//         <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes" className="input" />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//           Add Client
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddClient;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  FileText,
  StickyNote,
} from "lucide-react";

const AddClient = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    address: "",
    gstNumber: "",
    notes: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/client/register",
        formData,
        { withCredentials: true }
      );

      setSuccess("Client added successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        companyName: "",
        address: "",
        gstNumber: "",
        notes: "",
      });

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-indigo-600 text-center">
          Add New Client
        </h2>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        {success && <p className="text-green-600 mb-4 text-sm">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            icon={<User size={16} />}
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Client Name"
            required
          />
          <InputField
            icon={<Mail size={16} />}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Client Email"
          />
          <InputField
            icon={<Phone size={16} />}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          <InputField
            icon={<Building size={16} />}
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Company Name"
          />
          <InputField
            icon={<MapPin size={16} />}
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          />
          <InputField
            icon={<FileText size={16} />}
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
            placeholder="GST Number"
          />

          {/* Notes textarea with proper icon spacing */}
          <div className="relative">
            <div className="absolute top-3 left-3 text-gray-500">
              <StickyNote size={16} />
            </div>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Notes"
              rows="3"
              className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none resize-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Add Client
          </button>
        </form>
      </div>
    </div>
  );
};

// ✅ Reusable InputField with icon and proper spacing
const InputField = ({
  icon,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
      {icon}
    </div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
    />
  </div>
);

export default AddClient;
