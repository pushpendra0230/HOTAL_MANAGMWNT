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

export const addRoom = (roomData) => instance.post("/api/rooms", roomData);

export const updateRoom = (roomId, roomData) =>
    instance.put(`/api/rooms/${roomId}`, roomData);

export const toggleRoomStatus = (roomId) =>
    instance.patch(`/api/rooms/toggle-status/${roomId}`);

export const deleteRoom = (roomId) =>
    instance.delete(`/api/rooms/${roomId}`);