const router = require("express").Router()
const bookingController = require("../controllers/bookingController");

router.post("/booking",bookingController.createBooking);

router.get("/booking",bookingController.getUserBookings)

module.exports = router;