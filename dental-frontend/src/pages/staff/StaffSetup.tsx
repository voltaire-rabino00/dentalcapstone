// import React, { useEffect, useState } from "react";
// import { QRCodeSVG } from "qrcode.react"; // Import ito!
// import { useNavigate } from "react-router-dom";

// export const StaffSetup: React.FC = () => {
//   const [user, setUser] = useState<any>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Kunin ang user data na naka-save sa localStorage nung login
//     const userData = localStorage.getItem("user");
//     if (!userData) {
//       navigate("/staff/login");
//     } else {
//       setUser(JSON.parse(userData));
//     }
//   }, [navigate]);

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-6">
//       <h1 className="text-2xl font-bold mb-4">Setup Your QR Code</h1>
//       <p className="text-gray-600 mb-8">
//         This is your unique login code. Please take a screenshot and keep it safe!
//       </p>

//       {/* Dito nagg-generate ang QR base sa ID ng staff */}
//       <div className="p-4 bg-white shadow-lg rounded-lg">
//         <QRCodeSVG value={user._id} size={256} />
//       </div>

//       <button
//         onClick={() => navigate("/staff/dashboard")}
//         className="mt-8 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
//       >
//         Go to Dashboard
//       </button>
//     </div>
//   );
// };