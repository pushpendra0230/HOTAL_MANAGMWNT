// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import BASE_URL from "../../utils/api";

// const BookingPanel = () => {
//     const [activeTab, setActiveTab] = useState("pending");
//     const [bookings, setBookings] = useState([]);
//     const [selectedBooking, setSelectedBooking] = useState(null);

//     const token = localStorage.getItem("token");
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };

//     const fetchBookings = async () => {
//         try {
//             const response = await axios.get(`${BASE_URL}/api/bookings/getAll`, config);
//             setBookings(response.data.data);
//         } catch (error) {
//             console.error("Error fetching bookings:", error);
//         }
//     };

//     useEffect(() => {
//         fetchBookings();
//     }, []);

//     const handleStatusChange = async (id, newStatus) => {
//         try {
//             await axios.patch(
//                 `${BASE_URL}/api/bookings/update/${id}`,
//                 { status: newStatus },
//                 config
//             );
//             fetchBookings(); // Refresh the list of bookings after updating
//         } catch (error) {
//             console.error("Failed to update booking status:", error);
//         }
//     };

//     const getStatusBadge = (status) => {
//         const base = "px-3 py-1 rounded-full text-sm font-medium";
//         if (status === "Approved") return `${base} bg-green-100 text-green-700`;
//         if (status === "Rejected") return `${base} bg-red-100 text-red-700`;
//         return `${base} bg-yellow-100 text-yellow-700`;
//     };

//     const filteredBookings = bookings.filter((b) => {
//         const tabStatusMap = {
//             pending: "Pending",
//             approved: "Approved",
//             rejected: "Rejected", // added rejected status
//         };
//         return b.status === tabStatusMap[activeTab];
//     });

//     return (
//         <div className="min-h-screen bg-gray-100 py-10 px-4">
//             <div className="max-w-5xl mx-auto">
//                 <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Admin Booking Panel</h1>

//                 {/* Tabs */}
//                 <div className="flex justify-center gap-4 mb-6">
//                     <button
//                         className={`px-4 py-2 rounded-lg font-medium ${activeTab === "pending"
//                             ? "bg-blue-600 text-white"
//                             : "bg-white text-gray-700 border border-gray-300"
//                             } transition`}
//                         onClick={() => setActiveTab("pending")}
//                     >
//                         Pending Requests
//                     </button>
//                     <button
//                         className={`px-4 py-2 rounded-lg font-medium ${activeTab === "approved"
//                             ? "bg-blue-600 text-white"
//                             : "bg-white text-gray-700 border border-gray-300"
//                             } transition`}
//                         onClick={() => setActiveTab("approved")}
//                     >
//                         Approved Requests
//                     </button>
//                     <button
//                         className={`px-4 py-2 rounded-lg font-medium ${activeTab === "rejected"
//                             ? "bg-blue-600 text-white"
//                             : "bg-white text-gray-700 border border-gray-300"
//                             } transition`}
//                         onClick={() => setActiveTab("rejected")}
//                     >
//                         Rejected Requests
//                     </button>
//                 </div>

//                 {/* Booking Cards */}
//                 <div className="grid grid-cols-1 gap-6">
//                     {filteredBookings.length > 0 ? (
//                         filteredBookings.map((booking) => (
//                             <div
//                                 key={booking._id}
//                                 className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row md:items-center justify-between hover:shadow-lg transition-shadow duration-300"
//                             >
//                                 <div>
//                                     <h2 className="text-lg font-semibold text-gray-800">{booking.userName}</h2>
//                                     <p className="text-gray-500 text-sm">Phone: {booking.userPhone}</p>
//                                     <p className="text-gray-500 text-sm">Guests: {booking.numberOfGuests}</p>
//                                     <span className={getStatusBadge(booking.status)}>{booking.status}</span>
//                                 </div>

//                                 <div className="flex gap-3 mt-4 md:mt-0">
//                                     {booking.status === "Pending" && (
//                                         <>
//                                             <button
//                                                 onClick={() => handleStatusChange(booking._id, "Approved")}
//                                                 className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200"
//                                             >
//                                                 Approve
//                                             </button>
//                                             <button
//                                                 onClick={() => handleStatusChange(booking._id, "Rejected")}
//                                                 className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
//                                             >
//                                                 Reject
//                                             </button>
//                                         </>
//                                     )}
//                                     <button
//                                         onClick={() => setSelectedBooking(booking)}
//                                         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
//                                     >
//                                         View More
//                                     </button>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-center text-gray-500 mt-10">No {activeTab} bookings found.</p>
//                     )}
//                 </div>

