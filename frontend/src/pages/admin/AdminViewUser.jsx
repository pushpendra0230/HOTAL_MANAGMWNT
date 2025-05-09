// // src/pages/admin/AdminViewUser.jsx
// import React from 'react';
// import MyBookings from '../users/MyBookings';

// const AdminViewUser = () => {
//     return (
//         <div className="bg-gray-100 min-h-screen p-6">
//             <h1 className="text-2xl font-bold text-indigo-700 mb-4">👁️ Admin View: User Bookings</h1>
//             <div className="bg-white p-4 rounded-lg shadow">
//                 <MyBookings isAdminView={true} />
//             </div>
//         </div>
//     );
// };

// export default AdminViewUser;







import React, { useState } from 'react';
import User from '../users/user';
import AddRoomPage from '../users/AddRoomPage';
import BookingForm from '../users/BookingForm';
import MyBookings from '../users/MyBookings';

const AdminViewUser = () => {
    const [screen, setScreen] = useState('dashboard');
    const [roomId, setRoomId] = useState('demo-room-123');

    const navigateTo = (target, newRoomId = '') => {
        if (newRoomId) setRoomId(newRoomId);
        setScreen(target);
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-2xl font-bold text-indigo-700 mb-6">
                👁️ Admin: Simulated User View
            </h1>

            {/* Simulated Navbar */}
            <div className="flex gap-3 mb-6 flex-wrap">
                <button onClick={() => navigateTo('dashboard')} className="bg-blue-600 text-white px-4 py-2 rounded">
                    🧭 User Dashboard
                </button>
                <button onClick={() => navigateTo('my-bookings')} className="bg-green-600 text-white px-4 py-2 rounded">
                    📅 My Bookings
                </button>
                <button onClick={() => navigateTo('book-room', 'demo-room-123')} className="bg-purple-600 text-white px-4 py-2 rounded">
                    📝 Book Room
                </button>
            </div>

            <div className="bg-white p-4 rounded shadow">
                {screen === 'dashboard' && (
                    <User
                        goToBookings={() => navigateTo('my-bookings')}
                        goToBookRoom={(id) => navigateTo('book-room', id)}
                    />
                )}
                {screen === 'my-bookings' && <MyBookings />}
                {screen === 'add-room' && <AddRoomPage roomId={roomId} />}
                {screen === 'book-room' && <BookingForm roomId={roomId} />}
            </div>
        </div>
    );
};

export default AdminViewUser;