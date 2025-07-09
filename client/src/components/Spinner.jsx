import React from "react";

const Spinner = ({ size = 8, color = "border-t-blue-600" }) => {
  const sizeMap = {
    4: "h-4 w-4",
    6: "h-6 w-6",
    8: "h-8 w-8",
    10: "h-10 w-10",
    12: "h-12 w-12",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-4 border-gray-200 ${color} ${
          sizeMap[size] || "h-8 w-8"
        }`}
      />
    </div>
  );
};

export default Spinner;
