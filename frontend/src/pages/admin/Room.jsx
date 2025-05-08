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
// import { uploadImageToCloudinary } from "../../api/cloudinaryApi";

// const Room = () => {
//     const [states, setStates] = useState([]);
//     const [hotels, setHotels] = useState([]);
//     const [rooms, setRooms] = useState([]);
//     const [editingId, setEditingId] = useState(null);
//     const [imagePreview, setImagePreview] = useState(null);
//     const [fileInputKey, setFileInputKey] = useState(Date.now());

//     const roomTypes = ["Normal Bed", "Medium Bed", "King Size Bed"];

//     const [formData, setFormData] = useState({
//         state: "",
//         city: "",
//         hotel: "",
//         type: "",
//         isAc: false,
//         images: [],
//     });

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const stateRes = await getStates();
//                 const hotelRes = await getHotels();
//                 const roomRes = await getRooms();

//                 const activeStates = stateRes?.data?.data?.filter((s) => s.isActive);
//                 const activeHotels = hotelRes?.data?.filter((h) => h.active === true);

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

//     const handleImageChange = async (e) => {
//         const files = e.target.files;
//         if (!files || files.length === 0) return;

//         const uploadedUrls = [];

//         for (const file of files) {
//             const formDataToSend = new FormData();
//             formDataToSend.append("file", file);
//             formDataToSend.append("upload_preset", "pushpa");

//             try {
//                 const response = await uploadImageToCloudinary(formDataToSend);
//                 console.log("Cloudinary response:", response);

//                 if (response && response.secure_url) {
//                     uploadedUrls.push(response.secure_url);
//                 } else {
//                     console.error("Cloudinary response does not contain secure_url");
//                 }
//             } catch (error) {
//                 console.error("Upload failed:", error);
//             }
//         }

//         setFormData((prev) => ({
//             ...prev,
//             images: [...prev.images, ...uploadedUrls],
//         }));

//         if (uploadedUrls.length > 0) {
//             setImagePreview(uploadedUrls[0]);
//         }

//         console.log("Updated form data with images:", formData);
//     };



//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("Form submission started", formData);

//         try {
//             let newRoom;
//             if (editingId) {
//                 console.log("Updating existing room with ID:", editingId);
//                 const updatedRoom = await updateRoom(editingId, formData);
//                 newRoom = updatedRoom.data;
//             } else {
//                 console.log("Adding new room...");
//                 const addedRoomResponse = await addRoom(formData);
//                 newRoom = addedRoomResponse.data;
//             }

//             console.log("Room response after submission:", newRoom);

//             const roomRes = await getRooms();
//             setRooms(roomRes.data);

//             setFormData({
//                 state: "",
//                 city: "",
//                 hotel: "",
//                 type: "",
//                 isAc: false,
//                 images: [],
//             });
//             setImagePreview(null);
//             setFileInputKey(Date.now());
//             setEditingId(null);

//             console.log("Form reset after successful submission");
//         } catch (err) {
//             console.error("Room submission failed:", err);
//         }
//     };

//     const handleEdit = (room) => {
//         console.log("Editing room:", room);
//         setEditingId(room._id);
//         setFormData({
//             state: room.state?._id?.toString() || "",
//             city: room.city || "",
//             hotel: room.hotel?._id || "",
//             type: room.type,
//             isAc: room.isAc,
//             images: room.images || [],
//         });

//         setImagePreview(room.images?.[0] || null);
//         console.log("Form data after editing:", room);
//     };

//     const handleToggle = async (id) => {
//         try {
//             console.log("Toggling room status for room ID:", id);
//             await toggleRoomStatus(id);
//             const roomRes = await getRooms();
//             setRooms(roomRes.data);
//             console.log("Rooms after status toggle:", roomRes.data);
//         } catch (err) {
//             console.error("Toggle failed", err);
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             console.log("Deleting room with ID:", id);
//             await deleteRoom(id);
//             setRooms((prev) => {
//                 const updatedRooms = prev.filter((r) => r._id !== id);
//                 console.log("Updated room list after deletion:", updatedRooms);
//                 return updatedRooms;
//             });
//         } catch (err) {
//             console.error("Delete failed", err);
//         }
//     };

//     const filteredHotels = formData.state
//         ? hotels.filter((h) => {
//             const hotelStateId = typeof h.state === "object" ? h.state._id : h.state;
//             const isHotelActive = h.isActive === true || h.active === true;
//             return hotelStateId?.toString() === formData.state?.toString() && isHotelActive;
//         })
//         : [];

//     return (
//         <div className="max-w-5xl mx-auto bg-gray-50 p-8 rounded-xl shadow-xl">
//             <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🛏️ Room Management</h2>

//             <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     {/* State */}
//                     <div>
//                         <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
//                         <select
//                             name="state"
//                             id="state"
//                             value={formData.state}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
//                         >
//                             <option value="">Select State</option>
//                             {states.map((s) => (
//                                 <option key={s._id} value={s._id}>{s.name}</option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* City */}
//                     <div>
//                         <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
//                         <input
//                             type="text"
//                             name="city"
//                             id="city"
//                             value={formData.city}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
//                         />
//                     </div>

//                     {/* Hotel */}
//                     <div>
//                         <label htmlFor="hotel" className="block text-sm font-medium text-gray-700">Hotel</label>
//                         <select
//                             name="hotel"
//                             id="hotel"
//                             value={formData.hotel}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
//                         >
//                             <option value="">Select Hotel</option>
//                             {filteredHotels.map((h) => (
//                                 <option key={h._id} value={h._id}>{h.name}</option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Room Type */}
//                     <div>
//                         <label htmlFor="type" className="block text-sm font-medium text-gray-700">Room Type</label>
//                         <select
//                             name="type"
//                             id="type"
//                             value={formData.type}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
//                         >
//                             <option value="">Select Room Type</option>
//                             {roomTypes.map((t, i) => (
//                                 <option key={i} value={t}>{t}</option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* AC Checkbox */}
//                     <div className="col-span-2">
//                         <label className="flex items-center space-x-3 text-sm font-medium text-gray-700">
//                             <input
//                                 type="checkbox"
//                                 name="isAc"
//                                 checked={formData.isAc}
//                                 onChange={handleChange}
//                                 className="h-5 w-5 text-indigo-500"
//                             />
//                             <span>AC Room</span>
//                         </label>
//                     </div>

//                     {/* Images */}
//                     <div>
//                         <label htmlFor="images" className="block text-sm font-medium text-gray-700">Room Images</label>
//                         <input
//                             type="file"
//                             name="images"
//                             id="images"
//                             key={fileInputKey} // To reset file input
//                             onChange={handleImageChange}
//                             multiple
//                             className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
//                         />
//                         {imagePreview && (
//                             <div className="mt-4">
//                                 <img src={imagePreview} alt="Preview" className="w-full h-auto rounded" />
//                             </div>
//                         )}
//                     </div>

