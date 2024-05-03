const express = require('express');
const Person  = require('./../models/Person');
//import routers from express router
const router = express.Router();

//now we will defines the end point through which the client can send data to the server and that data should be saved in the collection on the database
//----*** now we can send data at this end point using postman to the server and the data will be saved to the database called restaurant
router.post('/person', async (req, res) => {

    try{
       //first we get the data from the req.body and store it in the variable
       const data = req.body;
 
       //now we will create the newPerson object of Person model type and stores the data in it
       const newPerson = new Person(data);
 
       //save newPerson to the database and store this in the variable to show what data is saved in the database
       const response = await newPerson.save();
       console.log('data saved', {response});
       res.status(200).json(response);
    }
 
    catch(err) {
       console.log(err);
       res.status(500).error(error, "internal server error in saving data to the database")
    };
 
 });


 //this is the end point at which we can access the data of a Person schema
 router.get('/person', async(req, res) => {

    try{
         const data = await Person.find();
         console.log('data fethed successfully');
         res.status(200).json(data);
    }
    catch(err){
         console.error(err);
         res.status(500).json({error: 'Inernal Server Error For Accessing Person Schema'});
    }
 });


 //here we will define the end point through which we can access the particular person 
 router.get('/person/:id', async(req, res) => {

   try{
      const uniqueId = req.params.id;//it will get the email of the person
      //now we will access the data of the person
      const response = await Person.findById(uniqueId);

      console.log('data fetched successfully');
      res.status(200).json(response);
   }
   catch(err){
      console.error(err);
      res.status(500).json({error: 'Internal Server Error For Parameterised API call'});
   };
 });

//now we will define end point through which we can updata the data of any entity
router.put('/person/:id', async(req, res) => {

   try{
      const uniqueId = req.params.id;//get the id of the person for updation
      const updatedData = req.body;

      //now we will updata data for the provided id
      const response = await Person.findByIdAndUpdate(uniqueId, updatedData, {
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
router.delete('/person/:id', async(req, res) => {

   try{
      const uniqueId = req.params.id;
      //deleting the person data having the id provided by client
      const response = await Person.findByIdAndDelete(uniqueId);

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