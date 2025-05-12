// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUser, FaEnvelope, FaPhone, FaVenusMars, FaBirthdayCake, FaUserTag, FaEdit, FaSignOutAlt, FaLock, FaArrowLeft } from "react-icons/fa";

// const Profile = () => {
//     const navigate = useNavigate();
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             const token = localStorage.getItem("token");

//             if (!token) {
//                 navigate("/");
//                 return;
//             }

//             try {
//                 const response = await fetch("http://localhost:6001/user/profile", {
//                     method: "GET",
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 const data = await response.json();

//                 if (response.status === 200) {
//                     setUser(data.data);
//                 } else {
//                     setError(data.message || "Failed to fetch user data");
//                 }
//             } catch (error) {
//                 setError("Internal server error");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUserProfile();
//     }, [navigate]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     if (!user) {
//         navigate("/");
//         return null;
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#dfe8ff] flex items-center justify-center px-4">
//             <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
//                 {/* Back Button */}
//                 <button
//                     onClick={() => navigate(-1)}
//                     className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
//                 >
//                     <FaArrowLeft className="mr-2" /> Back
//                 </button>

//                 {/* Header */}
//                 <div className="text-center mb-6">
//                     <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-4xl">
//                         <FaUser />
//                     </div>
//                     <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
//                     <p className="text-sm text-gray-500">View your account information</p>
//                 </div>

//                 {/* User Info */}
//                 <div className="space-y-4 text-gray-700 text-sm sm:text-base">
//                     <p className="flex items-center gap-2">
//                         <FaUser className="text-blue-500" /> <span><strong>Name:</strong> {user.name || "N/A"}</span>
//                     </p>
//                     <p className="flex items-center gap-2">
//                         <FaEnvelope className="text-green-500" /> <span><strong>Email:</strong> {user.email || "N/A"}</span>
//                     </p>
//                     <p className="flex items-center gap-2">
//                         <FaPhone className="text-yellow-500" /> <span><strong>Phone:</strong> {user.phone || "N/A"}</span>
//                     </p>
//                     <p className="flex items-center gap-2">
//                         <FaVenusMars className="text-pink-500" /> <span><strong>Gender:</strong> {user.gender || "N/A"}</span>
//                     </p>
//                     <p className="flex items-center gap-2">
//                         <FaBirthdayCake className="text-red-500" /> <span><strong>Age:</strong> {user.age || "N/A"}</span>
//                     </p>
//                     <p className="flex items-center gap-2">
//                         <FaUserTag className="text-indigo-500" /> <span><strong>Role:</strong> {user.role || "User"}</span>
//                     </p>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="mt-6 flex flex-col gap-3">
//                     <button
//                         onClick={() => alert("Edit feature coming soon!")}
//                         className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
//                     >
//                         <FaEdit /> Edit Profile
//                     </button>

//                     <button
//                         onClick={() => navigate("/reset-password")}
//                         className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
//                     >
//                         <FaLock /> Reset Password
//                     </button>

//                     <button
//                         onClick={() => {
//                             localStorage.removeItem("token");
//                             localStorage.removeItem("user");
//                             navigate("/");
//                         }}
//                         className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
//                     >
//                         <FaSignOutAlt /> Logout
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Profile;

















import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaVenusMars, FaBirthdayCake, FaUserTag, FaEdit, FaSignOutAlt, FaLock, FaArrowLeft } from "react-icons/fa";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/");
                return;
            }

            try {
                const response = await fetch("http://localhost:6001/user/profile", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (response.status === 200) {
                    setUser(data.data);
                } else {
                    setError(data.message || "Failed to fetch user data");
                }
            } catch (error) {
                setError("Internal server error");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [navigate]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append("image", image);

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        try {
            const response = await fetch("http://localhost:6001/user/upload-profile", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.status === 200) {
                setUser(data.user);
                alert("Image updated successfully");
            } else {
                alert(data.message || "Failed to update image");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("An error occurred while uploading the image");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        navigate("/");
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#dfe8ff] flex items-center justify-center px-4">
            <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
                >
                    <FaArrowLeft className="mr-2" /> Back
                </button>

                <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-4xl">
                        {user.profilePic ? (
                            <img
                                src={user.profilePic}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <FaUser />
                        )}
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
                    <p className="text-sm text-gray-500">View your account information</p>
                </div>

                <div className="space-y-4 text-gray-700 text-sm sm:text-base">
                    <p className="flex items-center gap-2">
                        <FaUser className="text-blue-500" /> <span><strong>Name:</strong> {user.name || "N/A"}</span>
                    </p>
                    <p className="flex items-center gap-2">
                        <FaEnvelope className="text-green-500" /> <span><strong>Email:</strong> {user.email || "N/A"}</span>
                    </p>
                    <p className="flex items-center gap-2">
                        <FaPhone className="text-yellow-500" /> <span><strong>Phone:</strong> {user.phone || "N/A"}</span>
                    </p>
                    <p className="flex items-center gap-2">
                        <FaVenusMars className="text-pink-500" /> <span><strong>Gender:</strong> {user.gender || "N/A"}</span>
                    </p>
                    <p className="flex items-center gap-2">
                        <FaBirthdayCake className="text-red-500" /> <span><strong>Age:</strong> {user.age || "N/A"}</span>
                    </p>
                    <p className="flex items-center gap-2">
                        <FaUserTag className="text-indigo-500" /> <span><strong>Role:</strong> {user.role || "User"}</span>
                    </p>
                </div>

                <div className="mt-4">
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-700 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:bg-blue-50 file:text-blue-600"
                    />
                    {imagePreview && (
                        <div className="mt-4">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-24 h-24 rounded-full object-cover"
                            />
                        </div>
                    )}
                    <button
                        onClick={handleImageUpload}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-4 rounded-md"
                    >
                        Upload Image
                    </button>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                    <button
                        onClick={() => navigate("/reset-password")}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
                    >
                        <FaLock /> Reset Password
                    </button>

                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            navigate("/");
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;