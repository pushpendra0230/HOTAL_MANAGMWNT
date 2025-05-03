import instance from "./axiosInstance";

export const getHotels = () => {
    return instance.get("/api/hotels");
};

export const addHotel = (hotelData) => {
    return instance.post("/api/hotels", hotelData);
};

export const updateHotel = (hotelId, hotelData) => {
    return instance.put(`/api/hotels/${hotelId}`, hotelData);
};

export const toggleHotelStatus = (hotelId) => {
    return instance.patch(`/api/hotels/toggle-status/${hotelId}`);
};

export const deleteHotel = (hotelId) => {
    return instance.delete(`/api/hotels/${hotelId}`);
};








// import instance from "./axiosInstance";

// export const getHotels = () => {
//     return instance.get("/api/hotels");
// };

// export const addHotel = (hotelData) => {
//     return instance.post("/api/hotels", hotelData);
// };

// export const updateHotel = (hotelId, hotelData) => {
//     return instance.put(`/api/hotels/${hotelId}`, hotelData);
// };

// export const toggleHotelStatus = (hotelId) => {
//     return instance.patch(`/api/hotels/toggle-status/${hotelId}`);
// };

// export const deleteHotel = (hotelId) => {
//     return instance.delete(`/api/hotels/${hotelId}`);
// };