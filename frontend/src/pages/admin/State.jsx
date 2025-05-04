// import React, { useState, useEffect } from "react";
// import {
//     getStates,
//     addState,
//     updateState,
//     toggleStateStatus,
//     deleteState,
// } from "../../api/stateApi";

// const State = () => {
//     const [name, setName] = useState("");
//     const [code, setCode] = useState("");
//     const [states, setStates] = useState([]);
//     const [editId, setEditId] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const fetchStates = async () => {
//         try {
//             const res = await getStates();
//             setStates(res.data.data);
//         } catch (error) {
//             console.error("Error fetching states:", error);
//         }
//     };

//     useEffect(() => {
//         fetchStates();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             if (editId) {
//                 await updateState(editId, { name, code });
//             } else {
//                 await addState({ name, code });
//             }
//             setName("");
//             setCode("");
//             setEditId(null);
//             fetchStates();
//         } catch (error) {
//             console.error("Error submitting state:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleToggleStatus = async (id) => {
//         try {
//             await toggleStateStatus(id);
//             fetchStates();
//         } catch (error) {
//             console.error("Error toggling status:", error);
//         }
//     };

//     const handleEdit = (state) => {
//         if (!state.isActive) return;
//         setName(state.name);
//         setCode(state.code);
//         setEditId(state._id);
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this state?")) {
//             try {
//                 await deleteState(id);
//                 fetchStates();
//             } catch (error) {
//                 console.error("Error deleting state:", error);
//             }
//         }
//     };

//     const activeStates = states.filter((state) => state.isActive);
//     const inactiveStates = states.filter((state) => !state.isActive);

//     return (
//         <div className="p-8 bg-gradient-to-b from-blue-50 to-white min-h-screen text-gray-800">
//             <h2 className="text-3xl font-bold text-blue-700 mb-6">Manage States</h2>

//             <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 mb-8 space-y-4">
//                 <div className="flex flex-col md:flex-row gap-4">
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder="State Name"
//                         className="border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                         required
//                     />
//                     <input
//                         type="text"
//                         value={code}
//                         onChange={(e) => setCode(e.target.value)}
//                         placeholder="State Code"
//                         className="border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                         required
//                     />
//                     <button
//                         type="submit"
//                         className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
//                     >
//                         {loading ? "Loading..." : editId ? "Update State" : "Add State"}
//                     </button>
//                 </div>
//             </form>

