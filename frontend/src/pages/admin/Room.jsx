// import React, { useEffect, useState } from "react";
// import {
//     getStates
// } from "../../api/stateApi";
// import {
//     getHotels
// } from "../../api/hotelApi";
// import {
//     getRooms,
//     addRoom,
//     updateRoom,
//     toggleRoomStatus,
//     deleteRoom
// } from "../../api/roomApi";

// const Room = () => {
//     const [states, setStates] = useState([]);
//     const [hotels, setHotels] = useState([]);
//     const [rooms, setRooms] = useState([]);
//     const [editingId, setEditingId] = useState(null);

//     const roomTypes = ["Normal Bed", "Medium Bed", "King Size Bed"];
//     const [formData, setFormData] = useState({
//         state: "",
//         city: "",
//         hotel: "",
//         type: "",
//         ac: false,
//     });

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const stateRes = await getStates();
//                 const hotelRes = await getHotels();
//                 const roomRes = await getRooms();

//                 console.log("States:", stateRes?.data?.data);
//                 console.log("Hotels (raw):", hotelRes?.data);
//                 console.log("Rooms:", roomRes?.data);

//                 const activeStates = stateRes?.data?.data?.filter((s) => s.isActive);
//                 const activeHotels = hotelRes?.data?.filter((h) => h.isActive);

//                 console.log("Filtered Active States:", activeStates);
//                 console.log("Filtered Active Hotels:", activeHotels);

//                 setStates(activeStates);
//                 setHotels(activeHotels);
//                 setRooms(roomRes?.data);
//             } catch (err) {
//                 console.error("Fetch error:", err);
//                 toast.error("Failed to load data");
//             }
//         };

//         fetchData();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === "checkbox" ? checked : value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (editingId) {
//                 await updateRoom(editingId, formData);
//                 toast.success("Room updated");
//             } else {
//                 await addRoom(formData);
//                 toast.success("Room added");
//             }
//             const roomRes = await getRooms();
//             setRooms(roomRes.data);
//             setFormData({ state: "", city: "", hotel: "", type: "", ac: false });
//             setEditingId(null);
//         } catch (err) {
//             console.error(err);
//             toast.error("Something went wrong");
//         }
//     };

//     const handleEdit = (room) => {
//         setEditingId(room._id);
//         setFormData({
//             state: room.state || "",
//             city: room.city || "",
//             hotel: room.hotel?._id || "",
//             type: room.type,
//             ac: room.isAc,
//         });
//     };

//     const handleToggle = async (id) => {
//         try {
//             await toggleRoomStatus(id);
//             const roomRes = await getRooms();
//             setRooms(roomRes.data);
//         } catch (err) {
//             toast.error("Toggle failed");
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             await deleteRoom(id);
//             setRooms((prev) => prev.filter((r) => r._id !== id));
//         } catch (err) {
//             toast.error("Delete failed");
//         }
//     };

//     return (
//         <div className="max-w-5xl mx-auto">
//             <h2 className="text-2xl font-bold mb-6">🛏️ Room Management</h2>

//             <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
//                 <div className="grid grid-cols-2 gap-4">
//                     {/* State Dropdown */}
//                     <select
//                         name="state"
//                         value={formData.state}
//                         onChange={handleChange}
//                         required
//                         className="border px-2 py-1 rounded"
//                     >
//                         <option value="">Select State</option>
//                         {states.map((s) => (
//                             <option key={s._id} value={s._id}>
//                                 {s.name}
//                             </option>
//                         ))}
//                     </select>

//                     {/* Manual City Input */}
//                     <input
//                         type="text"
//                         name="city"
//                         placeholder="Enter City"
//                         value={formData.city}
//                         onChange={handleChange}
//                         required
//                         className="border px-2 py-1 rounded"
//                     />

//                     {/* Hotel Dropdown */}
//                     <select
//                         name="hotel"
//                         value={formData.hotel}
//                         onChange={handleChange}
//                         required
//                         className="border px-2 py-1 rounded"
//                     >
//                         <option value="">Select Hotel</option>
//                         {hotels.map((h) => (
//                             <option key={h._id} value={h._id}>
//                                 {h.name}
//                             </option>
//                         ))}
//                     </select>

