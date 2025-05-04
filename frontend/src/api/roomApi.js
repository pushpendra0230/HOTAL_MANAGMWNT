// import instance from "./axiosInstance";

// export const getRooms = () => instance.get("/api/rooms");

// export const addRoom = (roomData) => instance.post("/api/rooms", roomData);

// export const updateRoom = (roomId, roomData) =>
//     instance.put(`/api/rooms/${roomId}`, roomData);

// export const toggleRoomStatus = (roomId) =>
//     instance.patch(`/api/rooms/toggle-status/${roomId}`);

// export const deleteRoom = (roomId) =>
//     instance.delete(`/api/rooms/${roomId}`);





// import instance from "./axiosInstance";

// export const getRooms = () => instance.get("/api/rooms");

// export const addRoom = (roomData) => instance.post("/api/rooms", roomData);

// export const updateRoom = (roomId, roomData) =>
//     instance.put(`/api/rooms/${roomId}`, roomData);

// export const toggleRoomStatus = (roomId) =>
//     instance.patch(`/api/rooms/toggle-status/${roomId}`);

// export const deleteRoom = (roomId) =>
//     instance.delete(`/api/rooms/${roomId}`);








import instance from "./axiosInstance";

export const getRooms = () => instance.get("/api/rooms");

export const addRoom = async (roomData) => {
    try {
        const response = await instance.post("/api/rooms", roomData);
        console.log("Add Room Response: ", response.data);
        return response;
    } catch (error) {
        console.error("Add Room API Error: ", error);
        throw error;
    }
};

export const updateRoom = (roomId, roomData) => {
    const formData = new FormData();

    formData.append("state", roomData.state);
    formData.append("city", roomData.city);
    formData.append("hotel", roomData.hotel);
    formData.append("type", roomData.type);
    formData.append("isAc", roomData.isAc);

    if (Array.isArray(roomData.images)) {
        roomData.images.forEach((url) => {
            formData.append("existingImages", url);
        });
    }

    if (roomData.newImages) {
        for (const file of roomData.newImages) {
            formData.append("images", file);
        }
    }

    return instance.put(`/api/rooms/${roomId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const toggleRoomStatus = (roomId) =>
    instance.patch(`/api/rooms/toggle-status/${roomId}`);

export const deleteRoom = async (roomId) => {
    try {
        const response = await instance.delete(`/api/rooms/${roomId}`);
        console.log("Delete Room Response: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Delete Room API Error: ", error);
        throw error;
    }
};