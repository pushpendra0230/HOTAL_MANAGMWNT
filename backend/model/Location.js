// // backend/models/Location.js
// const mongoose = require("mongoose");

// const locationSchema = new mongoose.Schema({
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     active: { type: Boolean, default: true },
// });

// module.exports = mongoose.model("Location", locationSchema);


const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    city: { type: String, required: true },
    state: { type: mongoose.Schema.Types.ObjectId, ref: "State", required: true },
    active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Location", locationSchema);