//                     {/* Room Type Dropdown */}
//                     <select
//                         name="type"
//                         value={formData.type}
//                         onChange={handleChange}
//                         required
//                         className="border px-2 py-1 rounded"
//                     >
//                         <option value="">Select Room Type</option>
//                         {roomTypes.map((t, i) => (
//                             <option key={i} value={t}>
//                                 {t}
//                             </option>
//                         ))}
//                     </select>

//                     {/* AC Checkbox */}
//                     <label className="flex items-center space-x-2 col-span-2">
//                         <input
//                             type="checkbox"
//                             name="ac"
//                             checked={formData.ac}
//                             onChange={handleChange}
//                         />
//                         <span>AC Room</span>
//                     </label>
//                 </div>

//                 <button
//                     type="submit"
//                     className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//                 >
//                     {editingId ? "Update Room" : "Add Room"}
//                 </button>
//             </form>

//             {/* Room List */}
//             <div className="mt-10">
//                 <h3 className="text-xl font-semibold mb-4">Room List</h3>
//                 <div className="grid gap-4">
//                     {rooms.map((room) => (
//                         <div
//                             key={room._id}
//                             className="bg-white p-4 rounded shadow flex justify-between items-center"
//                         >
//                             <div>
//                                 <p><strong>{room.type}</strong> – {room.isAc ? "AC" : "Non-AC"}</p>
//                                 <p>{room.hotel?.name}, {room.city}</p>
//                             </div>
//                             <div className="space-x-2">
//                                 <button onClick={() => handleEdit(room)} className="text-blue-600">Edit</button>
//                                 <button onClick={() => handleToggle(room._id)} className="text-yellow-600">
//                                     {room.active ? "Deactivate" : "Activate"}
//                                 </button>
//                                 <button onClick={() => handleDelete(room._id)} className="text-red-600">Delete</button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Room;









// import React, { useEffect, useState } from "react";
// import { getStates } from "../../api/stateApi";
// import { getHotels } from "../../api/hotelApi";
// import {
//     getRooms,
//     addRoom,
//     updateRoom,
//     toggleRoomStatus,
//     deleteRoom,
// } from "../../api/roomApi";

// const Room = () => {
//     const [states, setStates] = useState([]);
//     const [hotels, setHotels] = useState([]);
//     const [rooms, setRooms] = useState([]);
//     const [editingId, setEditingId] = useState(null);

//     const roomTypes = ["Normal Bed", "Medium Bed", "King Size Bed"];

//     const [formData, setFormData] = useState({
//         state: "",
//         city: "",
//         hotel: "",
//         type: "",
//         ac: false,
//     });

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const stateRes = await getStates();
//                 const hotelRes = await getHotels();
//                 const roomRes = await getRooms();

//                 console.log("States:", stateRes?.data?.data);
//                 console.log("Hotels (raw):", hotelRes?.data);
//                 console.log("Rooms:", roomRes?.data);

//                 const activeStates = stateRes?.data?.data?.filter((s) => s.isActive);
//                 const activeHotels = hotelRes?.data?.filter((h) => h.active === true);

//                 console.log("Filtered Active States:", activeStates);
//                 console.log("Filtered Active Hotels:", activeHotels);

//                 setStates(activeStates);
//                 setHotels(activeHotels);
//                 setRooms(roomRes?.data);
//             } catch (err) {
//                 console.error("Fetch error:", err);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === "checkbox" ? checked : value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             let newRoom;

//             if (editingId) {
//                 // Update existing room
//                 const updatedRoom = await updateRoom(editingId, formData);
//                 newRoom = updatedRoom.data;
//             } else {
//                 const addedRoomResponse = await addRoom(formData);
//                 newRoom = addedRoomResponse.data;
//             }

//             setRooms((prevRooms) => [...prevRooms, newRoom]);

//             setFormData({ state: "", city: "", hotel: "", type: "", ac: false });
//             setEditingId(null);

//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const handleEdit = (room) => {
//         setEditingId(room._id);
//         setFormData({
//             state: room.state?._id?.toString() || "",
//             city: room.city || "",
//             hotel: room.hotel?._id || "",
//             type: room.type,
//             ac: room.isAc,
//         });
//     };

//     const handleToggle = async (id) => {
//         try {
//             await toggleRoomStatus(id);
//             const roomRes = await getRooms();
//             setRooms(roomRes.data);
//         } catch (err) {
//             console.error("Toggle failed", err);
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             await deleteRoom(id);
//             setRooms((prev) => prev.filter((r) => r._id !== id));
//         } catch (err) {
//             console.error("Delete failed", err);
//         }
//     };