//                 {/* Modal */}
//                 {selectedBooking && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                         <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
//                             <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
//                             <p><strong>Email:</strong> {selectedBooking.userName}</p>
//                             <p><strong>Phone:</strong> {selectedBooking.userPhone}</p>
//                             <p><strong>Guests:</strong> {selectedBooking.numberOfGuests}</p>
//                             <p><strong>Room ID:</strong> {selectedBooking.roomId}</p>
//                             <p><strong>Total Amount:</strong> ₹{selectedBooking.totalAmount}</p>
//                             <p><strong>Check-in:</strong> {new Date(selectedBooking.checkInDate).toLocaleDateString()}</p>
//                             <p><strong>Check-out:</strong> {new Date(selectedBooking.checkOutDate).toLocaleDateString()}</p>
//                             <div className="flex justify-end mt-4">
//                                 <button
//                                     onClick={() => setSelectedBooking(null)}
//                                     className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
//                                 >
//                                     Close
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default BookingPanel;










// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import BASE_URL from "../../utils/api";

// const BookingPanel = () => {
//     const [activeTab, setActiveTab] = useState("pending");
//     const [bookings, setBookings] = useState([]);

//     const token = localStorage.getItem("token");
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };

//     const fetchBookings = async () => {
//         try {
//             const response = await axios.get(`${BASE_URL}/api/bookings/getAll`, config);
//             setBookings(response.data.data);
//         } catch (error) {
//             console.error("Error fetching bookings:", error);
//         }
//     };

//     useEffect(() => {
//         fetchBookings();
//     }, []);

//     const handleStatusChange = async (id, newStatus) => {
//         try {
//             await axios.patch(
//                 `${BASE_URL}/api/bookings/update/${id}`,
//                 { status: newStatus },
//                 config
//             );
//             fetchBookings();
//         } catch (error) {
//             console.error("Failed to update booking status:", error);
//         }
//     };

//     const getStatusBadge = (status) => {
//         const base = "px-3 py-1 rounded-full text-sm font-medium";
//         if (status === "Approved") return `${base} bg-green-100 text-green-700`;
//         if (status === "Rejected") return `${base} bg-red-100 text-red-700`;
//         return `${base} bg-yellow-100 text-yellow-700`;
//     };

//     const filteredBookings = bookings.filter((b) => {
//         const tabStatusMap = {
//             pending: "Pending",
//             approved: "Approved",
//             rejected: "Rejected",
//         };
//         return b.status === tabStatusMap[activeTab];
//     });

//     return (
//         <div className="min-h-screen bg-gray-100 py-10 px-4">
//             <div className="max-w-5xl mx-auto">
//                 <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Admin Booking Panel</h1>

//                 {/* Tabs */}
//                 <div className="flex justify-center gap-4 mb-6">
//                     <button
//                         className={`px-4 py-2 rounded-lg font-medium ${activeTab === "pending"
//                             ? "bg-blue-600 text-white"
//                             : "bg-white text-gray-700 border border-gray-300"
//                             } transition`}
//                         onClick={() => setActiveTab("pending")}
//                     >
//                         Pending Requests
//                     </button>
//                     <button
//                         className={`px-4 py-2 rounded-lg font-medium ${activeTab === "approved"
//                             ? "bg-blue-600 text-white"
//                             : "bg-white text-gray-700 border border-gray-300"
//                             } transition`}
//                         onClick={() => setActiveTab("approved")}
//                     >
//                         Approved Requests
//                     </button>
//                     <button
//                         className={`px-4 py-2 rounded-lg font-medium ${activeTab === "rejected"
//                             ? "bg-blue-600 text-white"
//                             : "bg-white text-gray-700 border border-gray-300"
//                             } transition`}
//                         onClick={() => setActiveTab("rejected")}
//                     >
//                         Rejected Requests
//                     </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-6">
//                     {filteredBookings.length > 0 ? (
//                         filteredBookings.map((booking) => (
//                             <div
//                                 key={booking._id}
//                                 className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row md:items-center justify-between hover:shadow-lg transition-shadow duration-300"
//                             >
//                                 <div className="flex flex-col md:flex-row md:items-center gap-4">
//                                     <div>
//                                         <h2 className="text-lg font-semibold text-gray-800">{booking.userName}</h2>
//                                         <p className="text-gray-500 text-sm">Phone: {booking.userPhone}</p>
//                                         <p className="text-gray-500 text-sm">Guests: {booking.numberOfGuests}</p>
//                                     </div>
//                                     <div className="mt-4 md:mt-0">
//                                         <span className={getStatusBadge(booking.status)}>{booking.status}</span>
//                                     </div>
//                                 </div>

