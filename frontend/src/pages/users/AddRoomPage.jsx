// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { createBooking } from "../../api/bookingApi"; // Assuming you already have bookingApi.js

// const AddRoom = () => {
//     const [bookingData, setBookingData] = useState({
//         room: "",        // Room ID for the selected room
//         checkin: "",     // Check-in date
//         checkout: "",    // Check-out date
//         members: 1,      // Number of members
//         children: 0,     // Number of children
//         phone: "",       // Contact phone number
//     });

//     const [loading, setLoading] = useState(false);
//     const { roomId } = useParams();  // Get roomId from the URL
//     const navigate = useNavigate();

//     // Retrieve userId (assumed to be stored in localStorage or state)
//     const userId = localStorage.getItem("userId");  // Example: fetch userId from localStorage

//     useEffect(() => {
//         console.log("Room ID from URL:", roomId);  // Log roomId
//         if (roomId) {
//             setBookingData((prev) => ({
//                 ...prev,
//                 room: roomId,  // Automatically set room ID
//             }));
//         } else {
//             console.error("Room ID is missing from URL");
//         }

//         // Check if userId exists
//         if (!userId) {
//             console.error("User ID is missing");
//             alert("User is not logged in. Please log in.");
//         }
//     }, [roomId, userId]);

//     const handleBookingChange = (e) => {
//         const { name, value } = e.target;
//         setBookingData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         // Validate that roomId and userId are available
//         if (!userId) {
//             console.error("User ID is missing");
//             alert("User ID is missing. Please log in.");
//             setLoading(false);
//             return;
//         }
//         if (!bookingData.room) {
//             console.error("Room ID is missing");
//             alert("Room ID is missing. Please select a room.");
//             setLoading(false);
//             return;
//         }

//         const bookingPayload = {
//             room: bookingData.room,
//             checkin: bookingData.checkin,
//             checkout: bookingData.checkout,
//             members: bookingData.members,
//             children: bookingData.children,
//             phone: bookingData.phone,
//         };

//         try {
//             console.log("Booking payload to send:", bookingPayload);

//             // Pass userId to the createBooking function
//             const response = await createBooking(userId, bookingPayload);
//             console.log("Booking created successfully:", response.data);

//             alert("Booking created successfully!");
//             navigate(`/hotel/${roomId}`);  // Redirect to the hotel page or booking confirmation page
//         } catch (error) {
//             console.error("Error creating booking:", error);
//             alert("Failed to create booking. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="p-6 bg-gradient-to-b from-blue-50 to-white min-h-screen">
//             <h1 className="text-3xl font-bold text-center text-indigo-800 mb-8">
//                 🛏️ Add Booking for Room {bookingData.room}
//             </h1>

//             <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 bg-white p-6 rounded-xl shadow-lg">
//                 {/* Booking Details */}
//                 <div>
//                     <label className="block font-medium text-gray-700">Room ID</label>
//                     <input
//                         type="text"
//                         name="room"
//                         value={bookingData.room}
//                         onChange={handleBookingChange}
//                         required
//                         className="w-full border rounded p-2 mt-1"
//                         disabled // Disable editing for room ID
//                     />
//                 </div>

//                 <div>
//                     <label className="block font-medium text-gray-700">Check-in Date</label>
//                     <input
//                         type="date"
//                         name="checkin"
//                         value={bookingData.checkin}
//                         onChange={handleBookingChange}
//                         required
//                         className="w-full border rounded p-2 mt-1"
//                     />
//                 </div>

//                 <div>
//                     <label className="block font-medium text-gray-700">Check-out Date</label>
//                     <input
//                         type="date"
//                         name="checkout"
//                         value={bookingData.checkout}
//                         onChange={handleBookingChange}
//                         required
//                         className="w-full border rounded p-2 mt-1"
//                     />
//                 </div>

//                 <div>
//                     <label className="block font-medium text-gray-700">Members</label>
//                     <input
//                         type="number"
//                         name="members"
//                         value={bookingData.members}
//                         onChange={handleBookingChange}
//                         required
//                         className="w-full border rounded p-2 mt-1"
//                     />
//                 </div>

//                 <div>
//                     <label className="block font-medium text-gray-700">Children</label>
//                     <input
//                         type="number"
//                         name="children"
//                         value={bookingData.children}
//                         onChange={handleBookingChange}
//                         className="w-full border rounded p-2 mt-1"
//                     />
//                 </div>