//             <div className="grid gap-8">
//                 <div>
//                     <h3 className="text-xl font-semibold text-green-600 mb-4">Active States</h3>
//                     {activeStates.length === 0 ? (
//                         <p className="text-gray-500">No active states available</p>
//                     ) : (
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             {activeStates.map((state) => (
//                                 <div
//                                     key={state._id}
//                                     className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
//                                 >
//                                     <div>
//                                         <h4 className="font-bold text-lg text-gray-800">{state.name}</h4>
//                                         <p className="text-sm text-gray-500">Code: {state.code}</p>
//                                     </div>
//                                     <div className="flex gap-2">
//                                         <button
//                                             onClick={() => handleToggleStatus(state._id)}
//                                             className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
//                                         >
//                                             Deactivate
//                                         </button>
//                                         <button
//                                             onClick={() => handleEdit(state)}
//                                             className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             onClick={() => handleDelete(state._id)}
//                                             className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>

//                 <div>
//                     <h3 className="text-xl font-semibold text-red-600 mb-4">Inactive States</h3>
//                     {inactiveStates.length === 0 ? (
//                         <p className="text-gray-500">No inactive states available</p>
//                     ) : (
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             {inactiveStates.map((state) => (
//                                 <div
//                                     key={state._id}
//                                     className="bg-gray-100 shadow-inner rounded-lg p-4 flex justify-between items-center"
//                                 >
//                                     <div>
//                                         <h4 className="font-bold text-lg text-gray-700">{state.name}</h4>
//                                         <p className="text-sm text-gray-500">Code: {state.code}</p>
//                                     </div>
//                                     <div className="flex gap-2">
//                                         <button
//                                             onClick={() => handleToggleStatus(state._id)}
//                                             className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
//                                         >
//                                             Activate
//                                         </button>
//                                         <button
//                                             onClick={() => handleEdit(state)}
//                                             className={`px-3 py-1 rounded mr-2 ${state.isActive
//                                                 ? "bg-green-500 text-white hover:bg-green-600"
//                                                 : "bg-gray-300 text-gray-600 cursor-not-allowed"
//                                                 }`}
//                                             disabled={!state.isActive}
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             onClick={() => handleDelete(state._id)}
//                                             className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default State;









// import React, { useState, useEffect } from "react";
// import {
//     getStates,
//     addState,
//     updateState,
//     toggleStateStatus,
//     deleteState,
// } from "../../api/stateApi";

// const State = () => {
//     const [name, setName] = useState("");
//     const [code, setCode] = useState("");
//     const [states, setStates] = useState([]);
//     const [editId, setEditId] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         fetchStates();
//     }, []);

//     const fetchStates = async () => {
//         try {
//             const res = await getStates();
//             const stateList = Array.isArray(res.data?.data) ? res.data.data : [];
//             setStates(stateList);
//         } catch (err) {
//             console.error("Error fetching states:", err);
//             setError("Failed to load states");
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!name || !code) {
//             setError("State name and code are required");
//             return;
//         }
//         setLoading(true);
//         try {
//             if (editId) {
//                 await updateState(editId, { name, code });
//             } else {
//                 await addState({ name, code });
//             }
//             resetForm();
//             fetchStates();
//         } catch (err) {
//             console.error("Error submitting state:", err);
//             setError("Something went wrong");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const resetForm = () => {
//         setName("");
//         setCode("");
//         setEditId(null);
//         setError("");
//     };

//     const handleToggleStatus = async (id) => {
//         try {
//             await toggleStateStatus(id);
//             fetchStates();
//         } catch (err) {
//             console.error("Error toggling status:", err);
//         }
//     };

//     const handleEdit = (state) => {
//         if (!state.isActive) return;
//         setName(state.name);
//         setCode(state.code);
//         setEditId(state._id);
//         setError("");
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this state?")) {
//             try {
//                 await deleteState(id);
//                 fetchStates();
//             } catch (err) {
//                 console.error("Error deleting state:", err);
//             }
//         }
//     };

//     const renderStateCard = (state, isInactive = false) => (
//         <div
//             key={state._id}
//             className={`p-4 rounded-lg shadow-md flex justify-between items-center ${isInactive ? "bg-gray-100" : "bg-white"}`}
//         >
//             <div>
//                 <h4 className="text-lg font-bold">{state.name}</h4>
//                 <p className="text-sm text-gray-500">Code: {state.code}</p>
//             </div>
//             <div className="flex gap-2">
//                 <button
//                     onClick={() => handleToggleStatus(state._id)}
//                     className={`px-3 py-1 rounded text-white ${isInactive ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"}`}
//                 >
//                     {isInactive ? "Activate" : "Deactivate"}
//                 </button>
//                 <button
//                     onClick={() => handleEdit(state)}
//                     className={`px-3 py-1 rounded ${isInactive ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
//                     disabled={isInactive}
//                 >
//                     Edit
//                 </button>
//                 <button
//                     onClick={() => handleDelete(state._id)}
//                     className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
//                 >
//                     Delete
//                 </button>
//             </div>
//         </div>
//     );

//     const activeStates = states.filter((s) => s.isActive);
//     const inactiveStates = states.filter((s) => !s.isActive);

//     return (
//         <div className="p-6 md:p-10 bg-gray-50 min-h-screen text-gray-800">
//             <h2 className="text-3xl font-bold mb-6 text-blue-700">Manage States</h2>

//             <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-8">
//                 {error && <p className="text-red-500 mb-3">{error}</p>}
//                 <div className="flex flex-col md:flex-row gap-4">
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder="State Name"
//                         className="p-3 border border-gray-300 rounded-md flex-1 focus:ring-2 focus:ring-blue-300"
//                         required
//                     />
//                     <input
//                         type="text"
//                         value={code}
//                         onChange={(e) => setCode(e.target.value)}
//                         placeholder="State Code"
//                         className="p-3 border border-gray-300 rounded-md flex-1 focus:ring-2 focus:ring-blue-300"
//                         required
//                     />
//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold"
//                     >
//                         {loading ? "Saving..." : editId ? "Update" : "Add State"}
//                     </button>
//                 </div>
//             </form>

//             <div className="space-y-10">
//                 <div>
//                     <h3 className="text-xl font-semibold text-green-600 mb-4">Active States</h3>
//                     {activeStates.length === 0 ? (
//                         <p className="text-gray-500">No active states</p>
//                     ) : (
//                         <div className="grid gap-4 md:grid-cols-2">{activeStates.map((state) => renderStateCard(state))}</div>
//                     )}
//                 </div>

//                 <div>
//                     <h3 className="text-xl font-semibold text-red-600 mb-4">Inactive States</h3>
//                     {inactiveStates.length === 0 ? (
//                         <p className="text-gray-500">No inactive states</p>
//                     ) : (
//                         <div className="grid gap-4 md:grid-cols-2">
//                             {inactiveStates.map((state) => renderStateCard(state, true))}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default State;













// import React, { useState, useEffect } from "react";
// import {
//     getStates,
//     addState,
//     updateState,
//     toggleStateStatus,
//     deleteState,
// } from "../../api/stateApi";

// const State = () => {
//     const [name, setName] = useState("");
//     const [code, setCode] = useState("");
//     const [states, setStates] = useState([]);
//     const [editId, setEditId] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [sortBy, setSortBy] = useState("");

//     useEffect(() => {
//         fetchStates();
//     }, []);

//     const fetchStates = async () => {
//         try {
//             const res = await getStates();
//             const stateList = Array.isArray(res.data?.data) ? res.data.data : [];
//             setStates(stateList);
//         } catch (err) {
//             console.error("Error fetching states:", err);
//             setError("Failed to load states");
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!name || !code) {
//             setError("State name and code are required");
//             return;
//         }
//         setLoading(true);
//         try {
//             if (editId) {
//                 await updateState(editId, { name, code });
//             } else {
//                 await addState({ name, code });
//             }
//             resetForm();
//             fetchStates();
//         } catch (err) {
//             console.error("Error submitting state:", err);
//             setError("Something went wrong");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const resetForm = () => {
//         setName("");
//         setCode("");
//         setEditId(null);
//         setError("");
//     };

//     const handleToggleStatus = async (id) => {
//         try {
//             await toggleStateStatus(id);
//             fetchStates();
//         } catch (err) {
//             console.error("Error toggling status:", err);
//         }
//     };

//     const handleEdit = (state) => {
//         if (!state.isActive) return;
//         setName(state.name);
//         setCode(state.code);
//         setEditId(state._id);
//         setError("");
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this state?")) {
//             try {
//                 await deleteState(id);
//                 fetchStates();
//             } catch (err) {
//                 console.error("Error deleting state:", err);
//             }
//         }
//     };

//     const renderStateCard = (state, isInactive = false) => (
//         <div
//             key={state._id}
//             className={`p-4 rounded-lg shadow-md flex justify-between items-center ${isInactive ? "bg-gray-100" : "bg-white"}`}
//         >
//             <div>
//                 <h4 className="text-lg font-bold">{state.name}</h4>
//                 <p className="text-sm text-gray-500">Code: {state.code}</p>
//             </div>
//             <div className="flex gap-2">
//                 <button
//                     onClick={() => handleToggleStatus(state._id)}
//                     className={`px-3 py-1 rounded text-white ${isInactive ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"}`}
//                 >
//                     {isInactive ? "Activate" : "Deactivate"}
//                 </button>
//                 <button
//                     onClick={() => handleEdit(state)}
//                     className={`px-3 py-1 rounded ${isInactive ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
//                     disabled={isInactive}
//                 >
//                     Edit
//                 </button>
//                 <button
//                     onClick={() => handleDelete(state._id)}
//                     className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
//                 >
//                     Delete
//                 </button>
//             </div>
//         </div>
//     );

//     // Filtered and Sorted States
//     const filteredStates = states.filter((state) =>
//         state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         state.code.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const sortedStates = [...filteredStates].sort((a, b) => {
//         if (!sortBy) return 0;
//         const fieldA = a[sortBy].toLowerCase();
//         const fieldB = b[sortBy].toLowerCase();
//         return fieldA.localeCompare(fieldB);
//     });

//     const activeStates = sortedStates.filter((s) => s.isActive);
//     const inactiveStates = sortedStates.filter((s) => !s.isActive);

//     return (
//         <div className="p-6 md:p-10 bg-gray-50 min-h-screen text-gray-800">
//             <h2 className="text-3xl font-bold mb-6 text-blue-700">Manage States</h2>

//             <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-8">
//                 {error && <p className="text-red-500 mb-3">{error}</p>}
//                 <div className="flex flex-col md:flex-row gap-4">
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder="State Name"
//                         className="p-3 border border-gray-300 rounded-md flex-1 focus:ring-2 focus:ring-blue-300"
//                         required
//                     />
//                     <input
//                         type="text"
//                         value={code}
//                         onChange={(e) => setCode(e.target.value)}
//                         placeholder="State Code"
//                         className="p-3 border border-gray-300 rounded-md flex-1 focus:ring-2 focus:ring-blue-300"
//                         required
//                     />
//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold"
//                     >
//                         {loading ? "Saving..." : editId ? "Update" : "Add State"}
//                     </button>
//                 </div>
//             </form>

//             <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
//                 <input
//                     type="text"
//                     placeholder="Search by name or code..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="flex-1 border px-4 py-2 rounded"
//                 />
//                 <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     className="border px-4 py-2 rounded"
//                 >
//                     <option value="">Sort By</option>
//                     <option value="name">State Name</option>
//                     <option value="code">State Code</option>
//                 </select>
//             </div>

//             <div className="space-y-10">
//                 <div>
//                     <h3 className="text-xl font-semibold text-green-600 mb-4">Active States</h3>
//                     {activeStates.length === 0 ? (
//                         <p className="text-gray-500">No active states</p>
//                     ) : (
//                         <div className="grid gap-4 md:grid-cols-2">
//                             {activeStates.map((state) => renderStateCard(state))}
//                         </div>
//                     )}
//                 </div>

//                 <div>
//                     <h3 className="text-xl font-semibold text-red-600 mb-4">Inactive States</h3>
//                     {inactiveStates.length === 0 ? (
//                         <p className="text-gray-500">No inactive states</p>
//                     ) : (
//                         <div className="grid gap-4 md:grid-cols-2">
//                             {inactiveStates.map((state) => renderStateCard(state, true))}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default State;









import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
    getStates,
    addState,
    updateState,
    toggleStateStatus,
    deleteState,
} from "../../api/stateApi";

const State = () => {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [states, setStates] = useState([]);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("");

    useEffect(() => {
        fetchStates();
    }, []);

    const fetchStates = async () => {
        try {
            const res = await getStates();
            const stateList = Array.isArray(res.data?.data) ? res.data.data : [];
            setStates(stateList);
        } catch (err) {
            console.error("Error fetching states:", err);
            setError("Failed to load states");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !code) {
            setError("State name and code are required");
            return;
        }
        setLoading(true);
        try {
            if (editId) {
                await updateState(editId, { name, code });
                Swal.fire("Updated!", "State updated successfully.", "success");
            } else {
                await addState({ name, code });
                Swal.fire("Added!", "State added successfully.", "success");
            }
            resetForm();
            fetchStates();
        } catch (err) {
            console.error("Error submitting state:", err);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setName("");
        setCode("");
        setEditId(null);
        setError("");
    };

    const handleToggleStatus = async (id) => {
        try {
            await toggleStateStatus(id);
            fetchStates();
            Swal.fire("Success!", "State status updated.", "success");
        } catch (err) {
            console.error("Error toggling status:", err);
        }
    };

    const handleEdit = (state) => {
        if (!state.isActive) return;
        setName(state.name);
        setCode(state.code);
        setEditId(state._id);
        setError("");
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                await deleteState(id);
                fetchStates();
                Swal.fire("Deleted!", "State has been deleted.", "success");
            } catch (err) {
                console.error("Error deleting state:", err);
            }
        }
    };

    const renderStateCard = (state, isInactive = false) => (
        <div
            key={state._id}
            className={`p-4 rounded-lg shadow-md flex justify-between items-center ${isInactive ? "bg-gray-100" : "bg-white"}`}
        >
            <div>
                <h4 className="text-lg font-bold">{state.name}</h4>
                <p className="text-sm text-gray-500">Code: {state.code}</p>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => handleToggleStatus(state._id)}
                    className={`px-3 py-1 rounded text-white ${isInactive ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"}`}
                >
                    {isInactive ? "Activate" : "Deactivate"}
                </button>
                <button
                    onClick={() => handleEdit(state)}
                    className={`px-3 py-1 rounded ${isInactive ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                    disabled={isInactive}
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(state._id)}
                    className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    );

    const filteredStates = states.filter((state) =>
        state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        state.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedStates = [...filteredStates].sort((a, b) => {
        if (!sortBy) return 0;
        const fieldA = a[sortBy].toLowerCase();
        const fieldB = b[sortBy].toLowerCase();
        return fieldA.localeCompare(fieldB);
    });

    const activeStates = sortedStates.filter((s) => s.isActive);
    const inactiveStates = sortedStates.filter((s) => !s.isActive);

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen text-gray-800">
            <h2 className="text-3xl font-bold mb-6 text-blue-700">Manage States</h2>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-8">
                {error && <p className="text-red-500 mb-3">{error}</p>}
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="State Name"
                        className="p-3 border border-gray-300 rounded-md flex-1 focus:ring-2 focus:ring-blue-300"
                        required
                    />
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="State Code"
                        className="p-3 border border-gray-300 rounded-md flex-1 focus:ring-2 focus:ring-blue-300"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold"
                    >
                        {loading ? "Saving..." : editId ? "Update" : "Add State"}
                    </button>
                </div>
            </form>

            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                <input
                    type="text"
                    placeholder="Search by name or code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 border px-4 py-2 rounded"
                />
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border px-4 py-2 rounded"
                >
                    <option value="">Sort By</option>
                    <option value="name">State Name</option>
                    <option value="code">State Code</option>
                </select>
            </div>

            <div className="space-y-10">
                <div>
                    <h3 className="text-xl font-semibold text-green-600 mb-4">Active States</h3>
                    {activeStates.length === 0 ? (
                        <p className="text-gray-500">No active states</p>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {activeStates.map((state) => renderStateCard(state))}
                        </div>
                    )}
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-red-600 mb-4">Inactive States</h3>
                    {inactiveStates.length === 0 ? (
                        <p className="text-gray-500">No inactive states</p>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {inactiveStates.map((state) => renderStateCard(state, true))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default State;