//                                 <div className="flex gap-3 mt-4 md:mt-0">
//                                     {booking.status === "Pending" && (
//                                         <>
//                                             <button
//                                                 onClick={() => handleStatusChange(booking._id, "Approved")}
//                                                 className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200"
//                                             >
//                                                 Approve
//                                             </button>
//                                             <button
//                                                 onClick={() => handleStatusChange(booking._id, "Rejected")}
//                                                 className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
//                                             >
//                                                 Reject
//                                             </button>
//                                         </>
//                                     )}
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-center text-gray-500 mt-10">No {activeTab} bookings found.</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BookingPanel;









// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import BASE_URL from "../../utils/api";
// import Swal from "sweetalert2";

// const BookingPanel = () => {
//     const [activeTab, setActiveTab] = useState("pending");
//     const [bookings, setBookings] = useState([]);

//     const token = localStorage.getItem("token");
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };

//     const fetchBookings = async () => {
//         try {
//             const response = await axios.get(`${BASE_URL}/api/bookings/getAll`, config);
//             setBookings(response.data.data);
//         } catch (error) {
//             console.error("Error fetching bookings:", error);
//             Swal.fire({
//                 icon: "error",
//                 title: "Error",
//                 text: `Failed to fetch bookings: ${error.message}`,
//             });
//         }
//     };

//     useEffect(() => {
//         fetchBookings();
//     }, []);

//     const handleStatusChange = async (id, newStatus) => {
//         try {
//             const result = await Swal.fire({
//                 title: `Are you sure you want to change the status to ${newStatus}?`,
//                 icon: "warning",
//                 showCancelButton: true,
//                 confirmButtonColor: "#3085d6",
//                 cancelButtonColor: "#d33",
//                 confirmButtonText: "Yes, update it!",
//             });

//             if (result.isConfirmed) {
//                 await axios.patch(
//                     `${BASE_URL}/api/bookings/update/${id}`,
//                     { status: newStatus },
//                     config
//                 );

//                 fetchBookings();

//                 // Show success alert
//                 Swal.fire({
//                     icon: "success",
//                     title: `Booking status updated to ${newStatus}`,
//                     text: `The booking status has been successfully updated.`,
//                 });
//             }
//         } catch (error) {
//             console.error("Failed to update booking status:", error);
//             Swal.fire({
//                 icon: "error",
//                 title: "Error",
//                 text: `Failed to update booking status: ${error.message}`,
//             });
//         }
//     };

//     const getStatusBadge = (status) => {
//         const base = "px-3 py-1 rounded-full text-sm font-medium";
//         if (status === "Approved") return `${base} bg-green-100 text-green-700`;
//         if (status === "Rejected") return `${base} bg-red-100 text-red-700`;
//         return `${base} bg-yellow-100 text-yellow-700`;
//     };

//     const filteredBookings = bookings.filter((b) => {
//         const tabStatusMap = {
//             pending: "Pending",
//             approved: "Approved",
//             rejected: "Rejected",
//         };
//         return b.status === tabStatusMap[activeTab];
//     });

//     return (
//         <div className="min-h-screen bg-gray-100 py-10 px-4">
//             <div className="max-w-5xl mx-auto">
//                 <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Admin Booking Panel</h1>

//                 {/* Tabs */}
//                 <div className="flex justify-center gap-4 mb-6">
//                     <button
//                         className={`px-4 py-2 rounded-lg font-medium ${activeTab === "pending"
//                             ? "bg-blue-600 text-white"
//                             : "bg-white text-gray-700 border border-gray-300"
//                             } transition`}
//                         onClick={() => setActiveTab("pending")}
//                     >
//                         Pending Requests
//                     </button>
//                     <button
//                         className={`px-4 py-2 rounded-lg font-medium ${activeTab === "approved"
//                             ? "bg-blue-600 text-white"
//                             : "bg-white text-gray-700 border border-gray-300"
//                             } transition`}
//                         onClick={() => setActiveTab("approved")}
//                     >
//                         Approved Requests
//                     </button>
//                     <button
//                         className={`px-4 py-2 rounded-lg font-medium ${activeTab === "rejected"
//                             ? "bg-blue-600 text-white"
//                             : "bg-white text-gray-700 border border-gray-300"
//                             } transition`}
//                         onClick={() => setActiveTab("rejected")}
//                     >
//                         Rejected Requests
//                     </button>
//                 </div>

