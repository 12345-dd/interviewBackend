const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    peerId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    dateTime:{
        type:Date
    },
    roomName:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Booking",bookingSchema)