//                     {/* Submit Button */}
//                     <div className="col-span-2">
//                         <button
//                             type="submit"
//                             className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
//                         >
//                             {editingId ? "Update Room" : "Add Room"}
//                         </button>
//                     </div>
//                 </div>
//             </form>

//             {/* Render Active Rooms */}
//             <div className="mt-10">
//                 <h3 className="text-2xl font-semibold text-gray-800 mb-6">Active Rooms</h3>
//                 <div className="space-y-6">
//                     {rooms.filter((room) => room.active).map((room) => (
//                         <div
//                             key={room._id}
//                             className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
//                         >
//                             <div className="flex justify-between items-center">
//                                 <div>
//                                     <p className="text-lg font-semibold text-gray-800">{room.type} – {room.isAc ? "AC" : "Non-AC"}</p>
//                                     <p className="text-sm text-gray-600">{room.hotel?.name}, {room.city}</p>
//                                 </div>
//                                 <div className="space-x-4">
//                                     <button
//                                         onClick={() => handleEdit(room)}
//                                         className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150"
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => handleToggle(room._id)}
//                                         className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-150"
//                                     >
//                                         Deactivate
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(room._id)}
//                                         className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150"
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="mt-10">
//                 <h3 className="text-2xl font-semibold text-gray-800 mb-6">Deactivated Rooms</h3>
//                 <div className="space-y-6">
//                     {rooms.filter((room) => !room.active).map((room) => (
//                         <div
//                             key={room._id}
//                             className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
//                         >
//                             <div className="flex justify-between items-center">
//                                 <div>
//                                     <p className="text-lg font-semibold text-gray-800">{room.type} – {room.isAc ? "AC" : "Non-AC"}</p>
//                                     <p className="text-sm text-gray-600">{room.hotel?.name}, {room.city}</p>
//                                 </div>
//                                 <div className="space-x-4">
//                                     <button
//                                         onClick={() => handleEdit(room)}
//                                         className={`px-4 py-2 rounded-md transition duration-150 ${room.active
//                                             ? "bg-blue-600 text-white hover:bg-blue-700"
//                                             : "bg-gray-400 text-white cursor-not-allowed"
//                                             }`}
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => handleToggle(room._id)}
//                                         className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-150"
//                                     >
//                                         Activate
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(room._id)}
//                                         className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150"
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
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
// import { uploadImageToCloudinary } from "../../api/cloudinaryApi";

// const Room = () => {
//     const [states, setStates] = useState([]);
//     const [hotels, setHotels] = useState([]);
//     const [rooms, setRooms] = useState([]);
//     const [editingId, setEditingId] = useState(null);
//     const [imagePreview, setImagePreview] = useState(null);
//     const [fileInputKey, setFileInputKey] = useState(Date.now());

//     const roomTypes = ["Normal Bed", "Medium Bed", "King Size Bed"];

//     const [formData, setFormData] = useState({
//         state: "",
//         city: "",
//         hotel: "",
//         type: "",
//         isAc: false,
//         images: [],
//     });

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const stateRes = await getStates();
//                 const hotelRes = await getHotels();
//                 const roomRes = await getRooms();

//                 const activeStates = stateRes?.data?.data?.filter((s) => s.isActive);
//                 const activeHotels = hotelRes?.data?.filter((h) => h.active === true);

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

//     const handleImageChange = async (e) => {
//         const files = e.target.files;
//         if (!files || files.length === 0) return;

//         const uploadedUrls = [];

//         for (const file of files) {
//             const formDataToSend = new FormData();
//             formDataToSend.append("file", file);
//             formDataToSend.append("upload_preset", "pushpa");

//             try {
//                 const response = await uploadImageToCloudinary(formDataToSend);
//                 console.log("Cloudinary response:", response);

//                 if (response && response.secure_url) {
//                     uploadedUrls.push(response.secure_url);
//                 } else {
//                     console.error("Cloudinary response does not contain secure_url");
//                 }
//             } catch (error) {
//                 console.error("Upload failed:", error);
//             }
//         }

//         setFormData((prev) => {
//             const updated = {
//                 ...prev,
//                 images: [...prev.images, ...uploadedUrls],
//             };
//             console.log("Updated formData with images:", updated);
//             return updated;
//         });

//         if (uploadedUrls.length > 0) {
//             setImagePreview(uploadedUrls[0]);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("Form submission started", formData);

//         try {
//             let newRoom;
//             const payload = {
//                 ...formData,
//                 images: formData.images,
//             };

//             if (editingId) {
//                 console.log("Updating existing room with ID:", editingId);
//                 const updatedRoom = await updateRoom(editingId, payload);
//                 newRoom = updatedRoom.data;
//             } else {
//                 console.log("Adding new room...");
//                 const addedRoomResponse = await addRoom(payload);
//                 newRoom = addedRoomResponse.data;
//             }

//             console.log("Room response after submission:", newRoom);

//             const roomRes = await getRooms();
//             setRooms(roomRes.data);

//             setFormData({
//                 state: "",
//                 city: "",
//                 hotel: "",
//                 type: "",
//                 isAc: false,
//                 images: [],
//             });
//             setImagePreview(null);
//             setFileInputKey(Date.now());
//             setEditingId(null);

//             console.log("Form reset after successful submission");
//         } catch (err) {
//             console.error("Room submission failed:", err);
//         }
//     };

//     const handleEdit = (room) => {
//         console.log("Editing room:", room);
//         setEditingId(room._id);
//         setFormData({
//             state: room.state?._id?.toString() || "",
//             city: room.city || "",
//             hotel: room.hotel?._id || "",
//             type: room.type,
//             isAc: room.isAc,
//             images: room.images || [],
//         });

//         setImagePreview(room.images?.[0] || null);
//         console.log("Form data after editing:", room);
//     };

//     const handleToggle = async (id) => {
//         try {
//             console.log("Toggling room status for room ID:", id);
//             await toggleRoomStatus(id);
//             const roomRes = await getRooms();
//             setRooms(roomRes.data);
//             console.log("Rooms after status toggle:", roomRes.data);
//         } catch (err) {
//             console.error("Toggle failed", err);
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             console.log("Deleting room with ID:", id);

//             const response = await deleteRoom(id);
//             if (response?.data?.message === "Room and images deleted successfully") {
//                 setRooms((prev) => prev.filter((room) => room._id !== id));
//                 console.log("Room and images deleted successfully");
//             } else {
//                 console.error("Failed to delete room or images");
//             }
//         } catch (err) {
//             console.error("Delete failed", err);
//         }
//     };

//     const filteredHotels = formData.state
//         ? hotels.filter((h) => {
//             const hotelStateId = typeof h.state === "object" ? h.state._id : h.state;
//             const isHotelActive = h.isActive === true || h.active === true;
//             return hotelStateId?.toString() === formData.state?.toString() && isHotelActive;
//         })
//         : [];

//     return (
//         <div className="max-w-5xl mx-auto bg-gray-50 p-8 rounded-xl shadow-xl">
//             <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🛏️ Room Management</h2>

