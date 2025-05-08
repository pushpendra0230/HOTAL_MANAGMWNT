import axiosInstance from "./axiosInstance";

export const addBooking = async (bookingData) => {
    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axiosInstance.post("/api/bookings/add", bookingData, config);
        return response.data;
    } catch (error) {
        console.error("Booking API Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to make booking.");
    }
};

export const getAllBookings = async () => {
    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axiosInstance.get("/api/bookings/getAll", config);
        return response.data.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch bookings");
    }
};

export const updateBookingStatus = async (bookingId, status) => {
    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axiosInstance.patch(
            `/api/bookings/update/${bookingId}`,
            { status },
            config
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to update booking status");
    }
};