//                 {/* Booking Cards */}
//                 <div className="grid grid-cols-1 gap-6">
//                     {filteredBookings.length > 0 ? (
//                         filteredBookings.map((booking) => (
//                             <div
//                                 key={booking._id}
//                                 className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row md:items-center justify-between hover:shadow-lg transition-shadow duration-300"
//                             >
//                                 <div className="flex flex-col md:flex-row md:items-center gap-4">
//                                     <div>
//                                         <h2 className="text-lg font-semibold text-gray-800">{booking.userName}</h2>
//                                         <p className="text-gray-500 text-sm">Phone: {booking.userPhone}</p>
//                                         <p className="text-gray-500 text-sm">Guests: {booking.numberOfGuests}</p>
//                                     </div>
//                                     <div className="mt-4 md:mt-0">
//                                         <span className={getStatusBadge(booking.status)}>{booking.status}</span>
//                                     </div>
//                                 </div>

//                                 <div className="flex gap-3 mt-4 md:mt-0">
//                                     {booking.status === "Pending" && (
//                                         <>
//                                             <button
//                                                 onClick={() => handleStatusChange(booking._id, "Approved")}
//                                                 className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200"
//                                             >
//                                                 Approve
//                                             </button>
//                                             <button
//                                                 onClick={() => handleStatusChange(booking._id, "Rejected")}
//                                                 className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
//                                             >
//                                                 Reject
//                                             </button>
//                                         </>
//                                     )}
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-center text-gray-500 mt-10">No {activeTab} bookings found.</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BookingPanel;














import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../utils/api";
import Swal from "sweetalert2";

const BookingPanel = () => {
    const [activeTab, setActiveTab] = useState("pending");
    const [bookings, setBookings] = useState([]);

    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/bookings/getAll`, config);
            setBookings(response.data.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `Failed to fetch bookings: ${error.message}`,
            });
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const result = await Swal.fire({
                title: `Are you sure you want to change the status to ${newStatus}?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, update it!",
            });

            if (result.isConfirmed) {
                await axios.patch(
                    `${BASE_URL}/api/bookings/update/${id}`,
                    { status: newStatus },
                    config
                );

                fetchBookings();

                Swal.fire({
                    icon: "success",
                    title: `Booking status updated to ${newStatus}`,
                    text: `The booking status has been successfully updated.`,
                });
            }
        } catch (error) {
            console.error("Failed to update booking status:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `Failed to update booking status: ${error.message}`,
            });
        }
    };

    const getStatusBadge = (status) => {
        const base = "px-3 py-1 rounded-full text-sm font-medium";
        if (status === "Approved") return `${base} bg-green-100 text-green-700`;
        if (status === "Rejected") return `${base} bg-red-100 text-red-700`;
        return `${base} bg-yellow-100 text-yellow-700`;
    };

    const filteredBookings = bookings.filter((b) => {
        const tabStatusMap = {
            pending: "Pending",
            approved: "Approved",
            rejected: "Rejected",
        };
        return b.status === tabStatusMap[activeTab];
    });

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Admin Booking Panel</h1>

                {/* Tabs */}
                <div className="flex justify-center gap-4 mb-6">
                    {['pending', 'approved', 'rejected'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-lg transition duration-200 ${activeTab === tab
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="px-4 py-3">User</th>
                                <th className="px-4 py-3">Room</th>
                                <th className="px-4 py-3">Check-In</th>
                                <th className="px-4 py-3">Check-Out</th>
                                <th className="px-4 py-3">Guests</th>
                                <th className="px-4 py-3">Total</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Check-in Status</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.length > 0 ? (
                                filteredBookings.map((booking) => (
                                    <tr key={booking._id} className="border-t">
                                        <td className="px-4 py-3">{booking.userName || booking.userId?.name}</td>
                                        <td className="px-4 py-3">{booking.roomId?.roomNumber || 'N/A'}</td>
                                        <td className="px-4 py-3">{new Date(booking.checkInDate).toLocaleDateString()}</td>
                                        <td className="px-4 py-3">{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                                        <td className="px-4 py-3">{booking.numberOfGuests}</td>
                                        <td className="px-4 py-3">₹{booking.totalAmount}</td>
                                        <td className="px-4 py-3">
                                            <span className={getStatusBadge(booking.status)}>{booking.status}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            {booking.isChecking === 'Confirm' && (
                                                <span className="text-green-700 font-semibold">Confirmed</span>
                                            )}
                                            {booking.isChecking === 'Cancel' && (
                                                <span className="text-red-700 font-semibold">Cancelled</span>
                                            )}
                                            {booking.isChecking === 'Pending' && (
                                                <span className="text-yellow-700 font-semibold">Pending</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 flex gap-2">
                                            {booking.status === "Pending" && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusChange(booking._id, "Approved")}
                                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(booking._id, "Rejected")}
                                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center py-6 text-gray-500">
                                        No bookings found for this tab.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BookingPanel;