// const bookingModel = require('../model/bookingModel');
// const Room = require('../model/roomModel');
// const User = require('../model/userModel');
// const { sendOtpEmail, sendBookingStatusEmail } = require("../utils/sendMail");

// // exports.getBooking = async (req, res) => {
// //     try {
// //         const bookings = await bookingModel.find().populate("roomId");
// //         res.status(200).json({ status: true, message: "Data found", data: bookings });
// //     } catch (error) {
// //         res.status(400).json({ message: error.message });
// //     }
// // };

// exports.getBooking = async (req, res) => {
//     try {
//         const bookings = await bookingModel.find()
//             .populate({
//                 path: "roomId",
//                 populate: {
//                     path: "hotel",
//                 },
//             })
//             .populate("userId");

//         res.status(200).json({
//             status: true,
//             message: "Data found",
//             data: bookings,
//         });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// exports.addBooking = async (req, res) => {
//     try {
//         const bookingData = {
//             ...req.body,
//             userId: req.user.id,
//         };
//         const booking = new bookingModel(bookingData);
//         const savedBooking = await booking.save();
//         res.status(201).json(savedBooking);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // // Update booking status (admin or user-specific check)
// // exports.updateBooking = async (req, res) => {
// //     try {
// //         const { id } = req.params;
// //         const { status } = req.body;

// //         // Check if the user is trying to update their own booking (for non-admins)
// //         const booking = await bookingModel.findById(id);
// //         if (!booking) {
// //             return res.status(404).json({ success: false, message: "Booking not found" });
// //         }

// //         // Ensure that the booking belongs to the logged-in user, or is an admin updating the booking
// //         if (req.user.id !== booking.userId.toString() && req.user.role !== 'admin') {
// //             return res.status(403).json({ success: false, message: "You are not authorized to update this booking" });
// //         }

// //         // Update booking status
// //         booking.status = status;
// //         const updatedBooking = await booking.save();

// //         res.status(200).json({
// //             success: true,
// //             message: "Booking status updated successfully",
// //             data: updatedBooking,
// //         });
// //     } catch (error) {
// //         res.status(500).json({ success: false, message: error.message });
// //     }
// // };


// exports.updateBooking = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { status } = req.body;

//         const booking = await bookingModel.findById(id).populate("userId");
//         if (!booking) {
//             return res.status(404).json({ success: false, message: "Booking not found" });
//         }

//         if (req.user.id !== booking.userId._id.toString() && req.user.role !== "admin") {
//             return res.status(403).json({ success: false, message: "Unauthorized" });
//         }

//         booking.status = status;
//         const updatedBooking = await booking.save();

//         const email = booking.userId.email;
//         const customMessage =
//             status === "approved"
//                 ? "Congratulations! Your booking request has been approved!"
//                 : status === "rejected"
//                     ? "We regret to inform you that your booking request has been rejected."
//                     : `Your booking status is now: ${status}`;

//         await sendBookingStatusEmail(email, customMessage, "sonipushpendra256@gmail.com", "xyhn ujvz lknw eapm");

//         res.status(200).json({
//             success: true,
//             message: "Booking status updated and user notified via email",
//             data: updatedBooking,
//         });
//     } catch (error) {
//         console.error("Update booking error:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };






const bookingModel = require('../model/bookingModel');
const Room = require('../model/roomModel');
const User = require('../model/userModel');
const { sendOtpEmail, sendBookingStatusEmail } = require("../utils/sendMail");
const Swal = require("sweetalert2");

exports.getBooking = async (req, res) => {
    try {
        const bookings = await bookingModel.find()
            .populate({
                path: "roomId",
                populate: {
                    path: "hotel",
                },
            })
            .populate("userId");

        res.status(200).json({
            status: true,
            message: "Data found",
            data: bookings,
        });
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: `Failed to fetch bookings: ${error.message}`,
        });

        res.status(400).json({ message: error.message });
    }
};

exports.addBooking = async (req, res) => {
    try {
        const bookingData = {
            ...req.body,
            userId: req.user.id,
        };
        const booking = new bookingModel(bookingData);
        const savedBooking = await booking.save();

        Swal.fire({
            icon: "success",
            title: "Booking Created",
            text: "Your booking has been successfully created.",
        });

        res.status(201).json(savedBooking);
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: `Failed to create booking: ${error.message}`,
        });

        res.status(400).json({ message: error.message });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const booking = await bookingModel.findById(id).populate("userId");
        if (!booking) {
            Swal.fire({
                icon: "error",
                title: "Booking Not Found",
                text: "The booking you're trying to update does not exist.",
            });

            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        if (req.user.id !== booking.userId._id.toString() && req.user.role !== "admin") {
            Swal.fire({
                icon: "error",
                title: "Unauthorized",
                text: "You don't have permission to update this booking.",
            });

            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        booking.status = status;
        const updatedBooking = await booking.save();

        const email = booking.userId.email;
        const customMessage =
            status === "approved"
                ? "Congratulations! Your booking request has been approved!"
                : status === "rejected"
                    ? "We regret to inform you that your booking request has been rejected."
                    : `Your booking status is now: ${status}`;

        await sendBookingStatusEmail(email, customMessage, "sonipushpendra256@gmail.com", "xyhn ujvz lknw eapm");

        Swal.fire({
            icon: "success",
            title: "Booking Status Updated",
            text: `Your booking status has been updated to: ${status}. An email has been sent.`,
        });

        res.status(200).json({
            success: true,
            message: "Booking status updated and user notified via email",
            data: updatedBooking,
        });
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: `Failed to update booking: ${error.message}`,
        });

        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateCheckingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isChecking } = req.body;

        if (!["Confirm", "Cancel", "Pending"].includes(isChecking)) {
            return res.status(400).json({
                success: false,
                message: "Invalid check-in status value",
            });
        }

        const booking = await bookingModel.findById(id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }

        if (booking.userId.toString() !== req.user.id.toString() && req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to update check-in status",
            });
        }

        booking.isChecking = isChecking;
        const updatedBooking = await booking.save();

        res.status(200).json({
            success: true,
            message: `Check-in status updated to ${isChecking}`,
            data: updatedBooking,
        });
    } catch (error) {
        console.error("Error in updateCheckingStatus:", error);
        res.status(500).json({
            success: false,
            message: "Server error while updating check-in status",
        });
    }
};