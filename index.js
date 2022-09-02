const express = require ('express');
const mongoose = require('mongoose');
const PORT = 7000;
const url = "mongodb+srv://client:client123@cluster0.jqa6rrt.mongodb.net/?retryWrites=true&w=majority"
const cors = require("cors")
const rout = require('./controller/route');

mongoose.connect(url).then(()=>{
    console.log("Db Connected Suessfully")
})

const app = express();
app.use (express.json());
app.use(cors());
app.use("/", rout);


app.listen(PORT, () => console.log("SUCCESSFULLY"))