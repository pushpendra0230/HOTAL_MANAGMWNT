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









// const Room = require("../model/roomModel");
// const { uploadToCloudinary } = require("../helpers/helper");
// const cloudinary = require("../config/cloudinary")

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
//         let imageUrls = [];

//         const images = req.files?.images;
//         if (images) {
//             const files = Array.isArray(images) ? images : [images];

//             for (const file of files) {
//                 const imageUrl = await uploadToCloudinary(file.data, file.name);
//                 console.log("Cloudinary Image URL: ", imageUrl);
//                 imageUrls.push(imageUrl);
//             }
//         } else if (req.body.images) {
//             imageUrls = Array.isArray(req.body.images)
//                 ? req.body.images
//                 : [req.body.images];
//         }

//         console.log("Images to Save: ", imageUrls);

//         const newRoom = new Room({
//             hotel: req.body.hotel,
//             state: req.body.state,
//             city: req.body.city,
//             type: req.body.type,
//             isAc: req.body.isAc,
//             active: req.body.active,
//             images: imageUrls,
//         });

//         await newRoom.save();
//         res.status(201).json(newRoom);
//     } catch (error) {
//         console.error("Add Room Error:", error);
//         res.status(400).json({ error: "Failed to add room", details: error.message });
//     }
// };


// const updateRoom = async (req, res) => {
//     try {
//         console.log("Request Body:", req.body);
//         console.log("Request Files:", req.files);

//         let imageUrls = Array.isArray(req.body.existingImages)
//             ? req.body.existingImages
//             : req.body.existingImages
//                 ? [req.body.existingImages]
//                 : [];

//         const images = req.files?.images;

//         if (images) {
//             console.log("Images found, processing...");

//             const files = Array.isArray(images) ? images : [images];

//             for (const file of files) {
//                 console.log("Uploading file:", file.name);
//                 const imageUrl = await uploadToCloudinary(file.data, file.name);
//                 console.log("Uploaded image URL:", imageUrl);
//                 imageUrls.push(imageUrl);
//             }
//         } else {
//             console.log("No new images found, using existing ones.");
//         }

//         console.log("Updating Room Data:", {
//             ...req.body,
//             images: imageUrls,
//         });

//         const updatedRoom = await Room.findByIdAndUpdate(
//             req.params.id,
//             {
//                 ...req.body,
//                 images: imageUrls,
//             },
//             { new: true }
//         );

//         console.log("Updated Room:", updatedRoom);
//         res.json(updatedRoom);
//     } catch (error) {
//         console.error("Error in updating room:", error);
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
//         const room = await Room.findById(req.params.id);
//         if (!room) {
//             return res.status(404).json({ error: "Room not found" });
//         }

//         console.log("Room to delete: ", room);

//         for (const imageUrl of room.images) {
//             const publicId = imageUrl.split("/").pop().split(".")[0];
//             try {
//                 console.log(`Attempting to delete image with public ID: ${publicId}`);
//                 await cloudinary.uploader.destroy(`hotel_rooms/${publicId}`);
//                 console.log(`Image with public ID ${publicId} deleted successfully`);
//             } catch (cloudinaryError) {
//                 console.error(`Error deleting image with public ID: ${publicId}`, cloudinaryError);
//             }
//         }

//         await room.deleteOne();
//         console.log("Room deleted successfully");
//         res.json({ message: "Room and images deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting room:", error);
//         res.status(400).json({ error: "Failed to delete room", details: error.message });
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
const { uploadToCloudinary } = require("../helpers/helper");
const cloudinary = require("../config/cloudinary");

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
        let imageUrls = [];

        const images = req.files?.images;
        if (images) {
            const files = Array.isArray(images) ? images : [images];

            for (const file of files) {
                const imageUrl = await uploadToCloudinary(file.data, file.name);
                console.log("Cloudinary Image URL: ", imageUrl);
                imageUrls.push(imageUrl);
            }
        } else if (req.body.images) {
            imageUrls = Array.isArray(req.body.images)
                ? req.body.images
                : [req.body.images];
        }

        console.log("Images to Save: ", imageUrls);

        const newRoom = new Room({
            hotel: req.body.hotel,
            state: req.body.state,
            city: req.body.city,
            type: req.body.type,
            isAc: req.body.isAc,
            active: req.body.active,
            images: imageUrls,
            roomNumber: req.body.roomNumber,
            price: req.body.price,
        });

        await newRoom.save();
        res.status(201).json(newRoom);
    } catch (error) {
        console.error("Add Room Error:", error);
        res.status(400).json({ error: "Failed to add room", details: error.message });
    }
};

const updateRoom = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Request Files:", req.files);

        let imageUrls = Array.isArray(req.body.existingImages)
            ? req.body.existingImages
            : req.body.existingImages
                ? [req.body.existingImages]
                : [];

        const images = req.files?.images;

        if (images) {
            console.log("Images found, processing...");

            const files = Array.isArray(images) ? images : [images];

            for (const file of files) {
                console.log("Uploading file:", file.name);
                const imageUrl = await uploadToCloudinary(file.data, file.name);
                console.log("Uploaded image URL:", imageUrl);
                imageUrls.push(imageUrl);
            }
        } else {
            console.log("No new images found, using existing ones.");
        }

        console.log("Updating Room Data:", {
            ...req.body,
            images: imageUrls,
        });

        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                images: imageUrls,
                roomNumber: req.body.roomNumber,
                price: req.body.price,
            },
            { new: true }
        );

        console.log("Updated Room:", updatedRoom);
        res.json(updatedRoom);
    } catch (error) {
        console.error("Error in updating room:", error);
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
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }

        console.log("Room to delete: ", room);

        for (const imageUrl of room.images) {
            const publicId = imageUrl.split("/").pop().split(".")[0];
            try {
                console.log(`Attempting to delete image with public ID: ${publicId}`);
                await cloudinary.uploader.destroy(`hotel_rooms/${publicId}`);
                console.log(`Image with public ID ${publicId} deleted successfully`);
            } catch (cloudinaryError) {
                console.error(`Error deleting image with public ID: ${publicId}`, cloudinaryError);
            }
        }

        await room.deleteOne();
        console.log("Room deleted successfully");
        res.json({ message: "Room and images deleted successfully" });
    } catch (error) {
        console.error("Error deleting room:", error);
        res.status(400).json({ error: "Failed to delete room", details: error.message });
    }
};

const getRoomDetails = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id)
            .populate("hotel")
            .populate("state");
        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }
        res.json(room);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch room details" });
    }
};

module.exports = {
    getRooms,
    addRoom,
    updateRoom,
    toggleRoomStatus,
    deleteRoom,
    getRoomDetails,
};