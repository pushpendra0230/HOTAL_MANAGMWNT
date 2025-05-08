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
  const [loading, setLoading] = useState(true);

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

  const handleAddRoom = (roomId) => {
    navigate(`/user/add-room/${roomId}`);
  };

  const activeHotels = hotels.filter(hotel => hotel.active);

  const filteredHotels = selectedState || selectedCity
    ? activeHotels.filter(hotel => hotel.state?.name === selectedState && hotel.city === selectedCity)
    : activeHotels;

  const filteredRooms = selectedHotel
    ? rooms.filter(room => room.hotel?._id === selectedHotel && room.active)
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-100 to-blue-100">
        <div className="text-2xl font-semibold text-indigo-700 animate-pulse">Loading hotels and rooms...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-12 drop-shadow-md">🏨 Explore Hotels & Rooms</h1>

      {user && (
        <div className="text-right mb-6">
          <button
            onClick={() => navigate('/my-bookings')}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow"
          >
            📘 My Bookings
          </button>
        </div>
      )}

      {/* State Dropdown */}
      <div className="mb-6">
        <select
          className="w-full p-3 rounded-lg border-2 border-gray-300"
          value={selectedState}
          onChange={handleStateChange}
        >
          <option value="">Select a State</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      {/* City Dropdown */}
      {selectedState && (
        <div className="mb-6">
          <select
            className="w-full p-3 rounded-lg border-2 border-gray-300"
            value={selectedCity}
            onChange={handleCityChange}
          >
            <option value="">Select a City</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      )}

      {/* Hotel Dropdown */}
      {selectedCity && (
        <div className="mb-6">
          <select
            className="w-full p-3 rounded-lg border-2 border-gray-300"
            value={selectedHotel}
            onChange={handleHotelChange}
          >
            <option value="">Select a Hotel</option>
            {filteredHotels.map(hotel => (
              <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Display Rooms or Hotels */}
      <div className="space-y-12">
        {selectedHotel ? (
          filteredRooms.length > 0 ? (
            filteredRooms.map(room => (
              <div
                key={room._id}
                className="bg-white border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow transform hover:scale-105"
              >
                {room.images?.[0] && (
                  <img
                    src={room.images[0]}
                    alt="Room"
                    className="h-48 w-full object-cover rounded-t-xl"
                  />
                )}
                <div className="p-4 space-y-2">
                  <p className="text-lg font-semibold text-indigo-700">Room Type: {room.type}</p>
                  <p className="text-gray-700">Room Number: #{room.roomNumber}</p>
                  <p className="text-green-600 font-medium">💸 Price: ₹{room.price}</p>
                  <p className="text-gray-600">AC: {room.isAc ? '✅ Yes' : '❌ No'}</p>
                  {/* Add Room Button for Each Room */}
                  <div className="text-right mt-4">
                    <button
                      onClick={() => handleAddRoom(room._id)} // Pass room ID
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow"
                    >
                      ➕ Add Room
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-red-500">No active rooms available for this hotel.</p>
          )
        ) : (
          filteredHotels.map(hotel => (
            <div
              key={hotel._id}
              className="bg-white border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-4">
                <h2 className="text-xl font-semibold">{hotel.name}</h2>
                <p className="text-gray-600">📍 {hotel.city}, {hotel.state?.name}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default User;