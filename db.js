//this db.js file is responsible for all the connections between the nodejs server and database



// at first we have to import mongoose and also install it 
const mongoose = require('mongoose');
require('dotenv').config();

//now we have to define the url for the database 
// const mongoURL = "mongodb://127.0.0.1:27017/restaurant";
// const mongoURL = process.env.URLLOCAL
// const mongoURL = "mongodb://localhost/restaurant";
// ***** this url connect the server to the online database
const mongoURL = process.env.URLONLINE

//here we have called mongodb.connect for connecting to the database using the URL and also defined some values. It will initialize the connection to the database but not actually connect to the database
mongoose.connect(mongoURL);

//here we call mongoose dafault object maintained by mongoose for the connection to the database and store it in the db variable

const db = mongoose.connection;

//there are also some events for the database that are predefined
db.once('open', () => {
    console.log('Successfully connected to the database');
  });
  
  db.once('error', (err) => {
    console.error('Connection error:', err);
  });
  
  db.once('disconnected', () => {
    console.log('Database disconnected');
  });

module.exports = db;