//             <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     <div>
//                         <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
//                         <select
//                             name="state"
//                             id="state"
//                             value={formData.state}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
//                         >
//                             <option value="">Select State</option>
//                             {states.map((s) => (
//                                 <option key={s._id} value={s._id}>{s.name}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div>
//                         <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
//                         <input
//                             type="text"
//                             name="city"
//                             id="city"
//                             value={formData.city}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
//                         />
//                     </div>

//                     <div>
//                         <label htmlFor="hotel" className="block text-sm font-medium text-gray-700">Hotel</label>
//                         <select
//                             name="hotel"
//                             id="hotel"
//                             value={formData.hotel}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
//                         >
//                             <option value="">Select Hotel</option>
//                             {filteredHotels.map((h) => (
//                                 <option key={h._id} value={h._id}>{h.name}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div>
//                         <label htmlFor="type" className="block text-sm font-medium text-gray-700">Room Type</label>
//                         <select
//                             name="type"
//                             id="type"
//                             value={formData.type}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
//                         >
//                             <option value="">Select Room Type</option>
//                             {roomTypes.map((t, i) => (
//                                 <option key={i} value={t}>{t}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="col-span-2">
//                         <label className="flex items-center space-x-3 text-sm font-medium text-gray-700">
//                             <input
//                                 type="checkbox"
//                                 name="isAc"
//                                 checked={formData.isAc}
//                                 onChange={handleChange}
//                                 className="h-5 w-5 text-indigo-500"
//                             />
//                             <span>AC Room</span>
//                         </label>
//                     </div>

//                     <div>
//                         <label htmlFor="images" className="block text-sm font-medium text-gray-700">Room Images</label>
//                         <input
//                             type="file"
//                             name="images"
//                             id="images"
//                             key={fileInputKey}
//                             onChange={handleImageChange}
//                             multiple
//                             className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
//                         />
//                         {imagePreview && (
//                             <div className="mt-4">
//                                 <img src={imagePreview} alt="Preview" className="w-full h-auto rounded" />
//                             </div>
//                         )}
//                     </div>

//                     {formData.images.length > 0 && (
//                         <div className="flex flex-wrap mt-4 gap-2">
//                             {formData.images.map((url, index) => (
//                                 <div key={index} className="relative">
//                                     <img src={url} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded" />
//                                     <button
//                                         type="button"
//                                         onClick={() =>
//                                             setFormData((prev) => ({
//                                                 ...prev,
//                                                 images: prev.images.filter((_, i) => i !== index),
//                                             }))
//                                         }
//                                         className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-1 text-xs"
//                                     >
//                                         ✕
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                     )}

//                     <div className="col-span-2">
//                         <button
//                             type="submit"
//                             className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
//                         >
//                             {editingId ? "Update Room" : "Add Room"}
//                         </button>
//                     </div>
//                 </div>
//             </form>

//             <div className="mt-10">
//                 <h3 className="text-2xl font-semibold text-gray-800 mb-6">Active Rooms</h3>
//                 <div className="space-y-6">
//                     {rooms.filter((room) => room.active).map((room) => (
//                         <div
//                             key={room._id}
//                             className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
//                         >
//                             <div className="flex justify-between items-center">
//                                 <div>
//                                     <p className="text-lg font-semibold text-gray-800">{room.type} – {room.isAc ? "AC" : "Non-AC"}</p>
//                                     <p className="text-sm text-gray-600">{room.hotel?.name}, {room.city}</p>
//                                 </div>

//                                 <div className="space-x-4">
//                                     <button
//                                         onClick={() => handleEdit(room)}
//                                         className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150"
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => handleToggle(room._id)}
//                                         className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-150"
//                                     >
//                                         Deactivate
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(room._id)}
//                                         className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150"
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Display Room Images */}
//                             <div className="mt-4 flex space-x-4">
//                                 {room.images && room.images.length > 0 ? (
//                                     room.images.map((image, index) => (
//                                         <img
//                                             key={index}
//                                             src={image}
//                                             alt={`Room ${index + 1}`}
//                                             className="w-32 h-32 object-cover rounded-md"
//                                         />
//                                     ))
//                                 ) : (
//                                     <p>No images available</p>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="mt-10">
//                 <h3 className="text-2xl font-semibold text-gray-800 mb-6">Deactivated Rooms</h3>
//                 <div className="space-y-6">
//                     {rooms.filter((room) => !room.active).map((room) => (
//                         <div
//                             key={room._id}
//                             className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
//                         >
//                             <div className="flex justify-between items-center">
//                                 <div>
//                                     <p className="text-lg font-semibold text-gray-800">{room.type} – {room.isAc ? "AC" : "Non-AC"}</p>
//                                     <p className="text-sm text-gray-600">{room.hotel?.name}, {room.city}</p>
//                                 </div>

//                                 <div className="space-x-4">
//                                     <button
//                                         onClick={() => handleEdit(room)}
//                                         className={`px-4 py-2 rounded-md transition duration-150 ${room.active
//                                             ? "bg-blue-600 text-white hover:bg-blue-700"
//                                             : "bg-gray-400 text-white cursor-not-allowed"
//                                             }`}
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => handleToggle(room._id)}
//                                         className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-150"
//                                     >
//                                         Activate
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(room._id)}
//                                         className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150"
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Display Room Images */}
//                             <div className="mt-4 flex space-x-4">
//                                 {room.images && room.images.length > 0 ? (
//                                     room.images.map((image, index) => (
//                                         <img
//                                             key={index}
//                                             src={image}
//                                             alt={`Room ${index + 1}`}
//                                             className="w-32 h-32 object-cover rounded-md"
//                                         />
//                                     ))
//                                 ) : (
//                                     <p>No images available</p>
//                                 )}
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
// import { uploadImageToCloudinary } from "../../api/cloudinaryApi";

// const Room = () => {
//     const [states, setStates] = useState([]);
//     const [hotels, setHotels] = useState([]);
//     const [rooms, setRooms] = useState([]);
//     const [editingId, setEditingId] = useState(null);
//     const [imagePreview, setImagePreview] = useState(null);
//     const [fileInputKey, setFileInputKey] = useState(Date.now());
//     const [searchTerm, setSearchTerm] = useState("");
//     const [sortBy, setSortBy] = useState("");
//     const [acFilter, setAcFilter] = useState("");

//     const roomTypes = ["Normal Bed", "Medium Bed", "King Size Bed"];

//     const [formData, setFormData] = useState({
//         state: "",
//         city: "",
//         hotel: "",
//         type: "",
//         isAc: false,
//         images: [],
//     });

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const stateRes = await getStates();
//                 const hotelRes = await getHotels();
//                 const roomRes = await getRooms();

//                 const activeStates = stateRes?.data?.data?.filter((s) => s.isActive);
//                 const activeHotels = hotelRes?.data?.filter((h) => h.active === true);

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

//     const handleImageChange = async (e) => {
//         const files = e.target.files;
//         if (!files || files.length === 0) return;

//         const uploadedUrls = [];

