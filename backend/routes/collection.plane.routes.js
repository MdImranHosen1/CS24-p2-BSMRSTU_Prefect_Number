const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const collectionPlane = require('../model/collection.plane.model')
// const StsTranaction = require('../model/sts.transaction.model')
const authenticate = require('../middleware/authenticate');
const authenticateSTS = require('../middleware/authenticate.sts');

//Get all Monitor Transport 
router.get('/',async (req,res)=>{
    console.log('Hit /collectionPlane')
    collectionPlane.find({})
    .then((collectionPlane)=>res.json(collectionPlane))
    .catch((err)=>res.json(err))
})

//Create A transport Monitor
router.post('/',async (req,res)=>{
    try {
        // console.log(req.body)
        const newCollection = new collectionPlane(req.body)
        await newCollection.save()
        res.status(201).json(newCollection)
      } catch (err) {
        console.log(err)
        res.status(404).json('New Collection Not Created')
    
      }
})
//Get Specific Transport Monitor
router.get('/:collectionId',async (req,res)=>{
    console.log("Get Hit")
    const id = req.params.collectionId
    console.log('My ID:',id)
    try{
        var validId = mongoose.Types.ObjectId.isValid(id)
        // console.log('IsValid:',validId)
        if(validId){
            const collection = await collectionPlane.findById({_id:id})
            if(collection){
                res.status(200).json(collection);
            }else{
                res.status(404).json({error:'collection Not Found'})
            }
        }else{
            res.status(404).json({error:'Not a Valid ID'})
        }
    }catch(err){
        // console.log(err)
        res.status(500).json({error:'collection not Create || Error Occur'})
    }
})

//Update a Contractor Manager
router.put('/:collectionId',async (req,res)=>{
    const id = req.params.collectionId
    try{
        var validId = mongoose.Types.ObjectId.isValid(id)
        if(validId){
           const collection = await collectionPlane
           .findByIdAndUpdate({ _id: id }, {
                areaOfCollection: req.body.areaOfCollection,
                collectionStartTime: req.body.collectionStartTime,
                durationOfCollection: req.body.durationOfCollection,
                numberOfLabors: req.body.numberOfLabors,
                numberOfVans: req.body.numberOfVans,
                expectedWeight: req.body.expectedWeight,
                // password: req.body.password,          
                // collectionArea: req.body.collectionArea,          
                // designatedSTS: req.body.designatedSTS         
              })
            res.status(201).json(collection)
        }else{
            res.status(404).json({error:'Not a Valid ID'})
        }
    }catch(err){
        // console.log(err)
        res.status(500).json({error:'collection not Create || Error Occur'})
    }
})
//Delete a Contractor Manager
router.delete('/:collectionId',async (req,res)=>{
    const id = req.params.collectionId;
    const collection = await collectionPlane.findById({_id:id})
    console.log(id)
    console.log('collection:',collection)
    if(tm){
        try{
           await collectionPlane
           .findByIdAndDelete({_id:id})
            res.status(201).json(collection)
        }catch(err){
            // console.log(err)
            res.status(500).json({error:'collection Not Deleted || Error Occur'})
        }
    }else{
        res.status(404).json({error:'collection Not Found'})
    }
})

module.exports = router