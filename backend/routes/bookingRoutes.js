// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/auth");
// const bookingController = require("../Controller/bookingController");

// router.post("/add", auth, bookingController.addBooking);
// router.get("/getAll", auth, bookingController.getBooking);
// router.patch("/update/:id", auth, bookingController.updateBooking);

// module.exports = router;



const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const bookingController = require("../controller/bookingController");

router.post("/add", auth, bookingController.addBooking);
router.get("/getAll", auth, bookingController.getBooking);
router.patch("/update/:id", auth, isAdmin, bookingController.updateBooking);
router.patch("/update-checking/:id", auth, bookingController.updateCheckingStatus);

module.exports = router;