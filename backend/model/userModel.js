// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       // unique: true,
//     },
//     phone: {
//       type: String,
//       required: true,
//       // unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     age: {
//       type: Number,
//       required: true,
//     },
//     gender: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       default: "user",
//     },
//     status: {
//       type: String,
//       enum: ["active", "inactive"],
//       default: "active",
//     },
//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//     otp: {
//       type: Number,
//     },
//     otpExpire: {
//       type: Date,
//     },
//     profilePic: {
//       type: String,
//       default: "",
//     },
//   },
//   { timestamps: true, versionKey: false }
// );

// module.exports = mongoose.model("users", userSchema);






// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     password: { type: String, required: true },
//     age: { type: Number, required: true },
//     gender: { type: String, required: true },
//     role: { type: String, default: "user" },
//     status: { type: String, enum: ["active", "inactive"], default: "active" },
//     isVerified: { type: Boolean, default: false },
//     otp: { type: Number },
//     otpExpire: { type: Date },
//     profilePic: { type: String, default: "" },
//   },
//   { timestamps: true, versionKey: false }
// );

// module.exports = mongoose.model("users", userSchema);






// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     password: { type: String, required: true },
//     age: { type: Number, required: true },
//     gender: { type: String, required: true },
//     role: { type: String, enum: ["user", "admin"], default: "user" }, // updated enum
//     status: { type: String, enum: ["active", "inactive"], default: "active" },
//     isVerified: { type: Boolean, default: false },
//     otp: { type: Number },
//     otpExpire: { type: Date },
//     profilePic: { type: String, default: "" },
//   },
//   { timestamps: true, versionKey: false }
// );

// module.exports = mongoose.model("users", userSchema);







const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpire: { type: Date },
    profilePic: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("users", userSchema);