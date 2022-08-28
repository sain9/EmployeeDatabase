//4th file

const express = require('express');
const router = express.Router();

const Employee = require('../models/employee.js');

//creating APIs
//GET POST PUT DELETE
//Base path: http://localhost:3000/employees

const ObjectId = require('mongoose').Types.ObjectId;

//get single employee

router.get('/:id', (req,res)=> {
    if(ObjectId.isValid(req.params.id)){
        Employee.findById(req.params.id, (err,doc)=>{
            if(err){    
                        console.log(err);
                    }
                else{
                        res.send(doc)
                    }
        })
    }
    else{
        return res.status(400).send('No record found for id: ' +req.params.id)
    }
});

//get
router.get('/', async (req,res)=> {

    try {
        const user = await Employee.find({});
        return res.status(200).json({user});
    } catch (err) {
        return res.status(500).json(err.message);
    }
    // Employee.find( (err,doc)=> {
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         res.send(doc)
    //     }
    // });
});

//post
  router.post('/', async(req,res) =>{
        
        try {

            let { name, position, dept } = req.body;

         let employee = new Employee ({     
                name,
                position,
                dept
            });

        await employee.save();
            return res.status(200).json({employee});

        } catch (err) {
            return res.status(500).json(err.message);
        }

        
  });

  router.put('/:id', (req,res)=> {

    if(ObjectId.isValid(req.params.id)){
        let emp = {
            name : req.body.name,
            position : req.body.position,
            dept : req.body.dept
        }
      Employee.findByIdAndUpdate(req.params.id,{$set:emp},{new: true},(err,doc)=> {
        if(err){    
                console.log("Error in update employee by id: "+err);
            }
        else{
                res.send(doc)
            }
        });
    } 
    else{
 return res.status(400).send('No record found for id: ' +req.params.id)
  }
});
//delte
  router.delete('/:id', (req,res)=> {

            if(ObjectId.isValid(req.params.id)){
              Employee.findByIdAndRemove(req.params.id, (err,doc)=>{
                if(err){    
                        console.log("Error in delete employee by id: "+err);
                    }
                else{
                        res.send(doc)
                    }
        })
    }
    else{
        return res.status(400).send('No record found for id: ' +req.params.id)
    }
});

module.exports =router;
