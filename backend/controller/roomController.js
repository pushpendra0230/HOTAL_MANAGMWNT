// const Room = require("../model/roomModel");

// const getRooms = async (req, res) => {
//     try {
//         const rooms = await Room.find()
//             .populate("hotel")
//             .populate("state");
//         res.json(rooms);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch rooms" });
//     }
// };

// const addRoom = async (req, res) => {
//     try {
//         const newRoom = new Room(req.body);
//         await newRoom.save();
//         res.status(201).json(newRoom);
//     } catch (error) {
//         res.status(400).json({ error: "Failed to add room", details: error.message });
//     }
// };

// const updateRoom = async (req, res) => {
//     try {
//         const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(updatedRoom);
//     } catch (error) {
//         res.status(400).json({ error: "Failed to update room" });
//     }
// };

// const toggleRoomStatus = async (req, res) => {
//     try {
//         const room = await Room.findById(req.params.id);
//         if (!room) return res.status(404).json({ error: "Room not found" });

//         room.active = !room.active;
//         await room.save();
//         res.json(room);
//     } catch (error) {
//         res.status(400).json({ error: "Failed to toggle room status" });
//     }
// };

// const deleteRoom = async (req, res) => {
//     try {
//         await Room.findByIdAndDelete(req.params.id);
//         res.json({ message: "Room deleted successfully" });
//     } catch (error) {
//         res.status(400).json({ error: "Failed to delete room" });
//     }
// };

// module.exports = {
//     getRooms,
//     addRoom,
//     updateRoom,
//     toggleRoomStatus,
//     deleteRoom,
// };








const Room = require("../model/roomModel");

const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find()
            .populate("hotel")
            .populate("state");
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch rooms" });
    }
};

const addRoom = async (req, res) => {
    try {
        const newRoom = new Room(req.body);
        await newRoom.save();
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(400).json({ error: "Failed to add room", details: error.message });
    }
};

const updateRoom = async (req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedRoom);
    } catch (error) {
        res.status(400).json({ error: "Failed to update room" });
    }
};

const toggleRoomStatus = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ error: "Room not found" });

        room.active = !room.active;
        await room.save();
        res.json(room);
    } catch (error) {
        res.status(400).json({ error: "Failed to toggle room status" });
    }
};

const deleteRoom = async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.json({ message: "Room deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: "Failed to delete room" });
    }
};

module.exports = {
    getRooms,
    addRoom,
    updateRoom,
    toggleRoomStatus,
    deleteRoom,
};
