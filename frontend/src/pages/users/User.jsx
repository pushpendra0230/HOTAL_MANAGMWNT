// import React, { useEffect, useState } from "react";
// import { getStates } from "../../api/stateApi";
// import { getHotels } from "../../api/hotelApi";
// import { getRooms } from "../../api/roomApi";

// const User = () => {
//   const [states, setStates] = useState([]);
//   const [hotels, setHotels] = useState([]);
//   const [rooms, setRooms] = useState([]);

//   const [selectedState, setSelectedState] = useState("");
//   const [selectedHotel, setSelectedHotel] = useState("");

//   const [filteredHotels, setFilteredHotels] = useState([]);
//   const [filteredRooms, setFilteredRooms] = useState([]);

//   // Fetch all states on load
//   useEffect(() => {
//     const fetchStates = async () => {
//       try {
//         console.log("Fetching states...");
//         const response = await getStates();
//         console.log("States response:", response.data);
//         setStates(response.data.data || []);  // Update here
//       } catch (error) {
//         console.error("Error fetching states:", error);
//       }
//     };

//     fetchStates();
//   }, []);

//   // Fetch all hotels
//   useEffect(() => {
//     const fetchHotels = async () => {
//       try {
//         console.log("Fetching hotels...");
//         const response = await getHotels();
//         console.log("Hotels response:", response.data);
//         setHotels(response.data.hotels || []);  // Correct the data structure
//       } catch (error) {
//         console.error("Error fetching hotels:", error);
//       }
//     };

//     fetchHotels();
//   }, []);

//   // Fetch all rooms
//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         console.log("Fetching rooms...");
//         const response = await getRooms();
//         console.log("Rooms response:", response.data);
//         setRooms(response.data.rooms || []);
//       } catch (error) {
//         console.error("Error fetching rooms:", error);
//       }
//     };

//     fetchRooms();
//   }, []);

//   // When state is selected, filter hotels
//   useEffect(() => {
//     if (selectedState) {
//       console.log("Selected state ID:", selectedState);
//       const hotelsInState = hotels.filter(
//         (hotel) => hotel.state._id === selectedState && hotel.active // Added active check
//       );
//       console.log("Filtered hotels in selected state:", hotelsInState);
//       setFilteredHotels(hotelsInState);
//       setSelectedHotel(""); // Reset hotel selection
//       setFilteredRooms([]); // Clear rooms
//     } else {
//       console.log("No state selected");
//       setFilteredHotels([]); // Clear hotels
//       setFilteredRooms([]); // Clear rooms
//     }
//   }, [selectedState, hotels]);

//   // When hotel is selected, filter rooms
//   useEffect(() => {
//     if (selectedHotel) {
//       console.log("Selected hotel ID:", selectedHotel);
//       const hotelRooms = rooms.filter(
//         (room) => room.hotel._id === selectedHotel // Ensure room hotel ID is compared with selectedHotel
//       );
//       console.log("Filtered rooms for selected hotel:", hotelRooms);
//       setFilteredRooms(hotelRooms);
//     } else {
//       console.log("No hotel selected");
//       setFilteredRooms([]); // Clear rooms when no hotel is selected
//     }
//   }, [selectedHotel, rooms]);

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-blue-700">Explore Hotels</h1>

//       {/* State selection */}
//       <div className="mb-4">
//         <label className="block mb-2 text-gray-700 font-semibold">
//           Select State
//         </label>
//         <select
//           value={selectedState}
//           onChange={(e) => setSelectedState(e.target.value)}
//           className="w-full p-2 border rounded"
//         >
//           <option value="">-- Select a State --</option>
//           {states.map((state) => (
//             <option key={state._id} value={state._id}>
//               {state.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Hotel selection */}
//       {filteredHotels.length > 0 && (
//         <div className="mb-6">
//           <label className="block mb-2 text-gray-700 font-semibold">
//             Select Hotel
//           </label>
//           <select
//             value={selectedHotel}
//             onChange={(e) => setSelectedHotel(e.target.value)}
//             className="w-full p-2 border rounded"
//           >
//             <option value="">-- Select a Hotel --</option>
//             {filteredHotels.map((hotel) => (
//               <option key={hotel._id} value={hotel._id}>
//                 {hotel.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Hotel Details */}
//       {selectedHotel && (
//         <div className="bg-white shadow p-6 rounded-lg mb-8">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Hotel Details
//           </h2>
//           {(() => {
//             const hotel = filteredHotels.find((h) => h._id === selectedHotel);
//             return hotel ? (
//               <div className="space-y-2 text-gray-700">
//                 <p><strong>Name:</strong> {hotel.name}</p>
//                 <p><strong>Address:</strong> {hotel.address}</p>
//                 <p><strong>Email:</strong> {hotel.email}</p>
//                 <p><strong>Contact:</strong> {hotel.contactNumber}</p>
//                 <p><strong>Description:</strong> {hotel.description}</p>
//                 <p><strong>Total Rooms:</strong> {hotel.rooms}</p>
//               </div>
//             ) : (
//               <p className="text-red-600">Hotel data not found.</p>
//             );
//           })()}
//         </div>
//       )}