//         for (const file of files) {
//             const formDataToSend = new FormData();
//             formDataToSend.append("file", file);
//             formDataToSend.append("upload_preset", "pushpa");

//             try {
//                 const response = await uploadImageToCloudinary(formDataToSend);
//                 console.log("Cloudinary response:", response);

//                 if (response && response.secure_url) {
//                     uploadedUrls.push(response.secure_url);
//                 } else {
//                     console.error("Cloudinary response does not contain secure_url");
//                 }
//             } catch (error) {
//                 console.error("Upload failed:", error);
//             }
//         }

//         setFormData((prev) => {
//             const updated = {
//                 ...prev,
//                 images: [...prev.images, ...uploadedUrls],
//             };
//             console.log("Updated formData with images:", updated);
//             return updated;
//         });

//         if (uploadedUrls.length > 0) {
//             setImagePreview(uploadedUrls[0]);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("Form submission started", formData);

//         try {
//             let newRoom;
//             const payload = {
//                 ...formData,
//                 images: formData.images,
//             };

//             if (editingId) {
//                 console.log("Updating existing room with ID:", editingId);
//                 const updatedRoom = await updateRoom(editingId, payload);
//                 newRoom = updatedRoom.data;
//             } else {
//                 console.log("Adding new room...");
//                 const addedRoomResponse = await addRoom(payload);
//                 newRoom = addedRoomResponse.data;
//             }

//             console.log("Room response after submission:", newRoom);

//             const roomRes = await getRooms();
//             setRooms(roomRes.data);

//             setFormData({
//                 state: "",
//                 city: "",
//                 hotel: "",
//                 type: "",
//                 isAc: false,
//                 images: [],
//             });
//             setImagePreview(null);
//             setFileInputKey(Date.now());
//             setEditingId(null);

//             console.log("Form reset after successful submission");
//         } catch (err) {
//             console.error("Room submission failed:", err);
//         }
//     };

//     const handleEdit = (room) => {
//         console.log("Editing room:", room);
//         setEditingId(room._id);
//         setFormData({
//             state: room.state?._id?.toString() || "",
//             city: room.city || "",
//             hotel: room.hotel?._id || "",
//             type: room.type,
//             isAc: room.isAc,
//             images: room.images || [],
//         });

//         setImagePreview(room.images?.[0] || null);
//         console.log("Form data after editing:", room);
//     };

//     const handleToggle = async (id) => {
//         try {
//             console.log("Toggling room status for room ID:", id);
//             await toggleRoomStatus(id);
//             const roomRes = await getRooms();
//             setRooms(roomRes.data);
//             console.log("Rooms after status toggle:", roomRes.data);
//         } catch (err) {
//             console.error("Toggle failed", err);
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             console.log("Deleting room with ID:", id);

//             const response = await deleteRoom(id);
//             if (response?.data?.message === "Room and images deleted successfully") {
//                 setRooms((prev) => prev.filter((room) => room._id !== id));
//                 console.log("Room and images deleted successfully");
//             } else {
//                 console.error("Failed to delete room or images");
//             }
//         } catch (err) {
//             console.error("Delete failed", err);
//         }
//     };

//     const filteredHotels = formData.state
//         ? hotels.filter((h) => {
//             const hotelStateId = typeof h.state === "object" ? h.state._id : h.state;
//             const isHotelActive = h.isActive === true || h.active === true;
//             return hotelStateId?.toString() === formData.state?.toString() && isHotelActive;
//         })
//         : [];

//     const getFilteredSortedRooms = (activeStatus) => {
//         return rooms
//             .filter((room) => room.active === activeStatus)
//             .filter((room) =>
//                 room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 room.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 (room.hotel?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
//             )
//             .filter((room) => {
//                 if (acFilter === "ac") return room.isAc;
//                 if (acFilter === "non-ac") return !room.isAc;
//                 return true;
//             })
//             .sort((a, b) => {
//                 if (!sortBy) return 0;
//                 if (sortBy === "city" || sortBy === "type") {
//                     return a[sortBy].localeCompare(b[sortBy]);
//                 }
//                 return 0;
//             });
//     };

//     return (
//         <div className="max-w-5xl mx-auto bg-gray-50 p-8 rounded-xl shadow-xl">
//             <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🛏️ Room Management</h2>

//             <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     <div>
//                         <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
//                         <select
//                             name="state"
//                             id="state"
//                             value={formData.state}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
//                         >
//                             <option value="">Select State</option>
//                             {states.map((s) => (
//                                 <option key={s._id} value={s._id}>{s.name}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div>
//                         <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
//                         <input
//                             type="text"
//                             name="city"
//                             id="city"
//                             value={formData.city}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
//                         />
//                     </div>

//                     <div>
//                         <label htmlFor="hotel" className="block text-sm font-medium text-gray-700">Hotel</label>
//                         <select
//                             name="hotel"
//                             id="hotel"
//                             value={formData.hotel}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
//                         >
//                             <option value="">Select Hotel</option>
//                             {filteredHotels.map((h) => (
//                                 <option key={h._id} value={h._id}>{h.name}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div>
//                         <label htmlFor="type" className="block text-sm font-medium text-gray-700">Room Type</label>
//                         <select
//                             name="type"
//                             id="type"
//                             value={formData.type}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
//                         >
//                             <option value="">Select Room Type</option>
//                             {roomTypes.map((t, i) => (
//                                 <option key={i} value={t}>{t}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="col-span-2">
//                         <label className="flex items-center space-x-3 text-sm font-medium text-gray-700">
//                             <input
//                                 type="checkbox"
//                                 name="isAc"
//                                 checked={formData.isAc}
//                                 onChange={handleChange}
//                                 className="h-5 w-5 text-indigo-500"
//                             />
//                             <span>AC Room</span>
//                         </label>
//                     </div>

//                     <div>
//                         <label htmlFor="images" className="block text-sm font-medium text-gray-700">Room Images</label>
//                         <input
//                             type="file"
//                             name="images"
//                             id="images"
//                             key={fileInputKey}
//                             onChange={handleImageChange}
//                             multiple
//                             className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
//                         />
//                         {imagePreview && (
//                             <div className="mt-4">
//                                 <img src={imagePreview} alt="Preview" className="w-full h-auto rounded" />
//                             </div>
//                         )}
//                     </div>

//                     {formData.images.length > 0 && (
//                         <div className="flex flex-wrap mt-4 gap-2">
//                             {formData.images.map((url, index) => (
//                                 <div key={index} className="relative">
//                                     <img src={url} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded" />
//                                     <button
//                                         type="button"
//                                         onClick={() =>
//                                             setFormData((prev) => ({
//                                                 ...prev,
//                                                 images: prev.images.filter((_, i) => i !== index),
//                                             }))
//                                         }
//                                         className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-1 text-xs"
//                                     >
//                                         ✕
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                     )}

//                     <div className="col-span-2">
//                         <button
//                             type="submit"
//                             className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
//                         >
//                             {editingId ? "Update Room" : "Add Room"}
//                         </button>
//                     </div>
//                 </div>
//             </form>

