// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { addBooking } from '../../api/bookingApi';

// const BookingForm = ({ price, roomId, capacity }) => {
//     const navigate = useNavigate();

//     const [checkInDate, setCheckInDate] = useState('');
//     const [checkOutDate, setCheckOutDate] = useState('');
//     const [numberOfGuests, setNumberOfGuests] = useState(1);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

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
//             userPhone: '85214632', // hardcoded or replace with user input
//             userName: 'DJ',         // same as above — placeholder for now
//             totalAmount,
//         };

//         try {
//             await addBooking(bookingData);
//             setSuccess('Booking successful! Redirecting to your bookings...');
//             setTimeout(() => navigate('/my-bookings'), 3000);
//         } catch (err) {
//             setError(err.message);
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









import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBooking } from '../../api/bookingApi';
import Swal from 'sweetalert2';

const BookingForm = ({ price, roomId, capacity }) => {
    const navigate = useNavigate();

    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [userPhone, setUserPhone] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (loggedInUser) {
            setUserPhone(loggedInUser.phone);
            setUserName(loggedInUser.name);
        }
    }, []);

    const calculateTotalDays = () => {
        const start = new Date(checkInDate);
        const end = new Date(checkOutDate);
        const diffTime = end - start;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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
        const totalAmount = price * totalDays;

        const bookingData = {
            roomId,
            checkInDate,
            checkOutDate,
            numberOfGuests,
            userPhone,
            userName,
            totalAmount,
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
        <div className="bg-white p-6 rounded-xl shadow-lg sticky top-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Your Stay</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                    <input
                        type="date"
                        id="checkInDate"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                    <input
                        type="date"
                        id="checkOutDate"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        min={checkInDate || new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="numberOfGuests" className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                    <input
                        type="number"
                        id="numberOfGuests"
                        value={numberOfGuests}
                        onChange={(e) => setNumberOfGuests(parseInt(e.target.value))}
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="userPhone" className="block text-sm font-medium text-gray-700 mb-1">Your Phone Number</label>
                    <input
                        type="text"
                        id="userPhone"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div className="text-lg font-semibold text-gray-800">
                    Total Price: <span className="text-blue-600">₹{checkInDate && checkOutDate ? price * calculateTotalDays() : price}</span>
                </div>
                {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
                {success && <p className="text-sm text-green-600 bg-green-100 p-3 rounded-md">{success}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                >
                    Book Now
                </button>
            </form>
        </div>
    );
};

export default BookingForm;