//       {/* Room Details */}
//       {filteredRooms.length > 0 && (
//         <div>
//           <h3 className="text-xl font-semibold mb-4 text-gray-800">
//             Rooms Available
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {filteredRooms.map((room) => (
//               <div key={room._id} className="bg-white p-4 rounded shadow">
//                 <p><strong>Type:</strong> {room.type}</p>
//                 <p><strong>AC:</strong> {room.isAc ? "Yes" : "No"}</p>
//                 <p><strong>City:</strong> {room.city}</p>
//                 {room.images && room.images.length > 0 && (
//                   <div className="mt-2 grid grid-cols-2 gap-2">
//                     {room.images.map((img, index) => (
//                       <img
//                         key={index}
//                         src={img}
//                         alt={`Room ${index + 1}`}
//                         className="h-32 w-full object-cover rounded"
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Debugging: Display the filtered data */}
//       <div className="mt-8">
//         <pre>{JSON.stringify(filteredHotels, null, 2)}</pre>
//         <pre>{JSON.stringify(filteredRooms, null, 2)}</pre>
//       </div>
//     </div>
//   );
// };

// export default User;







// import React, { useEffect, useState } from "react";
// import { getStates } from "../../api/stateApi";
// import { getHotels } from "../../api/hotelApi";
// import { getRooms } from "../../api/roomApi";

// const User = () => {
//   const [states, setStates] = useState([]);
//   const [hotels, setHotels] = useState([]);
//   const [rooms, setRooms] = useState([]);

//   const [selectedState, setSelectedState] = useState("");
//   const [selectedHotel, setSelectedHotel] = useState("");

//   const [filteredHotels, setFilteredHotels] = useState([]);
//   const [filteredRooms, setFilteredRooms] = useState([]);

//   useEffect(() => {
//     const fetchStates = async () => {
//       try {
//         const response = await getStates();
//         console.log("Fetched States Response:", response.data);
//         const statesData =
//           response.data?.states ||
//           response.data?.data?.states ||
//           response.data?.data ||
//           [];
//         setStates(statesData);
//       } catch (error) {
//         console.error("Error fetching states:", error);
//       }
//     };
//     fetchStates();
//   }, []);

//   useEffect(() => {
//     const fetchHotels = async () => {
//       try {
//         const response = await getHotels();
//         console.log("Fetched Hotels Response:", response.data);
//         const hotelsData =
//           response.data?.hotels ||
//           response.data?.data?.hotels ||
//           response.data?.data ||
//           [];
//         setHotels(hotelsData);
//       } catch (error) {
//         console.error("Error fetching hotels:", error);
//       }
//     };
//     fetchHotels();
//   }, []);

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const response = await getRooms();
//         console.log("Fetched Rooms Response:", response.data);
//         const roomsData =
//           response.data?.rooms ||
//           response.data?.data?.rooms ||
//           response.data?.data ||
//           [];
//         setRooms(roomsData);
//       } catch (error) {
//         console.error("Error fetching rooms:", error);
//       }
//     };
//     fetchRooms();
//   }, []);

//   useEffect(() => {
//     if (selectedState) {
//       const hotelsInState = hotels.filter((hotel) => {
//         const match =
//           (hotel.state?._id === selectedState) && hotel.active;
//         if (!match) {
//           console.log("Skipping hotel", hotel.name, hotel.state);
//         }
//         return match;
//       });
//       console.log("Filtered Hotels:", hotelsInState);
//       setFilteredHotels(hotelsInState);
//       setSelectedHotel("");
//       setFilteredRooms([]);
//     } else {
//       setFilteredHotels([]);
//       setFilteredRooms([]);
//     }
//   }, [selectedState, hotels]);

//   useEffect(() => {
//     if (selectedHotel) {
//       const hotelRooms = rooms.filter(
//         (room) => room.hotel?._id === selectedHotel && room.active
//       );
//       console.log("Filtered Rooms:", hotelRooms);
//       setFilteredRooms(hotelRooms);
//     } else {
//       setFilteredRooms([]);
//     }
//   }, [selectedHotel, rooms]);

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-blue-700">Explore Hotels</h1>

//       <div className="mb-4">
//         <label className="block mb-2 text-gray-700 font-semibold">
//           Select State
//         </label>
//         <select
//           value={selectedState}
//           onChange={(e) => setSelectedState(e.target.value)}
//           className="w-full p-2 border rounded"
//         >
//           <option value="">Select a State</option>
//           {states.map((state) => (
//             <option key={state._id} value={state._id}>
//               {state.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {filteredHotels.length > 0 && (
//         <div className="mb-6">
//           <label className="block mb-2 text-gray-700 font-semibold">
//             Select Hotel
//           </label>
//           <select
//             value={selectedHotel}
//             onChange={(e) => setSelectedHotel(e.target.value)}
//             className="w-full p-2 border rounded"
//           >
//             <option value="">-- Select a Hotel --</option>
//             {filteredHotels.map((hotel) => (
//               <option key={hotel._id} value={hotel._id}>
//                 {hotel.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {selectedHotel && (
//         <div className="bg-white shadow p-6 rounded-lg mb-8">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Hotel Details
//           </h2>
//           {(() => {
//             const hotel = filteredHotels.find((h) => h._id === selectedHotel);
//             return hotel ? (
//               <div className="space-y-2 text-gray-700">
//                 <p><strong>Name:</strong> {hotel.name}</p>
//                 <p><strong>Address:</strong> {hotel.address}</p>
//                 <p><strong>Email:</strong> {hotel.email}</p>
//                 <p><strong>Contact:</strong> {hotel.contactNumber}</p>
//                 <p><strong>Description:</strong> {hotel.description}</p>
//                 <p><strong>Total Rooms:</strong> {hotel.rooms}</p>
//               </div>
//             ) : (
//               <p className="text-red-600">Hotel data not found.</p>
//             );
//           })()}
//         </div>
//       )}

//       {filteredRooms.length > 0 && (
//         <div>
//           <h3 className="text-xl font-semibold mb-4 text-gray-800">
//             Rooms Available
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {filteredRooms.map((room) => (
//               <div key={room._id} className="bg-white p-4 rounded shadow">
//                 <p><strong>Type:</strong> {room.type}</p>
//                 <p><strong>AC:</strong> {room.isAc ? "Yes" : "No"}</p>
//                 <p><strong>City:</strong> {room.city}</p>
//                 {room.images && room.images.length > 0 && (
//                   <div className="mt-2 grid grid-cols-2 gap-2">
//                     {room.images.map((img, index) => (
//                       <img
//                         key={index}
//                         src={img}
//                         alt={`Room ${index + 1}`}
//                         className="h-32 w-full object-cover rounded"
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default User;











import React, { useEffect, useState } from 'react';
import { getHotels } from '../../api/hotelApi';
import { getRooms } from '../../api/roomApi';

const User = () => {
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotelsAndRooms = async () => {
      try {
        const [hotelRes, roomRes] = await Promise.all([getHotels(), getRooms()]);
        setHotels(hotelRes.data);
        setRooms(roomRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelsAndRooms();
  }, []);

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

      <div className="space-y-12">
        {hotels
          .filter(hotel => hotel && hotel.active)
          .map((hotel) => (
            <div
              key={hotel._id}
              className="bg-white rounded-2xl shadow-xl transition-transform hover:scale-[1.01] hover:shadow-2xl p-6"
            >
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{hotel.name}</h2>
                <p className="text-gray-600 mt-1">{hotel.address}, {hotel.city}, {hotel.state?.name}</p>
                <p className="text-gray-500 mt-1">📞 {hotel.contactNumber} | 📧 {hotel.email}</p>
                <p className="text-gray-700 mt-3">{hotel.description}</p>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Available Rooms</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rooms
                    .filter((room) => room.hotel && room.hotel._id === hotel._id && room.active)
                    .map((room) => (
                      <div
                        key={room._id}
                        className="bg-white border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                      >
                        {room.images?.[0] && (
                          <img
                            src={room.images[0]}
                            alt="Room"
                            className="h-48 w-full object-cover"
                          />
                        )}
                        <div className="p-4">
                          <p className="text-lg font-medium text-gray-800">{room.type}</p>
                          <p className="text-gray-600">📍 {room.city}</p>
                          <p className="text-gray-600">AC: {room.isAc ? '✅ Yes' : '❌ No'}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default User;