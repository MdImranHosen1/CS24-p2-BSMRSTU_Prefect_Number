const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const STS = require('../model/sts.model')
// const StsTranaction = require('../model/sts.transaction.model')
const authenticate = require('../middleware/authenticate');
const authenticateSTS = require('../middleware/authenticate.sts');

//Get all STS
router.get('/',authenticate,async (req,res)=>{
    console.log('Hit /sts/transaction Not Transaction')
    STS.find({})
    .then((sts)=>res.json(sts))
    .catch((err)=>res.json(err))
})

//Create A STS
router.post('/',authenticate,async (req,res)=>{
    try {
        // console.log(req.body)
        const newSts = new STS(req.body)
        await newSts.save()
        res.status(201).json(newSts)
      } catch (err) {
        console.log(err)
        res.status(404).json('STS Not Created')
    
      }
})
//Get specific STS
router.get('/:stsId',async (req,res)=>{
    const id = req.params.stsId
    console.log('My ID:',id)
    try{
        var validId = mongoose.Types.ObjectId.isValid(id)
        // console.log('IsValid:',validId)
        if(validId){
            const sts = await STS.findById({_id:id})
            if(sts){
                res.status(200).json(sts);
            }else{
                res.status(404).json({error:'STS Not Found'})
            }
        }else{
            res.status(404).json({error:'Not a Valid ID'})
        }
    }catch(err){
        // console.log(err)
        res.status(500).json({error:'STS not Create || Error Occur'})
    }
})

//Update a STS
router.put('/:stsId',async (req,res)=>{
    const id = req.params.stsId
    try{
        var validId = mongoose.Types.ObjectId.isValid(id)
        if(validId){
           const sts = await STS.findByIdAndUpdate({ _id: id }, {
                stsName: req.body.stsName,
                wardNum: req.body.wardNum,
                capacity: req.body.capacity,
                coordinate: req.body.coordinate,
                managers: req.body.managers,          
              })
            res.status(201).json(sts)
        }else{
            res.status(404).json({error:'Not a Valid ID'})
        }
    }catch(err){
        // console.log(err)
        res.status(500).json({error:'STS not Create || Error Occur'})
    }
})
//Delete a vehicles
router.delete('/:stsId',async (req,res)=>{
    const id = req.params.stsId;
    const sts = await STS.findById({_id:id})
    console.log(id)
    console.log('STS:',sts)
    if(sts){
        try{
           await STS.findByIdAndDelete({_id:id})
            res.status(201).json(sts)
        }catch(err){
            // console.log(err)
            res.status(500).json({error:'STS Not Deleted || Error Occur'})
        }
    }else{
        res.status(404).json({error:'STS Not Found'})
    }
})

module.exports = router