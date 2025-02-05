const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const host = "localhost";
const mongoose = require('mongoose');
const router = require('./userManagement/router');
const cookieParser = require('cookie-parser');

app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PATCH","DELETE"],
    credentials:true,
}));

app.use(cookieParser());

app.use(express.json());

const uri = "mongodb+srv://Ravindu:ThilinakaMdb16@cluster0.h6r9a.mongodb.net/starlight?retryWrites=true&w=majority&appName=Cluster0";

const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connect to MongoDB');
    } catch (error) {
        console.log('MongoDB Error',error);
    }
}

connect();

const server = app.listen(port,host,()=>{
    console.log(`Node Server is listernung to ${server.address().port}`);
})

app.use('/api',router);