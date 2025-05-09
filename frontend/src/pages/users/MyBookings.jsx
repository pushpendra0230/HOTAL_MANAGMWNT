// import React, { useEffect, useState } from 'react';
// import { getAllBookings } from '../../api/bookingApi';

// const MyBookings = () => {
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 const allBookings = await getAllBookings();
//                 const userId = JSON.parse(localStorage.getItem("user"))?._id;

//                 // Filter bookings for current user
//                 const userBookings = allBookings.filter(b => b.userId === userId);
//                 setBookings(userBookings);
//             } catch (err) {
//                 setError(err.message || 'Error fetching bookings');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBookings();
//     }, []);

//     if (loading) return <p className="p-4 text-gray-600">Loading bookings...</p>;
//     if (error) return <p className="p-4 text-red-600">{error}</p>;

//     return (
//         <div className="p-6">
//             <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
//             {bookings.length === 0 ? (
//                 <p>No bookings found.</p>
//             ) : (
//                 <div className="grid gap-4">
//                     {bookings.map((booking) => (
//                         <div key={booking._id} className="border p-4 rounded-md shadow-md">
//                             <p><strong>Room ID:</strong> {booking.roomId}</p>
//                             <p><strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
//                             <p><strong>Check-out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
//                             <p><strong>Guests:</strong> {booking.numberOfGuests}</p>
//                             <p><strong>Total:</strong> ₹{booking.totalAmount}</p>
//                             <p><strong>Status:</strong> {booking.status}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyBookings;













// import React, { useEffect, useState } from 'react';
// import { getAllBookings } from '../../api/bookingApi';

// const MyBookings = () => {
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 // Fetch all bookings from the API
//                 const allBookings = await getAllBookings();

//                 // Get user data from localStorage
//                 const user = JSON.parse(localStorage.getItem('user'));
//                 console.log('User from localStorage:', user);  // Log the full user object

//                 // Ensure user is logged in and userId exists
//                 const userId = user?.userId;
//                 console.log("User ID from localStorage:", userId);  // Log user ID specifically

//                 if (!userId) {
//                     // If no user ID, set error message and stop loading
//                     setError('User is not logged in');
//                     setLoading(false);
//                     return;
//                 }

//                 // Filter bookings for the current user
//                 const userBookings = allBookings.filter((b) => {
//                     console.log('Booking userId:', b.userId);  // Log the booking userId
//                     return b.userId === userId;
//                 });

//                 setBookings(userBookings);  // Set the filtered bookings for this user
//             } catch (err) {
//                 // Catch any errors and set the error state
//                 setError(err.message || 'Error fetching bookings');
//             } finally {
//                 setLoading(false);  // Set loading to false after fetch attempt
//             }
//         };

//         fetchBookings();  // Call fetchBookings when the component mounts
//     }, []);

//     // Handle loading state
//     if (loading) return <p className="p-4 text-gray-600">Loading bookings...</p>;

//     // Handle error state
//     if (error) return <p className="p-4 text-red-600">{error}</p>;

//     return (
//         <div className="p-6">
//             <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
//             {bookings.length === 0 ? (
//                 <p>No bookings found.</p>
//             ) : (
//                 <div className="grid gap-4">
//                     {bookings.map((booking) => (
//                         <div key={booking._id} className="border p-4 rounded-md shadow-md">
//                             <p><strong>Room ID:</strong> {booking.roomId.roomNumber}</p>
//                             <p><strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
//                             <p><strong>Check-out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
//                             <p><strong>Guests:</strong> {booking.numberOfGuests}</p>
//                             <p><strong>Total:</strong> ₹{booking.totalAmount}</p>
//                             <p><strong>Status:</strong> {booking.status}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyBookings;










// import React, { useEffect, useState } from 'react';
// import { getAllBookings } from '../../api/bookingApi';
// import { useNavigate } from 'react-router-dom';

// const MyBookings = () => {
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 const allBookings = await getAllBookings();
//                 const user = JSON.parse(localStorage.getItem('user'));
//                 const userId = user?.userId;

//                 if (!userId) {
//                     setError('User is not logged in');
//                     setLoading(false);
//                     return;
//                 }

//                 const userBookings = allBookings.filter(
//                     (b) => b.userId?.toString() === userId
//                 );
//                 setBookings(userBookings);
//             } catch (err) {
//                 setError(err.message || 'Error fetching bookings');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBookings();
//     }, []);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen text-lg text-gray-600">
//                 Loading your bookings...
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="p-6 text-red-600 font-medium text-center">
//                 {error}
//             </div>
//         );
//     }

