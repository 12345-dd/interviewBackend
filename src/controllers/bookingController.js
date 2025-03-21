const bookingSchema = require("../models/bookingModel");

const createBooking = async (req, res) => {
    try {
        let { userId, peerId, dateTime } = req.body;

        console.log("Received Date & Time (Backend, Raw):", dateTime);

        const utcDate = new Date(dateTime);
        console.log("Storing in MongoDB (UTC Time):", utcDate.toISOString());

        const roomName = `Interview_${Date.now()}`;

        const newBooking = await Booking.create({ userId, peerId, dateTime: utcDate, roomName });

        res.status(201).json({ message: "Booking confirmed", booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: "Error creating booking", error: error.message });
    }
};


const getUserBookings = async (req, res) => {
    try {
        const { userId } = req.query; 

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const bookings = await bookingSchema.find({
            $or: [{ userId }, { peerId: userId }]
        }).sort({ dateTime: 1 });

        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error: error.message });
    }
};



module.exports = { 
    createBooking, 
    getUserBookings
};