//             <div className="mt-10">
//                 <div className="mb-6">
//                     <h3 className="text-2xl font-semibold text-gray-800 mb-2">Active Rooms</h3>
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                         <input
//                             type="text"
//                             placeholder="Search by type, city, or hotel"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-lg"
//                         />

//                         <select
//                             value={sortBy}
//                             onChange={(e) => setSortBy(e.target.value)}
//                             className="w-full sm:w-1/4 p-2 border border-gray-300 rounded-lg"
//                         >
//                             <option value="">Sort By</option>
//                             <option value="type">Room Type</option>
//                             <option value="city">City</option>
//                         </select>

//                         <select
//                             value={acFilter}
//                             onChange={(e) => setAcFilter(e.target.value)}
//                             className="w-full sm:w-1/4 p-2 border border-gray-300 rounded-lg"
//                         >
//                             <option value="">All Rooms</option>
//                             <option value="ac">AC Rooms</option>
//                             <option value="non-ac">Non-AC Rooms</option>
//                         </select>
//                     </div>
//                 </div>
//                 <div className="space-y-6">
//                     {getFilteredSortedRooms(true).map((room) => (
//                         <div
//                             key={room._id}
//                             className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
//                         >
//                             <div className="flex justify-between items-center">
//                                 <div>
//                                     <p className="text-lg font-semibold text-gray-800">{room.type} – {room.isAc ? "AC" : "Non-AC"}</p>
//                                     <p className="text-sm text-gray-600">{room.hotel?.name}, {room.city}</p>
//                                 </div>

//                                 <div className="space-x-4">
//                                     <button
//                                         onClick={() => handleEdit(room)}
//                                         className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150"
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => handleToggle(room._id)}
//                                         className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-150"
//                                     >
//                                         Deactivate
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(room._id)}
//                                         className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150"
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Display Room Images */}
//                             <div className="mt-4 flex space-x-4">
//                                 {room.images && room.images.length > 0 ? (
//                                     room.images.map((image, index) => (
//                                         <img
//                                             key={index}
//                                             src={image}
//                                             alt={`Room ${index + 1}`}
//                                             className="w-32 h-32 object-cover rounded-md"
//                                         />
//                                     ))
//                                 ) : (
//                                     <p>No images available</p>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="mt-10">
//                 <h3 className="text-2xl font-semibold text-gray-800 mb-6">Deactivated Rooms</h3>
//                 <div className="space-y-6">
//                     {getFilteredSortedRooms(false).map((room) => (
//                         <div
//                             key={room._id}
//                             className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
//                         >
//                             <div className="flex justify-between items-center">
//                                 <div>
//                                     <p className="text-lg font-semibold text-gray-800">{room.type} – {room.isAc ? "AC" : "Non-AC"}</p>
//                                     <p className="text-sm text-gray-600">{room.hotel?.name}, {room.city}</p>
//                                 </div>

//                                 <div className="space-x-4">
//                                     <button
//                                         onClick={() => handleEdit(room)}
//                                         className={`px-4 py-2 rounded-md transition duration-150 ${room.active
//                                             ? "bg-blue-600 text-white hover:bg-blue-700"
//                                             : "bg-gray-400 text-white cursor-not-allowed"
//                                             }`}
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => handleToggle(room._id)}
//                                         className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-150"
//                                     >
//                                         Activate
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(room._id)}
//                                         className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150"
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Display Room Images */}
//                             <div className="mt-4 flex space-x-4">
//                                 {room.images && room.images.length > 0 ? (
//                                     room.images.map((image, index) => (
//                                         <img
//                                             key={index}
//                                             src={image}
//                                             alt={`Room ${index + 1}`}
//                                             className="w-32 h-32 object-cover rounded-md"
//                                         />
//                                     ))
//                                 ) : (
//                                     <p>No images available</p>
//                                 )}
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
// import Swal from "sweetalert2";
// import { getStates } from "../../api/stateApi";
// import { getHotels } from "../../api/hotelApi";
// import {
//     getRooms,
//     addRoom,
//     updateRoom,
//     toggleRoomStatus,
//     deleteRoom,
// } from "../../api/roomApi";
// import { uploadImageToCloudinary } from "../../api/cloudinaryApi";

// const Room = () => {
//     const [states, setStates] = useState([]);
//     const [hotels, setHotels] = useState([]);
//     const [rooms, setRooms] = useState([]);
//     const [editingId, setEditingId] = useState(null);
//     const [imagePreview, setImagePreview] = useState(null);
//     const [fileInputKey, setFileInputKey] = useState(Date.now());
//     const [searchTerm, setSearchTerm] = useState("");
//     const [sortBy, setSortBy] = useState("");
//     const [acFilter, setAcFilter] = useState("");

//     const roomTypes = ["Normal Bed", "Medium Bed", "King Size Bed"];

//     const [formData, setFormData] = useState({
//         state: "",
//         city: "",
//         hotel: "",
//         type: "",
//         isAc: false,
//         images: [],
//     });

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const stateRes = await getStates();
//                 const hotelRes = await getHotels();
//                 const roomRes = await getRooms();

//                 const activeStates = stateRes?.data?.data?.filter((s) => s.isActive);
//                 const activeHotels = hotelRes?.data?.filter((h) => h.active === true);

//                 setStates(activeStates);
//                 setHotels(activeHotels);
//                 setRooms(roomRes?.data);
//             } catch (err) {
//                 console.error("Fetch error:", err);
//                 Swal.fire("Error", "Failed to fetch initial data", "error");
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

//     const handleImageChange = async (e) => {
//         const files = e.target.files;
//         if (!files || files.length === 0) return;

//         const uploadedUrls = [];

//         for (const file of files) {
//             const formDataToSend = new FormData();
//             formDataToSend.append("file", file);
//             formDataToSend.append("upload_preset", "pushpa");

//             try {
//                 const response = await uploadImageToCloudinary(formDataToSend);
//                 console.log("Cloudinary response:", response);

//                 if (response && response.secure_url) {
//                     uploadedUrls.push(response.secure_url);
//                 } else {
//                     console.error("Cloudinary response does not contain secure_url");
//                 }
//             } catch (error) {
//                 console.error("Upload failed:", error);
//             }
//         }

//         setFormData((prev) => {
//             const updated = {
//                 ...prev,
//                 images: [...prev.images, ...uploadedUrls],
//             };
//             console.log("Updated formData with images:", updated);
//             return updated;
//         });

//         if (uploadedUrls.length > 0) {
//             setImagePreview(uploadedUrls[0]);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             let newRoom;
//             const payload = { ...formData };

//             if (editingId) {
//                 const updatedRoom = await updateRoom(editingId, payload);
//                 newRoom = updatedRoom.data;

//                 Swal.fire({
//                     icon: "success",
//                     title: "Room Updated",
//                     text: "Room information updated successfully",
//                     timer: 2000,
//                     showConfirmButton: false,
//                 });
//             } else {
//                 const addedRoom = await addRoom(payload);
//                 newRoom = addedRoom.data;

