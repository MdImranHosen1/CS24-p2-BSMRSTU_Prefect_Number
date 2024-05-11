const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const monitorTransport = require('../model/monitor.transportedwaste.model')
// const StsTranaction = require('../model/sts.transaction.model')
const authenticate = require('../middleware/authenticate');
const authenticateSTS = require('../middleware/authenticate.sts');

//Get all Monitor Transport 
router.get('/',async (req,res)=>{
    console.log('Hit /contractor-manager')
    monitorTransport.find({})
    .then((monitorTransport)=>res.json(monitorTransport))
    .catch((err)=>res.json(err))
})

//Create A transport Monitor
router.post('/',async (req,res)=>{
    try {
        // console.log(req.body)
        const newMonitor = new monitorTransport(req.body)
        await newMonitor.save()
        res.status(201).json(newMonitor)
      } catch (err) {
        console.log(err)
        res.status(404).json('New Transport Monitor Not Created')
    
      }
})
//Get Specific Transport Monitor
router.get('/:tmId',async (req,res)=>{
    console.log("Get Hit")
    const id = req.params.tmId
    console.log('My ID:',id)
    try{
        var validId = mongoose.Types.ObjectId.isValid(id)
        // console.log('IsValid:',validId)
        if(validId){
            const tm = await monitorTransport.findById({_id:id})
            if(tm){
                res.status(200).json(tm);
            }else{
                res.status(404).json({error:'transport Monitor Not Found'})
            }
        }else{
            res.status(404).json({error:'Not a Valid ID'})
        }
    }catch(err){
        // console.log(err)
        res.status(500).json({error:'Transport Monitor not Create || Error Occur'})
    }
})

//Update a Contractor Manager
router.put('/:tmId',async (req,res)=>{
    const id = req.params.tmId
    try{
        var validId = mongoose.Types.ObjectId.isValid(id)
        if(validId){
           const tm = await monitorTransport
           .findByIdAndUpdate({ _id: id }, {
                amountOfWaste: req.body.amountOfWaste,
                contractorId: req.body.contractorId,
                wasteType: req.body.wasteType,
                designatedSts: req.body.designatedSts,
                vehicleType: req.body.vehicleType,
                // password: req.body.password,          
                // collectionArea: req.body.collectionArea,          
                // designatedSTS: req.body.designatedSTS         
              })
            res.status(201).json(tm)
        }else{
            res.status(404).json({error:'Not a Valid ID'})
        }
    }catch(err){
        // console.log(err)
        res.status(500).json({error:'transport Monitor not Create || Error Occur'})
    }
})
//Delete a Contractor Manager
router.delete('/:tmId',async (req,res)=>{
    const id = req.params.tmId;
    const tm = await monitorTransport.findById({_id:id})
    console.log(id)
    console.log('transport Monitor:',tm)
    if(tm){
        try{
           await monitorTransport
           .findByIdAndDelete({_id:id})
            res.status(201).json(tm)
        }catch(err){
            // console.log(err)
            res.status(500).json({error:'Transport Monitor Not Deleted || Error Occur'})
        }
    }else{
        res.status(404).json({error:'Transport Monitor Not Found'})
    }
})

module.exports = router