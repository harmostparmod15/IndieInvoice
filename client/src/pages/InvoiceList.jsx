import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/api/invoice/get-all", {
        withCredentials: true,
      });
      setInvoices(res.data.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch invoices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        📄 All Invoices ({invoices.length})
      </h2>

      {loading && (
        <>
          <Spinner size={8} />
        </>
      )}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && invoices.length === 0 && (
        <p className="text-gray-600">No invoices found.</p>
      )}

      {!loading && invoices.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {invoices.map((invoice) => (
            <Link
              key={invoice._id}
              to={`/invoices/${invoice._id}`}
              className="block bg-white shadow-sm hover:shadow-md transition rounded-lg p-5 border"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Invoice #{invoice.invoiceNumber}
                  </h3>
                  <p className="text-sm text-gray-600">
                    To: {invoice.clientId?.name || "Client"} • ₹
                    {invoice.totalAmount}
                  </p>
                  <p className="text-xs text-gray-500">
                    Date: {new Date(invoice.invoiceDate).toLocaleDateString()} |
                    Due:{" "}
                    {invoice.dueDate
                      ? new Date(invoice.dueDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    invoice.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : invoice.status === "Overdue"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {invoice.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