//     return (
//         <div className="p-6 min-h-screen bg-gray-50">
//             <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center">📘 My Bookings</h2>

//             {bookings.length === 0 ? (
//                 <div className="text-center mt-10 text-gray-600">
//                     <p className="text-xl mb-4">You have no bookings yet.</p>
//                     <button
//                         onClick={() => navigate('/user')}
//                         className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg shadow"
//                     >
//                         🏨 Explore Hotels & Book Now
//                     </button>
//                 </div>
//             ) : (
//                 <div className="grid gap-4">
//                     {bookings.map((booking) => (
//                         <div key={booking._id} className="border p-4 rounded-md shadow-md bg-white">
//                             <p><strong>Room:</strong> {booking.roomId?.roomNumber || 'N/A'}</p>
//                             <p><strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
//                             <p><strong>Check-out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
//                             <p><strong>Guests:</strong> {booking.numberOfGuests}</p>
//                             <p><strong>Total:</strong> ₹{booking.totalAmount}</p>
//                             <p><strong>Status:</strong> {booking.status}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyBookings;









// import React, { useEffect, useState } from 'react';
// import { getAllBookings } from '../../api/bookingApi';
// import { useNavigate } from 'react-router-dom';

// const MyBookings = () => {
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 const allBookings = await getAllBookings();
//                 const user = JSON.parse(localStorage.getItem('user'));
//                 const userId = user?.userId;

//                 if (!userId) {
//                     setError('User is not logged in');
//                     setLoading(false);
//                     return;
//                 }

//                 // Log to check what you are receiving in allBookings
//                 console.log("All Bookings:", allBookings);

//                 // Filter bookings by userId and check if ObjectId matches properly
//                 const userBookings = allBookings.filter(
//                     (b) => b.userId?._id?.toString() === userId || b.userId?.toString() === userId
//                 );
//                 setBookings(userBookings);
//             } catch (err) {
//                 setError(err.message || 'Error fetching bookings');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBookings();
//     }, []);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen text-lg text-gray-600">
//                 Loading your bookings...
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="p-6 text-red-600 font-medium text-center">
//                 {error}
//             </div>
//         );
//     }

//     return (
//         <div className="p-6 min-h-screen bg-gray-50">
//             <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center">📘 My Bookings</h2>

//             {bookings.length === 0 ? (
//                 <div className="text-center mt-10 text-gray-600">
//                     <p className="text-xl mb-4">You have no bookings yet.</p>
//                     <button
//                         onClick={() => navigate('/user')}
//                         className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg shadow"
//                     >
//                         🏨 Explore Hotels & Book Now
//                     </button>
//                 </div>
//             ) : (
//                 <div className="grid gap-4">
//                     {bookings.map((booking) => (
//                         <div key={booking._id} className="border p-4 rounded-md shadow-md bg-white">
//                             <p><strong>Room:</strong> {booking.roomId?.roomNumber || 'N/A'}</p>
//                             <p><strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
//                             <p><strong>Check-out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
//                             <p><strong>Guests:</strong> {booking.numberOfGuests}</p>
//                             <p><strong>Total:</strong> ₹{booking.totalAmount}</p>
//                             <p><strong>Status:</strong> {booking.status}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyBookings;










// import React, { useEffect, useState } from 'react';
// import { getAllBookings } from '../../api/bookingApi';
// import { useNavigate } from 'react-router-dom';

// const MyBookings = () => {
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 const allBookings = await getAllBookings();
//                 const user = JSON.parse(localStorage.getItem('user'));
//                 const userId = user?.userId;

//                 if (!userId) {
//                     setError('User is not logged in');
//                     setLoading(false);
//                     return;
//                 }

//                 console.log("All Bookings:", allBookings);

//                 const userBookings = allBookings.filter(
//                     (b) => b.userId?._id?.toString() === userId || b.userId?.toString() === userId
//                 );
//                 setBookings(userBookings);
//             } catch (err) {
//                 setError(err.message || 'Error fetching bookings');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBookings();
//     }, []);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen text-lg text-gray-600">
//                 Loading your bookings...
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="p-6 text-red-600 font-medium text-center">
//                 {error}
//             </div>
//         );
//     }

//     return (
//         <div className="p-6 min-h-screen bg-gray-50">
//             <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center">📘 My Bookings</h2>

