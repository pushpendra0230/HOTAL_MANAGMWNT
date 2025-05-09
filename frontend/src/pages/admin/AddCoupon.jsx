// import React, { useState } from "react";
// import axios from "axios";

// const AddCoupon = () => {
//     const [code, setCode] = useState("");
//     const [discount, setDiscount] = useState("");
//     const [validFrom, setValidFrom] = useState("");
//     const [validTill, setValidTill] = useState("");
//     const [minBookingAmount, setMinBookingAmount] = useState("");
//     const [usageLimit, setUsageLimit] = useState("");
//     const [message, setMessage] = useState("");

//     // Add Coupon API Request
//     const addCoupon = async (couponData) => {
//         const token = localStorage.getItem("token");
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         };

//         try {
//             const response = await axios.post(
//                 "http://localhost:6001/api/coupons/addCoupon",
//                 couponData,
//                 config
//             );
//             return response.data;
//         } catch (error) {
//             throw new Error(error.response?.data?.message || "Failed to add coupon");
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const couponData = {
//             code,
//             discountType: "percentage",
//             discountValue: discount,
//             validFrom: new Date(validFrom),
//             validTill: new Date(validTill),
//             minBookingAmount,
//             usageLimit,
//         };

//         try {
//             const result = await addCoupon(couponData);
//             setMessage("✅ Coupon added successfully!");
//             setCode("");
//             setDiscount("");
//             setValidFrom("");
//             setValidTill("");
//             setMinBookingAmount("");
//             setUsageLimit("");
//         } catch (error) {
//             setMessage(`❌ ${error.message}`);
//         }
//     };

//     return (
//         <div className="max-w-xl mx-auto bg-white p-8 rounded shadow-md mt-8">
//             <h2 className="text-2xl font-semibold mb-6">🎟️ Add New Coupon</h2>
//             {message && <p className="mb-4 text-center text-sm">{message}</p>}
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label className="block text-gray-700 font-medium mb-1">Coupon Code</label>
//                     <input
//                         type="text"
//                         value={code}
//                         onChange={(e) => setCode(e.target.value)}
//                         className="w-full border rounded p-2"
//                         placeholder="e.g. SUMMER2025"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 font-medium mb-1">Discount (%)</label>
//                     <input
//                         type="number"
//                         value={discount}
//                         onChange={(e) => setDiscount(e.target.value)}
//                         className="w-full border rounded p-2"
//                         placeholder="e.g. 15"
//                         min={1}
//                         max={100}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 font-medium mb-1">Valid From</label>
//                     <input
//                         type="datetime-local"
//                         value={validFrom}
//                         onChange={(e) => setValidFrom(e.target.value)}
//                         className="w-full border rounded p-2"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 font-medium mb-1">Valid Till</label>
//                     <input
//                         type="datetime-local"
//                         value={validTill}
//                         onChange={(e) => setValidTill(e.target.value)}
//                         className="w-full border rounded p-2"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 font-medium mb-1">Min Booking Amount</label>
//                     <input
//                         type="number"
//                         value={minBookingAmount}
//                         onChange={(e) => setMinBookingAmount(e.target.value)}
//                         className="w-full border rounded p-2"
//                         placeholder="e.g. 100"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 font-medium mb-1">Usage Limit</label>
//                     <input
//                         type="number"
//                         value={usageLimit}
//                         onChange={(e) => setUsageLimit(e.target.value)}
//                         className="w-full border rounded p-2"
//                         placeholder="e.g. 1000"
//                         required
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
//                 >
//                     ➕ Add Coupon
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddCoupon;









// import React, { useState, useEffect } from "react";
// import {
//     addCoupon,
//     getAllCoupons,
//     updateCoupon,
//     disableCoupon,
//     deleteCoupon,
// } from "../../api/couponApi";

// const AddCoupon = () => {
//     const [code, setCode] = useState("");
//     const [discount, setDiscount] = useState("");
//     const [validFrom, setValidFrom] = useState("");
//     const [validTill, setValidTill] = useState("");
//     const [minBookingAmount, setMinBookingAmount] = useState("");
//     const [usageLimit, setUsageLimit] = useState("");
//     const [message, setMessage] = useState("");
//     const [coupons, setCoupons] = useState([]);
//     const [editId, setEditId] = useState(null);

//     const fetchCoupons = async () => {
//         try {
//             const data = await getAllCoupons();
//             setCoupons(data);
//         } catch (error) {
//             setMessage(`❌ ${error.message}`);
//         }
//     };

//     useEffect(() => {
//         fetchCoupons();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const couponData = {
//             code,
//             discountType: "percentage",
//             discountValue: Number(discount),
//             validFrom: new Date(validFrom),
//             validTill: new Date(validTill),
//             minBookingAmount: Number(minBookingAmount),
//             usageLimit: Number(usageLimit),
//         };

//         try {
//             if (editId) {
//                 const updatedCoupon = await updateCoupon({ ...couponData, id: editId });
//                 setMessage("✅ Coupon updated successfully!");

//                 setCoupons((prevCoupons) =>
//                     prevCoupons.map((coupon) =>
//                         coupon._id === editId ? { ...coupon, ...updatedCoupon } : coupon
//                     )
//                 );
//             } else {
//                 await addCoupon(couponData);
//                 setMessage("✅ Coupon added successfully!");
//             }

//             setCode("");
//             setDiscount("");
//             setValidFrom("");
//             setValidTill("");
//             setMinBookingAmount("");
//             setUsageLimit("");
//             setEditId(null);

//             await fetchCoupons();
//         } catch (error) {
//             setMessage(`❌ ${error.message}`);
//         }
//     };

//     const handleEdit = (coupon) => {
//         setEditId(coupon._id);
//         setCode(coupon.code);
//         setDiscount(coupon.discountValue);
//         setValidFrom(new Date(coupon.validFrom).toISOString().slice(0, 16));
//         setValidTill(new Date(coupon.validTill).toISOString().slice(0, 16));
//         setMinBookingAmount(coupon.minBookingAmount);
//         setUsageLimit(coupon.usageLimit);
//         setMessage("✏️ Editing coupon...");
//     };

//     const handleDisable = async (id) => {
//         try {
//             await disableCoupon(id);
//             setMessage("🚫 Coupon disabled.");
//             fetchCoupons();
//         } catch (error) {
//             setMessage(`❌ ${error.message}`);
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             await deleteCoupon(id);
//             setMessage("🗑️ Coupon deleted.");
//             fetchCoupons();
//         } catch (error) {
//             setMessage(`❌ ${error.message}`);
//         }
//     };

//     const activeCoupons = coupons.filter((c) => !c.isDisable);
//     const disabledCoupons = coupons.filter((c) => c.isDisable);

//     return (
//         <div className="container mx-auto p-8">
//             <h2 className="text-2xl font-semibold mb-6">
//                 🎟️ {editId ? "Edit Coupon" : "Add New Coupon"}
//             </h2>
//             {message && <p className="mb-4 text-center text-sm">{message}</p>}

//             <div className="bg-white p-6 rounded shadow-md">
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <input
//                         type="text"
//                         value={code}
//                         onChange={(e) => setCode(e.target.value)}
//                         className="w-full border rounded p-2"
//                         placeholder="Coupon Code"
//                         required
//                     />
//                     <input
//                         type="number"
//                         value={discount}
//                         onChange={(e) => setDiscount(e.target.value)}
//                         className="w-full border rounded p-2"
//                         placeholder="Discount (%)"
//                         min={1}
//                         max={100}
//                         required
//                     />
//                     <input
//                         type="datetime-local"
//                         value={validFrom}
//                         onChange={(e) => setValidFrom(e.target.value)}
//                         className="w-full border rounded p-2"
//                         required
//                     />
//                     <input
//                         type="datetime-local"
//                         value={validTill}
//                         onChange={(e) => setValidTill(e.target.value)}
//                         className="w-full border rounded p-2"
//                         required
//                     />
//                     <input
//                         type="number"
//                         value={minBookingAmount}
//                         onChange={(e) => setMinBookingAmount(e.target.value)}
//                         className="w-full border rounded p-2"
//                         placeholder="Min Booking Amount"
//                         required
//                     />
//                     <input
//                         type="number"
//                         value={usageLimit}
//                         onChange={(e) => setUsageLimit(e.target.value)}
//                         className="w-full border rounded p-2"
//                         placeholder="Usage Limit"
//                         required
//                     />
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
//                     >
//                         {editId ? "✏️ Update Coupon" : "➕ Add Coupon"}
//                     </button>
//                 </form>
//             </div>

//             <CouponTable
//                 title="🎟️ Active Coupons"
//                 coupons={activeCoupons}
//                 handleEdit={handleEdit}
//                 handleDisable={handleDisable}
//                 handleDelete={handleDelete}
//             />

//             {disabledCoupons.length > 0 && (
//                 <CouponTable
//                     title="🚫 Disabled Coupons"
//                     coupons={disabledCoupons}
//                     handleEdit={handleEdit}
//                     handleDisable={handleDisable}
//                     handleDelete={handleDelete}
//                 />
//             )}
//         </div>
//     );
// };

// const CouponTable = ({ title, coupons, handleEdit, handleDisable, handleDelete }) => (
//     <div className="bg-white p-6 mt-8 rounded shadow-md">
//         <h3 className="text-xl font-semibold mb-4">{title}</h3>
//         <table className="w-full table-auto text-sm">
//             <thead>
//                 <tr>
//                     <th className="px-4 py-2 border-b">Code</th>
//                     <th className="px-4 py-2 border-b">Discount</th>
//                     <th className="px-4 py-2 border-b">Valid From</th>
//                     <th className="px-4 py-2 border-b">Valid Till</th>
//                     <th className="px-4 py-2 border-b">Min Amount</th>
//                     <th className="px-4 py-2 border-b">Usage Limit</th>
//                     <th className="px-4 py-2 border-b">Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {coupons.length === 0 ? (
//                     <tr>
//                         <td colSpan="7" className="text-center py-4">
//                             No coupons available.
//                         </td>
//                     </tr>
//                 ) : (
//                     coupons.map((coupon) => (
//                         <tr key={coupon._id}>
//                             <td className="px-4 py-2 border-b">{coupon.code}</td>
//                             <td className="px-4 py-2 border-b">{coupon.discountValue}%</td>
//                             <td className="px-4 py-2 border-b">
//                                 {new Date(coupon.validFrom).toLocaleString()}
//                             </td>
//                             <td className="px-4 py-2 border-b">
//                                 {new Date(coupon.validTill).toLocaleString()}
//                             </td>
//                             <td className="px-4 py-2 border-b">{coupon.minBookingAmount}</td>
//                             <td className="px-4 py-2 border-b">{coupon.usageLimit}</td>
//                             <td className="px-4 py-2 border-b space-x-2">
//                                 <button
//                                     onClick={() => handleEdit(coupon)}
//                                     className="text-blue-600 hover:underline"
//                                 >
//                                     Edit
//                                 </button>
//                                 {!coupon.isDisable && (
//                                     <button
//                                         onClick={() => handleDisable(coupon._id)}
//                                         className="text-yellow-600 hover:underline"
//                                     >
//                                         Disable
//                                     </button>
//                                 )}
//                                 <button
//                                     onClick={() => handleDelete(coupon._id)}
//                                     className="text-red-600 hover:underline"
//                                 >
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))
//                 )}
//             </tbody>
//         </table>
//     </div>
// );