//                 Swal.fire({
//                     icon: "success",
//                     title: "Room Added",
//                     text: "New room added successfully",
//                     timer: 2000,
//                     showConfirmButton: false,
//                 });
//             }

//             const roomRes = await getRooms();
//             setRooms(roomRes.data);

//             setFormData({
//                 state: "",
//                 city: "",
//                 hotel: "",
//                 type: "",
//                 isAc: false,
//                 images: [],
//             });
//             setImagePreview(null);
//             setFileInputKey(Date.now());
//             setEditingId(null);
//         } catch (err) {
//             console.error("Room submission failed:", err);
//             Swal.fire("Error", "Failed to submit room data", "error");
//         }
//     };

//     const handleEdit = (room) => {
//         setEditingId(room._id);
//         setFormData({
//             state: room.state?._id?.toString() || "",
//             city: room.city || "",
//             hotel: room.hotel?._id || "",
//             type: room.type,
//             isAc: room.isAc,
//             images: room.images || [],
//         });
//         setImagePreview(room.images?.[0] || null);
//         Swal.fire({
//             icon: "info",
//             title: "Edit Mode",
//             text: "You're editing a room. Make changes and submit.",
//             timer: 1500,
//             showConfirmButton: false,
//         });
//         console.log("Form data after editing:", room);
//     };

//     const handleToggle = async (id) => {
//         try {
//             await toggleRoomStatus(id);
//             const roomRes = await getRooms();
//             setRooms(roomRes.data);

//             Swal.fire({
//                 icon: "success",
//                 title: "Status Updated",
//                 text: "Room activation status changed",
//                 timer: 1500,
//                 showConfirmButton: false,
//             });
//         } catch (err) {
//             console.error("Toggle failed", err);
//             Swal.fire("Error", "Failed to toggle room status", "error");
//         }
//     };

//     const handleDelete = async (id) => {
//         const result = await Swal.fire({
//             title: "Are you sure?",
//             text: "This room and its images will be permanently deleted.",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#e3342f",
//             cancelButtonColor: "#6c757d",
//             confirmButtonText: "Yes, delete it!",
//         });

//         if (result.isConfirmed) {
//             try {
//                 const response = await deleteRoom(id);
//                 if (response?.data?.message === "Room and images deleted successfully") {
//                     setRooms((prev) => prev.filter((room) => room._id !== id));

//                     Swal.fire("Deleted!", "Room has been deleted.", "success");
//                 } else {
//                     Swal.fire("Error", "Failed to delete room", "error");
//                 }
//             } catch (err) {
//                 console.error("Delete failed", err);
//                 Swal.fire("Error", "Something went wrong", "error");
//             }
//         }
//     };

//     const filteredHotels = formData.state
//         ? hotels.filter((h) => {
//             const hotelStateId = typeof h.state === "object" ? h.state._id : h.state;
//             const isHotelActive = h.isActive === true || h.active === true;
//             return hotelStateId?.toString() === formData.state?.toString() && isHotelActive;
//         })
//         : [];

//     const getFilteredSortedRooms = (activeStatus) => {
//         return rooms
//             .filter((room) => room.active === activeStatus)
//             .filter((room) =>
//                 room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 room.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 (room.hotel?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
//             )
//             .filter((room) => {
//                 if (acFilter === "ac") return room.isAc;
//                 if (acFilter === "non-ac") return !room.isAc;
//                 return true;
//             })
//             .sort((a, b) => {
//                 if (!sortBy) return 0;
//                 if (sortBy === "city" || sortBy === "type") {
//                     return a[sortBy].localeCompare(b[sortBy]);
//                 }
//                 return 0;
//             });
//     };

//     return (
//         <div className="max-w-5xl mx-auto bg-gray-50 p-8 rounded-xl shadow-xl">
//             <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🛏️ Room Management</h2>

//             <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     <div>
//                         <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
//                         <select
//                             name="state"
//                             id="state"
//                             value={formData.state}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
//                         >
//                             <option value="">Select State</option>
//                             {states.map((s) => (
//                                 <option key={s._id} value={s._id}>{s.name}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div>
//                         <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
//                         <input
//                             type="text"
//                             name="city"
//                             id="city"
//                             value={formData.city}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
//                         />
//                     </div>

//                     <div>
//                         <label htmlFor="hotel" className="block text-sm font-medium text-gray-700">Hotel</label>
//                         <select
//                             name="hotel"
//                             id="hotel"
//                             value={formData.hotel}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
//                         >
//                             <option value="">Select Hotel</option>
//                             {filteredHotels.map((h) => (
//                                 <option key={h._id} value={h._id}>{h.name}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div>
//                         <label htmlFor="type" className="block text-sm font-medium text-gray-700">Room Type</label>
//                         <select
//                             name="type"
//                             id="type"
//                             value={formData.type}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
//                         >
//                             <option value="">Select Room Type</option>
//                             {roomTypes.map((t, i) => (
//                                 <option key={i} value={t}>{t}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="col-span-2">
//                         <label className="flex items-center space-x-3 text-sm font-medium text-gray-700">
//                             <input
//                                 type="checkbox"
//                                 name="isAc"
//                                 checked={formData.isAc}
//                                 onChange={handleChange}
//                                 className="h-5 w-5 text-indigo-500"
//                             />
//                             <span>AC Room</span>
//                         </label>
//                     </div>

//                     <div>
//                         <label htmlFor="images" className="block text-sm font-medium text-gray-700">Room Images</label>
//                         <input
//                             type="file"
//                             name="images"
//                             id="images"
//                             key={fileInputKey}
//                             onChange={handleImageChange}
//                             multiple
//                             className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
//                         />
//                         {imagePreview && (
//                             <div className="mt-4">
//                                 <img src={imagePreview} alt="Preview" className="w-full h-auto rounded" />
//                             </div>
//                         )}
//                     </div>

//                     {formData.images.length > 0 && (
//                         <div className="flex flex-wrap mt-4 gap-2">
//                             {formData.images.map((url, index) => (
//                                 <div key={index} className="relative">
//                                     <img src={url} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded" />
//                                     <button
//                                         type="button"
//                                         onClick={() =>
//                                             setFormData((prev) => ({
//                                                 ...prev,
//                                                 images: prev.images.filter((_, i) => i !== index),
//                                             }))
//                                         }
//                                         className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-1 text-xs"
//                                     >
//                                         ✕
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                     )}

//                     <div className="col-span-2">
//                         <button
//                             type="submit"
//                             className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
//                         >
//                             {editingId ? "Update Room" : "Add Room"}
//                         </button>
//                     </div>
//                 </div>
//             </form>

//             <div className="mt-10">
//                 <div className="mb-6">
//                     <h3 className="text-2xl font-semibold text-gray-800 mb-2">Active Rooms</h3>
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                         <input
//                             type="text"
//                             placeholder="Search by type, city, or hotel"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-lg"
//                         />

