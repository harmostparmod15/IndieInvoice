import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Mail,
  Phone,
  Building2,
  MapPin,
  FileText,
  StickyNote,
} from "lucide-react";
import Spinner from "../components/Spinner";

import { setClients } from "../store/clientSlice";
import { useDispatch, useSelector } from "react-redux";

const ClientList = () => {
  // const [clients, setClients] = useState([]);
  const clients = useSelector((store) => store.clients.clients);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/client/get-clients",
          {
            withCredentials: true,
          }
        );
        dispatch(setClients(res.data.data)); // ✅ sets Redux store
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load clients");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Your Clients{" "}
        <span className="text-blue-600">
          ({loading ? "..." : clients?.length || 0})
        </span>
      </h2>

      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500 text-lg">{error}</p>
      ) : clients.length === 0 ? (
        <p className="text-gray-500 text-lg">No clients found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div
              key={client._id}
              className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold uppercase">
                  {client.name?.charAt(0) || "C"}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {client.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {client.companyName || "No Company"}
                  </p>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-gray-700">
                {client.email && (
                  <li className="flex items-center gap-2">
                    <Mail size={16} className="text-blue-500" /> {client.email}
                  </li>
                )}
                {client.phone && (
                  <li className="flex items-center gap-2">
                    <Phone size={16} className="text-green-600" />{" "}
                    {client.phone}
                  </li>
                )}
                {client.address && (
                  <li className="flex items-center gap-2">
                    <MapPin size={16} className="text-pink-500" />{" "}
                    {client.address}
                  </li>
                )}
                {client.gstNumber && (
                  <li className="flex items-center gap-2">
                    <FileText size={16} className="text-yellow-600" /> GST:{" "}
                    {client.gstNumber}
                  </li>
                )}
                {client.notes && (
                  <li className="flex items-center gap-2">
                    <StickyNote size={16} className="text-gray-400" />{" "}
                    {client.notes}
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientList;
