// const express = require("express");
// const router = express.Router();
// const stateController = require("../controller/stateController");
// const auth = require("../middleware/auth");

// router.post("/add", auth, stateController.addState);
// router.get("/get-all", auth, stateController.getAllStates);
// router.put("/update/:id", auth, stateController.updateState);
// router.patch("/toggle/:id", auth, stateController.toggleStateStatus);
// router.delete("/delete/:id", auth, stateController.deleteState);

// module.exports = router;





const express = require("express");
const router = express.Router();
const stateController = require("../controller/stateController");
const auth = require("../middleware/auth");

router.post("/add", auth, stateController.addState);

router.get("/get-all", auth, stateController.getAllStates);

router.put("/update/:id", auth, stateController.updateState);

router.patch("/toggle/:id", auth, stateController.toggleStateStatus);

router.delete("/delete/:id", auth, stateController.deleteState);

module.exports = router;
