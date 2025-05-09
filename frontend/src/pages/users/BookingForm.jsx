// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { addBooking } from '../../api/bookingApi';

// const BookingForm = ({ price, roomId, capacity }) => {
//     const navigate = useNavigate();

//     const [checkInDate, setCheckInDate] = useState('');
//     const [checkOutDate, setCheckOutDate] = useState('');
//     const [numberOfGuests, setNumberOfGuests] = useState(1);
//     const [userPhone, setUserPhone] = useState('');
//     const [userName, setUserName] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     // You can set this dynamically if the user is logged in
//     useEffect(() => {
//         // If you have a logged-in user, you can get their info here
//         const loggedInUser = JSON.parse(localStorage.getItem("user")); // Assuming user info is stored in localStorage
//         if (loggedInUser) {
//             setUserPhone(loggedInUser.phone); // Assuming the phone is part of user data
//             setUserName(loggedInUser.name); // Assuming the name is part of user data
//         }
//     }, []);

//     const calculateTotalDays = () => {
//         const start = new Date(checkInDate);
//         const end = new Date(checkOutDate);
//         const diffTime = end - start;
//         return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccess('');

//         console.log("Form Submission Started");
//         console.log("checkInDate:", checkInDate);
//         console.log("checkOutDate:", checkOutDate);
//         console.log("numberOfGuests:", numberOfGuests);
//         console.log("userPhone:", userPhone);
//         console.log("userName:", userName);

//         if (!checkInDate || !checkOutDate) {
//             setError('Please select check-in and check-out dates.');
//             console.log("Error: Missing dates");
//             return;
//         }

//         if (new Date(checkOutDate) <= new Date(checkInDate)) {
//             setError('Check-out date must be after check-in date.');
//             console.log("Error: Invalid date range");
//             return;
//         }

//         if (numberOfGuests > capacity) {
//             setError(`Number of guests cannot exceed the room capacity of ${capacity}.`);
//             console.log("Error: Exceeds capacity");
//             return;
//         }

//         const totalDays = calculateTotalDays();
//         const totalAmount = price * totalDays;

//         console.log("Total days:", totalDays);
//         console.log("Total amount:", totalAmount);

//         const bookingData = {
//             roomId,
//             checkInDate,
//             checkOutDate,
//             numberOfGuests,
//             userPhone,
//             userName,
//             totalAmount,
//         };

//         console.log("Booking data:", bookingData);

//         try {
//             await addBooking(bookingData);
//             setSuccess('Booking successful! Redirecting to your bookings...');
//             console.log("Booking successful");
//             setTimeout(() => navigate('/my-bookings'), 3000);
//         } catch (err) {
//             setError(err.message);
//             console.error("Error during booking:", err);
//         }
//     };

//     return (
//         <div className="bg-white p-6 rounded-xl shadow-lg sticky top-24">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Your Stay</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
//                     <input
//                         type="date"
//                         id="checkInDate"
//                         value={checkInDate}
//                         onChange={(e) => setCheckInDate(e.target.value)}
//                         min={new Date().toISOString().split('T')[0]}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
//                     <input
//                         type="date"
//                         id="checkOutDate"
//                         value={checkOutDate}
//                         onChange={(e) => setCheckOutDate(e.target.value)}
//                         min={checkInDate || new Date().toISOString().split('T')[0]}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="numberOfGuests" className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
//                     <input
//                         type="number"
//                         id="numberOfGuests"
//                         value={numberOfGuests}
//                         onChange={(e) => setNumberOfGuests(parseInt(e.target.value))}
//                         min="1"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="userPhone" className="block text-sm font-medium text-gray-700 mb-1">Your Phone Number</label>
//                     <input
//                         type="text"
//                         id="userPhone"
//                         value={userPhone}
//                         onChange={(e) => setUserPhone(e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
//                     <input
//                         type="text"
//                         id="userName"
//                         value={userName}
//                         onChange={(e) => setUserName(e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         required
//                     />
//                 </div>
//                 <div className="text-lg font-semibold text-gray-800">
//                     Total Price: <span className="text-blue-600">₹{checkInDate && checkOutDate ? price * calculateTotalDays() : price}</span>
//                 </div>
//                 {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
//                 {success && <p className="text-sm text-green-600 bg-green-100 p-3 rounded-md">{success}</p>}
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
//                 >
//                     Book Now
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default BookingForm;









// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { addBooking } from '../../api/bookingApi';
// import Swal from 'sweetalert2';

// const BookingForm = ({ price, roomId, capacity }) => {
//     const navigate = useNavigate();

//     const [checkInDate, setCheckInDate] = useState('');
//     const [checkOutDate, setCheckOutDate] = useState('');
//     const [numberOfGuests, setNumberOfGuests] = useState(1);
//     const [userPhone, setUserPhone] = useState('');
//     const [userName, setUserName] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     useEffect(() => {
//         const loggedInUser = JSON.parse(localStorage.getItem("user"));
//         if (loggedInUser) {
//             setUserPhone(loggedInUser.phone);
//             setUserName(loggedInUser.name);
//         }
//     }, []);

//     const calculateTotalDays = () => {
//         const start = new Date(checkInDate);
//         const end = new Date(checkOutDate);
//         const diffTime = end - start;
//         return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccess('');

//         if (!checkInDate || !checkOutDate) {
//             setError('Please select check-in and check-out dates.');
//             return;
//         }

//         if (new Date(checkOutDate) <= new Date(checkInDate)) {
//             setError('Check-out date must be after check-in date.');
//             return;
//         }

//         if (numberOfGuests > capacity) {
//             setError(`Number of guests cannot exceed the room capacity of ${capacity}.`);
//             return;
//         }

//         const totalDays = calculateTotalDays();
//         const totalAmount = price * totalDays;

//         const bookingData = {
//             roomId,
//             checkInDate,
//             checkOutDate,
//             numberOfGuests,
//             userPhone,
//             userName,
//             totalAmount,
//         };

//         try {
//             await addBooking(bookingData);
//             setSuccess('Booking successful! Redirecting to your bookings...');
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Booking Successful!',
//                 text: 'You will be redirected to your bookings shortly.',
//             });
//             setTimeout(() => navigate('/my-bookings'), 3000);
//         } catch (err) {
//             setError(err.message);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Booking Failed!',
//                 text: 'There was an issue with your booking. Please try again later.',
//             });
//         }
//     };

//     return (
//         <div className="bg-white p-6 rounded-xl shadow-lg sticky top-24 mt-8">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Your Stay</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
//                     <input
//                         type="date"
//                         id="checkInDate"
//                         value={checkInDate}
//                         onChange={(e) => setCheckInDate(e.target.value)}
//                         min={new Date().toISOString().split('T')[0]}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
//                     <input
//                         type="date"
//                         id="checkOutDate"
//                         value={checkOutDate}
//                         onChange={(e) => setCheckOutDate(e.target.value)}
//                         min={checkInDate || new Date().toISOString().split('T')[0]}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="numberOfGuests" className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
//                     <input
//                         type="number"
//                         id="numberOfGuests"
//                         value={numberOfGuests}
//                         onChange={(e) => setNumberOfGuests(parseInt(e.target.value))}
//                         min="1"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="userPhone" className="block text-sm font-medium text-gray-700 mb-1">Your Phone Number</label>
//                     <input
//                         type="text"
//                         id="userPhone"
//                         value={userPhone}
//                         onChange={(e) => setUserPhone(e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
//                     <input
//                         type="text"
//                         id="userName"
//                         value={userName}
//                         onChange={(e) => setUserName(e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         required
//                     />
//                 </div>
//                 <div className="text-lg font-semibold text-gray-800">
//                     Total Price: <span className="text-blue-600">₹{checkInDate && checkOutDate ? price * calculateTotalDays() : price}</span>
//                 </div>
//                 {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
//                 {success && <p className="text-sm text-green-600 bg-green-100 p-3 rounded-md">{success}</p>}
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
//                 >
//                     Book Now
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default BookingForm;









// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { addBooking } from '../../api/bookingApi';
// import Swal from 'sweetalert2';

// const BookingForm = ({ price, roomId, capacity }) => {
//     const navigate = useNavigate();

