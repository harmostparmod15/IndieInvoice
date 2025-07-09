import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus, Users, FileText, FolderOpen, Mail, Phone } from "lucide-react";

export default function Dashboard() {
  const user = useSelector((state) => state.user.user);
  const clients = useSelector((state) => state.clients.clients);
  const navigate = useNavigate();

  if (!user) return <div className="p-10">Loading...</div>;
  let recentClients = 0;

  if (clients) {
    recentClients = clients.slice(0, 3);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome, {user.name} 👋
            </h2>
            <p className="text-sm text-gray-500">
              {user.companyName || "Your Company"}
            </p>
          </div>
          {user.logoUrl && (
            <img
              src={user.logoUrl}
              alt="Company Logo"
              className="h-12 w-12 rounded-full object-cover border border-gray-300"
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/add-client")}
            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl transition-all shadow-sm"
          >
            <Plus size={20} />
            <span className="font-semibold">Add New Client</span>
          </button>

          <button
            onClick={() => navigate("/clients")}
            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl transition-all shadow-sm"
          >
            <Users size={20} />
            <span className="font-semibold">Get All Clients</span>
          </button>

          <button
            onClick={() => navigate("/create-invoice")}
            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl transition-all shadow-sm"
          >
            <FileText size={20} />
            <span className="font-semibold">Create New Invoice</span>
          </button>

          <button
            onClick={() => navigate("/invoices")}
            className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 px-6 py-4 rounded-xl transition-all shadow-sm"
          >
            <FolderOpen size={20} />
            <span className="font-semibold">View All Invoices</span>
          </button>
        </div>

        {/* Recent Clients Preview */}
        {recentClients.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Clients
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentClients.map((client) => (
                <div
                  key={client._id}
                  className="bg-white rounded-xl shadow-sm border p-5 flex gap-4 items-center hover:shadow-md transition"
                >
                  {/* Avatar initials */}
                  <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-lg font-semibold uppercase">
                    {client.name?.charAt(0) || "C"}
                  </div>

                  {/* Client info */}
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-800">
                      {client.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {client.companyName || "No Company"}
                    </p>
                    <div className="mt-1 flex flex-col gap-1 text-sm text-gray-600">
                      {client.email && (
                        <p className="flex items-center gap-2">
                          <Mail size={14} className="text-gray-400" />
                          {client.email}
                        </p>
                      )}
                      {client.phone && (
                        <p className="flex items-center gap-2">
                          <Phone size={14} className="text-gray-400" />
                          {client.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   Plus,
//   Users,
//   FileText,
//   FolderOpen,
// } from "lucide-react";

// export default function Dashboard() {
//   const user = useSelector((state) => state.user.user);
//   const navigate = useNavigate();

//   if (!user) return <div className="p-10">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
//       <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8 space-y-8">

//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-3xl font-bold text-gray-800">
//               Welcome, {user.name} 👋
//             </h2>
//             <p className="text-sm text-gray-500">{user.companyName || "Your Company"}</p>
//           </div>
//           {user.logoUrl && (
//             <img
//               src={user.logoUrl}
//               alt="Company Logo"
//               className="h-12 w-12 rounded-full object-cover border border-gray-300"
//             />
//           )}
//         </div>

//         {/* Buttons Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <button
//             onClick={() => navigate("/add-client")}
//             className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl transition-all shadow-sm"
//           >
//             <Plus size={20} />
//             <span className="font-semibold">Add New Client</span>
//           </button>

//           <button
//             onClick={() => navigate("/clients")}
//             className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl transition-all shadow-sm"
//           >
//             <Users size={20} />
//             <span className="font-semibold">Get All Clients</span>
//           </button>

//           <button
//             onClick={() => navigate("/create-invoice")}
//             className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl transition-all shadow-sm"
//           >
//             <FileText size={20} />
//             <span className="font-semibold">Create New Invoice</span>
//           </button>

//           <button
//             onClick={() => navigate("/invoices")}
//             className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 px-6 py-4 rounded-xl transition-all shadow-sm"
//           >
//             <FolderOpen size={20} />
//             <span className="font-semibold">View All Invoices</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
