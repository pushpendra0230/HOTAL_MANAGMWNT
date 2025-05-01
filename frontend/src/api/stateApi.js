// import axios from "axios";

// const BASE_URL = "http://localhost:6001/api/state";

// const getToken = () => localStorage.getItem("token");

// const authHeader = () => ({
//     headers: {
//         Authorization: `Bearer ${getToken()}`,
//     },
// });

// // ✅ Get all states
// export const getStates = () =>
//     axios.get(`${BASE_URL}/get-all`, authHeader());

// // ✅ Add a new state
// export const addState = (data) =>
//     axios.post(`${BASE_URL}/add`, data, authHeader());

// // ✅ Update an existing state
// export const updateState = (id, data) =>
//     axios.put(`${BASE_URL}/update/${id}`, data, authHeader());

// // ✅ Toggle active/inactive status
// export const toggleStateStatus = (id) =>
//     axios.patch(`${BASE_URL}/toggle/${id}`, {}, authHeader());

// // ✅ Delete a state
// export const deleteState = (id) =>
//     axios.delete(`${BASE_URL}/delete/${id}`, authHeader());




import axios from "./axiosInstance";

const BASE_URL = "/api/state";

export const getStates = async () => {
    try {
        return await axios.get(`${BASE_URL}/get-all`);
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const addState = async (data) => {
    try {
        return await axios.post(`${BASE_URL}/add`, data);
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const updateState = async (id, data) => {
    try {
        return await axios.put(`${BASE_URL}/update/${id}`, data);
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const toggleStateStatus = async (id) => {
    try {
        return await axios.patch(`${BASE_URL}/toggle/${id}`);
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const deleteState = async (id) => {
    try {
        return await axios.delete(`${BASE_URL}/delete/${id}`);
    } catch (error) {
        throw error.response?.data || error;
    }
};
