// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const moment = require("moment");
// const userModel = require("../model/userModel");
// const { sendOtpEmail } = require("../utils/sendMail");
// const crypto = require("crypto");

// exports.createUsers = async (req, res) => {
//   try {
//     const { name, email, phone, age, gender, password, role } = req.body;

//     if (!email || !name || !password || !phone || !age || !gender) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const existingEmail = await userModel.findOne({ email });
//     if (existingEmail) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(password, salt);
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpTimer = moment().add(10, "minutes").toDate();

//     const newUser = new userModel({
//       name,
//       email,
//       phone,
//       age,
//       gender,
//       password: hash,
//       otp,
//       otpExpire: otpTimer,
//       role: role || "user",
//     });

//     await newUser.save();

//     // Send OTP email
//     const isOtpSent = await sendOtpEmail(email, otp, "sonipushpendra256@gmail.com", "yourAppPasswordHere");
//     if (!isOtpSent) {
//       return res.status(500).json({ message: "Failed to send OTP email" });
//     }

//     const token = jwt.sign(
//       {
//         email: newUser.email,
//         id: newUser._id,
//         role: newUser.role,
//       },
//       process.env.secretKey
//     );

//     return res.status(200).json({
//       message: "User created and OTP sent",
//       email: newUser.email,
//       role: newUser.role, // return role too
//     });
//   } catch (err) {
//     console.error("Error in createUsers:", err);
//     return res
//       .status(500)
//       .json({ message: "Internal Server Error", error: err.message });
//   }
// };



// exports.verifyOtp = async (req, res) => {
//   const { email, otp } = req.body;

//   if (!otp) {
//     return res.status(400).json({ message: "Email and OTP are required" });
//   }
//   const existingEmail = await userModel.findOne({ email });
//   if (!existingEmail) {
//     return res.status(404).json({ message: "Email not found" });
//   }

//   const currentTime = new Date();
//   if (currentTime > new Date(existingEmail.otpTimer)) {
//     return res.status(400).json({ message: "OTP has expired" });
//   }

//   if (existingEmail.otp == otp) {
//     return res.status(200).json({ message: "OTP verified successfully" });
//   } else {
//     return res.status(401).json({ message: "Invalid OTP" });
//   }
// };

// exports.resendOtp = async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: "Email is required" });
//   }

//   const user = await userModel.findOne({ email });

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   const generateOTP = Math.floor(100000 + Math.random() * 900000).toString();
//   const newOtp = generateOTP;
//   const otpExpiry = Date.now() + 5 * 60 * 1000;

//   // Update user OTP
//   user.otp = newOtp;
//   user.otpExpire = otpExpiry;
//   await user.save();

//   // Send the new OTP email
//   const isOtpSent = await sendOtpEmail(user.email, newOtp, "sonipushpendra256@gmail.com", "yourAppPasswordHere");
//   if (!isOtpSent) {
//     return res.status(500).json({ message: "Failed to resend OTP email" });
//   }

//   res.status(200).json({ message: "OTP resent successfully" });
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   const existingEmail = await userModel.findOne({ email });

//   if (!existingEmail) {
//     return res.status(400).json({ message: "Email not exists" });
//   }
//   const dbPassword = existingEmail.password;

//   const isMatch = bcrypt.compareSync(password, dbPassword);
//   if (!isMatch) {
//     return res.status(404).json({ message: "Password incorrect" });
//   }
//   const token = jwt.sign(
//     {
//       email: existingEmail.email,
//       id: existingEmail._id,
//       role: existingEmail.role,
//     },
//     process.env.secretKey
//   );

//   await userModel.findOneAndUpdate(
//     { email },
//     {
//       otp: "",
//       otpTimer: "",
//       isVerified: true,
//     }
//   );

//   res.status(200).json({
//     message: "Login successfully",
//     token: token,
//     role: existingEmail.role,
//   });
// };

// // // Step 1: Forget Password - send reset link
// // exports.forgetPassword = async (req, res) => {
// //   try {
// //     const { email } = req.body;

// //     if (!email) {
// //       return res.status(400).json({ message: "Email is required" });
// //     }

// //     const user = await userModel.findOne({ email });

// //     if (!user) {
// //       return res.status(404).json({ message: "User not found" });
// //     }

// //     // Generate a random reset token
// //     const resetToken = crypto.randomBytes(20).toString("hex");
// //     const resetTokenExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

// //     user.resetPasswordToken = resetToken;
// //     user.resetPasswordExpire = resetTokenExpire;
// //     await user.save();

// //     // Create reset link
// //     const resetLink = `http://localhost:6001/reset-password/${resetToken}`;

// //     // Send email
// //     const isSent = await sendOtpEmail(
// //       user.email,
// //       `Reset your password using this link: ${resetLink}`,
// //       "sonipushpendra256@gmail.com",
// //       "yourAppPasswordHere"
// //     );

// //     if (!isSent) {
// //       return res.status(500).json({ message: "Failed to send reset link email" });
// //     }

