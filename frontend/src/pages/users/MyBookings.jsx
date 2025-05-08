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










import React, { useEffect, useState } from 'react';
import { getAllBookings } from '../../api/bookingApi';
import { useNavigate } from 'react-router-dom';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const allBookings = await getAllBookings();
                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user?.userId;

                if (!userId) {
                    setError('User is not logged in');
                    setLoading(false);
                    return;
                }

                console.log("All Bookings:", allBookings);

                const userBookings = allBookings.filter(
                    (b) => b.userId?._id?.toString() === userId || b.userId?.toString() === userId
                );
                setBookings(userBookings);
            } catch (err) {
                setError(err.message || 'Error fetching bookings');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

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
        <div className="p-6 min-h-screen bg-gray-50">
            <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center">📘 My Bookings</h2>

            {bookings.length === 0 ? (
                <div className="text-center mt-10 text-gray-600">
                    <p className="text-xl mb-4">You have no bookings yet.</p>
                    <button
                        onClick={() => navigate('/user')}
                        className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg shadow"
                    >
                        🏨 Explore Hotels & Book Now
                    </button>
                </div>
            ) : (
                <div className="grid gap-4">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="border p-4 rounded-md shadow-md bg-white">
                            <p><strong>Room:</strong> {booking.roomId?.roomNumber || 'N/A'}</p>
                            <p><strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
                            <p><strong>Check-out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                            <p><strong>Guests:</strong> {booking.numberOfGuests}</p>
                            <p><strong>Total:</strong> ₹{booking.totalAmount}</p>
                            <p><strong>Status:</strong> {booking.status}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;