// import React, { useEffect, useState } from "react";
// import {
//   getLocations,
//   addLocation,
//   updateLocation,
//   toggleStatus,
//   deleteLocation,
// } from "../../api/locationApi";

// const AdminDashboard = () => {
//   const [locations, setLocations] = useState([]);
//   const [formData, setFormData] = useState({ city: "", state: "" });
//   const [editingId, setEditingId] = useState(null);
//   const [search, setSearch] = useState("");
//   const [sortBy, setSortBy] = useState("city");

//   const loadLocations = async () => {
//     const res = await getLocations();
//     setLocations(res.data);
//   };

//   useEffect(() => {
//     loadLocations();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await updateLocation(editingId, formData);
//       } else {
//         await addLocation(formData);
//       }
//       setFormData({ city: "", state: "" });
//       setEditingId(null);
//       loadLocations();
//     } catch (err) {
//       alert(err?.response?.data?.error || "Something went wrong");
//     }
//   };

//   const handleEdit = (loc) => {
//     setFormData({ city: loc.city, state: loc.state });
//     setEditingId(loc._id);
//   };

//   const filteredLocations = locations
//     .filter((loc) =>
//       `${loc.city} ${loc.state}`.toLowerCase().includes(search.toLowerCase())
//     )
//     .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div className="w-64 h-screen bg-gray-800 text-white p-4">
//         <h2 className="text-2xl font-bold mb-4">Admin</h2>
//         <ul>
//           <li className="p-2 bg-gray-700 rounded">Location</li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         <h1 className="text-3xl font-bold mb-6">Manage Locations</h1>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="mb-6 space-x-2">
//           <input
//             type="text"
//             placeholder="City"
//             value={formData.city}
//             onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//             required
//             className="border p-2"
//           />
//           <input
//             type="text"
//             placeholder="State"
//             value={formData.state}
//             onChange={(e) => setFormData({ ...formData, state: e.target.value })}
//             required
//             className="border p-2"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             {editingId ? "Update" : "Add"}
//           </button>
//         </form>

//         {/* Search and Sort */}
//         <div className="flex justify-between items-center mb-4">
//           <input
//             type="text"
//             placeholder="Search by city or state"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="border p-2 w-1/2"
//           />
//           <select
//             className="border p-2"
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option value="city">Sort by City</option>
//             <option value="state">Sort by State</option>
//           </select>
//         </div>

//         {/* Table */}
//         <table className="w-full border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2">City</th>
//               <th className="p-2">State</th>
//               <th className="p-2">Status</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredLocations.map((loc) => (
//               <tr key={loc._id} className="text-center">
//                 <td className="p-2">{loc.city}</td>
//                 <td className="p-2">{loc.state}</td>
//                 <td className="p-2">
//                   <button
//                     onClick={() => toggleStatus(loc._id).then(loadLocations)}
//                     className={`px-3 py-1 rounded text-white ${loc.active ? "bg-green-500" : "bg-gray-400"
//                       }`}
//                   >
//                     {loc.active ? "Active" : "Inactive"}
//                   </button>
//                 </td>
//                 <td className="p-2 space-x-2">
//                   <button
//                     onClick={() => handleEdit(loc)}
//                     className="bg-yellow-500 text-white px-3 py-1 rounded"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => deleteLocation(loc._id).then(loadLocations)}
//                     className="bg-red-600 text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;










// import React, { useEffect, useState } from "react";
// import {
//   getLocations,
//   addLocation,
//   updateLocation,
//   toggleStatus,
//   deleteLocation,
// } from "../../api/locationApi";

// const AdminDashboard = () => {
//   const [locations, setLocations] = useState([]);
//   const [formData, setFormData] = useState({ city: "", state: "" });
//   const [editingId, setEditingId] = useState(null);
//   const [search, setSearch] = useState("");
//   const [sortBy, setSortBy] = useState("city");

//   const loadLocations = async () => {
//     const res = await getLocations();
//     setLocations(res.data);
//   };

//   useEffect(() => {
//     loadLocations();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await updateLocation(editingId, formData);
//       } else {
//         await addLocation(formData);
//       }
//       setFormData({ city: "", state: "" });
//       setEditingId(null);
//       loadLocations();
//     } catch (err) {
//       alert(err?.response?.data?.error || "Something went wrong");
//     }
//   };

//   const handleEdit = (loc) => {
//     setFormData({ city: loc.city, state: loc.state });
//     setEditingId(loc._id);
//   };

//   const filteredLocations = locations
//     .filter((loc) =>
//       `${loc.city} ${loc.state}`.toLowerCase().includes(search.toLowerCase())
//     )
//     .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

//   const activeLocations = filteredLocations.filter((loc) => loc.active);
//   const inactiveLocations = filteredLocations.filter((loc) => !loc.active);

