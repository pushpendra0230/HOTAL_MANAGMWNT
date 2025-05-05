// const State = require("../model/State");
// const stateRoutes = require("./../routes/stateRoutes")

// exports.addState = async (req, res) => {
//     try {
//         const { name, code } = req.body;
//         const newState = new State({ name, code });
//         const savedState = await newState.save();
//         res.status(201).json({ success: true, message: "State added", data: savedState });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error adding state", error: error.message });
//     }
// };

// exports.getAllStates = async (req, res) => {
//     try {
//         const states = await State.find().sort({ createdAt: -1 });
//         res.status(200).json({ success: true, data: states });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error fetching states", error: error.message });
//     }
// };

// exports.updateState = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updated = await State.findByIdAndUpdate(id, req.body, { new: true });
//         res.status(200).json({ success: true, message: "State updated", data: updated });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error updating state", error: error.message });
//     }
// };

// exports.toggleStateStatus = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const state = await State.findById(id);
//         state.isActive = !state.isActive;
//         await state.save();
//         res.status(200).json({ success: true, message: "Status toggled", data: state });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error toggling status", error: error.message });
//     }
// };

// exports.deleteState = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await State.findByIdAndDelete(id);
//         res.status(200).json({ success: true, message: "State deleted" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error deleting state", error: error.message });
//     }
// };


const State = require("../model/State");
const Location = require("../model/Location");

exports.addState = async (req, res) => {
    try {
        const { name, code } = req.body;
        const existing = await State.findOne({ code });
        if (existing) {
            return res.status(400).json({ success: false, message: "State code already exists" });
        }
        const newState = new State({ name, code });
        const savedState = await newState.save();
        res.status(201).json({ success: true, message: "State added", data: savedState });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding state", error: error.message });
    }
};

exports.getAllStates = async (req, res) => {
    try {
        const states = await State.find().sort({ createdAt: -1 }).lean();
        res.status(200).json({ success: true, data: states });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching states", error: error.message });
    }
};

// // Updated to only get active states
// exports.getAllStates = async (req, res) => {
//     try {
//         // Only fetch states where isActive is true
//         const states = await State.find({ isActive: true }).sort({ createdAt: -1 }).lean();
//         res.status(200).json({ success: true, data: states });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error fetching states", error: error.message });
//     }
// };

exports.updateState = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, code } = req.body;

        const updated = await State.findByIdAndUpdate(
            id,
            { name, code: code.toUpperCase() },
            { new: true }
        );

        res.status(200).json({ success: true, message: "State updated", data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating state", error: error.message });
    }
};

exports.toggleStateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const state = await State.findById(id);

        if (!state) {
            return res.status(404).json({ success: false, message: "State not found" });
        }

        const newStatus = !state.isActive;
        state.isActive = newStatus;
        await state.save();

        // Update cities (Location model)
        await Location.updateMany(
            { state: state._id },
            { $set: { isActive: newStatus } }
        );

        res.status(200).json({
            success: true,
            message: `State ${newStatus ? "activated" : "deactivated"} and related cities updated`
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error toggling status", error: error.message });
    }
};

exports.deleteState = async (req, res) => {
    try {
        const { id } = req.params;

        await State.findByIdAndDelete(id);
        await Location.deleteMany({ state: id });

        res.status(200).json({ success: true, message: "State and related cities deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting state", error: error.message });
    }
};
