// const mongoose = require("mongoose");

// const bookingSchema = new mongoose.Schema(
//     {
//         roomId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "rooms",
//             required: true,
//         },
//         userId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "users",
//         },
//         checkInDate: {
//             type: Date,
//             required: true,
//         },
//         checkOutDate: {
//             type: Date,
//             required: true,
//         },
//         numberOfGuests: {
//             type: Number,
//             required: true,
//         },
//         totalAmount: {
//             type: Number,
//             required: true,
//         },
//         userName: {
//             type: String,
//             required: true,
//         },
//         userPhone: {
//             type: Number,
//             required: true,
//         },
//         status: {
//             type: String,
//             enum: ["Booked", "Cancel", "Pending"],
//             default: "Pending",
//         },
//         isChecking: {
//             type: String,
//             enum: ["Pending", "Confirm", "Cancel"],
//             default: "Pending",
//         },
//     },
//     { timestamps: true, versionKey: false }
// );

// module.exports = mongoose.model("bookings", bookingSchema);







const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        checkInDate: { type: Date, required: true },
        checkOutDate: { type: Date, required: true },
        numberOfGuests: { type: Number, required: true },
        totalAmount: { type: Number, required: true },
        userName: { type: String, required: true },
        userPhone: { type: Number, required: true },
        status: {
            type: String,
            enum: ["Approved", "Rejected", "Pending"],
            default: "Pending",
        },
        isChecking: {
            type: String,
            enum: ["Pending", "Confirm", "Cancel"],
            default: "Pending",
        },
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Booking", bookingSchema);