const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Vehicle = require('../model/vehicle.model')
const authenticate = require('../middleware/authenticate');

//Get all Vehicles
router.get('/',async (req,res)=>{
    Vehicle.find({})
    .then((vehicle)=>res.json(vehicle))
    .catch((err)=>res.json(err))
})

//Create A vehicles
router.post('/',authenticate,async (req,res)=>{
    try {
        console.log(req.body)
        const newVehicle = new Vehicle(req.body)
        await newVehicle.save()
        res.status(201).json(newVehicle)
      } catch (err) {
        console.log(err)
        res.status(404).json('Vehicle Not Created')
    
      }
})
//Get specific vehicles
router.get('/:vId',async (req,res)=>{
    const id = req.params.vId
    console.log('ID:',id)
    try{
        var validId = mongoose.Types.ObjectId.isValid(id)
        // console.log('IsValid:',validId)
        if(validId){
            const vehicle = await Vehicle.findById({_id:id})
            if(vehicle){
                res.status(200).json(vehicle);
            }else{
                res.status(404).json({error:'Vehicle Not Found'})
            }
        }else{
            res.status(404).json({error:'Not a Valid ID'})
        }
    }catch(err){
        // console.log(err)
        res.status(500).json({error:'User not Create || Error Occur'})
    }
})

//Update a vehicles
router.put('/:vId',async (req,res)=>{
    const id = req.params.vId
    try{
        var validId = mongoose.Types.ObjectId.isValid(id)
        if(validId){
           const vehicle = await Vehicle.findByIdAndUpdate({ _id: id }, {
                regNum: req.body.regNum,
                stsID: req.body.stsID,
                capacity: req.body.capacity,
                costLoaded: req.body.costLoaded,
                costUnloaded: req.body.costUnloaded,            
              })
            res.status(201).json(vehicle)
        }else{
            res.status(404).json({error:'Not a Valid ID'})
        }
    }catch(err){
        // console.log(err)
        res.status(500).json({error:'User not Create || Error Occur'})
    }
})
//Delete a vehicles
router.delete('/:vId',async (req,res)=>{
    const id = req.params.vId;
    const vehicle = await Vehicle.findById({_id:id})
    if(vehicle){
        try{
            await Vehicle.findByIdAndDelete({_id:id})
            res.status(201).json(vehicle)
        }catch(err){
            // console.log(err)
            res.status(500).json({error:'Vehicle Not Deleted || Error Occur'})
        }
    }else{
        res.status(404).json({error:'Vehicle Not Found'})
    }
})

module.exports = router