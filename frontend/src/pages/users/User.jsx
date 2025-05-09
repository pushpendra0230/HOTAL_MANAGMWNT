// import React, { useEffect, useState } from 'react';
// import { getHotels } from '../../api/hotelApi';
// import { getRooms } from '../../api/roomApi';

// const User = () => {
//   const [hotels, setHotels] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedState, setSelectedState] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');
//   const [selectedHotel, setSelectedHotel] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHotelsAndRooms = async () => {
//       try {
//         const [hotelRes, roomRes] = await Promise.all([getHotels(), getRooms()]);
//         setHotels(hotelRes.data);
//         setRooms(roomRes.data);

//         const uniqueStates = [...new Set(hotelRes.data.map(hotel => hotel.state?.name))];
//         setStates(uniqueStates);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHotelsAndRooms();
//   }, []);

//   useEffect(() => {
//     if (selectedState) {
//       const filteredCities = [...new Set(hotels.filter(hotel => hotel.state?.name === selectedState).map(hotel => hotel.city))];
//       setCities(filteredCities);
//     }
//   }, [selectedState, hotels]);

//   const handleStateChange = (e) => {
//     setSelectedState(e.target.value);
//     setSelectedCity('');
//     setSelectedHotel('');
//   };

//   const handleCityChange = (e) => {
//     setSelectedCity(e.target.value);
//     setSelectedHotel('');
//   };

//   const handleHotelChange = (e) => {
//     setSelectedHotel(e.target.value);
//   };

//   // Filter hotels with rooms and active
//   const hotelsWithRooms = hotels.filter(hotel =>
//     hotel.active &&
//     rooms.some(room => room.hotel?._id === hotel._id && room.active)
//   );

//   const filteredHotels = selectedState || selectedCity
//     ? hotelsWithRooms.filter(hotel => hotel.state?.name === selectedState && hotel.city === selectedCity)
//     : hotelsWithRooms;

//   const filteredRooms = selectedHotel
//     ? rooms.filter(room => room.hotel?._id === selectedHotel && room.active)
//     : [];

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-100 to-blue-100">
//         <div className="text-2xl font-semibold text-indigo-700 animate-pulse">Loading hotels and rooms...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gradient-to-b from-blue-50 to-white min-h-screen">
//       <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-12 drop-shadow-md">🏨 Explore Hotels & Rooms</h1>

//       {/* State Dropdown */}
//       <div className="mb-6">
//         <select
//           className="w-full p-3 rounded-lg border-2 border-gray-300"
//           value={selectedState}
//           onChange={handleStateChange}
//         >
//           <option value="">Select a State</option>
//           {states.map(state => (
//             <option key={state} value={state}>{state}</option>
//           ))}
//         </select>
//       </div>

//       {/* City Dropdown */}
//       {selectedState && (
//         <div className="mb-6">
//           <select
//             className="w-full p-3 rounded-lg border-2 border-gray-300"
//             value={selectedCity}
//             onChange={handleCityChange}
//           >
//             <option value="">Select a City</option>
//             {cities.map(city => (
//               <option key={city} value={city}>{city}</option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Hotel Dropdown */}
//       {selectedCity && (
//         <div className="mb-6">
//           <select
//             className="w-full p-3 rounded-lg border-2 border-gray-300"
//             value={selectedHotel}
//             onChange={handleHotelChange}
//           >
//             <option value="">Select a Hotel</option>
//             {filteredHotels.map(hotel => (
//               <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Display Rooms or Hotels */}
//       <div className="space-y-12">
//         {selectedHotel ? (
//           filteredRooms.map(room => (
//             <div
//               key={room._id}
//               className="bg-white border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow transform hover:scale-105"
//             >
//               {room.images?.[0] && (
//                 <img
//                   src={room.images[0]}
//                   alt="Room"
//                   className="h-48 w-full object-cover rounded-t-xl"
//                 />
//               )}
//               <div className="p-4 space-y-2">
//                 <p className="text-lg font-semibold text-indigo-700">Room Type: {room.type}</p>
//                 <p className="text-gray-700">Room Number: #{room.roomNumber}</p>
//                 <p className="text-green-600 font-medium">💸 Price: ₹{room.price}</p>
//                 <p className="text-gray-600">AC: {room.isAc ? '✅ Yes' : '❌ No'}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           filteredHotels.map(hotel => (
//             <div
//               key={hotel._id}
//               className="bg-white border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
//             >
//               <div className="p-4">
//                 <h2 className="text-xl font-semibold">{hotel.name}</h2>
//                 <p className="text-gray-600">📍 {hotel.city}, {hotel.state?.name}</p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default User;







