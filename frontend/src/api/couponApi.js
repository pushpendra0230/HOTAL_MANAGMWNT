// // frontend/api/couponApi.js
// import axiosInstance from "./axiosInstance";

// export const addCoupon = async (couponData) => {
//     const token = localStorage.getItem("token");

//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };

//     try {
//         const response = await axiosInstance.post("/api/coupons/addCoupon", couponData, config);
//         return response.data;
//     } catch (error) {
//         console.error("Add Coupon API Error:", error.response?.data || error.message);
//         throw new Error(error.response?.data?.message || "Failed to add coupon.");
//     }
// };

// export const getAllCoupons = async () => {
//     const token = localStorage.getItem("token");

//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };

//     try {
//         const response = await axiosInstance.get("/api/coupons/getAll", config);
//         return response.data.data;
//     } catch (error) {
//         console.error("Get Coupons Error:", error.response?.data || error.message);
//         throw new Error(error.response?.data?.message || "Failed to fetch coupons");
//     }
// };











// frontend/api/couponApi.js
import axiosInstance from "./axiosInstance";

const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const addCoupon = async (couponData) => {
    try {
        const response = await axiosInstance.post("/api/coupons/addCoupon", couponData, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Add Coupon API Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to add coupon.");
    }
};

export const getAllCoupons = async () => {
    try {
        const response = await axiosInstance.get("/api/coupons/getAll", getAuthConfig());
        return response.data.data;
    } catch (error) {
        console.error("Get Coupons Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to fetch coupons");
    }
};

export const updateCoupon = async (couponData) => {
    try {
        const response = await axiosInstance.patch("/api/coupons/updateCoupon", couponData, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Update Coupon Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to update coupon.");
    }
};

export const disableCoupon = async (id) => {
    try {
        const response = await axiosInstance.patch("/api/coupons/disableCoupon", { id }, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Disable Coupon Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to disable coupon.");
    }
};

export const deleteCoupon = async (id) => {
    try {
        const response = await axiosInstance.delete("/api/coupons/deleteCoupon", {
            ...getAuthConfig(),
            data: { id }
        });
        return response.data;
    } catch (error) {
        console.error("Delete Coupon Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to delete coupon.");
    }
};

export const getActiveCoupons = async () => {
    const res = await API.get("/coupons/activeCoupons");
    return res.data.data;
};