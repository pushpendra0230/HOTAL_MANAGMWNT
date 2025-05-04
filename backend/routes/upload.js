const express = require("express");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

router.post("/", (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).json({ message: "No image file uploaded." });
    }

    const image = req.files.image;

    cloudinary.uploader.upload_stream(
        { folder: "hotel-room-images" },
        (error, result) => {
            if (error) {
                return res.status(500).json({ message: "Image upload failed", error });
            }

            res.json({ secure_url: result.secure_url });
        }
    ).end(image.data);
});

module.exports = router;