// import React, { useEffect, useState } from 'react';
// import { getHotels } from '../../api/hotelApi';
// import { getRooms } from '../../api/roomApi';
// import { useNavigate } from "react-router-dom";

// const User = () => {
//   const [hotels, setHotels] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedState, setSelectedState] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');
//   const [selectedHotel, setSelectedHotel] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHotelsAndRooms = async () => {
//       try {
//         const [hotelRes, roomRes] = await Promise.all([getHotels(), getRooms()]);
//         setHotels(hotelRes.data);
//         setRooms(roomRes.data);

//         const uniqueStates = [...new Set(hotelRes.data.map(hotel => hotel.state?.name))];
//         setStates(uniqueStates);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHotelsAndRooms();
//   }, []);

//   useEffect(() => {
//     if (selectedState) {
//       const filteredCities = [...new Set(hotels.filter(hotel => hotel.state?.name === selectedState).map(hotel => hotel.city))];
//       setCities(filteredCities);
//     }
//   }, [selectedState, hotels]);

//   const handleStateChange = (e) => {
//     setSelectedState(e.target.value);
//     setSelectedCity('');
//     setSelectedHotel('');
//   };

//   const handleCityChange = (e) => {
//     setSelectedCity(e.target.value);
//     setSelectedHotel('');
//   };

//   const handleHotelChange = (e) => {
//     setSelectedHotel(e.target.value);
//   };

//   const navigate = useNavigate();

//   const handleAddRoom = (hotelId) => {
//     // Use the navigate function for client-side navigation
//     navigate(`/user/add-room/${hotelId}`);
//   };

//   // Show all active hotels (even if they have no rooms)
//   const activeHotels = hotels.filter(hotel => hotel.active);

//   const filteredHotels = selectedState || selectedCity
//     ? activeHotels.filter(hotel => hotel.state?.name === selectedState && hotel.city === selectedCity)
//     : activeHotels;

//   const filteredRooms = selectedHotel
//     ? rooms.filter(room => room.hotel?._id === selectedHotel && room.active)
//     : [];

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-100 to-blue-100">
//         <div className="text-2xl font-semibold text-indigo-700 animate-pulse">Loading hotels and rooms...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gradient-to-b from-blue-50 to-white min-h-screen">
//       <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-12 drop-shadow-md">🏨 Explore Hotels & Rooms</h1>

//       {/* State Dropdown */}
//       <div className="mb-6">
//         <select
//           className="w-full p-3 rounded-lg border-2 border-gray-300"
//           value={selectedState}
//           onChange={handleStateChange}
//         >
//           <option value="">Select a State</option>
//           {states.map(state => (
//             <option key={state} value={state}>{state}</option>
//           ))}
//         </select>
//       </div>

//       {/* City Dropdown */}
//       {selectedState && (
//         <div className="mb-6">
//           <select
//             className="w-full p-3 rounded-lg border-2 border-gray-300"
//             value={selectedCity}
//             onChange={handleCityChange}
//           >
//             <option value="">Select a City</option>
//             {cities.map(city => (
//               <option key={city} value={city}>{city}</option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Hotel Dropdown */}
//       {selectedCity && (
//         <div className="mb-6">
//           <select
//             className="w-full p-3 rounded-lg border-2 border-gray-300"
//             value={selectedHotel}
//             onChange={handleHotelChange}
//           >
//             <option value="">Select a Hotel</option>
//             {filteredHotels.map(hotel => (
//               <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
//             ))}
//           </select>
//         </div>
//       )}