//                         <select
//                             value={sortBy}
//                             onChange={(e) => setSortBy(e.target.value)}
//                             className="w-full sm:w-1/4 p-2 border border-gray-300 rounded-lg"
//                         >
//                             <option value="">Sort By</option>
//                             <option value="type">Room Type</option>
//                             <option value="city">City</option>
//                         </select>

//                         <select
//                             value={acFilter}
//                             onChange={(e) => setAcFilter(e.target.value)}
//                             className="w-full sm:w-1/4 p-2 border border-gray-300 rounded-lg"
//                         >
//                             <option value="">All Rooms</option>
//                             <option value="ac">AC Rooms</option>
//                             <option value="non-ac">Non-AC Rooms</option>
//                         </select>
//                     </div>
//                 </div>
//                 <div className="space-y-6">
//                     {getFilteredSortedRooms(true).map((room) => (
//                         <div
//                             key={room._id}
//                             className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
//                         >
//                             <div className="flex justify-between items-center">
//                                 <div>
//                                     <p className="text-lg font-semibold text-gray-800">{room.type} – {room.isAc ? "AC" : "Non-AC"}</p>
//                                     <p className="text-sm text-gray-600">{room.hotel?.name}, {room.city}</p>
//                                 </div>

//                                 <div className="space-x-4">
//                                     <button
//                                         onClick={() => handleEdit(room)}
//                                         className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150"
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => handleToggle(room._id)}
//                                         className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-150"
//                                     >
//                                         Deactivate
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(room._id)}
//                                         className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150"
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Display Room Images */}
//                             <div className="mt-4 flex space-x-4">
//                                 {room.images && room.images.length > 0 ? (
//                                     room.images.map((image, index) => (
//                                         <img
//                                             key={index}
//                                             src={image}
//                                             alt={`Room ${index + 1}`}
//                                             className="w-32 h-32 object-cover rounded-md"
//                                         />
//                                     ))
//                                 ) : (
//                                     <p>No images available</p>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="mt-10">
//                 <h3 className="text-2xl font-semibold text-red-500 mb-6">Deactivated Rooms</h3>
//                 <div className="space-y-6">
//                     {getFilteredSortedRooms(false).map((room) => (
//                         <div
//                             key={room._id}
//                             className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
//                         >
//                             <div className="flex justify-between items-center">
//                                 <div>
//                                     <p className="text-lg font-semibold text-gray-800">{room.type} – {room.isAc ? "AC" : "Non-AC"}</p>
//                                     <p className="text-sm text-gray-600">{room.hotel?.name}, {room.city}</p>
//                                 </div>

//                                 <div className="space-x-4">
//                                     <button
//                                         onClick={() => handleEdit(room)}
//                                         className={`px-4 py-2 rounded-md transition duration-150 ${room.active
//                                             ? "bg-blue-600 text-white hover:bg-blue-700"
//                                             : "bg-gray-400 text-white cursor-not-allowed"
//                                             }`}
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => handleToggle(room._id)}
//                                         className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-150"
//                                     >
//                                         Activate
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(room._id)}
//                                         className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150"
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Display Room Images */}
//                             <div className="mt-4 flex space-x-4">
//                                 {room.images && room.images.length > 0 ? (
//                                     room.images.map((image, index) => (
//                                         <img
//                                             key={index}
//                                             src={image}
//                                             alt={`Room ${index + 1}`}
//                                             className="w-32 h-32 object-cover rounded-md"
//                                         />
//                                     ))
//                                 ) : (
//                                     <p>No images available</p>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Room;














import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getStates } from "../../api/stateApi";
import { getHotels } from "../../api/hotelApi";
import {
    getRooms,
    addRoom,
    updateRoom,
    toggleRoomStatus,
    deleteRoom,
} from "../../api/roomApi";
import { uploadImageToCloudinary } from "../../api/cloudinaryApi";

