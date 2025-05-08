// const express = require('express');
// const router = express.Router();
// const roomController = require('../controller/roomController');

// router.get('/', roomController.getRooms);
// router.post('/', roomController.addRoom);
// router.put('/:id', roomController.updateRoom);
// router.patch('/toggle-status/:id', roomController.toggleRoomStatus);
// router.delete('/:id', roomController.deleteRoom);

// module.exports = router;






// const express = require('express');
// const router = express.Router();
// const roomController = require('../controller/roomController');

// router.get('/', roomController.getRooms);
// router.post('/', roomController.addRoom);
// router.put('/:id', roomController.updateRoom);
// router.patch('/toggle-status/:id', roomController.toggleRoomStatus);
// router.delete('/:id', roomController.deleteRoom);

// module.exports = router;






const express = require('express');
const router = express.Router();
const roomController = require('../controller/roomController');

router.get('/', roomController.getRooms);
router.post('/', roomController.addRoom);
router.put('/:id', roomController.updateRoom);
router.patch('/toggle-status/:id', roomController.toggleRoomStatus);
router.delete('/:id', roomController.deleteRoom);
router.get("/:id", roomController.getRoomDetails);

module.exports = router;