//     const [checkInDate, setCheckInDate] = useState('');
//     const [checkOutDate, setCheckOutDate] = useState('');
//     const [numberOfGuests, setNumberOfGuests] = useState(1);
//     const [userPhone, setUserPhone] = useState('');
//     const [userName, setUserName] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     useEffect(() => {
//         const loggedInUser = JSON.parse(localStorage.getItem("user"));
//         if (loggedInUser) {
//             setUserPhone(loggedInUser.phone);
//             setUserName(loggedInUser.name);
//         }
//     }, []);

//     const calculateTotalDays = () => {
//         const start = new Date(checkInDate);
//         const end = new Date(checkOutDate);
//         const diffTime = end - start;
//         return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccess('');

//         if (!checkInDate || !checkOutDate) {
//             setError('Please select check-in and check-out dates.');
//             return;
//         }

//         if (new Date(checkOutDate) <= new Date(checkInDate)) {
//             setError('Check-out date must be after check-in date.');
//             return;
//         }

//         if (numberOfGuests > capacity) {
//             setError(`Number of guests cannot exceed the room capacity of ${capacity}.`);
//             return;
//         }

//         const totalDays = calculateTotalDays();
//         const totalAmount = price * totalDays;

//         const bookingData = {
//             roomId,
//             checkInDate,
//             checkOutDate,
//             numberOfGuests,
//             userPhone,
//             userName,
//             totalAmount,
//         };

//         try {
//             await addBooking(bookingData);
//             setSuccess('Booking successful! Redirecting to your bookings...');
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Booking Successful!',
//                 text: 'You will be redirected to your bookings shortly.',
//             });
//             setTimeout(() => navigate('/my-bookings'), 3000);
//         } catch (err) {
//             setError(err.message);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Booking Failed!',
//                 text: 'There was an issue with your booking. Please try again later.',
//             });
//         }
//     };

//     return (
//         <div className="bg-white p-8 rounded-xl shadow-xl sticky top-24 mt-10 max-w-lg mx-auto">
//             <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Book Your Stay</h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Check-in Date */}
//                 <div>
//                     <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
//                     <input
//                         type="date"
//                         id="checkInDate"
//                         value={checkInDate}
//                         onChange={(e) => setCheckInDate(e.target.value)}
//                         min={new Date().toISOString().split('T')[0]}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
//                         required
//                     />
//                 </div>

//                 {/* Check-out Date */}
//                 <div>
//                     <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
//                     <input
//                         type="date"
//                         id="checkOutDate"
//                         value={checkOutDate}
//                         onChange={(e) => setCheckOutDate(e.target.value)}
//                         min={checkInDate || new Date().toISOString().split('T')[0]}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
//                         required
//                     />
//                 </div>

//                 {/* Number of Guests */}
//                 <div>
//                     <label htmlFor="numberOfGuests" className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
//                     <input
//                         type="number"
//                         id="numberOfGuests"
//                         value={numberOfGuests}
//                         onChange={(e) => setNumberOfGuests(parseInt(e.target.value))}
//                         min="1"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
//                         required
//                     />
//                 </div>

//                 {/* Phone Number */}
//                 <div>
//                     <label htmlFor="userPhone" className="block text-sm font-medium text-gray-700 mb-2">Your Phone Number</label>
//                     <input
//                         type="text"
//                         id="userPhone"
//                         value={userPhone}
//                         onChange={(e) => setUserPhone(e.target.value)}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
//                         required
//                     />
//                 </div>

//                 {/* Name */}
//                 <div>
//                     <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
//                     <input
//                         type="text"
//                         id="userName"
//                         value={userName}
//                         onChange={(e) => setUserName(e.target.value)}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
//                         required
//                     />
//                 </div>

//                 {/* Total Price */}
//                 <div className="text-lg font-semibold text-gray-800">
//                     <p>Total Price: <span className="text-blue-600">₹{checkInDate && checkOutDate ? price * calculateTotalDays() : price}</span></p>
//                 </div>

//                 {/* Error/Success Messages */}
//                 {error && (
//                     <div className="text-sm text-red-600 bg-red-100 p-4 rounded-md shadow-md">
//                         {error}
//                     </div>
//                 )}
//                 {success && (
//                     <div className="text-sm text-green-600 bg-green-100 p-4 rounded-md shadow-md">
//                         {success}
//                     </div>
//                 )}

//                 {/* Submit Button */}
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"
//                 >
//                     Book Now
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default BookingForm;













