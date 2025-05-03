// const mongoose = require('mongoose');

// const roomSchema = new mongoose.Schema({
//     hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
//     state: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true },
//     city: { type: String, required: true },

//     type: {
//         type: String,
//         enum: ['Normal Bed', 'Medium Bed', 'King Size Bed'],
//         required: true,
//     },
//     isAc: { type: Boolean, default: false },
//     active: { type: Boolean, default: true },
// }, { timestamps: true });

// module.exports = mongoose.model('Room', roomSchema);







const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    state: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true },
    city: { type: String, required: true },

    type: {
        type: String,
        enum: ['Normal Bed', 'Medium Bed', 'King Size Bed'],
        required: true,
    },
    isAc: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);