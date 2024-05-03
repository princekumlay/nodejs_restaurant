
const mongoose = require('mongoose');

// now we will define the personSchema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true
    },
});

//now we will create the model named person using the above schema which will wrapped around the schema and provide the interface to interact with the Person collection in the database
const Person = mongoose.model('Person', personSchema);

//we should export the model
module.exports = Person