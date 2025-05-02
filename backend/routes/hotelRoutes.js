const express = require('express');
const router = express.Router();
const hotelController = require('../controller/hotelController');

router.get('/', hotelController.getHotels);
router.post('/', hotelController.addHotel);
router.put('/:id', hotelController.updateHotel);
router.patch('/toggle-status/:id', hotelController.toggleHotelStatus);
router.delete('/:id', hotelController.deleteHotel);

module.exports = router;