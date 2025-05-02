// import mongoose from "mongoose";

// const hotelSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     address: { type: String },
//     totalRooms: { type: Number },
//     description: { type: String },
//     contactNumber: { type: String },
//     email: { type: String },
//     state: { type: mongoose.Schema.Types.ObjectId, ref: "State", required: true },
//     city: { type: String, required: true },
//     active: { type: Boolean, default: true },
// }, {
//     timestamps: true,
// });

// const Hotel = mongoose.model("Hotel", hotelSchema);

// export default Hotel;


// const mongoose = require('mongoose');

// const hotelSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     address: { type: String, required: true },
//     description: { type: String },
//     contactNumber: { type: String },
//     email: { type: String },
//     rooms: { type: Number, required: true },
//     state: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true },
//     city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
//     active: { type: Boolean, default: true },
// }, { timestamps: true });

// module.exports = mongoose.model('Hotel', hotelSchema);





const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String },
    contactNumber: { type: String },
    email: { type: String },
    rooms: { type: Number, required: true },
    state: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true },
    city: { type: String, required: true },
    active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);