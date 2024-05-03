
//------------------------------------------------------------------------------------------
//CREATING SERVER USING EXPRESS JS FRAMEWORK
//including the express in the app
const express = require('express');
require('dotenv').config();

//creating the app using the express
const app = express();

const personRouter = require('./routes/personRouter');
const studentRouter = require('./routes/studentRouter');

//this db object should be imported in this file before the http requests
const db = require('./db');

//now we will use the body perser which helps in extracting data from the http request body and provide us in req.body
const bodyParser = require('body-parser');
app.use(bodyParser.json());



//DEFINING THE DIFFERENT METHODS OF EXPRESS APP AT DIFFERENT ADDRESS OR URL's
//get method is used to send data to the user screen for the request made by the user for a particular url
app.get('/', (req, res) => {
  res.send("Hello this is express app!");
});


//accessing the different schemas using the app.use
app.use('/', personRouter);
app.use('/', studentRouter);

const PORT = process.env.PORT || 3000;


//this is a port number at which our app is running at the localhost ip address
app.listen(PORT, () => {
  console.log("server is running at port:3000");
});