import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBooking } from '../../api/bookingApi';
import Swal from 'sweetalert2';
import axios from 'axios';

const BookingForm = ({ price, roomId, capacity }) => {
    const navigate = useNavigate();

    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [userPhone, setUserPhone] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [coupons, setCoupons] = useState([]);
    const [selectedCoupon, setSelectedCoupon] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState(price);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (loggedInUser) {
            setUserPhone(loggedInUser.phone);
            setUserName(loggedInUser.name);
        }

        axios
            .get('http://localhost:6001/api/coupons/activeCoupons', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
            .then((response) => {
                if (response.data.success) {
                    setCoupons(response.data.data);
                } else {
                    console.error('Error fetching coupons');
                }
            })
            .catch((error) => {
                console.error('Error fetching coupons', error);
            });
    }, []);

    const calculateTotalDays = () => {
        const start = new Date(checkInDate);
        const end = new Date(checkOutDate);
        const diffTime = end - start;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const handleCouponChange = (e) => {
        const couponCode = e.target.value;
        setSelectedCoupon(couponCode);

        const coupon = coupons.find((coupon) => coupon.code === couponCode);
        if (coupon) {
            const totalDays = calculateTotalDays();
            const totalAmount = price * totalDays;
            const discount = (coupon.discountValue / 100) * totalAmount;
            setDiscountedPrice(totalAmount - discount);
        } else {
            setDiscountedPrice(price * calculateTotalDays());
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!checkInDate || !checkOutDate) {
            setError('Please select check-in and check-out dates.');
            return;
        }

        if (new Date(checkOutDate) <= new Date(checkInDate)) {
            setError('Check-out date must be after check-in date.');
            return;
        }

        if (numberOfGuests > capacity) {
            setError(`Number of guests cannot exceed the room capacity of ${capacity}.`);
            return;
        }

        const totalDays = calculateTotalDays();

        const bookingData = {
            roomId,
            checkInDate,
            checkOutDate,
            numberOfGuests,
            userPhone,
            userName,
            totalAmount: discountedPrice,
            couponCode: selectedCoupon,
        };

        try {
            await addBooking(bookingData);
            setSuccess('Booking successful! Redirecting to your bookings...');
            Swal.fire({
                icon: 'success',
                title: 'Booking Successful!',
                text: 'You will be redirected to your bookings shortly.',
            });
            setTimeout(() => navigate('/my-bookings'), 3000);
        } catch (err) {
            setError(err.message);
            Swal.fire({
                icon: 'error',
                title: 'Booking Failed!',
                text: 'There was an issue with your booking. Please try again later.',
            });
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-xl sticky top-24 mt-10 max-w-lg mx-auto">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Book Your Stay</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                    <input
                        type="date"
                        id="checkInDate"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                    <input
                        type="date"
                        id="checkOutDate"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        min={checkInDate || new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="numberOfGuests" className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
                    <input
                        type="number"
                        id="numberOfGuests"
                        value={numberOfGuests}
                        onChange={(e) => setNumberOfGuests(parseInt(e.target.value))}
                        min="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="userPhone" className="block text-sm font-medium text-gray-700 mb-2">Your Phone Number</label>
                    <input
                        type="text"
                        id="userPhone"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <input
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">Select Coupon (Optional)</label>
                    <select
                        id="coupon"
                        value={selectedCoupon}
                        onChange={handleCouponChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                    >
                        <option value="">--Select Coupon--</option>
                        {coupons.map((coupon) => (
                            <option key={coupon._id} value={coupon.code}>
                                {coupon.code} - {coupon.discountValue}% off
                            </option>
                        ))}
                    </select>
                </div>

                <div className="text-lg font-semibold text-gray-800">
                    <p>Total Price: <span className="text-blue-600">₹{discountedPrice}</span></p>
                </div>

                {error && (
                    <div className="text-sm text-red-600 bg-red-100 p-4 rounded-md shadow-md">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="text-sm text-green-600 bg-green-100 p-4 rounded-md shadow-md">
                        {success}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full py-3 px-6 bg-blue-500 text-white font-semibold text-lg rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                    Confirm Booking
                </button>
            </form>
        </div>
    );
};

export default BookingForm;