// export default AddCoupon;












import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
    addCoupon,
    getAllCoupons,
    updateCoupon,
    disableCoupon,
    deleteCoupon,
} from "../../api/couponApi";

const AddCoupon = () => {
    const [code, setCode] = useState("");
    const [discount, setDiscount] = useState("");
    const [validFrom, setValidFrom] = useState("");
    const [validTill, setValidTill] = useState("");
    const [minBookingAmount, setMinBookingAmount] = useState("");
    const [usageLimit, setUsageLimit] = useState("");
    const [coupons, setCoupons] = useState([]);
    const [editId, setEditId] = useState(null);

    const fetchCoupons = async () => {
        try {
            const data = await getAllCoupons();
            setCoupons(data);
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const couponData = {
            code,
            discountType: "percentage",
            discountValue: Number(discount),
            validFrom: new Date(validFrom),
            validTill: new Date(validTill),
            minBookingAmount: Number(minBookingAmount),
            usageLimit: Number(usageLimit),
        };

        try {
            if (editId) {
                const updatedCoupon = await updateCoupon({ ...couponData, id: editId });
                setCoupons((prevCoupons) =>
                    prevCoupons.map((coupon) =>
                        coupon._id === editId ? { ...coupon, ...updatedCoupon } : coupon
                    )
                );
                Swal.fire("Updated", "Coupon updated successfully!", "success");
            } else {
                await addCoupon(couponData);
                Swal.fire("Added", "Coupon added successfully!", "success");
            }

            setCode("");
            setDiscount("");
            setValidFrom("");
            setValidTill("");
            setMinBookingAmount("");
            setUsageLimit("");
            setEditId(null);

            await fetchCoupons();
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    const handleEdit = (coupon) => {
        setEditId(coupon._id);
        setCode(coupon.code);
        setDiscount(coupon.discountValue);
        setValidFrom(new Date(coupon.validFrom).toISOString().slice(0, 16));
        setValidTill(new Date(coupon.validTill).toISOString().slice(0, 16));
        setMinBookingAmount(coupon.minBookingAmount);
        setUsageLimit(coupon.usageLimit);
        Swal.fire("Editing", `You are editing coupon: ${coupon.code}`, "info");
    };

    const handleDisable = async (id) => {
        try {
            await disableCoupon(id);
            Swal.fire("Disabled", "Coupon has been disabled.", "warning");
            fetchCoupons();
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    const handleDelete = async (id) => {
        try {
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
                await deleteCoupon(id);
                Swal.fire("Deleted!", "Coupon has been deleted.", "success");
                fetchCoupons();
            }
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    const activeCoupons = coupons.filter((c) => !c.isDisable);
    const disabledCoupons = coupons.filter((c) => c.isDisable);

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-semibold mb-6">
                🎟️ {editId ? "Edit Coupon" : "Add New Coupon"}
            </h2>

            <div className="bg-white p-6 rounded shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full border rounded p-2"
                        placeholder="Coupon Code"
                        required
                    />
                    <input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        className="w-full border rounded p-2"
                        placeholder="Discount (%)"
                        min={1}
                        max={100}
                        required
                    />
                    <input
                        type="datetime-local"
                        value={validFrom}
                        onChange={(e) => setValidFrom(e.target.value)}
                        className="w-full border rounded p-2"
                        required
                    />
                    <input
                        type="datetime-local"
                        value={validTill}
                        onChange={(e) => setValidTill(e.target.value)}
                        className="w-full border rounded p-2"
                        required
                    />
                    <input
                        type="number"
                        value={minBookingAmount}
                        onChange={(e) => setMinBookingAmount(e.target.value)}
                        className="w-full border rounded p-2"
                        placeholder="Min Booking Amount"
                        required
                    />
                    <input
                        type="number"
                        value={usageLimit}
                        onChange={(e) => setUsageLimit(e.target.value)}
                        className="w-full border rounded p-2"
                        placeholder="Usage Limit"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
                    >
                        {editId ? "✏️ Update Coupon" : "➕ Add Coupon"}
                    </button>
                </form>
            </div>

            <CouponTable
                title="🎟️ Active Coupons"
                coupons={activeCoupons}
                handleEdit={handleEdit}
                handleDisable={handleDisable}
                handleDelete={handleDelete}
            />

            {disabledCoupons.length > 0 && (
                <CouponTable
                    title="🚫 Disabled Coupons"
                    coupons={disabledCoupons}
                    handleEdit={handleEdit}
                    handleDisable={handleDisable}
                    handleDelete={handleDelete}
                />
            )}
        </div>
    );
};

const CouponTable = ({ title, coupons, handleEdit, handleDisable, handleDelete }) => (
    <div className="bg-white p-6 mt-8 rounded shadow-md">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <table className="w-full table-auto text-sm">
            <thead>
                <tr>
                    <th className="px-4 py-2 border-b">Code</th>
                    <th className="px-4 py-2 border-b">Discount</th>
                    <th className="px-4 py-2 border-b">Valid From</th>
                    <th className="px-4 py-2 border-b">Valid Till</th>
                    <th className="px-4 py-2 border-b">Min Amount</th>
                    <th className="px-4 py-2 border-b">Usage Limit</th>
                    <th className="px-4 py-2 border-b">Actions</th>
                </tr>
            </thead>
            <tbody>
                {coupons.length === 0 ? (
                    <tr>
                        <td colSpan="7" className="text-center py-4">
                            No coupons available.
                        </td>
                    </tr>
                ) : (
                    coupons.map((coupon) => (
                        <tr key={coupon._id}>
                            <td className="px-4 py-2 border-b">{coupon.code}</td>
                            <td className="px-4 py-2 border-b">{coupon.discountValue}%</td>
                            <td className="px-4 py-2 border-b">
                                {new Date(coupon.validFrom).toLocaleString()}
                            </td>
                            <td className="px-4 py-2 border-b">
                                {new Date(coupon.validTill).toLocaleString()}
                            </td>
                            <td className="px-4 py-2 border-b">{coupon.minBookingAmount}</td>
                            <td className="px-4 py-2 border-b">{coupon.usageLimit}</td>
                            <td className="px-4 py-2 border-b space-x-2">
                                <button
                                    onClick={() => handleEdit(coupon)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </button>
                                {!coupon.isDisable && (
                                    <button
                                        onClick={() => handleDisable(coupon._id)}
                                        className="text-yellow-600 hover:underline"
                                    >
                                        Disable
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(coupon._id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
);

export default AddCoupon;