//     const filteredHotels = formData.state
//         ? hotels.filter((h) => {
//             const hotelStateId = typeof h.state === 'object' ? h.state._id : h.state;
//             const isHotelActive = h.isActive === true || h.active === true;

//             return hotelStateId?.toString() === formData.state?.toString() && isHotelActive;
//         })
//         : [];

//     return (
//         <div className="max-w-5xl mx-auto">
//             <h2 className="text-2xl font-bold mb-6">🛏️ Room Management</h2>

//             <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
//                 <div className="grid grid-cols-2 gap-4">
//                     {/* State Dropdown */}
//                     <select
//                         name="state"
//                         value={formData.state}
//                         onChange={handleChange}
//                         required
//                         className="border px-2 py-1 rounded"
//                     >
//                         <option value="">Select State</option>
//                         {states.map((s) => (
//                             <option key={s._id} value={s._id.toString()}>
//                                 {s.name}
//                             </option>
//                         ))}
//                     </select>

//                     <input
//                         type="text"
//                         name="city"
//                         placeholder="Enter City"
//                         value={formData.city}
//                         onChange={handleChange}
//                         required
//                         className="border px-2 py-1 rounded"
//                     />

//                     <select
//                         name="hotel"
//                         value={formData.hotel}
//                         onChange={handleChange}
//                         required
//                         className="border px-2 py-1 rounded"
//                     >
//                         <option value="">Select Hotel</option>
//                         {filteredHotels.map((h) => (
//                             <option key={h._id} value={h._id}>
//                                 {h.name}
//                             </option>
//                         ))}
//                     </select>

//                     <select
//                         name="type"
//                         value={formData.type}
//                         onChange={handleChange}
//                         required
//                         className="border px-2 py-1 rounded"
//                     >
//                         <option value="">Select Room Type</option>
//                         {roomTypes.map((t, i) => (
//                             <option key={i} value={t}>
//                                 {t}
//                             </option>
//                         ))}
//                     </select>

//                     <label className="flex items-center space-x-2 col-span-2">
//                         <input
//                             type="checkbox"
//                             name="ac"
//                             checked={formData.ac}
//                             onChange={handleChange}
//                         />
//                         <span>AC Room</span>
//                     </label>
//                 </div>

//                 <button
//                     type="submit"
//                     className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//                 >
//                     {editingId ? "Update Room" : "Add Room"}
//                 </button>
//             </form>

//             <div className="mt-10">
//                 <h3 className="text-xl font-semibold mb-4">Room List</h3>
//                 <div className="grid gap-4">
//                     {rooms.map((room) => (
//                         <div
//                             key={room._id}
//                             className="bg-white p-4 rounded shadow flex justify-between items-center"
//                         >
//                             <div>
//                                 <p><strong>{room.type}</strong> – {room.isAc ? "AC" : "Non-AC"}</p>
//                                 <p>{room.hotel?.name}, {room.city}</p>
//                             </div>
//                             <div className="space-x-2">
//                                 <button onClick={() => handleEdit(room)} className="text-blue-600">Edit</button>
//                                 <button onClick={() => handleToggle(room._id)} className="text-yellow-600">
//                                     {room.active ? "Deactivate" : "Activate"}
//                                 </button>
//                                 <button onClick={() => handleDelete(room._id)} className="text-red-600">Delete</button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Room;










import React, { useEffect, useState } from "react";
import { getStates } from "../../api/stateApi";
import { getHotels } from "../../api/hotelApi";
import {
    getRooms,
    addRoom,
    updateRoom,
    toggleRoomStatus,
    deleteRoom,
} from "../../api/roomApi";

