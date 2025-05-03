import React, { useEffect, useState } from "react";
import { getStates } from "../../api/stateApi";
import { getHotels, addHotel, updateHotel, deleteHotel, toggleHotelStatus } from "../../api/hotelApi";

const Hotel = () => {
    const [states, setStates] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        totalRooms: "",
        description: "",
        contactNumber: "",
        email: "",
        state: "",
        city: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchStates();
        fetchHotels();
    }, []);

    const fetchStates = async () => {
        try {
            const res = await getStates();
            const stateList = Array.isArray(res.data)
                ? res.data
                : Array.isArray(res.data.data)
                    ? res.data.data
                    : [];
            setStates(stateList.filter((s) => s.isActive));
        } catch (err) {
            console.error("Failed to load states", err);
            setStates([]);
        }
    };

    const fetchHotels = async () => {
        try {
            const res = await getHotels();
            const hotelList = Array.isArray(res.data)
                ? res.data
                : Array.isArray(res.data.data)
                    ? res.data.data
                    : res.data.hotels || [];
            setHotels(hotelList);
        } catch (err) {
            console.error("Failed to load hotels", err);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            address: "",
            totalRooms: "",
            description: "",
            contactNumber: "",
            email: "",
            state: "",
            city: "",
        });
        setEditingId(null);
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, address, totalRooms, description, contactNumber, email, state, city } = formData;

        if (!name || !address || !totalRooms || !description || !contactNumber || !email || !state || !city) {
            setError("All fields are required.");
            return;
        }

        try {
            const payload = { ...formData, rooms: totalRooms };
            delete payload.totalRooms;

            if (editingId) {
                await updateHotel(editingId, payload);
            } else {
                await addHotel(payload);
            }

            resetForm();
            fetchHotels();
            console.log("Submitting hotel data:", payload);
        } catch (err) {
            console.error("Error submitting hotel", err);
            setError("Something went wrong while saving hotel.");
        }
    };

    const handleEdit = (hotel) => {
        setFormData({
            name: hotel.name,
            address: hotel.address,
            totalRooms: hotel.totalRooms,
            description: hotel.description,
            contactNumber: hotel.contactNumber,
            email: hotel.email,
            state: hotel.state?._id || hotel.state || "",
            city: hotel.city?.city || hotel.city || "",
        });
        setEditingId(hotel._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this hotel?")) {
            try {
                await deleteHotel(id);
                fetchHotels();
            } catch (err) {
                console.error("Failed to delete hotel", err);
            }
        }
    };

    const handleToggle = async (id) => {
        try {
            console.log("Toggling hotel with ID:", id);
            await toggleHotelStatus(id);
            fetchHotels();
        } catch (err) {
            console.error("Failed to toggle hotel status", err);
        }
    };

    const activeHotels = hotels.filter((h) => h.active);
    const inactiveHotels = hotels.filter((h) => !h.active);

    const renderTable = (title, list) => (
        <div className="mb-10 bg-white rounded-xl shadow-md p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">{title}</h2>
            {list.length === 0 ? (
                <p className="text-gray-500">No hotels found.</p>
            ) : (
                <table className="w-full table-auto text-sm text-gray-700">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="p-3 text-left">Hotel</th>
                            <th className="p-3 text-left">State</th>
                            <th className="p-3 text-left">City</th>
                            <th className="p-3 text-left">Contact</th>
                            <th className="p-3 text-center">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((hotel) => (
                            <tr key={hotel._id} className="even:bg-gray-50 hover:bg-gray-100 transition">
                                <td className="p-3">{hotel.name}</td>
                                <td className="p-3">{hotel.state?.name || "—"}</td>
                                <td className="p-3">{hotel.city?.city || hotel.city || "—"}</td>
                                <td className="p-3">{hotel.contactNumber}</td>
                                <td className="p-3 text-center">
                                    <button
                                        onClick={() => handleToggle(hotel._id)}
                                        className={`px-3 py-1 rounded text-white font-medium transition ${hotel.active
                                            ? "bg-green-500 hover:bg-green-600"
                                            : "bg-gray-400 hover:bg-gray-500"
                                            }`}
                                    >
                                        {hotel.active ? "Active" : "Inactive"}
                                    </button>
                                </td>
                                <td className="p-3 text-center space-x-2">
                                    <button
                                        onClick={() => handleEdit(hotel)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(hotel._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Hotels</h1>

            <form
                onSubmit={handleSubmit}
                className="mb-10 bg-white rounded-xl shadow-md p-6 flex flex-wrap gap-4"
            >
                {error && <p className="text-red-500 w-full">{error}</p>}

                <input
                    type="text"
                    placeholder="Hotel Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="flex-1 border px-4 py-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="flex-1 border px-4 py-2 rounded"
                />
                <input
                    type="number"
                    placeholder="Total Rooms"
                    value={formData.totalRooms}
                    onChange={(e) => setFormData({ ...formData, totalRooms: e.target.value })}
                    className="flex-1 border px-4 py-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Contact Number"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    className="flex-1 border px-4 py-2 rounded"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="flex-1 border px-4 py-2 rounded"
                />
                <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border px-4 py-2 rounded"
                />

                <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="flex-1 border px-4 py-2 rounded"
                >
                    <option value="">Select State</option>
                    {states.map((state) => (
                        <option key={state._id} value={state._id}>
                            {state.name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="City Name"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="flex-1 border px-4 py-2 rounded"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                    {editingId ? "Update Hotel" : "Add Hotel"}
                </button>
            </form>

            {renderTable("Active Hotels", activeHotels)}
            {renderTable("Inactive Hotels", inactiveHotels)}
        </main>
    );
};

export default Hotel;













// import React, { useEffect, useState } from "react";
// import { getStates } from "../../api/stateApi";
// import { getLocations } from "../../api/locationApi";
// import {
//     getHotels,
//     addHotel,
//     updateHotel,
//     deleteHotel,
//     toggleHotelStatus
// } from "../../api/hotelApi";

// const Hotel = () => {
//     const [states, setStates] = useState([]);
//     const [locations, setLocations] = useState([]);
//     const [hotels, setHotels] = useState([]);
//     const [formData, setFormData] = useState({
//         name: "",
//         address: "",
//         totalRooms: "",
//         description: "",
//         contactNumber: "",
//         email: "",
//         state: "",
//         city: "",
//     });
//     const [editingId, setEditingId] = useState(null);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         fetchStates();
//         fetchLocations();
//         fetchHotels();
//     }, []);

//     const fetchStates = async () => {
//         try {
//             const res = await getStates();
//             setStates((res.data.data || res.data).filter((s) => s.isActive));
//         } catch (err) {
//             console.error("Failed to load states", err);
//             setStates([]);
//         }
//     };

//     const fetchLocations = async () => {
//         try {
//             const res = await getLocations();
//             const locationList = Array.isArray(res.data) ? res.data : res.data.data || [];
//             const activeLocations = locationList.filter((l) => l.isActive);
//             setLocations(activeLocations);
//         } catch (err) {
//             console.error("Failed to load locations", err);
//             setLocations([]);
//         }
//     };

//     const fetchHotels = async () => {
//         try {
//             const res = await getHotels();
//             setHotels(Array.isArray(res.data) ? res.data : res.data.hotels || []);
//         } catch (err) {
//             console.error("Failed to load hotels", err);
//         }
//     };

//     const resetForm = () => {
//         setFormData({
//             name: "",
//             address: "",
//             totalRooms: "",
//             description: "",
//             contactNumber: "",
//             email: "",
//             state: "",
//             city: "",
//         });
//         setEditingId(null);
//         setError("");
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const { name, address, totalRooms, description, contactNumber, email, state, city } = formData;

//         if (!name || !address || !totalRooms || !description || !contactNumber || !email || !state || !city) {
//             setError("All fields are required.");
//             return;
//         }

//         try {
//             const payload = {
//                 name,
//                 address,
//                 rooms: totalRooms,
//                 description,
//                 contactNumber,
//                 email,
//                 state,
//                 city
//             };

//             if (editingId) {
//                 await updateHotel(editingId, payload);
//             } else {
//                 await addHotel(payload);
//             }

//             resetForm();
//             fetchHotels();
//         } catch (err) {
//             console.error("Error submitting hotel", err);
//             setError("Something went wrong while saving hotel.");
//         }
//     };

//     const handleEdit = (hotel) => {
//         setFormData({
//             name: hotel.name,
//             address: hotel.address,
//             totalRooms: hotel.rooms,
//             description: hotel.description,
//             contactNumber: hotel.contactNumber,
//             email: hotel.email,
//             state: hotel.state?._id || hotel.state,
//             city: hotel.city?._id || hotel.city,
//         });
//         setEditingId(hotel._id);
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this hotel?")) {
//             try {
//                 await deleteHotel(id);
//                 fetchHotels();
//             } catch (err) {
//                 console.error("Failed to delete hotel", err);
//             }
//         }
//     };

//     const handleToggle = async (id) => {
//         try {
//             await toggleHotelStatus(id);
//             fetchHotels();
//         } catch (err) {
//             console.error("Failed to toggle hotel status", err);
//         }
//     };

//     const filteredLocations = locations.filter(loc => loc.state.toString() === formData.state);

//     const activeHotels = hotels.filter((h) => h.active);
//     const inactiveHotels = hotels.filter((h) => !h.active);

//     const renderTable = (title, list) => (
//         <div className="mb-10 bg-white rounded-xl shadow-md p-4">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">{title}</h2>
//             {list.length === 0 ? (
//                 <p className="text-gray-500">No hotels found.</p>
//             ) : (
//                 <table className="w-full table-auto text-sm text-gray-700">
//                     <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
//                         <tr>
//                             <th className="p-3 text-left">Hotel</th>
//                             <th className="p-3 text-left">State</th>
//                             <th className="p-3 text-left">City</th>
//                             <th className="p-3 text-left">Contact</th>
//                             <th className="p-3 text-center">Status</th>
//                             <th className="p-3 text-center">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {list.map((hotel) => (
//                             <tr key={hotel._id} className="even:bg-gray-50 hover:bg-gray-100 transition">
//                                 <td className="p-3">{hotel.name}</td>
//                                 <td className="p-3">{hotel.state?.name || "—"}</td>
//                                 <td className="p-3">{hotel.city?.city || "—"}</td>
//                                 <td className="p-3">{hotel.contactNumber}</td>
//                                 <td className="p-3 text-center">
//                                     <button
//                                         onClick={() => handleToggle(hotel._id)}
//                                         className={`px-3 py-1 rounded text-white font-medium transition ${hotel.active
//                                             ? "bg-green-500 hover:bg-green-600"
//                                             : "bg-gray-400 hover:bg-gray-500"
//                                             }`}
//                                     >
//                                         {hotel.active ? "Active" : "Inactive"}
//                                     </button>
//                                 </td>
//                                 <td className="p-3 text-center space-x-2">
//                                     <button
//                                         onClick={() => handleEdit(hotel)}
//                                         className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(hotel._id)}
//                                         className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );

//     return (
//         <main className="p-8">
//             <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Hotels</h1>

//             <form onSubmit={handleSubmit} className="mb-10 bg-white rounded-xl shadow-md p-6 flex flex-wrap gap-4">
//                 {error && <p className="text-red-500 w-full">{error}</p>}

//                 <input type="text" placeholder="Hotel Name" value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     className="flex-1 border px-4 py-2 rounded" />

//                 <input type="text" placeholder="Address" value={formData.address}
//                     onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                     className="flex-1 border px-4 py-2 rounded" />

//                 <input type="number" placeholder="Total Rooms" value={formData.totalRooms}
//                     onChange={(e) => setFormData({ ...formData, totalRooms: e.target.value })}
//                     className="flex-1 border px-4 py-2 rounded" />

//                 <input type="text" placeholder="Contact Number" value={formData.contactNumber}
//                     onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
//                     className="flex-1 border px-4 py-2 rounded" />

//                 <input type="email" placeholder="Email" value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     className="flex-1 border px-4 py-2 rounded" />

//                 <textarea placeholder="Description" value={formData.description}
//                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                     className="w-full border px-4 py-2 rounded" />

//                 <select value={formData.state}
//                     onChange={(e) => setFormData({ ...formData, state: e.target.value, city: "" })}
//                     className="flex-1 border px-4 py-2 rounded">
//                     <option value="">Select State</option>
//                     {states.map((state) => (
//                         <option key={state._id} value={state._id}>{state.name}</option>
//                     ))}
//                 </select>

//                 <select value={formData.city}
//                     onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//                     className="flex-1 border px-4 py-2 rounded">
//                     <option value="">Select City</option>
//                     {filteredLocations.map((loc) => (
//                         <option key={loc._id} value={loc._id}>{loc.city}</option>
//                     ))}
//                 </select>

//                 <button type="submit"
//                     className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
//                     {editingId ? "Update Hotel" : "Add Hotel"}
//                 </button>
//             </form>

//             {renderTable("Active Hotels", activeHotels)}
//             {renderTable("Inactive Hotels", inactiveHotels)}
//         </main>
//     );
// };

// export default Hotel;