//                 <div>
//                     <label className="block font-medium text-gray-700">Phone</label>
//                     <input
//                         type="text"
//                         name="phone"
//                         value={bookingData.phone}
//                         onChange={handleBookingChange}
//                         required
//                         className="w-full border rounded p-2 mt-1"
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
//                     disabled={loading}
//                 >
//                     {loading ? "Creating Booking..." : "Create Booking"}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddRoom;









// import React, { useState, useEffect } from "react";
// import { DollarSign, Users, Bed } from "lucide-react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import BASE_URL from "../../utils/api";

// const AddRoomPage = () => {
//     const { roomId } = useParams();
//     const [room, setRoom] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchRoomDetails = async () => {
//             try {
//                 const response = await axios.get(`${BASE_URL}/api/rooms/${roomId}`);
//                 setRoom(response.data);
//             } catch (err) {
//                 console.error("Error fetching room details:", err);
//                 setError("Failed to load room details. Please try again later.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchRoomDetails();
//     }, [roomId]);

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-100 to-blue-100">
//                 <div className="text-2xl font-semibold text-indigo-700 animate-pulse">
//                     Loading room details...
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-100 to-blue-100">
//                 <div className="text-2xl font-semibold text-red-600">{error}</div>
//             </div>
//         );
//     }

//     const hotel = room?.hotel;

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//                 <h1 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
//                     Room Details
//                 </h1>

//                 <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
//                     {/* Room Image */}
//                     <div className="relative h-48 mb-6">
//                         <img
//                             src={room?.images?.[0] || "https://via.placeholder.com/600x400"}
//                             alt="Room"
//                             className="w-full h-full object-cover rounded-xl"
//                         />
//                     </div>

//                     {/* Room Information */}
//                     <h2 className="text-3xl font-bold text-gray-800">
//                         Room {room?.roomNumber || "N/A"}
//                     </h2>
//                     <p className="text-lg text-gray-600">
//                         {hotel?.name || "Hotel Name"}
//                     </p>

//                     {/* Room Details */}
//                     <div className="mt-6 flex flex-wrap gap-4">
//                         <div className="flex items-center text-sm text-gray-600">
//                             <div className="w-4 h-4 text-green-500" />
//                             <span className="font-semibold">₹{room?.price || 0}/night</span>
//                         </div>
//                         <div className="flex items-center text-sm text-gray-600">
//                             <Users className="w-4 h-4 mr-1 text-blue-500" />
//                             <span>{room?.type || "Room Type"}</span>
//                         </div>
//                         <div className="flex items-center text-sm text-gray-600">
//                             <Bed className="w-4 h-4 mr-1 text-gray-600" />
//                             <span>{room?.capacity || 2} guests</span>
//                         </div>
//                         <div className="flex items-center text-sm text-gray-600">
//                             <span className="ml-1">
//                                 {room?.isAc ? "AC Room" : "Non-AC Room"}
//                             </span>
//                         </div>
//                     </div>

//                     {/* Room Description */}
//                     <p className="mt-6 text-gray-700">
//                         {hotel?.description || "No description available."}
//                     </p>

//                     {/* Only Book Button */}
//                     <div className="mt-6 flex justify-center">
//                         <button
//                             onClick={() => navigate(`/room/book/${room._id}`)}
//                             className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
//                         >
//                             Book Now
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddRoomPage;










// import React, { useState, useEffect } from "react";
// import { DollarSign, Users, Bed } from "lucide-react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import BASE_URL from "../../utils/api";
// import BookingForm from "./BookingForm";

// const AddRoomPage = () => {
//     const { roomId } = useParams();
//     const [room, setRoom] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [showBookingForm, setShowBookingForm] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchRoomDetails = async () => {
//             try {
//                 const response = await axios.get(`${BASE_URL}/api/rooms/${roomId}`);
//                 setRoom(response.data);
//             } catch (err) {
//                 console.error("Error fetching room details:", err);
//                 setError("Failed to load room details. Please try again later.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchRoomDetails();
//     }, [roomId]);

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-100 to-blue-100">
//                 <div className="text-2xl font-semibold text-indigo-700 animate-pulse">
//                     Loading room details...
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-100 to-blue-100">
//                 <div className="text-2xl font-semibold text-red-600">{error}</div>
//             </div>
//         );
//     }

//     const hotel = room?.hotel;

