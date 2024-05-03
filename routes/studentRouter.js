const express = require('express');
const Student = require('./../models/Student');

const router = express.Router();

router.post('/student', async (req, res) => {

    try{
       //first we get the data from the req.body and store it in the variable
       const data = req.body;
 
       //now we will create the newPerson object of Person model type and stores the data in it
       const newStudent = new Student(data);
 
       //save newPerson to the database and store this in the variable to show what data is saved in the database
       const response = await newStudent.save();
       console.log('data saved', {response});
       res.status(200).json(response);
    }
 
    catch(err) {
       console.log(err);
       res.status(500).error(error, "internal server error")
    };
 
 });

 //this is the end point at which we can access the data of a student schema
 router.get('/student', async(req, res) => {

   try{
        const data = await Student.find();
        console.log('data fethed successfully');
        res.status(200).json(data);
   }
   catch(err){
        console.error(err);
        res.status(500).json({error: 'Inernal Server Error For Accessing Student Schema'});
   }
});

 //here we will define the end point through which we can access the particular student 
 router.get('/student/:id', async(req, res) => {

   try{
      const uniqueId = req.params.id;//it will get the email of the student
      //now we will access the data of the student
      const response = await Student.findById(uniqueId);

      console.log('data fetched successfully');
      res.status(200).json(response);
   }
   catch(err){
      console.error(err);
      res.status(500).json({error: 'Internal Server Error For Parameterised API call'});
   };
 });

 //now we will define end point through which we can updata the data of any entity
router.put('/student/:id', async(req, res) => {

   try{
      const uniqueId = req.params.id;//get the id of the student for updation
      const updatedData = req.body;

      //now we will updata data for the provided id
      const response = await Student.findByIdAndUpdate(uniqueId, updatedData, {
         new: true,
         runValidators: true
      });
      if(!response){
         res.status(404).json({error: 'Data not found'});
      }
      else{
         console.log('Data updated successfully');
         res.status(200).json(response);
      }
   }
   catch(err){
      console.error(err);
      res.status(500).json({error: 'Internal Server Error For Updataion'})
   };
});

//now we will define the end point for the delete operation 
router.delete('/student/:id', async(req, res) => {

   try{
      const uniqueId = req.params.id;
      //deleting the student data having the id provided by client
      const response = await Student.findByIdAndDelete(uniqueId);

      if(!response){
         res.status(404).json({error: 'Data not found for the provided Id'});
      }
      else{
         console.log('data deleted successfull for the given Id');
         res.status(200).json(response);
      }
   }
   catch(err){
      console.error(err);
      res.status(500).json({error: 'Internal Server Error for deleting data'});
   };
});

 module.exports = router;