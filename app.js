const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://mayurpatil98607:mayur123@cluster0.kulyrnk.mongodb.net/interview-app").then(()=>{
    console.log("Connected to Database")
}).catch((err)=>{
    console.log(`Error in Connected database - ${err}`)
})

const userRoutes = require("./src/routes/userRoutes");
const bookingRoutes = require("./src/routes/bookingRoutes");

app.use("/",userRoutes);
app.use("/",bookingRoutes);

const PORT = 4000;

app.listen(PORT,()=>{
    console.log(`Server Started at Port - ${PORT}`)
})