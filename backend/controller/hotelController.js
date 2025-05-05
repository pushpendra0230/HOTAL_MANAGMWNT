const Hotel = require("../model/hotelModel");

const getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find().populate("state");
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch hotels" });
    }
};

// const getHotels = async (req, res) => {
//     try {
//         const hotels = await Hotel.find({ active: true }) // Only active hotels
//             .populate("state");
//         res.json(hotels);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch hotels" });
//     }
// };

const addHotel = async (req, res) => {
    try {
        const newHotel = new Hotel(req.body);
        await newHotel.save();
        res.status(201).json(newHotel);
    } catch (error) {
        console.error("Add Hotel Error:", error);
        res.status(400).json({ error: "Failed to add hotel", details: error.message });
    }
};

const updateHotel = async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedHotel);
    } catch (error) {
        res.status(400).json({ error: "Failed to update hotel" });
    }
};

const toggleHotelStatus = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) return res.status(404).json({ error: "Hotel not found" });

        hotel.active = !hotel.active;
        await hotel.save();
        res.json(hotel);
    } catch (error) {
        res.status(400).json({ error: "Failed to toggle hotel status" });
    }
};

const deleteHotel = async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.json({ message: "Hotel deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: "Failed to delete hotel" });
    }
};

module.exports = {
    getHotels,
    addHotel,
    updateHotel,
    toggleHotelStatus,
    deleteHotel,
};









// const Hotel = require("../model/hotelModel");

// const getHotels = async (req, res) => {
//     try {
//         const hotels = await Hotel.find()
//             .populate("state", "name")
//             .populate("city", "city");
//         res.json(hotels);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch hotels" });
//     }
// };

// const addHotel = async (req, res) => {
//     try {
//         const newHotel = new Hotel(req.body);
//         await newHotel.save();
//         res.status(201).json(newHotel);
//     } catch (error) {
//         console.error("Add Hotel Error:", error);
//         res.status(400).json({ error: "Failed to add hotel", details: error.message });
//     }
// };

// const updateHotel = async (req, res) => {
//     try {
//         const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(updatedHotel);
//     } catch (error) {
//         res.status(400).json({ error: "Failed to update hotel" });
//     }
// };

// const toggleHotelStatus = async (req, res) => {
//     try {
//         const hotel = await Hotel.findById(req.params.id);
//         if (!hotel) return res.status(404).json({ error: "Hotel not found" });

//         hotel.active = !hotel.active;
//         await hotel.save();
//         res.json(hotel);
//     } catch (error) {
//         res.status(400).json({ error: "Failed to toggle hotel status" });
//     }
// };

// const deleteHotel = async (req, res) => {
//     try {
//         await Hotel.findByIdAndDelete(req.params.id);
//         res.json({ message: "Hotel deleted successfully" });
//     } catch (error) {
//         res.status(400).json({ error: "Failed to delete hotel" });
//     }
// };

// module.exports = {
//     getHotels,
//     addHotel,
//     updateHotel,
//     toggleHotelStatus,
//     deleteHotel,
// };