//   const renderTable = (title, locs) => (
//     <div className="mb-10">
//       <h2 className="text-xl font-semibold mb-2">{title}</h2>
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2">City</th>
//             <th className="p-2">State</th>
//             <th className="p-2">Status</th>
//             <th className="p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {locs.map((loc) => (
//             <tr key={loc._id} className="text-center">
//               <td className="p-2">{loc.city}</td>
//               <td className="p-2">{loc.state}</td>
//               <td className="p-2">
//                 <button
//                   onClick={() => toggleStatus(loc._id).then(loadLocations)}
//                   className={`px-3 py-1 rounded text-white ${loc.active ? "bg-green-500" : "bg-gray-400"}`}
//                 >
//                   {loc.active ? "Active" : "Inactive"}
//                 </button>
//               </td>
//               <td className="p-2 space-x-2">
//                 <button
//                   onClick={() => handleEdit(loc)}
//                   className={`px-3 py-1 rounded text-white ${loc.active ? "bg-yellow-500" : "bg-gray-300 cursor-not-allowed"}`}
//                   disabled={!loc.active}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => deleteLocation(loc._id).then(loadLocations)}
//                   className="bg-red-600 text-white px-3 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-800 text-white p-4 min-h-screen sticky top-0 self-start">
//         <h2 className="text-2xl font-bold mb-4">Admin</h2>
//         <ul>
//           <li className="p-2 bg-gray-700 rounded">Location</li>
//         </ul>
//       </div>


//       {/* Main Content */}
//       <div className="flex-1 p-6 bg-white min-hight-screen">
//         <h1 className="text-3xl font-bold mb-6">Manage Locations</h1>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="mb-6 space-x-2">
//           <input
//             type="text"
//             placeholder="City"
//             value={formData.city}
//             onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//             required
//             className="border p-2"
//           />
//           <input
//             type="text"
//             placeholder="State"
//             value={formData.state}
//             onChange={(e) => setFormData({ ...formData, state: e.target.value })}
//             required
//             className="border p-2"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             {editingId ? "Update" : "Add"}
//           </button>
//         </form>

//         {/* Search and Sort */}
//         <div className="flex justify-between items-center mb-4">
//           <input
//             type="text"
//             placeholder="Search by city or state"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="border p-2 w-1/2"
//           />
//           <select
//             className="border p-2"
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option value="city">Sort by City</option>
//             <option value="state">Sort by State</option>
//           </select>
//         </div>

//         {/* Tables */}
//         {renderTable("Active Locations", activeLocations)}
//         {renderTable("Inactive Locations", inactiveLocations)}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;















import React, { useEffect, useState } from "react";
import {
  getLocations,
  addLocation,
  updateLocation,
  toggleStatus,
  deleteLocation,
} from "../../api/locationApi";

const AdminDashboard = () => {
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({ city: "", state: "" });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("city");

  const loadLocations = async () => {
    const res = await getLocations();
    setLocations(res.data);
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateLocation(editingId, formData);
      } else {
        await addLocation(formData);
      }
      setFormData({ city: "", state: "" });
      setEditingId(null);
      loadLocations();
    } catch (err) {
      alert(err?.response?.data?.error || "Something went wrong");
    }
  };

  const handleEdit = (loc) => {
    setFormData({ city: loc.city, state: loc.state });
    setEditingId(loc._id);
  };

  const filteredLocations = locations
    .filter((loc) =>
      `${loc.city} ${loc.state}`.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  const activeLocations = filteredLocations.filter((loc) => loc.active);
  const inactiveLocations = filteredLocations.filter((loc) => !loc.active);

  const renderTable = (title, locs) => (
    <div className="mb-10 bg-white rounded-xl shadow-md p-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">{title}</h2>
      <table className="w-full table-auto text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="p-3 text-left">City</th>
            <th className="p-3 text-left">State</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {locs.map((loc, idx) => (
            <tr key={loc._id} className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}>
              <td className="p-3">{loc.city}</td>
              <td className="p-3">{loc.state}</td>
              <td className="p-3 text-center">
                <button
                  onClick={() => toggleStatus(loc._id).then(loadLocations)}
                  className={`px-3 py-1 rounded text-white font-medium transition ${loc.active ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 hover:bg-gray-500"
                    }`}
                >
                  {loc.active ? "Active" : "Inactive"}
                </button>
              </td>
              <td className="p-3 text-center space-x-2">
                <button
                  onClick={() => handleEdit(loc)}
                  disabled={!loc.active}
                  className={`px-3 py-1 rounded font-medium text-white transition ${loc.active
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteLocation(loc._id).then(loadLocations)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-medium transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 sticky top-0 self-start min-h-screen shadow-lg">
        <h2 className="text-2xl font-bold mb-6 tracking-wide">🛠 Admin Panel</h2>
        <ul>
          <li className="p-3 rounded bg-gray-700 hover:bg-gray-600 transition-colors duration-200 cursor-pointer">
            📍 Location
          </li>
        </ul>
      </div>

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Locations</h1>

        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-white rounded-xl shadow-md p-6 flex flex-wrap gap-4 items-end"
        >
          <input
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
            className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="State"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            required
            className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
          >
            {editingId ? "Update" : "Add"}
          </button>
        </form>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by city or state"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 border border-gray-300 rounded px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            className="border border-gray-300 rounded px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="city">Sort by City</option>
            <option value="state">Sort by State</option>
          </select>
        </div>

        {/* Tables */}
        {renderTable("Active Locations", activeLocations)}
        {renderTable("Inactive Locations", inactiveLocations)}
      </div>
    </div>
  );
};

export default AdminDashboard;