// //     res.status(200).json({ message: "Password reset link sent to your email" });
// //   } catch (error) {
// //     console.error("Error in forgetPassword:", error);
// //     res.status(500).json({ message: "Internal server error", error: error.message });
// //   }
// // };



// // FORGOT PASSWORD - send OTP
// exports.forgetPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ message: "Email is required" });

//     const user = await userModel.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpire = moment().add(10, "minutes").toDate();

//     user.otp = otp;
//     user.otpExpire = otpExpire;
//     await user.save();

//     const isOtpSent = await sendOtpEmail(email, otp, "sonipushpendra256@gmail.com", "xyhn ujvz lknw eapm");
//     if (!isOtpSent) {
//       return res.status(500).json({ message: "Failed to send OTP email" });
//     }

//     res.status(200).json({ message: "OTP sent successfully for password reset" });
//   } catch (err) {
//     console.error("Error in forgetPassword:", err);
//     res.status(500).json({ message: "Internal Server Error", error: err.message });
//   }
// };


// exports.resetPassword = async (req, res) => {
//   try {
//     const { email, newPassword } = req.body;
//     if (!email || !newPassword) {
//       return res.status(400).json({ message: "Email and New Password are required" });
//     }

//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const hashedPassword = bcrypt.hashSync(newPassword, 10);

//     user.password = hashedPassword;
//     user.otp = null;
//     user.otpExpire = null;
//     await user.save();

//     return res.status(200).json({ message: "Password changed successfully" });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };











const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const userModel = require("../model/userModel");
const { sendOtpEmail } = require("../utils/sendMail");
const crypto = require("crypto");

exports.createUsers = async (req, res) => {
  try {
    const { name, email, phone, age, gender, password, role } = req.body;

    if (!email || !name || !password || !phone || !age || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpTimer = moment().add(10, "minutes").toDate();

    const newUser = new userModel({
      name,
      email,
      phone,
      age,
      gender,
      password,
      otp,
      otpExpire: otpTimer,
      role: role || "user",
    });

    await newUser.save();

    const isOtpSent = await sendOtpEmail(email, otp, "sonipushpendra256@gmail.com", "xyhn ujvz lknw eapm");
    if (!isOtpSent) {
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    const token = jwt.sign(
      {
        email: newUser.email,
        id: newUser._id,
        role: newUser.role,
      },
      process.env.secretKey
    );

    return res.status(200).json({
      message: "User created and OTP sent",
      email: newUser.email,
      role: newUser.role,
      token: token,
    });

  } catch (err) {
    console.error("Error in createUsers:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};



exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }
  const existingEmail = await userModel.findOne({ email });
  if (!existingEmail) {
    return res.status(404).json({ message: "Email not found" });
  }

  const currentTime = new Date();
  if (currentTime > new Date(existingEmail.otpTimer)) {
    return res.status(400).json({ message: "OTP has expired" });
  }

  if (existingEmail.otp == otp) {
    return res.status(200).json({ message: "OTP verified successfully" });
  } else {
    return res.status(401).json({ message: "Invalid OTP" });
  }
};

exports.resendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const generateOTP = Math.floor(100000 + Math.random() * 900000).toString();
  const newOtp = generateOTP;
  const otpExpiry = Date.now() + 5 * 60 * 1000;

  user.otp = newOtp;
  user.otpExpire = otpExpiry;
  await user.save();

  const isOtpSent = await sendOtpEmail(user.email, newOtp, "sonipushpendra256@gmail.com", "xyhn ujvz lknw eapm");
  if (!isOtpSent) {
    return res.status(500).json({ message: "Failed to resend OTP email" });
  }

  res.status(200).json({ message: "OTP resent successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const existingEmail = await userModel.findOne({ email });

  if (!existingEmail) {
    return res.status(400).json({ message: "Email not exists" });
  }
  const dbPassword = existingEmail.password;

  const isMatch = bcrypt.compareSync(password, dbPassword);
  if (!isMatch) {
    return res.status(404).json({ message: "Password incorrect" });
  }

  const token = jwt.sign(
    {
      email: existingEmail.email,
      id: existingEmail._id,
      role: existingEmail.role,
    },
    process.env.secretKey
  );

  await userModel.findOneAndUpdate(
    { email },
    {
      otp: "",
      otpTimer: "",
      isVerified: true,
    }
  );

  res.status(200).json({
    message: "Login successfully",
    token: token,
    role: existingEmail.role,
    _id: existingEmail._id,
    email: existingEmail.email,
  });
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpire = moment().add(10, "minutes").toDate();

    user.otp = otp;
    user.otpExpire = otpExpire;
    await user.save();

    const isOtpSent = await sendOtpEmail(
      email,
      otp,
      "sonipushpendra256@gmail.com",
      "xyhn ujvz lknw eapm"
    );

    if (!isOtpSent) {
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    res.status(200).json({ message: "OTP sent successfully for password reset" });
  } catch (err) {
    console.error("Error in forgetPassword:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    console.log("ResetPassword Input:", { email, otp, password });

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (new Date(user.otpExpire).getTime() < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    user.password = password;
    user.otp = null;
    user.otpExpire = null;

    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error:", error.message, error.stack);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};