//             {bookings.length === 0 ? (
//                 <div className="text-center mt-10 text-gray-600">
//                     <p className="text-xl mb-4">You have no bookings yet.</p>
//                     <button
//                         onClick={() => navigate('/user')}
//                         className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg shadow"
//                     >
//                         🏨 Explore Hotels & Book Now
//                     </button>
//                 </div>
//             ) : (
//                 <div className="grid gap-4">
//                     {bookings.map((booking) => (
//                         <div key={booking._id} className="border p-4 rounded-md shadow-md bg-white">
//                             <p><strong>Room:</strong> {booking.roomId?.roomNumber || 'N/A'}</p>
//                             <p><strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
//                             <p><strong>Check-out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
//                             <p><strong>Guests:</strong> {booking.numberOfGuests}</p>
//                             <p><strong>Total:</strong> ₹{booking.totalAmount}</p>
//                             <p><strong>Status:</strong> {booking.status}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyBookings;









import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import BASE_URL from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/bookings/getAll`, config);
                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user?.userId;

                if (!userId) {
                    Swal.fire('Unauthorized', 'User is not logged in!', 'error');
                    setError('User is not logged in');
                    setLoading(false);
                    return;
                }

                const userBookings = response.data.data.filter(
                    (b) => b.userId?._id?.toString() === userId || b.userId?.toString() === userId
                );
                setBookings(userBookings);
                Swal.fire('Success', 'Your bookings were loaded successfully!', 'success');
            } catch (err) {
                Swal.fire('Error', err.message || 'Error fetching bookings', 'error');
                setError(err.message || 'Error fetching bookings');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleCheckingStatus = async (id, status) => {
        const confirmation = await Swal.fire({
            title: `${status} Check-in?`,
            text: `Are you sure you want to ${status.toLowerCase()} check-in for this booking?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: status === 'Confirm' ? '#3085d6' : '#d33',
            cancelButtonColor: '#aaa',
            confirmButtonText: `Yes, ${status.toLowerCase()} it!`
        });

        if (!confirmation.isConfirmed) return;

        try {
            await axios.patch(
                `${BASE_URL}/api/bookings/update-checking/${id}`,
                { isChecking: status },
                config
            );
            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking._id === id ? { ...booking, isChecking: status } : booking
                )
            );
            Swal.fire('Updated', `Check-in status updated to ${status}`, 'success');
        } catch (error) {
            Swal.fire('Error', 'Failed to update check-in status.', 'error');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-lg text-gray-600">
                Loading your bookings...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-red-600 font-medium text-center">
                {error}
            </div>
        );
    }

    return (
        <div className="p-6 min-h-screen bg-gradient-to-b from-indigo-50 to-white">
            <h2 className="text-4xl font-extrabold text-indigo-900 mb-10 text-center tracking-wide">
                📘 My Bookings
            </h2>

            {bookings.length === 0 ? (
                <div className="text-center mt-16 text-gray-600">
                    <p className="text-2xl font-medium mb-6">You have no bookings yet.</p>
                    <button
                        onClick={() => navigate('/user')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300"
                    >
                        🏨 Explore Hotels & Book Now
                    </button>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300"
                        >
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                                    🛏️ Room #{booking.roomId?.roomNumber || 'N/A'}
                                </h3>
                                <div className="text-sm text-gray-500">
                                    Booking ID: <span className="font-mono">{booking._id}</span>
                                </div>
                            </div>

                            <div className="space-y-2 text-gray-700">
                                <p><span className="font-semibold">📅 Check-in:</span> {new Date(booking.checkInDate).toLocaleDateString()}</p>
                                <p><span className="font-semibold">📆 Check-out:</span> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                                <p><span className="font-semibold">👨‍👩‍👧 Guests:</span> {booking.numberOfGuests}</p>
                                <p><span className="font-semibold">💰 Total Amount:</span> ₹{booking.totalAmount}</p>
                                <p>
                                    <span className="font-semibold">📌 Status:</span>
                                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${booking.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {booking.status}
                                    </span>
                                </p>
                                <p>
                                    <span className="font-semibold">✅ Check-in Status:</span>
                                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${booking.isChecking === 'Confirm' ? 'bg-green-100 text-green-700' : booking.isChecking === 'Cancel' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {booking.isChecking}
                                    </span>
                                </p>
                            </div>

                            {booking.status === "Approved" && booking.isChecking === "Pending" && (
                                <div className="mt-4 flex gap-3">
                                    <button
                                        onClick={() => handleCheckingStatus(booking._id, "Confirm")}
                                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition"
                                    >
                                        ✅ Confirm
                                    </button>
                                    <button
                                        onClick={() => handleCheckingStatus(booking._id, "Cancel")}
                                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition"
                                    >
                                        ❌ Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;