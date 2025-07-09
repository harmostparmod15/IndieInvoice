import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateInvoice = () => {
  const navigate = useNavigate();
  const clients = useSelector((state) => state.clients.clients);
  const [form, setForm] = useState({
    clientId: "",
    services: [{ name: "", quantity: "", price: "" }],

    taxRate: 18,
    discount: { type: "flat", value: "" },
    dueDate: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState(null);

  const handleServiceChange = (index, field, value) => {
    const updated = [...form.services];
    updated[index][field] =
      field === "price" || field === "quantity" ? Number(value) : value;
    setForm({ ...form, services: updated });
  };

  const handleAddService = () => {
    setForm({
      ...form,
      services: [...form.services, { name: "", quantity: 1, price: 0 }],
    });
  };

  const handleRemoveService = (index) => {
    const updated = form.services.filter((_, i) => i !== index);
    setForm({ ...form, services: updated });
  };

  const calculateSummary = () => {
    const subtotal = form.services.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    const discountedSubtotal =
      form.discount.type === "percent"
        ? subtotal - (subtotal * form.discount.value) / 100
        : subtotal - form.discount.value;
    const taxAmount = (discountedSubtotal * form.taxRate) / 100;
    const total = Math.round(discountedSubtotal + taxAmount);

    setSummary({ subtotal, discountedSubtotal, taxAmount, total });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    calculateSummary();

    try {
      const res = await axios.post(
        "http://localhost:4000/api/invoice/create",
        {
          clientId: form.clientId,
          services: form.services,
          taxRate: form.taxRate,
          discount: form.discount,
          dueDate: form.dueDate,
          notes: form.notes,
        },
        { withCredentials: true }
      );

      navigate("/invoices");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        🧾 Create New Invoice
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white rounded-2xl p-6 shadow-md"
      >
        {/* Client Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">
            Client Details
          </h3>
          <select
            required
            value={form.clientId}
            onChange={(e) => setForm({ ...form, clientId: e.target.value })}
            className="w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Choose Client --</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name} ({client.companyName})
              </option>
            ))}
          </select>
        </div>

        {/* Services Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">Services</h3>
          {form.services.map((service, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-3"
            >
              <input
                type="text"
                placeholder="Service name"
                value={service.name}
                onChange={(e) =>
                  handleServiceChange(index, "name", e.target.value)
                }
                className="border rounded-md p-2 col-span-2"
                required
              />
              <input
                type="text"
                placeholder="Qty"
                value={service.quantity}
                onChange={(e) =>
                  handleServiceChange(index, "quantity", e.target.value)
                }
                className="border rounded-md p-2"
                required
              />

              <input
                type="text"
                placeholder="Price"
                value={service.price}
                onChange={(e) =>
                  handleServiceChange(index, "price", e.target.value)
                }
                className="border rounded-md p-2"
                required
              />

              {form.services.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveService(index)}
                  className="text-red-500 text-sm mt-1"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddService}
            className="mt-2 text-blue-600 hover:underline text-sm"
          >
            + Add another service
          </button>
        </div>

        {/* Tax & Discount */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Tax</h3>
            <input
              type="number"
              value={form.taxRate}
              onChange={(e) =>
                setForm({ ...form, taxRate: Number(e.target.value) })
              }
              className="w-full border rounded-md p-2"
              placeholder="Tax % (e.g. 18)"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">
              Discount
            </h3>
            <div className="flex gap-2">
              <select
                value={form.discount.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    discount: { ...form.discount, type: e.target.value },
                  })
                }
                className="border rounded-md p-2 w-1/3"
              >
                <option value="flat">₹</option>
                <option value="percent">%</option>
              </select>
              <input
                type="number"
                value={form.discount.value}
                onChange={(e) =>
                  setForm({
                    ...form,
                    discount: {
                      ...form.discount,
                      value: Number(e.target.value),
                    },
                  })
                }
                className="border rounded-md p-2 w-2/3"
                placeholder="Discount"
              />
            </div>
          </div>
        </div>

        {/* Due Date & Notes */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">
              Due Date
            </h3>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Notes</h3>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full border rounded-md p-2 h-24"
              placeholder="Additional invoice notes..."
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full mt-4"
        >
          {loading ? "Creating Invoice..." : "Create Invoice"}
        </button>
      </form>

      {/* Summary */}
      {summary && (
        <div className="mt-8 bg-gray-50 border rounded-lg p-6 text-gray-800">
          <h3 className="text-lg font-semibold mb-4">Invoice Summary</h3>
          <div className="space-y-1">
            <p>Subtotal: ₹{summary.subtotal}</p>
            <p>
              Discount (
              {form.discount.type === "percent"
                ? `${form.discount.value}%`
                : `₹${form.discount.value}`}
              ) → ₹{summary.discountedSubtotal}
            </p>
            <p>
              GST ({form.taxRate}%): ₹{summary.taxAmount}
            </p>
            <p className="font-bold text-lg mt-2">Total: ₹{summary.total}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateInvoice;