//     const handleBookNow = () => {
//         // Show the booking form
//         setShowBookingForm(true);
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//                 <h1 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
//                     Room Details
//                 </h1>

//                 <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
//                     {/* Room Image */}
//                     <div className="relative h-48 mb-6">
//                         <img
//                             src={room?.images?.[0] || "https://via.placeholder.com/600x400"}
//                             alt="Room"
//                             className="w-full h-full object-cover rounded-xl"
//                         />
//                     </div>

//                     {/* Room Information */}
//                     <h2 className="text-3xl font-bold text-gray-800">
//                         Room {room?.roomNumber || "N/A"}
//                     </h2>
//                     <p className="text-lg text-gray-600">
//                         {hotel?.name || "Hotel Name"}
//                     </p>

//                     {/* Room Details */}
//                     <div className="mt-6 flex flex-wrap gap-4">
//                         <div className="flex items-center text-sm text-gray-600">
//                             <div className="w-4 h-4 text-green-500" />
//                             <span className="font-semibold">₹{room?.price || 0}/night</span>
//                         </div>
//                         <div className="flex items-center text-sm text-gray-600">
//                             <Users className="w-4 h-4 mr-1 text-blue-500" />
//                             <span>{room?.type || "Room Type"}</span>
//                         </div>
//                         <div className="flex items-center text-sm text-gray-600">
//                             <Bed className="w-4 h-4 mr-1 text-gray-600" />
//                             <span>{room?.capacity || 2} guests</span>
//                         </div>
//                         <div className="flex items-center text-sm text-gray-600">
//                             <span className="ml-1">
//                                 {room?.isAc ? "AC Room" : "Non-AC Room"}
//                             </span>
//                         </div>
//                     </div>

//                     {/* Room Description */}
//                     <p className="mt-6 text-gray-700">
//                         {hotel?.description || "No description available."}
//                     </p>

//                     {/* Only Book Button */}
//                     <div className="mt-6 flex justify-center">
//                         <button
//                             onClick={handleBookNow}
//                             className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
//                         >
//                             Book Now
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {showBookingForm && (
//                 <BookingForm
//                     price={room?.price || 0}
//                     roomId={room?._id}
//                     capacity={room?.capacity || 2}
//                 />
//             )}
//         </div>
//     );
// };

// export default AddRoomPage;













import React, { useState, useEffect } from "react";
import { DollarSign, Users, Bed } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../utils/api";
import BookingForm from "./BookingForm";
import Swal from "sweetalert2";

const AddRoomPage = () => {
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/rooms/${roomId}`);
                setRoom(response.data);
            } catch (err) {
                console.error("Error fetching room details:", err);
                setError("Failed to load room details. Please try again later.");
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to load room details. Please try again later.",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchRoomDetails();
    }, [roomId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-100 to-blue-100">
                <div className="text-2xl font-semibold text-indigo-700 animate-pulse">
                    Loading room details...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-100 to-blue-100">
                <div className="text-2xl font-semibold text-red-600">{error}</div>
            </div>
        );
    }

    const hotel = room?.hotel;

    const handleBookNow = () => {
        setShowBookingForm(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Room Details
                </h1>

                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                    <div className="relative h-48 mb-6">
                        <img
                            src={room?.images?.[0] || "https://via.placeholder.com/600x400"}
                            alt="Room"
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800">
                        Room {room?.roomNumber || "N/A"}
                    </h2>
                    <p className="text-lg text-gray-600">
                        {hotel?.name || "Hotel Name"}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-4">
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="w-4 h-4 text-green-500" />
                            <span className="font-semibold">₹{room?.price || 0}/night</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <Users className="w-4 h-4 mr-1 text-blue-500" />
                            <span>{room?.type || "Room Type"}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <Bed className="w-4 h-4 mr-1 text-gray-600" />
                            <span>{room?.capacity || 2} guests</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <span className="ml-1">
                                {room?.isAc ? "AC Room" : "Non-AC Room"}
                            </span>
                        </div>
                    </div>

                    <p className="mt-6 text-gray-700">
                        {hotel?.description || "No description available."}
                    </p>

                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={handleBookNow}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>

            {showBookingForm && (
                <BookingForm
                    price={room?.price || 0}
                    roomId={room?._id}
                    capacity={room?.capacity || 2}
                />
            )}
        </div>
    );
};

export default AddRoomPage;