// // const Location = require("../models/Location");
// const Location = require("../model/Location");

// // 🔒 Admin-only helper
// const checkAdmin = (req, res) => {
//     if (!req.user || req.user.role !== "admin") {
//         res.status(403).json({ message: "Access denied: Admins only" });
//         return false;
//     }
//     return true;
// };

// exports.createLocation = async (req, res) => {
//     if (!checkAdmin(req, res)) return;

//     try {
//         const { city, state } = req.body;
//         const newLoc = new Location({ city, state });
//         await newLoc.save();
//         res.status(201).json(newLoc);
//     } catch (err) {
//         console.error("Create Location Error:", err.message);
//         res.status(500).json({ error: "Failed to create location" });
//     }
// };

// exports.getLocations = async (req, res) => {
//     if (!checkAdmin(req, res)) return;

//     try {
//         const data = await Location.find();
//         res.status(200).json(data);
//     } catch (err) {
//         console.error("Get Locations Error:", err.message);
//         res.status(500).json({ error: "Failed to fetch locations" });
//     }
// };

// exports.updateLocation = async (req, res) => {
//     if (!checkAdmin(req, res)) return;

//     try {
//         const updated = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updated) return res.status(404).json({ error: "Location not found" });

//         res.json(updated);
//     } catch (err) {
//         console.error("Update Location Error:", err.message);
//         res.status(500).json({ error: "Failed to update location" });
//     }
// };

// exports.toggleStatus = async (req, res) => {
//     if (!checkAdmin(req, res)) return;

//     try {
//         const loc = await Location.findById(req.params.id);
//         if (!loc) return res.status(404).json({ error: "Location not found" });

//         loc.active = !loc.active;
//         await loc.save();
//         res.json(loc);
//     } catch (err) {
//         console.error("Toggle Status Error:", err.message);
//         res.status(500).json({ error: "Failed to toggle status" });
//     }
// };

// exports.deleteLocation = async (req, res) => {
//     if (!checkAdmin(req, res)) return;

//     try {
//         const deleted = await Location.findByIdAndDelete(req.params.id);
//         if (!deleted) return res.status(404).json({ error: "Location not found" });

//         res.json({ message: "Location deleted successfully" });
//     } catch (err) {
//         console.error("Delete Location Error:", err.message);
//         res.status(500).json({ error: "Failed to delete location" });
//     }
// };













// const Location = require("../model/Location");

// // 🔒 Admin-only helper
// const checkAdmin = (req, res) => {
//     if (!req.user || req.user.role !== "admin") {
//         res.status(403).json({ message: "Access denied: Admins only" });
//         return false;
//     }
//     return true;
// };

// exports.createLocation = async (req, res) => {
//     if (!checkAdmin(req, res)) return;

//     try {
//         const { city, state } = req.body;
//         const newLoc = new Location({ city, state });
//         await newLoc.save();
//         res.status(201).json(newLoc);
//     } catch (err) {
//         console.error("Create Location Error:", err.message);
//         res.status(500).json({ error: "Failed to create location" });
//     }
// };

// exports.getLocations = async (req, res) => {
//     if (!checkAdmin(req, res)) return;

//     try {
//         const data = await Location.find();
//         res.status(200).json(data);
//     } catch (err) {
//         console.error("Get Locations Error:", err.message);
//         res.status(500).json({ error: "Failed to fetch locations" });
//     }
// };

// exports.updateLocation = async (req, res) => {
//     if (!checkAdmin(req, res)) return;

//     try {
//         const loc = await Location.findById(req.params.id);
//         if (!loc) return res.status(404).json({ error: "Location not found" });

//         if (!loc.active) {
//             return res.status(403).json({ error: "Cannot update inactive location" });
//         }

//         loc.city = req.body.city;
//         loc.state = req.body.state;
//         await loc.save();

//         res.status(200).json(loc);
//     } catch (err) {
//         console.error("Update Location Error:", err.message);
//         res.status(500).json({ error: "Failed to update location" });
//     }
// };

// exports.toggleStatus = async (req, res) => {
//     if (!checkAdmin(req, res)) return;

//     try {
//         const loc = await Location.findById(req.params.id);
//         if (!loc) return res.status(404).json({ error: "Location not found" });

//         loc.active = !loc.active;
//         await loc.save();
//         res.json(loc);
//     } catch (err) {
//         console.error("Toggle Status Error:", err.message);
//         res.status(500).json({ error: "Failed to toggle status" });
//     }
// };

// exports.deleteLocation = async (req, res) => {
//     if (!checkAdmin(req, res)) return;

//     try {
//         const deleted = await Location.findByIdAndDelete(req.params.id);
//         if (!deleted) return res.status(404).json({ error: "Location not found" });

//         res.json({ message: "Location deleted successfully" });
//     } catch (err) {
//         console.error("Delete Location Error:", err.message);
//         res.status(500).json({ error: "Failed to delete location" });
//     }
// };







const Location = require("../model/Location");
const State = require("../model/State");

const checkAdmin = (req, res) => {
    if (!req.user || req.user.role !== "admin") {
        res.status(403).json({ message: "Access denied: Admins only" });
        return false;
    }
    return true;
};

const createLocation = async (req, res) => {
    if (!checkAdmin(req, res)) return;
    try {
        const { city, state } = req.body;
        const stateExists = await State.findById(state);
        if (!stateExists) return res.status(404).json({ error: "State not found" });

        const newLoc = new Location({ city, state });
        await newLoc.save();
        res.status(201).json(newLoc);
    } catch (err) {
        console.error("Create Location Error:", err.message);
        res.status(500).json({ error: "Failed to create location" });
    }
};

const getLocations = async (req, res) => {
    try {
        const locations = await Location.find().populate("state", "name");
        res.json(locations);
    } catch (error) {
        res.status(500).json({ error: "Failed to get locations" });
    }
};


// const getLocations = async (req, res) => {
//     try {
//         const locations = await Location.find({ active: true }).populate("state", "name");
//         res.json(locations);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to get locations" });
//     }
// };

const updateLocation = async (req, res) => {
    try {
        const { city, state } = req.body;
        const location = await Location.findByIdAndUpdate(
            req.params.id,
            { city, state },
            { new: true }
        );
        res.json(location);
    } catch (error) {
        res.status(400).json({ error: "Failed to update location" });
    }
};

const toggleStatus = async (req, res) => {
    if (!checkAdmin(req, res)) return;
    try {
        const loc = await Location.findById(req.params.id);
        if (!loc) return res.status(404).json({ error: "Location not found" });

        loc.active = !loc.active;
        await loc.save();
        res.json(loc);
    } catch (err) {
        console.error("Toggle Status Error:", err.message);
        res.status(500).json({ error: "Failed to toggle status" });
    }
};

const deleteLocation = async (req, res) => {
    if (!checkAdmin(req, res)) return;
    try {
        const deleted = await Location.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Location not found" });

        res.json({ message: "Location deleted successfully" });
    } catch (err) {
        console.error("Delete Location Error:", err.message);
        res.status(500).json({ error: "Failed to delete location" });
    }
};

module.exports = {
    createLocation,
    getLocations,
    updateLocation,
    toggleStatus,
    deleteLocation,
};