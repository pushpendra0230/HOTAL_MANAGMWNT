const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/signup", userController.createUsers);
router.post("/verifyOtp", userController.verifyOtp);
router.post("/resend-otp", userController.resendOtp);
router.post("/login", userController.login);
router.post("/forgot-password", userController.forgetPassword);
router.post("/reset-password", userController.resetPassword);


module.exports = router;





// const express = require("express");
// const userController = require("../controller/userController");
// const router = express.Router();
// const auth = require("../middleware/auth");

// // Signup route
// router.post("/signup", userController.createUsers);

// // OTP verification route
// router.post("/verifyOtp", userController.verifyOtp);

// // Resend OTP route
// router.post("/resend-otp", userController.resendOtp);

// // Login route
// router.post("/login", userController.login);

// // Forgot password route
// router.post("/forgot-password", userController.forgetPassword);

// // Reset password route
// router.post("/reset-password", userController.resetPassword);

// module.exports = router;