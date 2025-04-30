const express = require("express");
const router = express.Router();
const locationController = require("../controller/locationController");
const auth = require("../middleware/auth");

router.post("/add", auth, locationController.createLocation);
router.get("/get-all", auth, locationController.getLocations);
router.put("/update/:id", auth, locationController.updateLocation);
router.patch("/toggle/:id", auth, locationController.toggleStatus);
router.delete("/delete/:id", auth, locationController.deleteLocation);

module.exports = router;