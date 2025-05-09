const express = require('express');
const router = express.Router();
const auth = require(`../middleware/auth`)
const couponController = require(`../controller/couponController`)

router.get('/getAll', auth, couponController.getCoupon);
router.post('/addCoupon', auth, couponController.addCoupon);
router.patch('/updateCoupon', auth, couponController.updateCoupon);
router.delete('/deleteCoupon', auth, couponController.deleteCoupon);
router.patch('/disableCoupon', auth, couponController.disableCoupon);
router.get('/activeCoupons', auth, couponController.getActiveCoupons);

module.exports = router;