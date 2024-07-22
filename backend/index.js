const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.route');
const connection =require("./config/db")
const appointmentRoutes = require('./routes/appointment.route');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());



app.use('/api/users', userRoutes);
//app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async(req,res) =>{
    try{

        await connection  ;
        console.log("connected to server") ;
        console.log(PORT)

    }catch(err){
        res.send(err)
    }

});
