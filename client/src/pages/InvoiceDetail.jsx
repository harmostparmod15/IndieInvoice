import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";

const InvoiceDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/invoice/${id}`, {
          withCredentials: true,
        });
        setInvoice(res.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch invoice.");
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  const handleViewPDF = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/invoice/${id}/pdf`,
        {
          responseType: "blob", // important to treat PDF as binary
          withCredentials: true,
        }
      );

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      //   link.download = `invoice-${invoice.invoiceNumber}.pdf`;
      link.target = "_blank";

      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error", err);
      alert("Failed to download PDF.");
    }
  };

  const handleSendEmail = async () => {
    // Optional: call backend to email invoice
    alert("📧 Email functionality coming soon.");
  };

  if (loading) return <Spinner size={8} />;
  if (error) return <p className="text-red-500 p-10">{error}</p>;

  const {
    invoiceNumber,
    clientId,
    services,
    discount,
    taxRate,
    totalAmount,
    invoiceDate,
    dueDate,
    notes,
    status,
  } = invoice;

  const subtotal = services.reduce((acc, s) => acc + s.quantity * s.price, 0);
  const discountValue =
    discount.type === "percent"
      ? (subtotal * discount.value) / 100
      : discount.value;
  const discountedSubtotal = subtotal - discountValue;
  const taxAmount = (discountedSubtotal * taxRate) / 100;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Invoice #{invoiceNumber}
        </h2>
        <p className="text-sm text-gray-600">
          Status:{" "}
          <span
            className={`font-semibold ${
              status === "Paid"
                ? "text-green-600"
                : status === "Overdue"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {status}
          </span>
        </p>
        <p className="text-sm text-gray-600">
          Date: {new Date(invoiceDate).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600">
          Due: {new Date(dueDate).toLocaleDateString()}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-1">
          To: {clientId?.name}
        </h3>
        <p className="text-sm text-gray-600">{clientId?.companyName}</p>
        <p className="text-sm text-gray-600">{clientId?.email}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Services</h3>
        <ul className="divide-y divide-gray-200 bg-gray-50 p-4 rounded-md">
          {services.map((s, i) => (
            <li
              key={i}
              className="py-2 text-sm text-gray-700 flex justify-between"
            >
              <span>{s.name}</span>
              <span>
                {s.quantity} × ₹{s.price} = ₹{s.quantity * s.price}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-1 text-sm text-gray-700">
        <p>Subtotal: ₹{subtotal}</p>
        <p>
          Discount (
          {discount.type === "percent"
            ? `${discount.value}%`
            : `₹${discount.value}`}
          ): -₹
          {discountValue}
        </p>
        <p>
          Tax ({taxRate}%): ₹{Math.round(taxAmount)}
        </p>
        <p className="font-bold text-lg text-gray-900 mt-2">
          Total: ₹{Math.round(totalAmount)}
        </p>
      </div>

      {notes && (
        <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-yellow-800">
          Notes: {notes}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleViewPDF}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          🧾 View PDF
        </button>
        <button
          onClick={handleSendEmail}
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
        >
          📧 Send Email
        </button>
      </div>
    </div>
  );
};

export default InvoiceDetail;
