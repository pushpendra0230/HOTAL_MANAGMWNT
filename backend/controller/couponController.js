const couponModel = require(`../model/couponsModel`)

const isAdmin = (user) => user.role && user.role.toLowerCase() === "admin";

exports.getCoupon = async (req, res) => {
    try {
        const getData = await couponModel.find();
        return res.status(200).json({ success: true, message: "Coupons fetched successfully", data: getData });
    } catch (error) {
        console.error("Coupon fetch error", error);
        return res.status(500).json({ success: false, message: "Failed to fetch coupons" });
    }
};

exports.addCoupon = async (req, res) => {
    if (!isAdmin(req.user)) {
        return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    try {
        const { code } = req.body;
        const existingCoupon = await couponModel.findOne({ code });

        if (existingCoupon) {
            return res.status(409).json({ success: false, message: "Coupon already exists" });
        }

        const couponData = new couponModel(req.body);
        const saveData = await couponData.save();
        return res.status(201).json({ success: true, message: "Coupon created successfully", data: saveData });
    } catch (error) {
        console.error("Coupon creation error", error);
        return res.status(500).json({ success: false, message: "Failed to add coupon" });
    }
};

exports.updateCoupon = async (req, res) => {
    if (!isAdmin(req.user)) {
        return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    try {
        const { id } = req.body;
        const updateData = await couponModel.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({ success: true, message: "Coupon updated successfully", data: updateData });
    } catch (error) {
        console.error("Coupon update error", error);
        return res.status(500).json({ success: false, message: "Failed to update coupon" });
    }
};

exports.disableCoupon = async (req, res) => {
    if (!isAdmin(req.user)) {
        return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    try {
        const { id } = req.body;
        const findCoupon = await couponModel.findById(id);
        if (!findCoupon) {
            return res.status(404).json({ success: false, message: "Coupon not found" });
        }

        const updatedCoupon = await couponModel.findByIdAndUpdate(
            id,
            { isDisable: !findCoupon.isDisable },
            { new: true }
        );
        return res.status(200).json({ success: true, message: "Coupon status toggled", data: updatedCoupon });
    } catch (error) {
        console.error("Coupon disable error", error);
        return res.status(500).json({ success: false, message: "Failed to disable coupon" });
    }
};

exports.deleteCoupon = async (req, res) => {
    if (!isAdmin(req.user)) {
        return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    try {
        const { id } = req.body;
        const deleteData = await couponModel.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Coupon deleted successfully", data: deleteData });
    } catch (error) {
        console.error("Coupon delete error", error);
        return res.status(500).json({ success: false, message: "Failed to delete coupon" });
    }
};

exports.getActiveCoupons = async (req, res) => {
    console.log('Fetching active coupons...');
    try {
        const currentDate = new Date();
        const activeCoupons = await couponModel.find({
            isDisable: false,
            validFrom: { $lte: currentDate },
            validTill: { $gte: currentDate }
        });

        return res.status(200).json({
            success: true,
            message: "Active coupons fetched",
            data: activeCoupons
        });
    } catch (error) {
        console.error("Error fetching active coupons", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch active coupons"
        });
    }
};