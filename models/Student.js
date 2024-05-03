const mongoose = require('mongoose');


//defining the schema of the student 
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        default: "Noob"
    },
    age: {
        type: Number,
        min: 18, // Age must be at least 18
        max: 120 // Age cannot exceed 120
    },
    email: {
        type: String,
        required: true,
        unique: true, // Email must be unique
        lowercase: true, // Email will be stored in lowercase
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ // Email must match the regular expression pattern
    },
    weight: {
        type: Number
    }
});

//creating model using the above student schema
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;