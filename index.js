const express = require("express");
const app = express();
var cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()


// Middleware

app.use(cors());
app.use(express.json());





app.get('/',(req,res)=>{
    res.send('Toys market place is running');
})
app.listen(port,()=>{
    console.log(`Toys market place is running on port ${port}`);
})