//       {selectedHotel && (
//         <div className="mb-6 text-right">
//           <button
//             onClick={() => handleAddRoom(selectedHotel)}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow"
//           >
//             ➕ Add Room
//           </button>
//         </div>
//       )}

//       {/* Display Rooms or Hotels */}
//       <div className="space-y-12">
//         {selectedHotel ? (
//           filteredRooms.length > 0 ? (
//             filteredRooms.map(room => (
//               <div
//                 key={room._id}
//                 className="bg-white border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow transform hover:scale-105"
//               >
//                 {room.images?.[0] && (
//                   <img
//                     src={room.images[0]}
//                     alt="Room"
//                     className="h-48 w-full object-cover rounded-t-xl"
//                   />
//                 )}
//                 <div className="p-4 space-y-2">
//                   <p className="text-lg font-semibold text-indigo-700">Room Type: {room.type}</p>
//                   <p className="text-gray-700">Room Number: #{room.roomNumber}</p>
//                   <p className="text-green-600 font-medium">💸 Price: ₹{room.price}</p>
//                   <p className="text-gray-600">AC: {room.isAc ? '✅ Yes' : '❌ No'}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-red-500">No active rooms available for this hotel.</p>
//           )
//         ) : (
//           filteredHotels.map(hotel => (
//             <div
//               key={hotel._id}
//               className="bg-white border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
//             >
//               <div className="p-4">
//                 <h2 className="text-xl font-semibold">{hotel.name}</h2>
//                 <p className="text-gray-600">📍 {hotel.city}, {hotel.state?.name}</p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default User;





// import React, { useEffect, useState } from 'react';
// import { getHotels } from '../../api/hotelApi';
// import { getRooms } from '../../api/roomApi';
// import { useNavigate } from "react-router-dom";

// const User = () => {
//   const [hotels, setHotels] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedState, setSelectedState] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');
//   const [selectedHotel, setSelectedHotel] = useState('');
//   const [loading, setLoading] = useState(true);

