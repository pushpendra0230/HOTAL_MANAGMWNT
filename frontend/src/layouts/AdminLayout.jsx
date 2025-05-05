// import React from "react";
// import { Outlet, Link } from "react-router-dom";

// const AdminLayout = () => {
//     return (
//         <div className="flex min-h-screen bg-gray-100 font-sans">
//             {/* Sidebar */}
//             <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 sticky top-0 self-start min-h-screen shadow-lg">
//                 <h2 className="text-2xl font-bold mb-6 tracking-wide">🛠 Admin Panel</h2>
//                 <ul className="space-y-3">
//                     <li>
//                         <Link
//                             to="/admin/dashboard"
//                             className="block p-3 rounded bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
//                         >
//                             📍 Location
//                         </Link>
//                     </li>
//                     <li>
//                         <Link
//                             to="/admin/state"
//                             className="block p-3 rounded bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
//                         >
//                             🗺️ Manage States
//                         </Link>
//                     </li>
//                 </ul>
//             </div>

//             {/* Main Content */}
//             <div className="flex-1 p-8">
//                 <Outlet />
//             </div>
//         </div>
//     );
// };

// export default AdminLayout;







// import React from "react";
// import { Outlet, Link } from "react-router-dom";

// const AdminLayout = () => {
//     return (
//         <div className="flex min-h-screen bg-gray-100 font-sans">
//             {/* Sidebar */}
//             <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 sticky top-0 self-start min-h-screen shadow-lg">
//                 <h2 className="text-2xl font-bold mb-6 tracking-wide">🛠 Admin Panel</h2>
//                 <ul className="space-y-3">
//                     <li>
//                         <Link
//                             to="/admin/dashboard"
//                             className="block p-3 rounded bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
//                         >
//                             📍 Location
//                         </Link>
//                     </li>
//                     <li>
//                         <Link
//                             to="/admin/state"
//                             className="block p-3 rounded bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
//                         >
//                             🗺️ Manage States
//                         </Link>
//                     </li>
//                     <li>
//                         <Link
//                             to="/admin/hotels"
//                             className="block p-3 rounded bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
//                         >
//                             🏨 Manage Hotels
//                         </Link>
//                     </li>
//                 </ul>
//             </div>

//             {/* Main Content */}
//             <div className="flex-1 p-8">
//                 <Outlet />
//             </div>
//         </div>
//     );
// };

// export default AdminLayout;








import React from "react";
import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 sticky top-0 self-start min-h-screen shadow-lg">
                <h2 className="text-2xl font-bold mb-6 tracking-wide">🛠 Admin Panel</h2>
                <ul className="space-y-3">
                    {/* <li>
                        <Link
                            to="/admin/dashboard"
                            className="block p-3 rounded bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
                        >
                            📍 Location
                        </Link>
                    </li> */}
                    <li>
                        <Link
                            to="/admin/state"
                            className="block p-3 rounded bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
                        >
                            🗺️ Manage States
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/dashboard"
                            className="block p-3 rounded bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
                        >
                            📍 Location
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/hotels"
                            className="block p-3 rounded bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
                        >
                            🏨 Manage Hotels
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/rooms"
                            className="block p-3 rounded bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
                        >
                            🛏️ Manage Rooms
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;