const Room = () => {
    const [states, setStates] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [acFilter, setAcFilter] = useState("");

    const roomTypes = ["Normal Bed", "Medium Bed", "King Size Bed"];

    const [formData, setFormData] = useState({
        state: "",
        city: "",
        hotel: "",
        type: "",
        isAc: false,
        roomNumber: "",
        price: "",
        images: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stateRes = await getStates();
                const hotelRes = await getHotels();
                const roomRes = await getRooms();

                const activeStates = stateRes?.data?.data?.filter((s) => s.isActive);
                const activeHotels = hotelRes?.data?.filter((h) => h.active === true);

                setStates(activeStates);
                setHotels(activeHotels);
                setRooms(roomRes?.data);
            } catch (err) {
                console.error("Fetch error:", err);
                Swal.fire("Error", "Failed to fetch initial data", "error");
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

    const handleImageChange = async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const uploadedUrls = [];

        for (const file of files) {
            const formDataToSend = new FormData();
            formDataToSend.append("file", file);
            formDataToSend.append("upload_preset", "pushpa");

            try {
                const response = await uploadImageToCloudinary(formDataToSend);
                console.log("Cloudinary response:", response);

                if (response && response.secure_url) {
                    uploadedUrls.push(response.secure_url);
                } else {
                    console.error("Cloudinary response does not contain secure_url");
                }
            } catch (error) {
                console.error("Upload failed:", error);
            }
        }

        setFormData((prev) => {
            const updated = {
                ...prev,
                images: [...prev.images, ...uploadedUrls],
            };
            console.log("Updated formData with images:", updated);
            return updated;
        });

        if (uploadedUrls.length > 0) {
            setImagePreview(uploadedUrls[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let newRoom;
            const payload = { ...formData };

            if (editingId) {
                const updatedRoom = await updateRoom(editingId, payload);
                newRoom = updatedRoom.data;

                Swal.fire({
                    icon: "success",
                    title: "Room Updated",
                    text: "Room information updated successfully",
                    timer: 2000,
                    showConfirmButton: false,
                });
            } else {
                const addedRoom = await addRoom(payload);
                newRoom = addedRoom.data;

                Swal.fire({
                    icon: "success",
                    title: "Room Added",
                    text: "New room added successfully",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }

            const roomRes = await getRooms();
            setRooms(roomRes.data);

            setFormData({
                state: "",
                city: "",
                hotel: "",
                type: "",
                isAc: false,
                roomNumber: "",
                price: "",
                images: [],
            });
            setImagePreview(null);
            setFileInputKey(Date.now());
            setEditingId(null);
        } catch (err) {
            console.error("Room submission failed:", err);
            Swal.fire("Error", "Failed to submit room data", "error");
        }
    };

    const handleEdit = (room) => {
        setEditingId(room._id);
        setFormData({
            state: room.state?._id?.toString() || "",
            city: room.city || "",
            hotel: room.hotel?._id || "",
            type: room.type,
            isAc: room.isAc,
            roomNumber: room.roomNumber,
            price: room.price,
            images: room.images || [],
        });
        setImagePreview(room.images?.[0] || null);
        Swal.fire({
            icon: "info",
            title: "Edit Mode",
            text: "You're editing a room. Make changes and submit.",
            timer: 1500,
            showConfirmButton: false,
        });
        console.log("Form data after editing:", room);
    };

    const handleToggle = async (id) => {
        try {
            await toggleRoomStatus(id);
            const roomRes = await getRooms();
            setRooms(roomRes.data);

            Swal.fire({
                icon: "success",
                title: "Status Updated",
                text: "Room activation status changed",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (err) {
            console.error("Toggle failed", err);
            Swal.fire("Error", "Failed to toggle room status", "error");
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This room and its images will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e3342f",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                const response = await deleteRoom(id);
                if (response?.message === "Room and images deleted successfully") {
                    setRooms((prev) => prev.filter((room) => room._id !== id));

                    Swal.fire("Deleted!", "Room has been deleted.", "success");
                } else {
                    Swal.fire("Error", "Failed to delete room", "error");
                }
            } catch (err) {
                console.error("Delete failed", err);
                Swal.fire("Error", "Something went wrong", "error");
            }
        }
    };

    const filteredHotels = formData.state
        ? hotels.filter((h) => {
            const hotelStateId = typeof h.state === "object" ? h.state._id : h.state;
            const isHotelActive = h.isActive === true || h.active === true;
            return hotelStateId?.toString() === formData.state?.toString() && isHotelActive;
        })
        : [];

    const getFilteredSortedRooms = (activeStatus) => {
        return rooms
            .filter((room) => room.active === activeStatus)
            .filter((room) =>
                room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                room.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (room.hotel?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter((room) => {
                if (acFilter === "ac") return room.isAc;
                if (acFilter === "non-ac") return !room.isAc;
                return true;
            })
            .sort((a, b) => {
                if (!sortBy) return 0;
                if (sortBy === "city" || sortBy === "type") {
                    return a[sortBy].localeCompare(b[sortBy]);
                }
                return 0;
            });
    };
    return (
        <div className="max-w-5xl mx-auto bg-gray-50 p-8 rounded-xl shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🛏️ Room Management</h2>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* State */}
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                        <select
                            name="state"
                            id="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
                        >
                            <option value="">Select State</option>
                            {states.map((s) => (
                                <option key={s._id} value={s._id}>{s.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* City */}
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Hotel */}
                    <div>
                        <label htmlFor="hotel" className="block text-sm font-medium text-gray-700">Hotel</label>
                        <select
                            name="hotel"
                            id="hotel"
                            value={formData.hotel}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
                        >
                            <option value="">Select Hotel</option>
                            {filteredHotels.map((h) => (
                                <option key={h._id} value={h._id}>{h.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Room Type */}
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Room Type</label>
                        <select
                            name="type"
                            id="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
                        >
                            <option value="">Select Room Type</option>
                            {roomTypes.map((t, i) => (
                                <option key={i} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    {/* AC Room */}
                    <div className="col-span-2">
                        <label className="flex items-center space-x-3 text-sm font-medium text-gray-700">
                            <input
                                type="checkbox"
                                name="isAc"
                                checked={formData.isAc}
                                onChange={handleChange}
                                className="h-5 w-5 text-indigo-500"
                            />
                            <span>AC Room</span>
                        </label>
                    </div>

                    {/* Room Number */}
                    <div>
                        <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700">Room Number</label>
                        <input
                            type="text"
                            name="roomNumber"
                            id="roomNumber"
                            value={formData.roomNumber}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Room Price */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Room Price</label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Room Images */}
                    <div>
                        <label htmlFor="images" className="block text-sm font-medium text-gray-700">Room Images</label>
                        <input
                            type="file"
                            name="images"
                            id="images"
                            key={fileInputKey}
                            onChange={handleImageChange}
                            multiple
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
                        />
                        {imagePreview && (
                            <div className="mt-4">
                                <img src={imagePreview} alt="Preview" className="w-full h-auto rounded" />
                            </div>
                        )}
                    </div>

                    {/* Display Images */}
                    {formData.images.length > 0 && (
                        <div className="flex flex-wrap mt-4 gap-2">
                            {formData.images.map((url, index) => (
                                <div key={index} className="relative">
                                    <img src={url} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded" />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                images: prev.images.filter((_, i) => i !== index),
                                            }))
                                        }
                                        className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-1 text-xs"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="col-span-2">
                        <button
                            type="submit"
                            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
                        >
                            {editingId ? "Update Room" : "Add Room"}
                        </button>
                    </div>
                </div>
            </form>

            <div className="mt-10">
                <div className="mb-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">Active Rooms</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <input
                            type="text"
                            placeholder="Search by type, city, or hotel"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-lg"
                        />

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full sm:w-1/4 p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="">Sort By</option>
                            <option value="type">Room Type</option>
                            <option value="city">City</option>
                        </select>

                        <select
                            value={acFilter}
                            onChange={(e) => setAcFilter(e.target.value)}
                            className="w-full sm:w-1/4 p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="">All Rooms</option>
                            <option value="ac">AC Rooms</option>
                            <option value="non-ac">Non-AC Rooms</option>
                        </select>
                    </div>
                </div>
                <div className="space-y-6">
                    {getFilteredSortedRooms(true).map((room) => (
                        <div
                            key={room._id}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {room.type} – {room.isAc ? "AC" : "Non-AC"}
                                    </p>
                                    <p className="text-sm text-gray-600">{room.hotel?.name}, {room.city}</p>
                                    {/* Show Room Number and Price */}
                                    <p className="text-sm text-gray-600">Room Number: {room.roomNumber}</p>
                                    <p className="text-sm text-gray-600">Price:{room.price}</p>
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

                            {/* Display Room Images */}
                            <div className="mt-4 flex space-x-4">
                                {room.images && room.images.length > 0 ? (
                                    room.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Room ${index + 1}`}
                                            className="w-32 h-32 object-cover rounded-md"
                                        />
                                    ))
                                ) : (
                                    <p>No images available</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10">
                    <h3 className="text-2xl font-semibold text-red-500 mb-6">Deactivated Rooms</h3>
                    <div className="space-y-6">
                        {getFilteredSortedRooms(false).map((room) => (
                            <div
                                key={room._id}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-lg font-semibold text-gray-800">
                                            {room.type} – {room.isAc ? "AC" : "Non-AC"}
                                        </p>
                                        <p className="text-sm text-gray-600">{room.hotel?.name}, {room.city}</p>
                                        {/* Show Room Number and Price */}
                                        <p className="text-sm text-gray-600">Room Number: {room.roomNumber}</p>
                                        <p className="text-sm text-gray-600">Price:{room.price}</p>
                                    </div>

                                    <div className="space-x-4">
                                        <button
                                            onClick={() => handleEdit(room)}
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

                                {/* Display Room Images */}
                                <div className="mt-4 flex space-x-4">
                                    {room.images && room.images.length > 0 ? (
                                        room.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt={`Room ${index + 1}`}
                                                className="w-32 h-32 object-cover rounded-md"
                                            />
                                        ))
                                    ) : (
                                        <p>No images available</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Room;