//   const user = JSON.parse(localStorage.getItem('user'));
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchHotelsAndRooms = async () => {
//       try {
//         const [hotelRes, roomRes] = await Promise.all([getHotels(), getRooms()]);
//         setHotels(hotelRes.data);
//         setRooms(roomRes.data);

//         // Extract unique states
//         const uniqueStates = [...new Set(hotelRes.data.map(hotel => hotel.state?.name))];
//         setStates(uniqueStates);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHotelsAndRooms();
//   }, []);

//   useEffect(() => {
//     if (selectedState) {
//       // Filter cities based on selected state
//       const filteredCities = [...new Set(hotels.filter(hotel => hotel.state?.name === selectedState).map(hotel => hotel.city))];
//       setCities(filteredCities);
//     }
//   }, [selectedState, hotels]);

//   const handleStateChange = (e) => {
//     setSelectedState(e.target.value);
//     setSelectedCity('');
//     setSelectedHotel('');
//   };

//   const handleCityChange = (e) => {
//     setSelectedCity(e.target.value);
//     setSelectedHotel('');
//   };

//   const handleHotelChange = (e) => {
//     setSelectedHotel(e.target.value);
//   };

//   const handleAddRoom = (roomId) => {
//     navigate(`/user/add-room/${roomId}`);
//   };

//   // Show all active hotels (even if they have no rooms)
//   const activeHotels = hotels.filter(hotel => hotel.active);

//   const filteredHotels = selectedState || selectedCity
//     ? activeHotels.filter(hotel => hotel.state?.name === selectedState && hotel.city === selectedCity)
//     : activeHotels;

//   // Filter rooms based on selected hotel
//   const filteredRooms = selectedHotel
//     ? rooms.filter(room => room.hotel?._id === selectedHotel && room.active)
//     : [];

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-100 to-blue-100">
//         <div className="text-2xl font-semibold text-indigo-700 animate-pulse">Loading hotels and rooms...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gradient-to-b from-blue-50 to-white min-h-screen">
//       <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-12 drop-shadow-md">🏨 Explore Hotels & Rooms</h1>

//       {user && (
//         <div className="text-right mb-6">
//           <button
//             onClick={() => navigate('/my-bookings')}
//             className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow"
//           >
//             📘 My Bookings
//           </button>
//         </div>
//       )}

//       {/* State Dropdown */}
//       <div className="mb-6">
//         <select
//           className="w-full p-3 rounded-lg border-2 border-gray-300"
//           value={selectedState}
//           onChange={handleStateChange}
//         >
//           <option value="">Select a State</option>
//           {states.map(state => (
//             <option key={state} value={state}>{state}</option>
//           ))}
//         </select>
//       </div>

//       {/* City Dropdown */}
//       {selectedState && (
//         <div className="mb-6">
//           <select
//             className="w-full p-3 rounded-lg border-2 border-gray-300"
//             value={selectedCity}
//             onChange={handleCityChange}
//           >
//             <option value="">Select a City</option>
//             {cities.map(city => (
//               <option key={city} value={city}>{city}</option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Hotel Dropdown */}
//       {selectedCity && (
//         <div className="mb-6">
//           <select
//             className="w-full p-3 rounded-lg border-2 border-gray-300"
//             value={selectedHotel}
//             onChange={handleHotelChange}
//           >
//             <option value="">Select a Hotel</option>
//             {filteredHotels.map(hotel => (
//               <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Display Rooms or Hotels */}
//       <div className="space-y-12">
//         {selectedHotel ? (
//           filteredRooms.length > 0 ? (
//             filteredRooms.map(room => (
//               <div
//                 key={room._id}
//                 className="bg-white border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow transform hover:scale-105"
//               >
//                 {room.images?.[0] && (
//                   <img
//                     src={room.images[0]}
//                     alt="Room"
//                     className="h-48 w-full object-cover rounded-t-xl"
//                   />
//                 )}
//                 <div className="p-4 space-y-2">
//                   <p className="text-lg font-semibold text-indigo-700">Room Type: {room.type}</p>
//                   <p className="text-gray-700">Room Number: #{room.roomNumber}</p>
//                   <p className="text-green-600 font-medium">💸 Price: ₹{room.price}</p>
//                   <p className="text-gray-600">AC: {room.isAc ? '✅ Yes' : '❌ No'}</p>
//                   {/* Add Room Button for Each Room */}
//                   <div className="text-right mt-4">
//                     <button
//                       onClick={() => handleAddRoom(room._id)} // Pass room ID
//                       className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow"
//                     >
//                       ➕ Add Room
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-red-500">No active rooms available for this hotel.</p>
//           )
//         ) : (
//           filteredHotels.map(hotel => (
//             <div
//               key={hotel._id}
//               className="bg-white border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
//             >
//               <div className="p-4">
//                 <h2 className="text-xl font-semibold">{hotel.name}</h2>
//                 <p className="text-gray-600">📍 {hotel.city}, {hotel.state?.name}</p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default User;








// import React, { useEffect, useState } from 'react';
// import { getHotels } from '../../api/hotelApi';
// import { getRooms } from '../../api/roomApi';
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const User = () => {
//   const [hotels, setHotels] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedState, setSelectedState] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');
//   const [selectedHotel, setSelectedHotel] = useState('');
//   const [loading, setLoading] = useState(true);

//   const user = JSON.parse(localStorage.getItem('user'));
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchHotelsAndRooms = async () => {
//       try {
//         const [hotelRes, roomRes] = await Promise.all([getHotels(), getRooms()]);
//         setHotels(hotelRes.data);
//         setRooms(roomRes.data);

//         // Extract unique states
//         const uniqueStates = [...new Set(hotelRes.data.map(hotel => hotel.state?.name))];
//         setStates(uniqueStates);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: `Failed to load hotels and rooms: ${error.message}`,
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHotelsAndRooms();
//   }, []);

//   useEffect(() => {
//     if (selectedState) {
//       const filteredCities = [...new Set(hotels.filter(hotel => hotel.state?.name === selectedState).map(hotel => hotel.city))];
//       setCities(filteredCities);
//     }
//   }, [selectedState, hotels]);

//   const handleStateChange = (e) => {
//     setSelectedState(e.target.value);
//     setSelectedCity('');
//     setSelectedHotel('');
//   };

//   const handleCityChange = (e) => {
//     setSelectedCity(e.target.value);
//     setSelectedHotel('');
//   };

//   const handleHotelChange = (e) => {
//     setSelectedHotel(e.target.value);
//   };

//   const handleAddRoom = (roomId) => {
//     navigate(`/user/add-room/${roomId}`);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     navigate('/');
//   };

//   const activeHotels = hotels.filter(hotel => hotel.active);

//   const filteredHotels = selectedState || selectedCity
//     ? activeHotels.filter(hotel => hotel.state?.name === selectedState && hotel.city === selectedCity)
//     : activeHotels;

//   const filteredRooms = selectedHotel
//     ? rooms.filter(room => room.hotel?._id === selectedHotel && room.active)
//     : [];

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-100 to-blue-100">
//         <div className="text-2xl font-semibold text-indigo-700 animate-pulse">Loading hotels and rooms...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 bg-gradient-to-b from-blue-50 to-white min-h-screen">
//       <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-10 drop-shadow">🏨 Explore Hotels & Rooms</h1>

//       {user && (
//         <div className="flex justify-end mb-6 gap-2">
//           <button
//             onClick={() => navigate('/my-bookings')}
//             className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full shadow-md transition"
//           >
//             📘 My Bookings
//           </button>
//           <button
//             onClick={handleLogout}
//             className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full shadow-md transition"
//           >
//             🚪 Logout
//           </button>
//         </div>
//       )}

//       {/* Dropdowns Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//         <select
//           className="p-3 rounded-xl border border-gray-300 shadow-sm"
//           value={selectedState}
//           onChange={handleStateChange}
//         >
//           <option value="">Select a State</option>
//           {states.map(state => (
//             <option key={state} value={state}>{state}</option>
//           ))}
//         </select>

//         {selectedState && (
//           <select
//             className="p-3 rounded-xl border border-gray-300 shadow-sm"
//             value={selectedCity}
//             onChange={handleCityChange}
//           >
//             <option value="">Select a City</option>
//             {cities.map(city => (
//               <option key={city} value={city}>{city}</option>
//             ))}
//           </select>
//         )}

//         {selectedCity && (
//           <select
//             className="p-3 rounded-xl border border-gray-300 shadow-sm"
//             value={selectedHotel}
//             onChange={handleHotelChange}
//           >
//             <option value="">Select a Hotel</option>
//             {filteredHotels.map(hotel => (
//               <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
//             ))}
//           </select>
//         )}
//       </div>

//       {/* Display Section */}
//       <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//         {selectedHotel ? (
//           filteredRooms.length > 0 ? (
//             filteredRooms.map(room => (
//               <div
//                 key={room._id}
//                 className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
//               >
//                 {room.images?.[0] && (
//                   <img
//                     src={room.images[0]}
//                     alt="Room"
//                     className="w-full h-48 object-cover"
//                   />
//                 )}
//                 <div className="p-4 space-y-2">
//                   <h3 className="text-lg font-semibold text-indigo-700">Room Type: {room.type}</h3>
//                   <p className="text-gray-700">Room No: #{room.roomNumber}</p>
//                   <p className="text-green-600 font-medium">💸 Price: ₹{room.price}</p>
//                   <p className="text-gray-600">AC: {room.isAc ? '✅ Yes' : '❌ No'}</p>
//                   <div className="text-right pt-3">
//                     <button
//                       onClick={() => handleAddRoom(room._id)}
//                       className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition"
//                     >
//                       ➕ Add Room
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-red-500 col-span-full">No active rooms available for this hotel.</p>
//           )
//         ) : (
//           filteredHotels.map(hotel => (
//             <div
//               key={hotel._id}
//               className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4"
//             >
//               <h2 className="text-xl font-semibold text-indigo-700">{hotel.name}</h2>
//               <p className="text-gray-600">📍 {hotel.city}, {hotel.state?.name}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default User;










// import React, { useEffect, useState } from 'react';
// import { getHotels } from '../../api/hotelApi';
// import { getRooms } from '../../api/roomApi';
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const User = () => {
//   const [hotels, setHotels] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedState, setSelectedState] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');
//   const [selectedHotel, setSelectedHotel] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [stateSort, setStateSort] = useState('asc');
//   const [hotelSort, setHotelSort] = useState('asc');

//   const user = JSON.parse(localStorage.getItem('user'));
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchHotelsAndRooms = async () => {
//       try {
//         const [hotelRes, roomRes] = await Promise.all([getHotels(), getRooms()]);
//         setHotels(hotelRes.data);
//         setRooms(roomRes.data);

//         const uniqueStates = [...new Set(hotelRes.data.map(hotel => hotel.state?.name))];
//         setStates(uniqueStates);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: `Failed to load hotels and rooms: ${error.message}`,
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHotelsAndRooms();
//   }, []);

//   useEffect(() => {
//     if (selectedState) {
//       const filteredCities = [...new Set(hotels.filter(hotel => hotel.state?.name === selectedState).map(hotel => hotel.city))];
//       setCities(filteredCities);
//     } else {
//       setCities([]);
//     }
//   }, [selectedState, hotels]);

//   const handleStateChange = (e) => {
//     setSelectedState(e.target.value);
//     setSelectedCity('');
//     setSelectedHotel('');
//   };

//   const handleCityChange = (e) => {
//     setSelectedCity(e.target.value);
//     setSelectedHotel('');
//   };

//   const handleHotelChange = (e) => {
//     setSelectedHotel(e.target.value);
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleAddRoom = (roomId) => {
//     navigate(`/user/add-room/${roomId}`);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     navigate('/');
//   };

//   const activeHotels = hotels.filter(hotel => hotel.active);

//   const filteredHotels = activeHotels.filter(hotel => {
//     return (
//       (!selectedState || hotel.state?.name === selectedState) &&
//       (!selectedCity || hotel.city === selectedCity) &&
//       hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   });

//   const filteredRooms = selectedHotel
//     ? rooms.filter(room => room.hotel?._id === selectedHotel && room.active)
//     : [];

//   const sortedStates = stateSort === 'asc' ? [...states].sort() : [...states].sort().reverse();

//   const sortedHotels = hotelSort === 'asc'
//     ? [...filteredHotels].sort((a, b) => a.name.localeCompare(b.name))
//     : [...filteredHotels].sort((a, b) => b.name.localeCompare(a.name));

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-100 to-blue-100">
//         <div className="text-2xl font-semibold text-indigo-700 animate-pulse">Loading hotels and rooms...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 bg-gradient-to-b from-blue-50 to-white min-h-screen">
//       <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-10 drop-shadow">🏨 Explore Hotels & Rooms</h1>

//       {user && (
//         <div className="flex justify-end mb-6 gap-2">
//           <button
//             onClick={() => navigate('/my-bookings')}
//             className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full shadow-md transition"
//           >
//             📘 My Bookings
//           </button>
//           <button
//             onClick={handleLogout}
//             className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full shadow-md transition"
//           >
//             🚪 Logout
//           </button>
//         </div>
//       )}

//       <div className="mb-8 flex justify-center">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={handleSearchChange}
//           placeholder="Search Hotels..."
//           className="p-3 rounded-xl border border-gray-300 shadow-sm w-full max-w-md"
//         />
//       </div>

//       <div className="mb-8 flex justify-center gap-4">
//         {/* Sort by State */}
//         <div className="flex items-center gap-2">
//           <label>Sort by State:</label>
//           <select
//             value={stateSort}
//             onChange={(e) => setStateSort(e.target.value)}
//             className="p-3 rounded-xl border border-gray-300 shadow-sm"
//           >
//             <option value="asc">A to Z</option>
//             <option value="desc">Z to A</option>
//           </select>
//         </div>

//         <div className="flex items-center gap-2">
//           <label>Sort by Hotel:</label>
//           <select
//             value={hotelSort}
//             onChange={(e) => setHotelSort(e.target.value)}
//             className="p-3 rounded-xl border border-gray-300 shadow-sm"
//           >
//             <option value="asc">A to Z</option>
//             <option value="desc">Z to A</option>
//           </select>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//         <select
//           className="p-3 rounded-xl border border-gray-300 shadow-sm"
//           value={selectedState}
//           onChange={handleStateChange}
//         >
//           <option value="">Select a State</option>
//           {sortedStates.map(state => (
//             <option key={state} value={state}>{state}</option>
//           ))}
//         </select>

//         <select
//           className="p-3 rounded-xl border border-gray-300 shadow-sm"
//           value={selectedCity}
//           onChange={handleCityChange}
//           disabled={!selectedState}
//         >
//           <option value="">Select a City</option>
//           {cities.map(city => (
//             <option key={city} value={city}>{city}</option>
//           ))}
//         </select>

//         <select
//           className="p-3 rounded-xl border border-gray-300 shadow-sm"
//           value={selectedHotel}
//           onChange={handleHotelChange}
//           disabled={!selectedCity}
//         >
//           <option value="">Select a Hotel</option>
//           {sortedHotels.map(hotel => (
//             <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
//           ))}
//         </select>
//       </div>

//       <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//         {selectedHotel ? (
//           filteredRooms.length > 0 ? (
//             filteredRooms.map(room => (
//               <div
//                 key={room._id}
//                 className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
//               >
//                 {room.images?.[0] && (
//                   <img
//                     src={room.images[0]}
//                     alt="Room"
//                     className="w-full h-48 object-cover"
//                   />
//                 )}
//                 <div className="p-4 space-y-2">
//                   <h3 className="text-lg font-semibold text-indigo-700">Room Type: {room.type}</h3>
//                   <p className="text-gray-700">Room No: #{room.roomNumber}</p>
//                   <p className="text-green-600 font-medium">💸 Price: ₹{room.price}</p>
//                   <p className="text-gray-600">AC: {room.isAc ? '✅ Yes' : '❌ No'}</p>
//                   <div className="text-right pt-3">
//                     <button
//                       onClick={() => handleAddRoom(room._id)}
//                       className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition"
//                     >
//                       ➕ Add Room
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-red-500 col-span-full">No active rooms available for this hotel.</p>
//           )
//         ) : (
//           sortedHotels.map(hotel => (
//             <div
//               key={hotel._id}
//               className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4"
//             >
//               <h2 className="text-xl font-semibold text-indigo-700">{hotel.name}</h2>
//               <p className="text-gray-600">📍 {hotel.city}, {hotel.state?.name}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default User;















import React, { useEffect, useState } from 'react';
import { getHotels } from '../../api/hotelApi';
import { getRooms } from '../../api/roomApi';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const User = () => {
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedHotel, setSelectedHotel] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [stateSort, setStateSort] = useState('asc');
  const [hotelSort, setHotelSort] = useState('asc');

  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotelsAndRooms = async () => {
      try {
        const [hotelRes, roomRes] = await Promise.all([getHotels(), getRooms()]);
        setHotels(hotelRes.data);
        setRooms(roomRes.data);

        // Extract unique states
        const uniqueStates = [...new Set(hotelRes.data.map(hotel => hotel.state?.name))];
        setStates(uniqueStates);
      } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to load hotels and rooms: ${error.message}`,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHotelsAndRooms();
  }, []);

  useEffect(() => {
    if (selectedState) {
      const filteredCities = [...new Set(hotels.filter(hotel => hotel.state?.name === selectedState).map(hotel => hotel.city))];
      setCities(filteredCities);
    } else {
      setCities([]);
    }
  }, [selectedState, hotels]);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity('');
    setSelectedHotel('');
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedHotel('');
  };

  const handleHotelChange = (e) => {
    setSelectedHotel(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddRoom = (roomId) => {
    navigate(`/user/add-room/${roomId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const activeHotels = hotels.filter(hotel => hotel.active);

  const filteredHotels = activeHotels.filter(hotel => {
    return (
      (!selectedState || hotel.state?.name === selectedState) &&
      (!selectedCity || hotel.city === selectedCity) &&
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const filteredRooms = selectedHotel
    ? rooms.filter(room => room.hotel?._id === selectedHotel && room.active)
    : rooms.filter(room => room.active);  // Show all rooms if no hotel is selected

  const sortedStates = stateSort === 'asc' ? [...states].sort() : [...states].sort().reverse();

  const sortedHotels = hotelSort === 'asc'
    ? [...filteredHotels].sort((a, b) => a.name.localeCompare(b.name))
    : [...filteredHotels].sort((a, b) => b.name.localeCompare(a.name));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-100 to-blue-100">
        <div className="text-2xl font-semibold text-indigo-700 animate-pulse">Loading hotels and rooms...</div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-10 drop-shadow">🏨 Explore Hotels & Rooms</h1>

      {user && (
        <div className="flex justify-end mb-6 gap-2">
          <button
            onClick={() => navigate('/my-bookings')}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full shadow-md transition"
          >
            📘 My Bookings
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full shadow-md transition"
          >
            🚪 Logout
          </button>
        </div>
      )}

      <div className="mb-8 flex justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search Hotels..."
          className="p-3 rounded-xl border border-gray-300 shadow-sm w-full max-w-md"
        />
      </div>

      <div className="mb-8 flex justify-center gap-4">
        {/* Sort by State */}
        <div className="flex items-center gap-2">
          <label>Sort by State:</label>
          <select
            value={stateSort}
            onChange={(e) => setStateSort(e.target.value)}
            className="p-3 rounded-xl border border-gray-300 shadow-sm"
          >
            <option value="asc">A to Z</option>
            <option value="desc">Z to A</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label>Sort by Hotel:</label>
          <select
            value={hotelSort}
            onChange={(e) => setHotelSort(e.target.value)}
            className="p-3 rounded-xl border border-gray-300 shadow-sm"
          >
            <option value="asc">A to Z</option>
            <option value="desc">Z to A</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <select
          className="p-3 rounded-xl border border-gray-300 shadow-sm"
          value={selectedState}
          onChange={handleStateChange}
        >
          <option value="">Select a State</option>
          {sortedStates.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <select
          className="p-3 rounded-xl border border-gray-300 shadow-sm"
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedState}
        >
          <option value="">Select a City</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <select
          className="p-3 rounded-xl border border-gray-300 shadow-sm"
          value={selectedHotel}
          onChange={handleHotelChange}
          disabled={!selectedCity}
        >
          <option value="">Select a Hotel</option>
          {sortedHotels.map(hotel => (
            <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {selectedHotel ? (
          filteredRooms.length > 0 ? (
            filteredRooms.map(room => (
              <div
                key={room._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
              >
                {room.images?.[0] && (
                  <img
                    src={room.images[0]}
                    alt="Room"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-indigo-700">Room Type: {room.type}</h3>
                  <p className="text-gray-700">Room No: #{room.roomNumber}</p>
                  <p className="text-green-600 font-medium">💸 Price: ₹{room.price}</p>
                  <p className="text-gray-600">AC: {room.isAc ? '✅ Yes' : '❌ No'}</p>
                  <div className="text-right pt-3">
                    <button
                      onClick={() => handleAddRoom(room._id)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition"
                    >
                      ➕ Add Room
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-red-500 col-span-full">No active rooms available for this hotel.</p>
          )
        ) : (
          sortedHotels.map(hotel => (
            <div
              key={hotel._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4"
            >
              <h2 className="text-xl font-semibold text-indigo-700">{hotel.name}</h2>
              <p className="text-gray-600">📍 {hotel.city}, {hotel.state?.name}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default User;