const Room = () => {
    const [states, setStates] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const roomTypes = ["Normal Bed", "Medium Bed", "King Size Bed"];

    const [formData, setFormData] = useState({
        state: "",
        city: "",
        hotel: "",
        type: "",
        isAc: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stateRes = await getStates();
                const hotelRes = await getHotels();
                const roomRes = await getRooms();

                console.log("States:", stateRes?.data?.data);
                console.log("Hotels (raw):", hotelRes?.data);
                console.log("Rooms:", roomRes?.data);

                const activeStates = stateRes?.data?.data?.filter((s) => s.isActive);
                const activeHotels = hotelRes?.data?.filter((h) => h.active === true);

                console.log("Filtered Active States:", activeStates);
                console.log("Filtered Active Hotels:", activeHotels);

                setStates(activeStates);
                setHotels(activeHotels);
                setRooms(roomRes?.data);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let newRoom;

            if (editingId) {
                const updatedRoom = await updateRoom(editingId, formData);
                newRoom = updatedRoom.data;
            } else {
                const addedRoomResponse = await addRoom(formData);
                newRoom = addedRoomResponse.data;
            }

            setRooms((prevRooms) => [...prevRooms, newRoom]);

            setFormData({ state: "", city: "", hotel: "", type: "", isAc: false });
            setEditingId(null);

        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (room) => {
        setEditingId(room._id);
        setFormData({
            state: room.state?._id?.toString() || "",
            city: room.city || "",
            hotel: room.hotel?._id || "",
            type: room.type,
            ac: room.isAc,
        });
    };

    const handleToggle = async (id) => {
        try {
            await toggleRoomStatus(id);
            const roomRes = await getRooms();
            setRooms(roomRes.data);
        } catch (err) {
            console.error("Toggle failed", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteRoom(id);
            setRooms((prev) => prev.filter((r) => r._id !== id));
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    const filteredHotels = formData.state
        ? hotels.filter((h) => {
            const hotelStateId = typeof h.state === 'object' ? h.state._id : h.state;
            const isHotelActive = h.isActive === true || h.active === true;

            return hotelStateId?.toString() === formData.state?.toString() && isHotelActive;
        })
        : [];

    return (
        <div className="max-w-5xl mx-auto bg-gray-50 p-8 rounded-xl shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🛏️ Room Management</h2>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                        <select
                            name="state"
                            id="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Select State</option>
                            {states.map((s) => (
                                <option key={s._id} value={s._id.toString()}>
                                    {s.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            placeholder="Enter City"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="hotel" className="block text-sm font-medium text-gray-700">Hotel</label>
                        <select
                            name="hotel"
                            id="hotel"
                            value={formData.hotel}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Select Hotel</option>
                            {filteredHotels.map((h) => (
                                <option key={h._id} value={h._id}>
                                    {h.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Room Type</label>
                        <select
                            name="type"
                            id="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Select Room Type</option>
                            {roomTypes.map((t, i) => (
                                <option key={i} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-2">
                        <label className="flex items-center space-x-3 text-sm font-medium text-gray-700">
                            <input
                                type="checkbox"
                                name="isAc"
                                checked={formData.isAc}
                                onChange={handleChange}
                                className="h-5 w-5 text-indigo-500 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <span>AC Room</span>
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                    {editingId ? "Update Room" : "Add Room"}
                </button>
            </form>

            <div className="mt-10">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Active Rooms</h3>
                <div className="space-y-6">
                    {rooms.filter((room) => room.active).map((room) => (
                        <div
                            key={room._id}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">{room.type} – {room.isAc ? "AC" : "Non-AC"}</p>
                                    <p className="text-sm text-gray-600">{room.hotel?.name}, {room.city}</p>
                                </div>
                                <div className="space-x-4">
                                    <button
                                        onClick={() => handleEdit(room)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleToggle(room._id)}
                                        className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-150"
                                    >
                                        Deactivate
                                    </button>
                                    <button
                                        onClick={() => handleDelete(room._id)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-10">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Deactivated Rooms</h3>
                <div className="space-y-6">
                    {rooms.filter((room) => !room.active).map((room) => (
                        <div
                            key={room._id}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">{room.type} – {room.isAc ? "AC" : "Non-AC"}</p>
                                    <p className="text-sm text-gray-600">{room.hotel?.name}, {room.city}</p>
                                </div>
                                <div className="space-x-4">
                                    <button
                                        onClick={() => {
                                            if (room.active) {
                                                handleEdit(room);
                                            }
                                        }}
                                        disabled={!room.active}
                                        className={`px-4 py-2 rounded-md transition duration-150 ${room.active
                                            ? "bg-blue-600 text-white hover:bg-blue-700"
                                            : "bg-gray-400 text-white cursor-not-allowed"
                                            }`}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleToggle(room._id)}
                                        className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-150"
                                    >
                                        Activate
                                    </button>
                                    <button
                                        onClick={() => handleDelete(room._id)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Room;