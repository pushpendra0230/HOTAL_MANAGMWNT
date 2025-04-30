import axios from "axios";

const BASE_URL = "http://localhost:6001/location";

const getToken = () => localStorage.getItem("token");

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
});

export const getLocations = () =>
    axios.get(`${BASE_URL}/get-all`, authHeader());

export const addLocation = (data) =>
    axios.post(`${BASE_URL}/add`, data, authHeader());

export const updateLocation = (id, data) =>
    axios.put(`${BASE_URL}/update/${id}`, data, authHeader());

export const toggleStatus = (id) =>
    axios.patch(`${BASE_URL}/toggle/${id}`, {}, authHeader());

export const deleteLocation = (id) =>
    axios.delete(`${BASE_URL}/delete/${id}`, authHeader());