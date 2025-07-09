// src/pages/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Hero()  {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-blue-700 mb-4">
        Welcome to IndieInvoice
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-6">
        Effortlessly manage your clients and invoices in one place.
      </p>
      <div className="space-x-4">
        <Link
          to="/register"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg shadow hover:bg-blue-50 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
};
